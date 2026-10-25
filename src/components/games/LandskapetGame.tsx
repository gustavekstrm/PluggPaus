import { useId, useMemo, useState, type KeyboardEvent } from 'react';
import {
  useLandskapet,
  MAX_GUESSES,
  HINT_AFTER,
  directionArrow,
  directionName,
  fold,
  normalize,
} from '../../hooks/useLandskapet';
import { useCountdown } from '../../hooks/useCountdown';
import { puzzleNumber } from '../../utils/dailyDate';
import { shareResult } from '../../utils/share';

const square = (p: number) => (p >= 100 ? '🟩' : p >= 80 ? '🟨' : p >= 50 ? '🟧' : '🟥');

function padBox([x, y, w, h]: [number, number, number, number], pad = 0.08): string {
  const s = Math.max(w, h) * pad;
  return `${x - s} ${y - s} ${w + 2 * s} ${h + 2 * s}`;
}

function LandskapetGame() {
  const { loading, list, mapBox, target, results, status, stats, practice, today, guess, startPractice, backToDaily } =
    useLandskapet();
  const timeLeft = useCountdown();
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [error, setError] = useState('');
  const [shareMsg, setShareMsg] = useState('');
  const listId = useId();
  const inputId = useId();

  const guessed = useMemo(() => new Set(results.map((r) => r.name)), [results]);
  const suggestions = useMemo(() => {
    // Skriver man Å/Ä/Ö ska de matcha exakt ("ö" ska inte ge Bohuslän). Utan dem
    // jämförs utan prickar, så "skane" hittar Skåne.
    const exact = /[åäö]/i.test(text);
    const prep = exact ? normalize : fold;
    const q = prep(text);
    if (!q) return [];
    return list
      .filter((l) => !guessed.has(l.name) && prep(l.name).includes(q))
      .sort((a, b) => Number(!prep(b.name).startsWith(q)) - Number(!prep(a.name).startsWith(q)) || a.name.localeCompare(b.name, 'sv'))
      .slice(0, 6);
  }, [text, list, guessed]);

  if (loading || !target || !mapBox) {
    return <p className="text-center" style={{ color: 'var(--ink-muted)' }}>Laddar kartan…</p>;
  }

  const submit = (value: string) => {
    const err = guess(value);
    setError(err ?? '');
    if (!err) {
      setText('');
      setOpen(false);
      setActive(0);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open && suggestions[active]) submit(suggestions[active].name);
      else if (suggestions.length === 1) submit(suggestions[0].name);
      else submit(text);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const done = status !== 'playing';
  const wrong = results.filter((r) => !r.correct).length;
  const showHint = !done && wrong >= HINT_AFTER;

  const share = async () => {
    const score = status === 'won' ? `${results.length}/${MAX_GUESSES}` : `X/${MAX_GUESSES}`;
    const text = `Landskapet #${puzzleNumber(today)} ${score}\n${results.map((r) => square(r.proximity)).join('')}\nhttps://pluggpaus.se/landskapet`;
    const r = await shareResult(text);
    setShareMsg(r === 'copied' ? 'Kopierat till urklipp!' : r === 'failed' ? 'Kunde inte dela.' : '');
    if (r !== 'shared') setTimeout(() => setShareMsg(''), 2500);
  };

  const winPct = stats.played ? Math.round((stats.wins / stats.played) * 100) : 0;
  const maxDist = Math.max(1, ...stats.dist);

  return (
    <div className="ls-wrap">
      {practice && (
        <div className="ls-practice" role="note">
          Övningsläge – påverkar inte din statistik.{' '}
          <button type="button" className="ls-link" onClick={backToDaily}>Tillbaka till dagens</button>
        </div>
      )}

      {/* Konturen – eller hela kartan när rundan är slut */}
      <div className="ls-figure">
        {done ? (
          <svg viewBox={padBox(mapBox, 0.02)} className="ls-map" role="img" aria-label={`Sverigekarta där ${target.name} är markerat`}>
            {list.map((l) => (
              <path
                key={l.name}
                d={l.d}
                className={l.name === target.name ? 'ls-target' : guessed.has(l.name) ? 'ls-guessed' : 'ls-other'}
              />
            ))}
          </svg>
        ) : (
          <svg viewBox={padBox(target.box)} className="ls-shape" role="img" aria-label="Kontur av landskapet du ska gissa">
            <path d={target.d} />
          </svg>
        )}
      </div>

      {done && (
        <div className={`ls-result ${status === 'won' ? 'ls-won' : ''}`} role="status">
          {status === 'won'
            ? `Rätt! Det var ${target.name} – ${results.length} av ${MAX_GUESSES} gissningar.`
            : `Det var ${target.name}. Bättre lycka ${practice ? 'nästa runda' : 'i morgon'}!`}
          <div className="ls-region">{target.name} ligger i {target.region}.</div>
        </div>
      )}

      {showHint && (
        <p className="ls-hint" role="status">
          Ledtråd: landskapet ligger i <strong>{target.region}</strong>.
        </p>
      )}

      {/* Inmatning */}
      {!done && (
        <div className="ls-combo">
          <label htmlFor={inputId} className="sr-only-pp">Gissa landskap</label>
          <input
            id={inputId}
            type="text"
            className="ls-input"
            role="combobox"
            aria-expanded={open && suggestions.length > 0}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={open && suggestions[active] ? `${listId}-${active}` : undefined}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-err` : undefined}
            placeholder="Skriv ett landskap…"
            autoComplete="off"
            autoCapitalize="words"
            spellCheck={false}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setOpen(true);
              setActive(0);
              setError('');
            }}
            onKeyDown={onKeyDown}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
          />
          <button type="button" className="pp-cta ls-go" onClick={() => submit(suggestions[active]?.name ?? text)}>
            Gissa
          </button>
          {open && suggestions.length > 0 && (
            <ul id={listId} role="listbox" className="ls-list" aria-label="Förslag">
              {suggestions.map((s, i) => (
                <li
                  key={s.name}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className={i === active ? 'ls-opt ls-opt-on' : 'ls-opt'}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    submit(s.name);
                  }}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}
          {error && <p id={`${inputId}-err`} className="ls-error" role="alert">{error}</p>}
        </div>
      )}

      {/* Gissningar */}
      <ol className="ls-guesses" aria-label="Dina gissningar">
        {Array.from({ length: MAX_GUESSES }).map((_, i) => {
          const r = results[i];
          if (!r) return <li key={i} className="ls-row ls-empty" aria-hidden="true" />;
          return (
            <li key={i} className={`ls-row ${r.correct ? 'ls-row-ok' : ''}`}>
              <span className="ls-name">{r.name}</span>
              <span className="ls-km pp-mono">{r.correct ? '–' : `${r.km} km`}</span>
              <span className="ls-dir" aria-label={r.correct ? 'rätt' : `rätt landskap ligger åt ${directionName(r.bearing)}`}>
                {r.correct ? '🎯' : directionArrow(r.bearing)}
              </span>
              <span className="ls-pct pp-mono">{r.proximity} %</span>
            </li>
          );
        })}
      </ol>

      {done && (
        <div className="ls-after">
          {!practice && (
            <>
              <button type="button" className="pp-surfacebtn" onClick={share}>Dela resultat</button>
              <span role="status" className="ls-muted">{shareMsg}</span>
            </>
          )}
          <button type="button" className="pp-surfacebtn" onClick={startPractice}>
            {practice ? 'Ett till' : 'Öva på ett slumpat landskap'}
          </button>
        </div>
      )}

      {!practice && (
        <div className="ls-stats">
          <dl className="bk-stats">
            <div><dt>Spelade</dt><dd>{stats.played}</dd></div>
            <div><dt>Vinst %</dt><dd>{winPct}</dd></div>
            <div><dt>Svit</dt><dd>{stats.streak}</dd></div>
            <div><dt>Bästa svit</dt><dd>{stats.maxStreak}</dd></div>
          </dl>
          {stats.wins > 0 && (
            <div className="ls-dist" aria-label="Antal gissningar vid vinst">
              {stats.dist.map((n, i) => (
                <div key={i} className="ls-dist-row">
                  <span className="pp-mono">{i + 1}</span>
                  <span className="ls-dist-bar" style={{ width: `${Math.max(8, (n / maxDist) * 100)}%` }}>{n}</span>
                </div>
              ))}
            </div>
          )}
          {done && <p className="ls-muted ls-next">Nytt landskap om <span className="pp-mono">{timeLeft}</span></p>}
        </div>
      )}
    </div>
  );
}

export default LandskapetGame;
