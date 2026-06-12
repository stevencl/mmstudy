import type { Note } from '@noteshelf/shared';

interface Props {
  notes: Note[];
  onDelete: (id: string) => void;
}

export function NoteList({ notes, onDelete }: Props) {
  if (notes.length === 0) {
    return <p className="empty">No notes match.</p>;
  }
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note.id} className="note-card">
          <div className="note-card__head">
            <h3>{note.title}</h3>
            <button onClick={() => onDelete(note.id)} aria-label="Delete note">
              ✕
            </button>
          </div>
          {note.body && <p>{note.body}</p>}
          <div className="tag-row">
            {note.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
