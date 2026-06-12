/**
 * Noteshelf — shared types and contracts.
 *
 * This is the single source of truth that both the frontend and backend import.
 *
 * NOTE: this layer describes the *shape* of data, but deliberately does not
 * pin down some behavioural contracts (see TODOs). Those decisions currently
 * live independently inside the frontend and the backend.
 */

/** A tag is just a label attached to a note. */
export type Tag = string;

/** A note in the user's shelf. */
export interface Note {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
  createdAt: string; // ISO-8601
  updatedAt: string; // ISO-8601
}

/** Payload for creating a note. */
export interface CreateNoteInput {
  title: string;
  body: string;
  tags?: Tag[];
}

/** Payload for updating a note. All fields optional. */
export interface UpdateNoteInput {
  title?: string;
  body?: string;
  tags?: Tag[];
}

/** Query parameters understood by the list endpoint. */
export interface ListNotesQuery {
  /** Free-text search term. */
  search?: string;
  /** Tags to filter by. */
  tags?: Tag[];
}

// ---------------------------------------------------------------------------
// Open contracts
// ---------------------------------------------------------------------------
// TODO(contract): how should tag text be normalised (case, whitespace)? Not
//   defined here — frontend and backend each decide for themselves today.
// TODO(contract): when multiple tags are supplied to a filter, is the match
//   ANY (a note with at least one) or ALL (a note with every one)? Undefined.
// TODO(contract): what fields does free-text search look at (title? body?
//   tags?) and is it case-sensitive? Undefined here.

export const API_ROUTES = {
  notes: '/api/notes',
} as const;
