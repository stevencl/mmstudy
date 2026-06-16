import { randomUUID } from 'node:crypto';
import type {
  CreateNoteInput,
  Note,
  UpdateNoteInput,
} from '@noteshelf/shared';

/** A tiny in-memory store. Data resets when the server restarts. */
class NoteStore {
  private notes = new Map<string, Note>();

  list(): Note[] {
    return [...this.notes.values()].sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt),
    );
  }

  get(id: string): Note | undefined {
    return this.notes.get(id);
  }

  create(input: CreateNoteInput): Note {
    const now = new Date().toISOString();
    const note: Note = {
      id: randomUUID(),
      title: input.title,
      body: input.body,
      createdAt: now,
      updatedAt: now,
    };
    this.notes.set(note.id, note);
    return note;
  }

  update(id: string, input: UpdateNoteInput): Note | undefined {
    const existing = this.notes.get(id);
    if (!existing) return undefined;
    const updated: Note = {
      ...existing,
      title: input.title ?? existing.title,
      body: input.body ?? existing.body,
      updatedAt: new Date().toISOString(),
    };
    this.notes.set(id, updated);
    return updated;
  }

  remove(id: string): boolean {
    return this.notes.delete(id);
  }

  seed(): void {
    this.create({
      title: 'Welcome to Noteshelf',
      body: 'This is a sample note. Create, edit, and delete notes.',
    });
    this.create({
      title: 'Shopping list',
      body: 'Milk, eggs, coffee.',
    });
    this.create({
      title: 'Sprint planning notes',
      body: 'Discuss the roadmap and assign tasks for the next sprint.',
    });
  }
}

export const store = new NoteStore();
store.seed();
