import type {
  CreateNoteInput,
  ListNotesQuery,
  Note,
  UpdateNoteInput,
} from '@noteshelf/shared';

const BASE = '/api/notes';

export async function listNotes(query: ListNotesQuery = {}): Promise<Note[]> {
  const params = new URLSearchParams();
  if (query.search) params.set('search', query.search);
  if (query.tags && query.tags.length > 0) params.set('tags', query.tags.join(','));
  const qs = params.toString();
  const res = await fetch(qs ? `${BASE}?${qs}` : BASE);
  if (!res.ok) throw new Error('Failed to load notes');
  return res.json();
}

export async function createNote(input: CreateNoteInput): Promise<Note> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Failed to create note');
  return res.json();
}

export async function updateNote(
  id: string,
  input: UpdateNoteInput,
): Promise<Note> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Failed to update note');
  return res.json();
}

export async function deleteNote(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete note');
}
