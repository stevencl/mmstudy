import cors from 'cors';
import express from 'express';
import type { CreateNoteInput, UpdateNoteInput } from '@noteshelf/shared';
import { store } from './store.js';
import { filterByTags, searchNotes } from './notes.js';

const app = express();
app.use(cors());
app.use(express.json());

function parseTagsParam(value: unknown): string[] {
  if (typeof value !== 'string' || value.length === 0) return [];
  return value.split(',').map((t) => t.trim()).filter(Boolean);
}

// GET /api/notes?search=&tags=a,b
app.get('/api/notes', (req, res) => {
  let notes = store.list();
  const search = typeof req.query.search === 'string' ? req.query.search : '';
  const tags = parseTagsParam(req.query.tags);

  if (search) notes = searchNotes(notes, search);
  if (tags.length > 0) notes = filterByTags(notes, tags);

  res.json(notes);
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
    tags: Array.isArray(input.tags) ? input.tags : [],
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
