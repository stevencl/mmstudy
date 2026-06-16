/**
 * Noteshelf — shared types and contracts.
 *
 * This is the single source of truth that both the frontend and backend import.
 * It is also the natural home for any *cross-cutting contract* that the two
 * layers must agree on — data shapes, validation rules, query semantics. As new
 * features are added to Noteshelf, the shared decisions behind them can live
 * here so that both sides stay in step.
 */

/** A note in the user's shelf. */
export interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string; // ISO-8601
  updatedAt: string; // ISO-8601
}

/** Payload for creating a note. */
export interface CreateNoteInput {
  title: string;
  body: string;
}

/** Payload for updating a note. All fields optional. */
export interface UpdateNoteInput {
  title?: string;
  body?: string;
}

export const API_ROUTES = {
  notes: '/api/notes',
} as const;
