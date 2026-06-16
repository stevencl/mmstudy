import { useEffect, useRef, useState } from 'react';
import { Excalidraw, exportToBlob } from '@excalidraw/excalidraw';
import type { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { api, type ActiveState } from '../api';

type Phase = 'loading' | 'waiting' | 'drawing' | 'saving' | 'paused' | 'finished';

const PROMPT = 'Draw how you imagine this works.';
const SUBPROMPT =
  'Sketch the parts, how they relate, and where you think knowledge or memory lives. ' +
  'Use any shapes and words you like — there are no right or wrong answers.';

export function CaptureView() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [active, setActive] = useState<ActiveState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiRef = useRef<ExcalidrawImperativeAPI | null>(null);

  useEffect(() => {
    api
      .getActive()
      .then((a) => {
        setActive(a);
        if (!a.active) setPhase('waiting');
        else if (a.done) setPhase('finished');
        else setPhase('drawing');
      })
      .catch((e) => {
        setError(String(e.message ?? e));
        setPhase('waiting');
      });
  }, []);

  async function handleDone() {
    if (!apiRef.current) return;
    setPhase('saving');
    try {
      const elements = apiRef.current.getSceneElements();
      const appState = apiRef.current.getAppState();
      const files = apiRef.current.getFiles();
      let png = '';
      try {
        const blob = await exportToBlob({
          elements,
          appState: { ...appState, exportBackground: true },
          files,
          mimeType: 'image/png',
        });
        png = await blobToDataUrl(blob);
      } catch {
        png = '';
      }
      await api.saveCapture({ elements, appState: { viewBackgroundColor: appState.viewBackgroundColor }, files }, png);
      const next = await api.getActive();
      setActive(next);
      setPhase(next.active && !next.done ? 'paused' : 'finished');
    } catch (e) {
      setError(String((e as Error).message ?? e));
      setPhase('drawing');
    }
  }

  function handleContinue() {
    setPhase('drawing');
  }

  if (phase === 'loading') {
    return <CenteredMessage title="Loading…" />;
  }

  if (phase === 'waiting') {
    return (
      <CenteredMessage
        title="Ready when you are"
        body={error ? `Please let the facilitator know: ${error}` : 'Please wait for the facilitator to set things up.'}
      />
    );
  }

  if (phase === 'finished') {
    return <CenteredMessage title="All done" body="Thank you — your drawing has been saved." />;
  }

  if (phase === 'paused') {
    return (
      <CenteredMessage
        title="Saved — thank you"
        body="Please leave this tab open and carry on with your work. When the facilitator asks you to, click below to continue."
        action={{ label: 'Continue', onClick: handleContinue }}
      />
    );
  }

  const initialData =
    active?.nextSeq === 2 && active.previousScene
      ? {
          elements: (active.previousScene.elements as never) ?? [],
          appState: { viewModeEnabled: false },
          files: (active.previousScene.files as never) ?? undefined,
          scrollToContent: true,
        }
      : undefined;

  return (
    <div className="capture-wrap">
      <header className="capture-prompt">
        <h1>{PROMPT}</h1>
        <p>{SUBPROMPT}</p>
        <button className="done-btn" onClick={handleDone} disabled={phase === 'saving'}>
          {phase === 'saving' ? 'Saving…' : "I'm done"}
        </button>
      </header>
      <div className="capture-canvas">
        <Excalidraw
          key={active?.nextSeq ?? 1}
          excalidrawAPI={(a) => (apiRef.current = a)}
          initialData={initialData}
          UIOptions={{
            canvasActions: {
              loadScene: false,
              saveToActiveFile: false,
              export: false,
              saveAsImage: false,
            },
          }}
        />
      </div>
    </div>
  );
}

function CenteredMessage({
  title,
  body,
  action,
}: {
  title: string;
  body?: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="centered">
      <div>
        <h1>{title}</h1>
        {body && <p>{body}</p>}
        {action && (
          <button className="done-btn" onClick={action.onClick} style={{ marginTop: 16 }}>
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
