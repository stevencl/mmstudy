import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, type ActiveState, type ParticipantSummary } from '../api';

export function ModeratorHome() {
  const [participants, setParticipants] = useState<ParticipantSummary[]>([]);
  const [active, setActive] = useState<ActiveState | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [newId, setNewId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    const [list, act] = await Promise.all([api.listParticipants(), api.getActive()]);
    setParticipants(list);
    setActive(act);
    // Derive which id is active by matching capture progress is unreliable; track via state set on actions.
  }

  useEffect(() => {
    refresh().catch((e) => setError(String(e.message ?? e)));
  }, []);

  async function create() {
    setError(null);
    try {
      await api.createParticipant(newId.trim(), date, notes);
      setNewId('');
      setNotes('');
      await refresh();
    } catch (e) {
      setError(String((e as Error).message ?? e));
    }
  }

  async function makeActive(id: string | null) {
    await api.setActive(id);
    setActiveId(id);
    await refresh();
  }

  return (
    <div className="mod-page">
      <header className="mod-header">
        <h1>ModelCapture — Moderator</h1>
        <p className="muted">
          Set a participant active, then hand the machine over. The participant only ever sees a
          plain drawing canvas — no IDs, no “before/after”, no reference model.
        </p>
      </header>

      <section className="mod-card active-banner">
        <strong>Active participant:</strong>{' '}
        {active?.active ? (
          <>
            <span className="pill">{activeId ?? 'set'}</span>{' '}
            {active.done ? (
              <span className="muted">both drawings recorded</span>
            ) : (
              <span className="muted">next capture: #{active.nextSeq} of 2</span>
            )}{' '}
            <button className="link-btn" onClick={() => makeActive(null)}>
              clear
            </button>
          </>
        ) : (
          <span className="muted">none — set one below before the participant draws</span>
        )}
      </section>

      <section className="mod-card">
        <h2>New participant</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-row">
          <label>
            Participant ID
            <input
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              placeholder="e.g. P2026-06-15-1400"
            />
          </label>
          <label>
            Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>
        <label className="block">
          Notes (optional)
          <input value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <button className="primary" onClick={create} disabled={!newId.trim()}>
          Create
        </button>
      </section>

      <section className="mod-card">
        <h2>Participants</h2>
        {participants.length === 0 && <p className="muted">None yet.</p>}
        <table className="ptable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Drawings</th>
              <th>Overlay</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p.id}>
                <td>
                  <Link to={`/moderator/p/${encodeURIComponent(p.id)}`}>{p.id}</Link>
                </td>
                <td>{p.date}</td>
                <td>{p.captures.length} / 2</td>
                <td>{p.hasOverlay ? '✓' : '—'}</td>
                <td>
                  <button className="link-btn" onClick={() => makeActive(p.id)}>
                    set active
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
