import { useState, useRef, useCallback, useEffect } from 'react';
import { readNumber, writeNumber } from '../../utils/safeStorage';

type Pad = 0 | 1 | 2 | 3;
type Phase = 'idle' | 'showing' | 'input' | 'over';

const STORAGE_KEY = 'simon-best';

const PADS: { base: string; lit: string; label: string }[] = [
  { base: 'bg-green-600/70', lit: 'bg-green-400', label: 'grön' },
  { base: 'bg-red-600/70', lit: 'bg-red-400', label: 'röd' },
  { base: 'bg-yellow-500/70', lit: 'bg-yellow-300', label: 'gul' },
  { base: 'bg-blue-600/70', lit: 'bg-blue-400', label: 'blå' },
];

function SimonGame() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [sequence, setSequence] = useState<Pad[]>([]);
  const [active, setActive] = useState<Pad | null>(null);
  const [round, setRound] = useState(0);
  const [best, setBest] = useState(() => {
    return readNumber(STORAGE_KEY);
  });

  const inputIndex = useRef(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const playSequence = useCallback((seq: Pad[]) => {
    setPhase('showing');
    clearTimers();
    seq.forEach((pad, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setActive(pad);
          timers.current.push(
            window.setTimeout(() => setActive(null), 380)
          );
        }, 650 * i + 350)
      );
    });
    timers.current.push(
      window.setTimeout(() => {
        setPhase('input');
        inputIndex.current = 0;
      }, 650 * seq.length + 350)
    );
  }, []);

  const nextRound = useCallback(
    (prev: Pad[]) => {
      const next = [...prev, Math.floor(Math.random() * 4) as Pad];
      setSequence(next);
      setRound(next.length);
      playSequence(next);
    },
    [playSequence]
  );

  const start = useCallback(() => {
    setSequence([]);
    setRound(0);
    nextRound([]);
  }, [nextRound]);

  const handlePad = (pad: Pad) => {
    if (phase !== 'input') return;
    setActive(pad);
    window.setTimeout(() => setActive(null), 180);

    if (pad !== sequence[inputIndex.current]) {
      setPhase('over');
      setBest((b) => {
        const score = sequence.length - 1;
        const nb = Math.max(b, score);
        writeNumber(STORAGE_KEY, Number(nb));
        return nb;
      });
      return;
    }
    inputIndex.current += 1;
    if (inputIndex.current === sequence.length) {
      setPhase('showing');
      window.setTimeout(() => nextRound(sequence), 700);
    }
  };

  const statusText =
    phase === 'idle'
      ? 'Tryck på Starta och härma färgsekvensen'
      : phase === 'showing'
      ? 'Titta noga...'
      : phase === 'input'
      ? 'Din tur – upprepa sekvensen'
      : 'Fel färg! Spelet är slut.';

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
        <span>
          Nivå: <span className="font-bold text-gray-900 dark:text-white">{round}</span>
        </span>
        <span>
          Rekord: <span className="font-bold text-gray-900 dark:text-white">{best}</span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 aspect-square">
        {[0, 1, 2, 3].map((i) => {
          const pad = i as Pad;
          const isLit = active === pad;
          return (
            <button
              key={i}
              onClick={() => handlePad(pad)}
              disabled={phase !== 'input'}
              className={`rounded-2xl transition-all duration-150 ${
                isLit ? PADS[i].lit : PADS[i].base
              } ${phase === 'input' ? 'cursor-pointer hover:brightness-110 active:scale-95' : 'cursor-default'} ${
                isLit ? 'scale-105 shadow-glow-md' : ''
              }`}
              aria-label={`${PADS[i].label} platta`}
            />
          );
        })}
      </div>

      <p className="mt-4 text-center text-gray-700 dark:text-gray-300 font-medium min-h-[1.5rem]">
        {statusText}
      </p>

      <div className="mt-2 text-center">
        <button
          onClick={start}
          disabled={phase === 'showing'}
          className="px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          {phase === 'over' ? 'Spela igen' : phase === 'idle' ? 'Starta' : 'Börja om'}
        </button>
      </div>
      <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
        Sekvensen blir en färg längre för varje nivå du klarar. Hur långt når ditt minne?
      </p>
    </div>
  );
}

export default SimonGame;
