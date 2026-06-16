import express from 'express';
import cors from 'cors';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { db, getState, setState } from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const exportsDir = join(__dirname, '..', '..', 'exports');

const app = express();
app.use(cors());
app.use(express.json({ limit: '25mb' }));

const now = () => new Date().toISOString();

interface ParticipantRow {
  id: string;
  date: string;
  notes: string;
  created_at: string;
}
interface CaptureRow {
  id: number;
  participant_id: string;
  seq: number;
  scene_json: string;
  png: string;
  saved_at: string;
}

// ---- Participants (moderator) ----------------------------------------------

app.get('/api/participants', (_req, res) => {
  const rows = db
    .prepare('SELECT * FROM participant ORDER BY created_at DESC')
    .all() as ParticipantRow[];
  const result = rows.map((p) => {
    const caps = db
      .prepare('SELECT seq, saved_at FROM capture WHERE participant_id = ? ORDER BY seq')
      .all(p.id) as { seq: number; saved_at: string }[];
    const hasOverlay = !!db
      .prepare('SELECT 1 FROM overlay WHERE participant_id = ?')
      .get(p.id);
    return { ...p, captures: caps, hasOverlay };
  });
  res.json(result);
});

app.post('/api/participants', (req, res) => {
  const id = String(req.body.id ?? '').trim();
  const date = String(req.body.date ?? '').trim() || now().slice(0, 10);
  const notes = String(req.body.notes ?? '');
  if (!id) return res.status(400).json({ error: 'Participant id is required.' });
  const exists = db.prepare('SELECT 1 FROM participant WHERE id = ?').get(id);
  if (exists) return res.status(409).json({ error: 'Participant id already exists.' });
  db.prepare(
    'INSERT INTO participant (id, date, notes, created_at) VALUES (?, ?, ?, ?)'
  ).run(id, date, notes, now());
  res.status(201).json({ id, date, notes });
});

app.get('/api/participants/:id', (req, res) => {
  const p = db.prepare('SELECT * FROM participant WHERE id = ?').get(req.params.id) as
    | ParticipantRow
    | undefined;
  if (!p) return res.status(404).json({ error: 'Not found.' });
  const captures = db
    .prepare('SELECT * FROM capture WHERE participant_id = ? ORDER BY seq')
    .all(p.id) as CaptureRow[];
  const overlayRow = db
    .prepare('SELECT data FROM overlay WHERE participant_id = ?')
    .get(p.id) as { data: string } | undefined;
  res.json({
    ...p,
    captures: captures.map((c) => ({
      seq: c.seq,
      saved_at: c.saved_at,
      scene_json: JSON.parse(c.scene_json),
      png: c.png,
    })),
    overlay: overlayRow ? JSON.parse(overlayRow.data) : null,
  });
});

// ---- Active participant (shared between moderator + participant views) ------

app.get('/api/active', (_req, res) => {
  const id = getState('active_participant');
  if (!id) return res.json({ active: false });
  const p = db.prepare('SELECT * FROM participant WHERE id = ?').get(id) as
    | ParticipantRow
    | undefined;
  if (!p) return res.json({ active: false });
  const caps = db
    .prepare('SELECT seq FROM capture WHERE participant_id = ? ORDER BY seq')
    .all(id) as { seq: number }[];
  const nextSeq = caps.length === 0 ? 1 : caps[caps.length - 1].seq + 1;
  // For the 2nd capture, hand back the 1st scene so the participant updates it.
  let previousScene: unknown = null;
  if (nextSeq === 2) {
    const first = db
      .prepare('SELECT scene_json FROM capture WHERE participant_id = ? AND seq = 1')
      .get(id) as { scene_json: string } | undefined;
    if (first) previousScene = JSON.parse(first.scene_json);
  }
  // Note: participant id intentionally NOT exposed to the participant view UI.
  res.json({ active: true, nextSeq, previousScene, done: nextSeq > 2 });
});

app.post('/api/active', (req, res) => {
  const id = req.body.id ? String(req.body.id) : null;
  if (id) {
    const p = db.prepare('SELECT 1 FROM participant WHERE id = ?').get(id);
    if (!p) return res.status(404).json({ error: 'Participant not found.' });
    setState('active_participant', id);
  } else {
    setState('active_participant', '');
  }
  res.json({ active: !!id, id });
});

// ---- Captures (participant view saves against the active participant) -------

app.post('/api/captures', (req, res) => {
  const id = getState('active_participant');
  if (!id) return res.status(409).json({ error: 'No active participant set.' });
  const scene = req.body.scene ?? req.body.scene_json;
  const png = String(req.body.png ?? '');
  if (scene === undefined) return res.status(400).json({ error: 'scene is required.' });
  const caps = db
    .prepare('SELECT seq FROM capture WHERE participant_id = ? ORDER BY seq')
    .all(id) as { seq: number }[];
  const seq = caps.length === 0 ? 1 : caps[caps.length - 1].seq + 1;
  if (seq > 2) return res.status(409).json({ error: 'Both captures already recorded.' });
  db.prepare(
    'INSERT INTO capture (participant_id, seq, scene_json, png, saved_at) VALUES (?, ?, ?, ?, ?)'
  ).run(id, seq, JSON.stringify(scene), png, now());
  res.status(201).json({ seq });
});

// ---- Overlay (moderator coding, after the session) -------------------------

app.put('/api/participants/:id/overlay', (req, res) => {
  const p = db.prepare('SELECT 1 FROM participant WHERE id = ?').get(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found.' });
  db.prepare(
    `INSERT INTO overlay (participant_id, data, updated_at) VALUES (?, ?, ?)
     ON CONFLICT(participant_id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`
  ).run(req.params.id, JSON.stringify(req.body ?? {}), now());
  res.json({ ok: true });
});

// ---- Export ----------------------------------------------------------------

app.post('/api/participants/:id/export', (req, res) => {
  const p = db.prepare('SELECT * FROM participant WHERE id = ?').get(req.params.id) as
    | ParticipantRow
    | undefined;
  if (!p) return res.status(404).json({ error: 'Not found.' });
  const captures = db
    .prepare('SELECT * FROM capture WHERE participant_id = ? ORDER BY seq')
    .all(p.id) as CaptureRow[];
  const overlayRow = db
    .prepare('SELECT data FROM overlay WHERE participant_id = ?')
    .get(p.id) as { data: string } | undefined;
  const overlay = overlayRow ? JSON.parse(overlayRow.data) : null;

  const safeId = p.id.replace(/[^a-zA-Z0-9_-]/g, '_');
  const dir = join(exportsDir, safeId);
  mkdirSync(dir, { recursive: true });

  for (const c of captures) {
    writeFileSync(join(dir, `capture-${c.seq}.excalidraw.json`), c.scene_json);
    if (c.png) {
      const b64 = c.png.replace(/^data:image\/png;base64,/, '');
      writeFileSync(join(dir, `capture-${c.seq}.png`), Buffer.from(b64, 'base64'));
    }
  }
  if (overlay) writeFileSync(join(dir, 'overlay.json'), JSON.stringify(overlay, null, 2));
  writeFileSync(join(dir, 'summary.md'), buildSummary(p, captures, overlay));

  res.json({ ok: true, dir });
});

function buildSummary(
  p: ParticipantRow,
  captures: CaptureRow[],
  overlay: Record<string, unknown> | null
): string {
  const L: string[] = [];
  L.push(`# Conceptual model capture — ${p.id}`, '');
  L.push(`- **Date:** ${p.date}`);
  L.push(`- **Captures recorded:** ${captures.length} of 2`);
  for (const c of captures) {
    const label = c.seq === 1 ? 'PRE (baseline)' : 'POST (update)';
    L.push(`  - Capture ${c.seq} — ${label} — saved ${c.saved_at}`);
  }
  if (p.notes) L.push(`- **Participant notes:** ${p.notes}`);
  L.push('');
  if (!overlay) {
    L.push('_No moderator coding overlay recorded yet._');
    return L.join('\n');
  }
  L.push('## Moderator coding overlay', '');
  const customConcepts = (overlay.customConcepts as string[] | undefined) ?? [];
  const placements = (overlay.placements as PlacementRow[] | undefined) ?? [];
  const placedOn = (concept: string, image: 1 | 2) =>
    placements.some((pl) => pl.concept === concept && pl.image === image);
  const refRows = (overlay.referenceRows as ReferenceRow[] | undefined) ?? [];
  if (refRows.length) {
    L.push('| Reference element | Represented? | On PRE | On POST | Their label | Notes |');
    L.push('| --- | --- | --- | --- | --- | --- |');
    for (const r of refRows) {
      const pre = placedOn(r.element, 1) ? '✓' : '';
      const post = placedOn(r.element, 2) ? '✓' : '';
      L.push(`| ${r.element} | ${r.present ? 'yes' : 'no'} | ${pre} | ${post} | ${r.label ?? ''} | ${r.notes ?? ''} |`);
    }
    L.push('');
  }
  if (customConcepts.length) {
    L.push('| Added concept | On PRE | On POST |');
    L.push('| --- | --- | --- |');
    for (const c of customConcepts) {
      L.push(`| ${c} | ${placedOn(c, 1) ? '✓' : ''} | ${placedOn(c, 2) ? '✓' : ''} |`);
    }
    L.push('');
  }
  L.push('### Edge / relationship analysis');
  L.push(`- Edges between streams (chat-to-chat comms): **${yn(overlay.edgesBetweenStreams)}**`);
  L.push(`- Tree / hierarchy (lead→worker): **${yn(overlay.hierarchy)}**`);
  L.push(`- Memory / context placement: **${overlay.memoryPlacement ?? '—'}**`);
  if (overlay.memoryPlacementNotes) L.push(`  - ${overlay.memoryPlacementNotes}`);
  L.push('');
  if (placements.length) {
    L.push('### Concept placement (positions)');
    for (const seq of [1, 2] as const) {
      const onImg = placements.filter((pl) => pl.image === seq);
      if (!onImg.length) continue;
      const label = seq === 1 ? 'PRE (baseline)' : 'POST (update)';
      L.push(`- On ${label}:`);
      for (const pl of onImg) {
        L.push(`  - ${pl.concept} @ (${Math.round(pl.x * 100)}%, ${Math.round(pl.y * 100)}%)`);
      }
    }
    L.push('');
  }
  L.push('### One-line characterisation');
  L.push(`> ${overlay.characterisation ?? ''}`, '');
  L.push('### PRE → POST delta');
  L.push(`- What changed: ${overlay.deltaChanged ?? ''}`);
  L.push(`- Direction: **${overlay.deltaDirection ?? '—'}**`);
  L.push(`- Trigger: ${overlay.deltaTrigger ?? ''}`);
  return L.join('\n');
}

interface ReferenceRow {
  element: string;
  present: boolean;
  label?: string;
  notes?: string;
}
interface PlacementRow {
  id: string;
  concept: string;
  image: 1 | 2;
  x: number;
  y: number;
}
const yn = (v: unknown) => (v === true || v === 'yes' ? 'yes' : v === false || v === 'no' ? 'no' : '—');

const PORT = Number(process.env.PORT ?? 4100);
app.listen(PORT, () => {
  console.log(`ModelCapture backend listening on http://localhost:${PORT}`);
});
