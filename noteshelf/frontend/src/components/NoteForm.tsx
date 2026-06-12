import { useState } from 'react';
import type { CreateNoteInput } from '@noteshelf/shared';
import { parseTagInput } from '../tags';

interface Props {
  onCreate: (input: CreateNoteInput) => void;
}

export function NoteForm({ onCreate }: Props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title: title.trim(), body, tags: parseTagInput(tags) });
    setTitle('');
    setBody('');
    setTags('');
  }

  return (
    <form className="note-form" onSubmit={submit}>
      <h2>New note</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write something…"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <input
        placeholder="Tags (comma separated, e.g. Work, Personal)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">Add note</button>
    </form>
  );
}
