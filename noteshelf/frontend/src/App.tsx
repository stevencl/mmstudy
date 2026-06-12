import { useEffect, useMemo, useState } from 'react';
import type { CreateNoteInput, Note, Tag } from '@noteshelf/shared';
import { createNote, deleteNote, listNotes } from './api';
import { collectTags } from './tags';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';
import { SearchBar } from './components/SearchBar';
import { TagFilter } from './components/TagFilter';

export function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      const result = await listNotes({ search, tags: selectedTags });
      setNotes(result);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  // Keep the tag palette in sync with everything currently on the shelf.
  async function refreshTagPalette() {
    try {
      const all = await listNotes();
      setAllTags(collectTags(all.flatMap((n) => n.tags)));
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedTags]);

  useEffect(() => {
    refreshTagPalette();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes.length]);

  async function handleCreate(input: CreateNoteInput) {
    await createNote(input);
    await refresh();
    await refreshTagPalette();
  }

  async function handleDelete(id: string) {
    await deleteNote(id);
    await refresh();
    await refreshTagPalette();
  }

  function toggleTag(tag: Tag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  const noteCount = useMemo(() => notes.length, [notes]);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Noteshelf</h1>
        <SearchBar value={search} onChange={setSearch} />
      </header>

      <main className="app__main">
        <aside className="app__sidebar">
          <NoteForm onCreate={handleCreate} />
          <TagFilter
            available={allTags}
            selected={selectedTags}
            onToggle={toggleTag}
            onClear={() => setSelectedTags([])}
          />
        </aside>

        <section className="app__content">
          {error && <p className="error">{error}</p>}
          <p className="count">{noteCount} note(s)</p>
          <NoteList notes={notes} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}
