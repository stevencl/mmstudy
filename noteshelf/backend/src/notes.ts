import type { Note, Tag } from '@noteshelf/shared';

/**
 * Tag handling for the backend.
 *
 * The backend treats tags as canonical lowercase identifiers. Incoming tags
 * are normalised so that lookups and de-duplication are predictable on the
 * server side.
 */
export function normaliseTag(tag: Tag): Tag {
  return tag.trim().toLowerCase();
}

export function normaliseTags(tags: Tag[] | undefined): Tag[] {
  if (!tags) return [];
  const seen = new Set<Tag>();
  for (const t of tags) {
    const n = normaliseTag(t);
    if (n) seen.add(n);
  }
  return [...seen];
}

/**
 * Filter notes by tags.
 *
 * A note matches when it carries at least one of the requested tags.
 */
export function filterByTags(notes: Note[], tags: Tag[]): Note[] {
  if (tags.length === 0) return notes;
  const wanted = tags.map(normaliseTag);
  return notes.filter((note) =>
    note.tags.some((noteTag) => wanted.includes(noteTag)),
  );
}

/**
 * Free-text search across notes.
 *
 * Matches the search term against the note title.
 */
export function searchNotes(notes: Note[], term: string): Note[] {
  const needle = term.trim().toLowerCase();
  if (!needle) return notes;
  return notes.filter((note) => note.title.toLowerCase().includes(needle));
}
