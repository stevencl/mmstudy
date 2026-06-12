import type { Tag } from '@noteshelf/shared';

/**
 * Tag handling for the web client.
 *
 * The client keeps tags exactly as the user typed them, so labels read back
 * the way people wrote them (e.g. "Work", "Getting-Started"). We only trim
 * surrounding whitespace and drop empties.
 */
export function cleanTag(tag: Tag): Tag {
  return tag.trim();
}

export function parseTagInput(raw: string): Tag[] {
  const seen = new Set<Tag>();
  for (const part of raw.split(',')) {
    const t = cleanTag(part);
    if (t) seen.add(t);
  }
  return [...seen];
}

/** Collect the distinct tags present across a set of notes (for the filter). */
export function collectTags(allTags: Tag[]): Tag[] {
  const seen = new Set<Tag>();
  for (const t of allTags) {
    const c = cleanTag(t);
    if (c) seen.add(c);
  }
  return [...seen].sort((a, b) => a.localeCompare(b));
}
