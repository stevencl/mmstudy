export interface CaptureMeta {
  seq: number;
  saved_at: string;
}

export interface ParticipantSummary {
  id: string;
  date: string;
  notes: string;
  created_at: string;
  captures: CaptureMeta[];
  hasOverlay: boolean;
}

export interface CaptureFull {
  seq: number;
  saved_at: string;
  scene_json: { elements: unknown[]; appState?: Record<string, unknown>; files?: unknown };
  png: string;
}

export interface ParticipantDetail {
  id: string;
  date: string;
  notes: string;
  created_at: string;
  captures: CaptureFull[];
  overlay: OverlayData | null;
}

export interface ActiveState {
  active: boolean;
  nextSeq?: number;
  previousScene?: { elements: unknown[]; appState?: Record<string, unknown>; files?: unknown } | null;
  done?: boolean;
}

export interface ReferenceRow {
  element: string;
  present: boolean;
  label: string;
  notes: string;
}

export interface Placement {
  id: string;
  concept: string;
  image: 1 | 2;
  x: number;
  y: number;
}

export interface OverlayData {
  referenceRows: ReferenceRow[];
  customConcepts: string[];
  placements: Placement[];
  edgesBetweenStreams: 'yes' | 'no' | '';
  hierarchy: 'yes' | 'no' | '';
  memoryPlacement: 'per-stream' | 'scope' | 'both' | '';
  memoryPlacementNotes: string;
  characterisation: string;
  deltaChanged: string;
  deltaDirection: 'toward' | 'away' | 'no-change' | '';
  deltaTrigger: string;
}

async function j<T>(r: Response): Promise<T> {
  if (!r.ok) {
    const body = await r.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `Request failed (${r.status})`);
  }
  return r.json() as Promise<T>;
}

export const api = {
  listParticipants: () => fetch('/api/participants').then(j<ParticipantSummary[]>),
  createParticipant: (id: string, date: string, notes: string) =>
    fetch('/api/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, date, notes }),
    }).then(j<{ id: string }>),
  getParticipant: (id: string) =>
    fetch(`/api/participants/${encodeURIComponent(id)}`).then(j<ParticipantDetail>),
  getActive: () => fetch('/api/active').then(j<ActiveState>),
  setActive: (id: string | null) =>
    fetch('/api/active', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).then(j<{ active: boolean }>),
  saveCapture: (scene: unknown, png: string) =>
    fetch('/api/captures', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scene, png }),
    }).then(j<{ seq: number }>),
  saveOverlay: (id: string, data: OverlayData) =>
    fetch(`/api/participants/${encodeURIComponent(id)}/overlay`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(j<{ ok: boolean }>),
  exportParticipant: (id: string) =>
    fetch(`/api/participants/${encodeURIComponent(id)}/export`, { method: 'POST' }).then(
      j<{ ok: boolean; dir: string }>
    ),
};

export const REFERENCE_ELEMENTS: string[] = [
  'A shared scope holding everything common',
  'Multiple independent streams under it',
  'Shared knowledge/context at the scope level',
  'Streams as peers (no parent/child)',
  'Streams created/removed over time',
  'A rolled-up status across streams',
];

export function emptyOverlay(): OverlayData {
  return {
    referenceRows: REFERENCE_ELEMENTS.map((element) => ({
      element,
      present: false,
      label: '',
      notes: '',
    })),
    customConcepts: [],
    placements: [],
    edgesBetweenStreams: '',
    hierarchy: '',
    memoryPlacement: '',
    memoryPlacementNotes: '',
    characterisation: '',
    deltaChanged: '',
    deltaDirection: '',
    deltaTrigger: '',
  };
}

export function normalizeOverlay(data: OverlayData | null): OverlayData {
  const base = emptyOverlay();
  if (!data) return base;
  return {
    ...base,
    ...data,
    referenceRows: data.referenceRows?.length ? data.referenceRows : base.referenceRows,
    customConcepts: data.customConcepts ?? [],
    placements: data.placements ?? [],
  };
}
