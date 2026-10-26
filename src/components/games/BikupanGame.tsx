import { useEffect, useState } from 'react';
import { useBikupan, RANKS, STREAK_RANK } from '../../hooks/useBikupan';
import { puzzleNumber } from '../../utils/dailyDate';
import { shareResult } from '../../utils/share';

const LETTER_RE = /^[a-zåäö]$/i;

function isTextField(t: EventTarget | null) {
  return t instanceof HTMLElement && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
}

function BikupanGame({ date, isArchive = false }: { date: string; isArchive?: boolean }) {
  const {
    loading, puzzle, yesterday, outerOrder, found, input, score, rank, feedback, stats, today,
    submit, addLetter, removeLetter, reshuffle,
  } = useBikupan(date, isArchive);
  const [shareMsg, setShareMsg] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTextField(e.target)) return;
      const onButton = e.target instanceof HTMLElement && ['BUTTON', 'A', 'SUMMARY'].includes(e.target.tagName);
      if (LETTER_RE.test(e.key)) {
        e.preventDefault();
        addLetter(e.key.toLowerCase());
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        removeLetter();
      } else if (e.key === 'Enter' && !onButton) {
        e.preventDefault();
        submit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [addLetter, removeLetter, submit]);

  if (loading || !puzzle) {
    return <p className="text-center" style={{ color: 'var(--ink-muted)' }}>Laddar dagens bikupa…</p>;
  }

  const nextRank = RANKS[rank.index + 1];
  const pctToNext = nextRank ? Math.ceil((nextRank.pct / 100) * puzzle.maxScore) - score : 0;
  const progress = Math.min(100, (rank.index / (RANKS.length - 1)) * 100);
  const sortedFound = [...found].sort((a, b) => a.localeCompare(b, 'sv'));

  const share = async () => {
    const text = `Bikupan #${puzzleNumber(today)} 🐝\n${rank.name} · ${found.length} ord · ${score} p\nhttps://pluggpaus.se/bikupan`;
    const r = await shareResult(text);
    setShareMsg(r === 'copied' ? 'Kopierat till urklipp!' : r === 'failed' ? 'Kunde inte dela – kopiera manuellt.' : '');
    if (r !== 'shared') setTimeout(() => setShareMsg(''), 2500);
  };

  // Ordning runt mittbokstaven: överst, uppe höger, nere höger, nederst, nere vänster, uppe vänster.
  const positions = [
    { x: 50, y: 17.5 },
    { x: 78.1, y: 33.75 },
    { x: 78.1, y: 66.25 },
    { x: 50, y: 82.5 },
    { x: 21.9, y: 66.25 },
    { x: 21.9, y: 33.75 },
  ];

  return (
    <div className="bk-wrap">
      {/* Rang och poäng */}
      <div className="bk-rank">
        <div className="bk-rank-row">
          <strong>{rank.name}</strong>
          <span className="pp-mono">{score} p</span>
        </div>
        <div
          className="bk-bar"
          role="progressbar"
          aria-label="Rang"
          aria-valuemin={0}
          aria-valuemax={RANKS.length - 1}
          aria-valuenow={rank.index}
          aria-valuetext={rank.name}
        >
          <div className="bk-bar-fill" style={{ width: `${progress}%` }} />
          {RANKS.map((r, i) => (
            <span
              key={r.name}
              className={`bk-dot ${i <= rank.index ? 'bk-dot-on' : ''}`}
              style={{ left: `${(i / (RANKS.length - 1)) * 100}%` }}
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="bk-rank-next">
          {nextRank ? `${pctToNext} p kvar till ${nextRank.name}` : 'Du har hittat alla ord – hela kupan!'}
        </div>
      </div>

      {/* Det man skriver */}
      <div className="bk-input">
        <span className="sr-only-pp">Ditt ord: </span>
        {input ? (
          input.split('').map((c, i) => (
            <span
              key={i}
              className={
                c === puzzle.center ? 'bk-in-center' : puzzle.outer.includes(c) ? '' : 'bk-in-bad'
              }
            >
              {c.toUpperCase()}
            </span>
          ))
        ) : (
          <span className="bk-placeholder">Skriv eller tryck på bokstäverna</span>
        )}
        <span className="bk-caret" aria-hidden="true" />
      </div>

      <div className={`bk-feedback bk-fb-${feedback?.kind ?? 'none'}`} role="status">
        {feedback?.text ?? ''}
      </div>

      {/* Bikakan */}
      <div className="bk-hive" role="group" aria-label="Bokstäver">
        <button
          type="button"
          className="bk-hex bk-hex-center"
          style={{ left: '50%', top: '50%' }}
          onClick={() => addLetter(puzzle.center)}
          aria-label={`${puzzle.center.toUpperCase()}, mittbokstav`}
        >
          {puzzle.center.toUpperCase()}
        </button>
        {outerOrder.map((c, i) => (
          <button
            key={c}
            type="button"
            className="bk-hex"
            style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
            onClick={() => addLetter(c)}
            aria-label={c.toUpperCase()}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="bk-controls">
        <button type="button" className="pp-surfacebtn" onClick={removeLetter}>Radera</button>
        <button type="button" className="pp-surfacebtn" onClick={reshuffle} aria-label="Blanda bokstäverna">
          <span aria-hidden="true">⟳</span> Blanda
        </button>
        <button type="button" className="pp-cta bk-enter" onClick={submit}>Ange</button>
      </div>

      {/* Hittade ord */}
      <div className="bk-found">
        <div className="bk-found-head">
          <h2 className="bk-h">Hittade ord</h2>
          <span className="pp-mono">{found.length}</span>
        </div>
        {sortedFound.length === 0 ? (
          <p className="bk-muted">Inga ord än. Börja med korta ord på fyra bokstäver.</p>
        ) : (
          <ul className="bk-words">
            {sortedFound.map((w) => (
              <li key={w} className={puzzle.pangrams.has(w) ? 'bk-pangram' : ''}>
                {w}
                {puzzle.pangrams.has(w) && <span className="sr-only-pp"> (pangram)</span>}
              </li>
            ))}
          </ul>
        )}
        {found.length > 0 && (
          <div className="bk-share">
            <button type="button" className="pp-surfacebtn" onClick={share}>Dela resultat</button>
            <span role="status" className="bk-muted">{shareMsg}</span>
          </div>
        )}
      </div>

      {/* Statistik */}
      <dl className="bk-stats">
        <div><dt>Dagar spelade</dt><dd>{stats.daysPlayed}</dd></div>
        <div><dt>Svit</dt><dd>{stats.streak}</dd></div>
        <div><dt>Bästa svit</dt><dd>{stats.maxStreak}</dd></div>
        <div><dt>Drottningdagar</dt><dd>{stats.queens}</dd></div>
      </dl>
      <p className="bk-muted bk-small">Sviten räknas för varje dag du når {STREAK_RANK}.</p>

      {yesterday && (
        <details className="bk-yesterday">
          <summary>Visa gårdagens svar</summary>
          <p className="bk-muted">
            Bokstäver: <strong>{yesterday.center.toUpperCase()}</strong> + {yesterday.outer.join(' ').toUpperCase()} ·{' '}
            {yesterday.answers.length} ord
          </p>
          <ul className="bk-words">
            {[...yesterday.answers].sort((a, b) => a.localeCompare(b, 'sv')).map((w) => (
              <li key={w} className={yesterday.pangrams.has(w) ? 'bk-pangram' : ''}>{w}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

export default BikupanGame;
