import Database from 'better-sqlite3';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');
mkdirSync(dataDir, { recursive: true });

export const db = new Database(join(dataDir, 'captures.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS participant (
    id          TEXT PRIMARY KEY,
    date        TEXT NOT NULL,
    notes       TEXT NOT NULL DEFAULT '',
    created_at  TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS capture (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    participant_id  TEXT NOT NULL REFERENCES participant(id) ON DELETE CASCADE,
    seq             INTEGER NOT NULL,
    scene_json      TEXT NOT NULL,
    png             TEXT NOT NULL DEFAULT '',
    saved_at        TEXT NOT NULL,
    UNIQUE (participant_id, seq)
  );

  CREATE TABLE IF NOT EXISTS overlay (
    participant_id  TEXT PRIMARY KEY REFERENCES participant(id) ON DELETE CASCADE,
    data            TEXT NOT NULL,
    updated_at      TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS app_state (
    key    TEXT PRIMARY KEY,
    value  TEXT NOT NULL
  );
`);

export function getState(key: string): string | null {
  const row = db.prepare('SELECT value FROM app_state WHERE key = ?').get(key) as
    | { value: string }
    | undefined;
  return row ? row.value : null;
}

export function setState(key: string, value: string): void {
  db.prepare(
    `INSERT INTO app_state (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`
  ).run(key, value);
}
