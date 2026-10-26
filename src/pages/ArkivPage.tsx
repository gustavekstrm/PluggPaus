import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { archiveDates, formatSwedishDate, ARCHIVE_DAYS } from '../utils/archive';
import { readJSON } from '../utils/safeStorage';

const GAMES = [
  { id: 'wordle', path: '/wordle', name: 'Orda' },
  { id: 'connections', path: '/connections', name: 'Kopplingar' },
  { id: 'contexto', path: '/contexto', name: 'Kontext' },
  { id: 'bikupan', path: '/bikupan', name: 'Bikupan' },
  { id: 'landskapet', path: '/landskapet', name: 'Landskapet' },
];

/** Vilka arkivdagar som redan spelats, per spel – läses ur webbläsarens lagring. */
function readPlayed(): Record<string, Set<string>> {
  const out: Record<string, Set<string>> = {};
  for (const g of GAMES) out[g.id] = new Set(Object.keys(readJSON<Record<string, unknown>>(`${g.id}-arkiv`) ?? {}));
  return out;
}

function ArkivPage() {
  const [dates] = useState(() => archiveDates());
  const [played] = useState(readPlayed);

  useEffect(() => {
    document.title = 'Pusselarkiv – Spela Tidigare Dagars Pussel | PluggPaus';
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--ink)', letterSpacing: '-.02em' }}>
        Pusselarkiv
      </h1>
      <p className="text-lg mb-2" style={{ color: 'var(--ink-muted)' }}>
        Missade du en dag? Här finns de senaste {ARCHIVE_DAYS} dagarnas pussel i alla dagliga spel. Arkivomgångar
        sparas för sig och räknas inte i din statistik eller svit.
      </p>
      <p className="mb-8" style={{ color: 'var(--ink-muted)' }}>
        Dagens pussel spelar du på respektive spelsida. <span className="ar-done" aria-hidden="true">✓</span> betyder
        att du redan har påbörjat det pusslet.
      </p>

      <ul className="ar-list">
        {dates.map((d) => (
          <li key={d} className="ar-day">
            <span className="ar-date">{formatSwedishDate(d, true)}</span>
            <span className="ar-games">
              {GAMES.map((g) => {
                const done = played[g.id].has(d);
                return (
                  <Link
                    key={g.id}
                    to={`${g.path}?datum=${d}`}
                    className="ar-chip"
                    aria-label={`${g.name}, ${formatSwedishDate(d)}${done ? ', påbörjat' : ''}`}
                  >
                    {g.name}
                    {done && <span className="ar-done" aria-hidden="true">✓</span>}
                  </Link>
                );
              })}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default ArkivPage;
