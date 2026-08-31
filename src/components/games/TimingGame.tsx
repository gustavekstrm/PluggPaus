import { useCallback, useEffect, useRef, useState } from 'react';
import { readJSON, writeJSON } from '../../utils/safeStorage';

/**
 * Tajming – tvåspelarspel om tidskänsla.
 *
 * Båda spelarna sitter vid samma dator. En måltid mellan 0,5 och 10 sekunder lottas fram.
 * Spelare ett startar klockan med mellanslag och stoppar den med mellanslag igen — men
 * klockan är osynlig medan den går, så det enda som hjälper är den egna tidskänslan.
 * Sedan gör spelare två samma sak på samma måltid. Närmast vinner rundan, först till fem
 * vinner matchen.
 */

const STORAGE_KEY = 'tajming-namn';
const WINNING_SCORE = 5;
const MIN_TARGET = 0.5;
const MAX_TARGET = 10;

type Phase = 'setup' | 'ready' | 'running' | 'result' | 'roundEnd' | 'gameOver';

interface SavedNames {
  names: [string, string];
}

function randomTarget(): number {
  const span = MAX_TARGET - MIN_TARGET;
  return Math.round((MIN_TARGET + Math.random() * span) * 10) / 10;
}

function formatSeconds(value: number, decimals = 2): string {
  return value.toFixed(decimals).replace('.', ',');
}

/** "0,18 s för tidigt" – riktningen är mer intressant än det absoluta felet. */
function describeMiss(time: number, target: number): string {
  const diff = time - target;
  if (Math.abs(diff) < 0.005) return 'Precis på pricken!';
  return `${formatSeconds(Math.abs(diff))} s ${diff < 0 ? 'för tidigt' : 'för sent'}`;
}

function ScoreDots({ score, side }: { score: number; side: 0 | 1 }) {
  return (
    <div className="tj-dots" aria-hidden="true">
      {Array.from({ length: WINNING_SCORE }, (_, i) => (
        <span key={i} className={`tj-dot${i < score ? ' tj-dot-on' : ''}${side === 1 ? ' tj-dot-b' : ''}`} />
      ))}
    </div>
  );
}

function TimingGame() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [names, setNames] = useState<[string, string]>(['', '']);
  const [scores, setScores] = useState<[number, number]>([0, 0]);
  const [target, setTarget] = useState<number>(() => randomTarget());
  const [turn, setTurn] = useState<0 | 1>(0);
  const [times, setTimes] = useState<[number | null, number | null]>([null, null]);
  const [roundWinner, setRoundWinner] = useState<0 | 1 | null>(null);
  const [round, setRound] = useState(1);

  const startedAt = useRef<number>(0);

  // Kom ihåg namnen till nästa gång – två personer som spelar en gång spelar ofta igen.
  useEffect(() => {
    const saved = readJSON<SavedNames>(STORAGE_KEY);
    if (saved?.names?.length === 2) setNames([saved.names[0] ?? '', saved.names[1] ?? '']);
  }, []);

  const displayName = useCallback(
    (i: 0 | 1) => (names[i].trim() ? names[i].trim() : `Spelare ${i + 1}`),
    [names]
  );

  const beginMatch = useCallback(() => {
    writeJSON(STORAGE_KEY, { names });
    setScores([0, 0]);
    setRound(1);
    setTarget(randomTarget());
    setTimes([null, null]);
    setRoundWinner(null);
    setTurn(0);
    setPhase('ready');
  }, [names]);

  const startTimer = useCallback(() => {
    startedAt.current = performance.now();
    setPhase('running');
  }, []);

  const stopTimer = useCallback(() => {
    const elapsed = (performance.now() - startedAt.current) / 1000;
    setTimes(prev => {
      const next: [number | null, number | null] = [prev[0], prev[1]];
      next[turn] = elapsed;
      return next;
    });
    setPhase('result');
  }, [turn]);

  /** Från en spelares resultat vidare till nästa spelare, eller till rundans facit. */
  const advance = useCallback(() => {
    if (turn === 0) {
      setTurn(1);
      setPhase('ready');
      return;
    }

    const a = times[0];
    const b = times[1];
    if (a == null || b == null) return;

    const missA = Math.abs(a - target);
    const missB = Math.abs(b - target);
    const winner: 0 | 1 | null = missA === missB ? null : missA < missB ? 0 : 1;

    const nextScores: [number, number] = [scores[0], scores[1]];
    if (winner !== null) nextScores[winner] += 1;

    setRoundWinner(winner);
    setScores(nextScores);
    setPhase(nextScores[0] >= WINNING_SCORE || nextScores[1] >= WINNING_SCORE ? 'gameOver' : 'roundEnd');
  }, [turn, times, target, scores]);

  const nextRound = useCallback(() => {
    setTarget(randomTarget());
    setTimes([null, null]);
    setRoundWinner(null);
    setTurn(0);
    setRound(r => r + 1);
    setPhase('ready');
  }, []);

  /** Mellanslag driver hela spelet – det är själva poängen med en arkadknapp. */
  const handleSpace = useCallback(() => {
    if (phase === 'ready') startTimer();
    else if (phase === 'running') stopTimer();
    else if (phase === 'result') advance();
    else if (phase === 'roundEnd') nextRound();
  }, [phase, startTimer, stopTimer, advance, nextRound]);

  useEffect(() => {
    if (phase === 'setup' || phase === 'gameOver') return;

    const onKey = (e: KeyboardEvent) => {
      if (e.code !== 'Space' && e.key !== ' ') return;
      // Låt mellanslag vara mellanslag när någon skriver i ett fält.
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.repeat) return;
      e.preventDefault();
      handleSpace();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, handleSpace]);

  const activeName = displayName(turn);
  const myTime = times[turn];

  const statusText = (() => {
    switch (phase) {
      case 'ready':
        return `${activeName} – tryck för att starta klockan`;
      case 'running':
        return 'Klockan går … tryck igen när du tror att tiden är ute';
      case 'result':
        return turn === 0 ? 'Nu är det andra spelarens tur' : 'Båda har spelat';
      case 'roundEnd':
        return roundWinner === null ? 'Exakt lika – ingen tar poängen' : `${displayName(roundWinner)} tar rundan`;
      default:
        return '';
    }
  })();

  // ---------- Namninmatning ----------
  if (phase === 'setup') {
    return (
      <div className="tj-wrap">
        <div className="tj-setup">
          <h2 className="tj-setup-title">Vilka spelar?</h2>
          <p className="tj-setup-lead">
            Två spelare, en dator. Ni turas om vid varsin knapp – spelare 1 använder mellanslag eller
            klickar på den vänstra knappen, spelare 2 på den högra.
          </p>

          <div className="tj-setup-fields">
            {([0, 1] as const).map(i => (
              <label key={i} className="tj-field">
                <span className="tj-field-label">Spelare {i + 1}</span>
                <input
                  type="text"
                  className="tj-input"
                  value={names[i]}
                  maxLength={14}
                  placeholder={`Spelare ${i + 1}`}
                  onChange={e => {
                    const v = e.target.value;
                    setNames(prev => (i === 0 ? [v, prev[1]] : [prev[0], v]));
                  }}
                />
              </label>
            ))}
          </div>

          <div className="tj-rules">
            <strong>Så funkar det:</strong> en måltid mellan 0,5 och 10 sekunder lottas fram. Du startar
            klockan och stoppar den när du tror att tiden gått. <strong>Klockan är osynlig medan den
            går</strong> – du ser din tid först när du stoppat. Närmast måltiden vinner rundan, först
            till {WINNING_SCORE} vinner matchen.
          </div>

          <button type="button" className="pp-cta tj-start" onClick={beginMatch}>
            Starta matchen
          </button>
        </div>
      </div>
    );
  }

  // ---------- Slutskärm ----------
  if (phase === 'gameOver') {
    const champion: 0 | 1 = scores[0] >= WINNING_SCORE ? 0 : 1;
    return (
      <div className="tj-wrap">
        <div className="tj-over">
          <div className="tj-trophy" aria-hidden="true">🏆</div>
          <h2 className="tj-over-title">{displayName(champion)} vinner!</h2>
          <p className="tj-over-score">
            {displayName(0)} {scores[0]} – {scores[1]} {displayName(1)}
          </p>
          <p className="tj-over-sub">Matchen avgjordes på {round} {round === 1 ? 'runda' : 'rundor'}.</p>
          <div className="tj-over-actions">
            <button type="button" className="pp-cta" onClick={beginMatch}>
              Spela igen
            </button>
            <button type="button" className="tj-ghost" onClick={() => setPhase('setup')}>
              Byt spelare
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Spelplan ----------
  const showTarget = phase !== 'running';

  const station = (i: 0 | 1) => {
    // Vid rundans facit är ingen på tur – då ska båda lamporna vara släckta.
    const isTurn = turn === i && phase !== 'roundEnd';
    const isPressed = isTurn && phase === 'running';
    return (
      <div className="tj-station">
        <span
          className={`tj-lamp${isTurn ? ' tj-lamp-on' : ''}${isPressed ? ' tj-lamp-live' : ''}`}
          aria-hidden="true"
        />
        <button
          type="button"
          className={`tj-button${isPressed ? ' tj-button-down' : ''}`}
          disabled={!isTurn || phase === 'result'}
          aria-label={
            phase === 'running'
              ? `Stoppa klockan för ${displayName(i)}`
              : `Starta klockan för ${displayName(i)}`
          }
          onClick={e => {
            e.currentTarget.blur();
            handleSpace();
          }}
        >
          <span className="tj-button-face" />
        </button>
        <span className={`tj-station-name${isTurn ? ' tj-station-name-on' : ''}`}>
          {displayName(i)}
        </span>
      </div>
    );
  };

  return (
    <div className="tj-wrap">
      {/* Ställning */}
      <div className="tj-score">
        {([0, 1] as const).map(i => (
          <div key={i} className={`tj-score-side${turn === i ? ' tj-score-active' : ''}`}>
            <span className="tj-score-name">{displayName(i)}</span>
            <ScoreDots score={scores[i]} side={i} />
          </div>
        ))}
        <span className="tj-round pp-mono">Runda {round}</span>
      </div>

      {/* Knapp – display – knapp */}
      <div className="tj-arena">
        {station(0)}

        {/* Mitten */}
        <div className="tj-display" role="status" aria-live="polite">
          <span className="tj-display-label pp-mono">Måltid</span>
          <span className={`tj-target${showTarget ? '' : ' tj-target-hidden'}`}>
            {showTarget ? `${formatSeconds(target, 1)} s` : '· · ·'}
          </span>

          {phase === 'result' && myTime != null && (
            <div className="tj-result">
              <span className="tj-result-time">{formatSeconds(myTime)} s</span>
              <span className="tj-result-miss">{describeMiss(myTime, target)}</span>
            </div>
          )}

          {phase === 'roundEnd' && times[0] != null && times[1] != null && (
            <div className="tj-tally">
              {([0, 1] as const).map(i => (
                <div key={i} className={`tj-tally-row${roundWinner === i ? ' tj-tally-win' : ''}`}>
                  <span className="tj-tally-name">{displayName(i)}</span>
                  <span className="tj-tally-time pp-mono">{formatSeconds(times[i] as number)} s</span>
                  <span className="tj-tally-miss">{describeMiss(times[i] as number, target)}</span>
                </div>
              ))}
            </div>
          )}

          <p className="tj-status">{statusText}</p>

          {phase !== 'running' && (
            <p className="tj-hint pp-mono">
              {phase === 'ready' ? 'MELLANSLAG STARTAR' : 'MELLANSLAG FORTSÄTTER'}
            </p>
          )}
          {phase === 'running' && <p className="tj-hint tj-hint-live pp-mono">MELLANSLAG STOPPAR</p>}
        </div>

        {station(1)}
      </div>

      {(phase === 'result' || phase === 'roundEnd') && (
        <div className="tj-next">
          <button type="button" className="pp-cta" onClick={handleSpace}>
            {phase === 'result' && turn === 0
              ? `${displayName(1)} står på tur`
              : phase === 'result'
                ? 'Visa facit'
                : 'Nästa runda'}
          </button>
        </div>
      )}
    </div>
  );
}

export default TimingGame;
