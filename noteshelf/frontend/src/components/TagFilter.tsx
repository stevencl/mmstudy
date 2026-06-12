import type { Tag } from '@noteshelf/shared';

interface Props {
  available: Tag[];
  selected: Tag[];
  onToggle: (tag: Tag) => void;
  onClear: () => void;
}

export function TagFilter({ available, selected, onToggle, onClear }: Props) {
  if (available.length === 0) return null;
  return (
    <div className="tag-filter">
      <div className="tag-filter__head">
        <span>Filter by tag</span>
        {selected.length > 0 && (
          <button className="link" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      <div className="tag-row">
        {available.map((tag) => {
          const isOn = selected.includes(tag);
          return (
            <button
              key={tag}
              className={isOn ? 'tag-chip tag-chip--on' : 'tag-chip'}
              onClick={() => onToggle(tag)}
            >
              {tag}
            </button>
          );
        })}
      </div>
      {selected.length > 0 && (
        <p className="tag-filter__hint">
          Showing notes with all selected tags.
        </p>
      )}
    </div>
  );
}
