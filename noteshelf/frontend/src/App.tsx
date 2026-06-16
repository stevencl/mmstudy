import { useEffect, useState } from 'react';
import type { CreateNoteInput, Note } from '@noteshelf/shared';
import { createNote, deleteNote, listNotes } from './api';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';

export function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      setNotes(await listNotes());
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleCreate(input: CreateNoteInput) {
    await createNote(input);
    await refresh();
  }

  async function handleDelete(id: string) {
    await deleteNote(id);
    await refresh();
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Noteshelf</h1>
      </header>

      <main className="app__main">
        <aside className="app__sidebar">
          <NoteForm onCreate={handleCreate} />
        </aside>

        <section className="app__content">
          {error && <p className="error">{error}</p>}
          <p className="count">{notes.length} note(s)</p>
          <NoteList notes={notes} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}
