import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  api,
  emptyOverlay,
  normalizeOverlay,
  type OverlayData,
  type Placement,
  type ParticipantDetail,
} from '../api';

export function ParticipantDetailView() {
  const { id = '' } = useParams();
  const [p, setP] = useState<ParticipantDetail | null>(null);
  const [overlay, setOverlay] = useState<OverlayData>(emptyOverlay());
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [newConcept, setNewConcept] = useState('');

  async function load() {
    const detail = await api.getParticipant(id);
    setP(detail);
    setOverlay(normalizeOverlay(detail.overlay));
  }

  useEffect(() => {
    load().catch((e) => setError(String(e.message ?? e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function saveOverlay() {
    setStatus('Saving…');
    try {
      await api.saveOverlay(id, overlay);
      setStatus('Saved.');
      await load();
    } catch (e) {
      setStatus('');
      setError(String((e as Error).message ?? e));
    }
  }

  async function doExport() {
    setStatus('Exporting…');
    try {
      const r = await api.exportParticipant(id);
      setStatus(`Exported to ${r.dir}`);
    } catch (e) {
      setStatus('');
      setError(String((e as Error).message ?? e));
    }
  }

  function setRow(i: number, patch: Partial<OverlayData['referenceRows'][number]>) {
    setOverlay((o) => ({
      ...o,
      referenceRows: o.referenceRows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)),
    }));
  }

  function addCustomConcept() {
    const c = newConcept.trim();
    if (!c) return;
    setOverlay((o) =>
      o.customConcepts.includes(c) ? o : { ...o, customConcepts: [...o.customConcepts, c] }
    );
    setNewConcept('');
  }

  function removeCustomConcept(concept: string) {
    setOverlay((o) => ({
      ...o,
      customConcepts: o.customConcepts.filter((c) => c !== concept),
      placements: o.placements.filter((pl) => pl.concept !== concept),
    }));
  }

  function dropOnImage(image: 1 | 2, e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const raw = e.dataTransfer.getData('text/plain');
    if (!raw) return;
    let payload: { kind: 'new' | 'move'; concept?: string; id?: string };
    try {
      payload = JSON.parse(raw);
    } catch {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    setOverlay((o) => {
      if (payload.kind === 'move' && payload.id) {
        return {
          ...o,
          placements: o.placements.map((pl) =>
            pl.id === payload.id ? { ...pl, image, x, y } : pl
          ),
        };
      }
      if (payload.kind === 'new' && payload.concept) {
        const placement: Placement = {
          id: `pl-${Date.now()}-${Math.round(Math.random() * 1e4)}`,
          concept: payload.concept,
          image,
          x,
          y,
        };
        return {
          ...o,
          placements: [...o.placements, placement],
          referenceRows: o.referenceRows.map((r) =>
            r.element === payload.concept ? { ...r, present: true } : r
          ),
        };
      }
      return o;
    });
  }

  function removePlacement(plId: string) {
    setOverlay((o) => ({ ...o, placements: o.placements.filter((pl) => pl.id !== plId) }));
  }

  if (!p) return <div className="mod-page">{error ? <p className="error">{error}</p> : 'Loading…'}</div>;

  const cap1 = p.captures.find((c) => c.seq === 1);
  const cap2 = p.captures.find((c) => c.seq === 2);
  const concepts = [...overlay.referenceRows.map((r) => r.element), ...overlay.customConcepts];
  const placedOn = (concept: string, image: 1 | 2) =>
    overlay.placements.some((pl) => pl.concept === concept && pl.image === image);

  return (
    <div className="mod-page">
      <p>
        <Link to="/moderator">← All participants</Link>
      </p>
      <h1>{p.id}</h1>
      <p className="muted">
        {p.date} · {p.captures.length} / 2 drawings recorded
      </p>
      {error && <p className="error">{error}</p>}

      <section className="mod-card">
        <h2>Concept placement</h2>
        <p className="muted">
          Drag a concept onto either drawing to mark where it appears. Drag a placed marker to
          move it; click its × to remove it. Reference concepts and any you add are both
          draggable.
        </p>

        <div className="concept-palette">
          {concepts.map((concept) => {
            const isCustom = overlay.customConcepts.includes(concept);
            return (
              <span
                key={concept}
                className={`concept-chip${isCustom ? ' custom' : ''}`}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData('text/plain', JSON.stringify({ kind: 'new', concept }))
                }
                title={concept}
              >
                {concept}
                {isCustom && (
                  <button
                    className="chip-x"
                    onClick={() => removeCustomConcept(concept)}
                    title="Remove this concept"
                  >
                    ×
                  </button>
                )}
              </span>
            );
          })}
        </div>

        <div className="add-concept">
          <input
            placeholder="Add a concept not listed above…"
            value={newConcept}
            onChange={(e) => setNewConcept(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addCustomConcept();
              }
            }}
          />
          <button onClick={addCustomConcept}>Add concept</button>
        </div>

        <div className="thumbs">
          <DropImage
            label="First (PRE — baseline)"
            png={cap1?.png}
            when={cap1?.saved_at}
            image={1}
            placements={overlay.placements.filter((pl) => pl.image === 1)}
            onDrop={dropOnImage}
            onRemove={removePlacement}
          />
          <DropImage
            label="Second (POST — update)"
            png={cap2?.png}
            when={cap2?.saved_at}
            image={2}
            placements={overlay.placements.filter((pl) => pl.image === 2)}
            onDrop={dropOnImage}
            onRemove={removePlacement}
          />
        </div>
        <p className="muted small">
          Labels are for your reference only and were never shown to the participant.
        </p>
      </section>

      <section className="mod-card">
        <h2>Coding overlay</h2>
        <p className="muted">Map the drawing(s) onto the reference model. Do not show this to participants.</p>

        <table className="overlay-table">
          <thead>
            <tr>
              <th>Reference element</th>
              <th>Represented?</th>
              <th>On PRE</th>
              <th>On POST</th>
              <th>Their label</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {overlay.referenceRows.map((r, i) => (
              <tr key={r.element}>
                <td>{r.element}</td>
                <td className="center">
                  <input
                    type="checkbox"
                    checked={r.present}
                    onChange={(e) => setRow(i, { present: e.target.checked })}
                  />
                </td>
                <td className="center">{placedOn(r.element, 1) ? '✓' : ''}</td>
                <td className="center">{placedOn(r.element, 2) ? '✓' : ''}</td>
                <td>
                  <input value={r.label} onChange={(e) => setRow(i, { label: e.target.value })} />
                </td>
                <td>
                  <input value={r.notes} onChange={(e) => setRow(i, { notes: e.target.value })} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {overlay.customConcepts.length > 0 && (
          <table className="overlay-table">
            <thead>
              <tr>
                <th>Added concept</th>
                <th>On PRE</th>
                <th>On POST</th>
              </tr>
            </thead>
            <tbody>
              {overlay.customConcepts.map((c) => (
                <tr key={c}>
                  <td>{c}</td>
                  <td className="center">{placedOn(c, 1) ? '✓' : ''}</td>
                  <td className="center">{placedOn(c, 2) ? '✓' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h3>Edge / relationship analysis</h3>
        <div className="form-row">
          <YesNo
            label="Edges between streams (chat-to-chat comms)?"
            value={overlay.edgesBetweenStreams}
            onChange={(v) => setOverlay((o) => ({ ...o, edgesBetweenStreams: v }))}
          />
          <YesNo
            label="Tree / hierarchy (lead→worker)?"
            value={overlay.hierarchy}
            onChange={(v) => setOverlay((o) => ({ ...o, hierarchy: v }))}
          />
        </div>
        <label className="block">
          Where did they place memory / context?
          <select
            value={overlay.memoryPlacement}
            onChange={(e) =>
              setOverlay((o) => ({ ...o, memoryPlacement: e.target.value as OverlayData['memoryPlacement'] }))
            }
          >
            <option value="">—</option>
            <option value="per-stream">Per-stream</option>
            <option value="scope">At the scope</option>
            <option value="both">Both</option>
          </select>
        </label>
        <label className="block">
          Memory placement notes
          <input
            value={overlay.memoryPlacementNotes}
            onChange={(e) => setOverlay((o) => ({ ...o, memoryPlacementNotes: e.target.value }))}
          />
        </label>
        <label className="block">
          One-line characterisation of their model
          <input
            value={overlay.characterisation}
            onChange={(e) => setOverlay((o) => ({ ...o, characterisation: e.target.value }))}
          />
        </label>

        <h3>PRE → POST delta</h3>
        <label className="block">
          What changed between the two drawings?
          <textarea
            value={overlay.deltaChanged}
            onChange={(e) => setOverlay((o) => ({ ...o, deltaChanged: e.target.value }))}
          />
        </label>
        <label className="block">
          Direction of movement
          <select
            value={overlay.deltaDirection}
            onChange={(e) =>
              setOverlay((o) => ({ ...o, deltaDirection: e.target.value as OverlayData['deltaDirection'] }))
            }
          >
            <option value="">—</option>
            <option value="toward">Toward the reference model</option>
            <option value="away">Away</option>
            <option value="no-change">No change</option>
          </select>
        </label>
        <label className="block">
          What triggered the shift (which breakdown/moment)?
          <input
            value={overlay.deltaTrigger}
            onChange={(e) => setOverlay((o) => ({ ...o, deltaTrigger: e.target.value }))}
          />
        </label>

        <div className="actions">
          <button className="primary" onClick={saveOverlay}>
            Save overlay
          </button>
          <button onClick={doExport}>Export bundle</button>
          {status && <span className="muted">{status}</span>}
        </div>
      </section>
    </div>
  );
}

function DropImage({
  label,
  png,
  when,
  image,
  placements,
  onDrop,
  onRemove,
}: {
  label: string;
  png?: string;
  when?: string;
  image: 1 | 2;
  placements: Placement[];
  onDrop: (image: 1 | 2, e: React.DragEvent<HTMLDivElement>) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <figure className="thumb">
      <figcaption>{label}</figcaption>
      <div
        className="drop-image"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(image, e)}
      >
        {png ? (
          <img src={png} alt={label} draggable={false} />
        ) : (
          <div className="thumb-empty">Not recorded yet</div>
        )}
        {placements.map((pl) => (
          <span
            key={pl.id}
            className="placement-marker"
            style={{ left: `${pl.x * 100}%`, top: `${pl.y * 100}%` }}
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData('text/plain', JSON.stringify({ kind: 'move', id: pl.id }))
            }
            title={pl.concept}
          >
            <span className="marker-dot" />
            <span className="marker-label">{pl.concept}</span>
            <button className="marker-x" onClick={() => onRemove(pl.id)} title="Remove marker">
              ×
            </button>
          </span>
        ))}
      </div>
      {when && <small className="muted">{new Date(when).toLocaleString()}</small>}
    </figure>
  );
}

function YesNo({
  label,
  value,
  onChange,
}: {
  label: string;
  value: 'yes' | 'no' | '';
  onChange: (v: 'yes' | 'no' | '') => void;
}) {
  return (
    <label className="yesno">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value as 'yes' | 'no' | '')}>
        <option value="">—</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </label>
  );
}
