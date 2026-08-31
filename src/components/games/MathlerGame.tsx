import { useState, useEffect, useCallback } from 'react';
import { getTodayDateString, puzzleIndexForDate } from '../../utils/dailyDate';
import { isInteractiveTarget } from '../../utils/keyboard';

type Mark = 'correct' | 'present' | 'absent' | 'empty';
type Status = 'playing' | 'won' | 'lost';

const LEN = 6;
const MAX_GUESSES = 6;

// Curated pool of valid 6-character expressions (start & end with a digit).
const PUZZLES: string[] = [
  '12+3*4',
  '9*8-16',
  '48/6+5',
  '7*7-13',
  '81/9+7',
  '6*7-15',
  '36/4-3',
  '11+2*6',
  '8*4+11',
  '13+4*5',
  '9+8*11',
  '60/5-4',
  '7*6-24',
  '14+6*7',
  '99/9+3',
  '4*15-9',
  '18+7*5',
  '63/7+8',
  '5*11-6',
  '24+6*6',
  '8*9-27',
];

function evaluate(expr: string): number | null {
  if (!/^\d+([+\-*/]\d+)*$/.test(expr)) return null;
  const tokens = expr.match(/\d+|[+\-*/]/g);
  if (!tokens) return null;
  const nums: number[] = [];
  const ops: string[] = [];
  for (const t of tokens) {
    if (t === '+' || t === '-' || t === '*' || t === '/') ops.push(t);
    else nums.push(parseInt(t, 10));
  }
  // pass 1: * and /
  const nums2: number[] = [nums[0]];
  const ops2: string[] = [];
  for (let i = 0; i < ops.length; i++) {
    const o = ops[i];
    const n = nums[i + 1];
    if (o === '*') nums2[nums2.length - 1] *= n;
    else if (o === '/') nums2[nums2.length - 1] /= n;
    else {
      ops2.push(o);
      nums2.push(n);
    }
  }
  // pass 2: + and -
  let result = nums2[0];
  for (let i = 0; i < ops2.length; i++) {
    if (ops2[i] === '+') result += nums2[i + 1];
    else result -= nums2[i + 1];
  }
  return Number.isFinite(result) ? result : null;
}

function grade(guess: string, solution: string): Mark[] {
  const res: Mark[] = Array(LEN).fill('absent');
  const sol = solution.split('');
  const used = Array(LEN).fill(false);
  for (let i = 0; i < LEN; i++) {
    if (guess[i] === sol[i]) {
      res[i] = 'correct';
      used[i] = true;
    }
  }
  for (let i = 0; i < LEN; i++) {
    if (res[i] === 'correct') continue;
    for (let j = 0; j < LEN; j++) {
      if (!used[j] && guess[i] === sol[j]) {
        res[i] = 'present';
        used[j] = true;
        break;
      }
    }
  }
  return res;
}

/** Sant när två uttryck består av exakt samma tecken, bara i annan ordning. */
function isCommutativeVariant(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const sort = (s: string) => s.split('').sort().join('');
  return sort(a) === sort(b);
}

function dailyPuzzle(): string {
  // Använder samma dagsgräns som Orda, Kopplingar och Kontext. Tidigare räknade Mathler
  // i ren UTC och bytte pussel vid ett annat klockslag än resten av sajten.
  return PUZZLES[puzzleIndexForDate(getTodayDateString(), PUZZLES.length)];
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/'];

function tileClasses(mark: Mark): string {
  switch (mark) {
    case 'correct':
      return 'bg-green-500 text-white border-green-500';
    case 'present':
      return 'bg-yellow-500 text-white border-yellow-500';
    case 'absent':
      return 'bg-gray-400 dark:bg-gray-600 text-white border-gray-400 dark:border-gray-600';
    default:
      return 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500';
  }
}

function MathlerGame() {
  const [solution] = useState<string>(() => dailyPuzzle());
  const target = evaluate(solution) ?? 0;
  const [guesses, setGuesses] = useState<string[]>([]);
  const [marks, setMarks] = useState<Mark[][]>([]);
  const [current, setCurrent] = useState('');
  const [status, setStatus] = useState<Status>('playing');
  const [error, setError] = useState('');

  const submit = useCallback(() => {
    if (status !== 'playing') return;
    if (current.length !== LEN) {
      setError(`Fyll alla ${LEN} rutor`);
      return;
    }
    const value = evaluate(current);
    if (value === null) {
      setError('Ogiltigt uttryck');
      return;
    }
    if (value !== target) {
      setError(`Uttrycket måste bli ${target}`);
      return;
    }
    setError('');
    const m = grade(current, solution);
    const newGuesses = [...guesses, current];
    const newMarks = [...marks, m];
    setGuesses(newGuesses);
    setMarks(newMarks);
    // Kommutativa varianter räknas som samma lösning: samma tecken, annan ordning,
    // samma resultat. 5*3+12 godtas alltså när facit är 12+5*3 – vilket är vad
    // spelsidans FAQ lovar, och hur Mathler fungerar i original.
    if (current === solution || isCommutativeVariant(current, solution)) setStatus('won');
    else if (newGuesses.length >= MAX_GUESSES) setStatus('lost');
    setCurrent('');
  }, [current, guesses, marks, solution, status, target]);

  const press = useCallback(
    (key: string) => {
      if (status !== 'playing') return;
      setError('');
      if (key === 'Enter') {
        submit();
        return;
      }
      if (key === 'Backspace') {
        setCurrent((c) => c.slice(0, -1));
        return;
      }
      if (KEYS.includes(key)) {
        setCurrent((c) => (c.length < LEN ? c + key : c));
      }
    },
    [status, submit]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isInteractiveTarget(e.target)) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        press('Enter');
      } else if (e.key === 'Backspace') {
        press('Backspace');
      } else if (KEYS.includes(e.key)) {
        press(e.key);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [press]);

  const rows = [];
  for (let r = 0; r < MAX_GUESSES; r++) {
    let chars: string[] = Array(LEN).fill('');
    let rowMarks: Mark[] = Array(LEN).fill('empty');
    if (r < guesses.length) {
      chars = guesses[r].split('');
      rowMarks = marks[r];
    } else if (r === guesses.length && status === 'playing') {
      chars = current.padEnd(LEN, ' ').split('').map((c) => (c === ' ' ? '' : c));
    }
    rows.push({ chars, rowMarks });
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-5">
        <p className="text-gray-600 dark:text-gray-300">
          Hitta uträkningen som blir{' '}
          <span className="inline-block bg-indigo-600 text-white font-bold rounded-lg px-3 py-1 text-lg">{target}</span>
        </p>
      </div>

      <div className="space-y-1.5 mb-4">
        {rows.map((row, r) => (
          <div key={r} className="grid grid-cols-6 gap-1.5">
            {row.chars.map((ch, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg border-2 flex items-center justify-center text-xl sm:text-2xl font-bold ${tileClasses(row.rowMarks[i])}`}
              >
                {ch}
              </div>
            ))}
          </div>
        ))}
      </div>

      {error && <p className="text-center text-red-500 font-semibold mb-3">{error}</p>}
      {status === 'won' && (
        <p className="text-center text-green-600 dark:text-green-400 font-semibold mb-3">
          Rätt! Du hittade uträkningen 🎉
        </p>
      )}
      {status === 'lost' && (
        <p className="text-center text-gray-700 dark:text-gray-300 font-semibold mb-3">
          Rätt svar var: <span className="font-bold">{solution}</span>
        </p>
      )}

      {/* Keypad */}
      <div className="grid grid-cols-5 gap-1.5">
        {KEYS.map((k) => (
          <button
            key={k}
            onClick={() => press(k)}
            className="py-3 rounded-lg font-bold text-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-all"
          >
            {k}
          </button>
        ))}
        <button
          onClick={() => press('Backspace')}
          className="py-3 rounded-lg font-bold bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 active:scale-95 transition-all col-span-2"
        >
          ⌫ Radera
        </button>
        <button
          onClick={() => press('Enter')}
          className="py-3 rounded-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-95 transition-all col-span-3"
        >
          Gissa
        </button>
      </div>

      <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
        Grön = rätt tecken på rätt plats · Gul = rätt tecken, fel plats · Grå = ingår inte.
      </p>
    </div>
  );
}

export default MathlerGame;
