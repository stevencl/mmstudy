import cors from 'cors';
import express from 'express';
import type { CreateNoteInput, UpdateNoteInput } from '@noteshelf/shared';
import { store } from './store.js';

const app = express();
app.use(cors());
app.use(express.json());

// GET /api/notes
app.get('/api/notes', (_req, res) => {
  res.json(store.list());
});

// GET /api/notes/:id
app.get('/api/notes/:id', (req, res) => {
  const note = store.get(req.params.id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

// POST /api/notes
app.post('/api/notes', (req, res) => {
  const input = req.body as CreateNoteInput;
  if (!input || typeof input.title !== 'string') {
    return res.status(400).json({ error: 'title is required' });
  }
  const note = store.create({
    title: input.title,
    body: typeof input.body === 'string' ? input.body : '',
  });
  res.status(201).json(note);
});

// PATCH /api/notes/:id
app.patch('/api/notes/:id', (req, res) => {
  const input = req.body as UpdateNoteInput;
  const note = store.update(req.params.id, input);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

// DELETE /api/notes/:id
app.delete('/api/notes/:id', (req, res) => {
  const ok = store.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Note not found' });
  res.status(204).end();
});

const PORT = Number(process.env.PORT ?? 4000);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Noteshelf backend listening on http://localhost:${PORT}`);
});

export { app };
