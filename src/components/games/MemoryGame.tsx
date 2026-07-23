import { useState, useEffect, useCallback } from 'react';

const SYMBOLS = ['📚', '✏️', '☕', '🎓', '💡', '🔬', '🧮', '🗺️'];
const STORAGE_KEY = 'memory-best-moves';

interface Card {
  id: number;
  symbol: string;
  flipped: boolean;
  matched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): Card[] {
  const pairs = shuffle([...SYMBOLS, ...SYMBOLS]);
  return pairs.map((symbol, id) => ({ id, symbol, flipped: false, matched: false }));
}

function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(() => buildDeck());
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [best, setBest] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  const matchedCount = cards.filter((c) => c.matched).length;
  const won = matchedCount === cards.length;

  useEffect(() => {
    if (won) {
      setBest((b) => {
        const nb = b === 0 ? moves : Math.min(b, moves);
        localStorage.setItem(STORAGE_KEY, String(nb));
        return nb;
      });
    }
  }, [won, moves]);

  const reset = useCallback(() => {
    setCards(buildDeck());
    setFlippedIds([]);
    setMoves(0);
    setLocked(false);
  }, []);

  const flip = (id: number) => {
    if (locked) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newCards = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    const newFlipped = [...flippedIds, id];
    setCards(newCards);
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [a, b] = newFlipped;
      const cardA = newCards.find((c) => c.id === a);
      const cardB = newCards.find((c) => c.id === b);
      if (cardA && cardB && cardA.symbol === cardB.symbol) {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c)));
          setFlippedIds([]);
          setLocked(false);
        }, 420);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c)));
          setFlippedIds([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
        <span>
          Drag: <span className="font-bold text-gray-900 dark:text-white">{moves}</span>
        </span>
        <span>
          Par: <span className="font-bold text-gray-900 dark:text-white">{matchedCount / 2}/{SYMBOLS.length}</span>
        </span>
        <span>
          Rekord: <span className="font-bold text-gray-900 dark:text-white">{best || '–'}</span>
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {cards.map((card) => {
          const showFace = card.flipped || card.matched;
          return (
            <button
              key={card.id}
              onClick={() => flip(card.id)}
              disabled={showFace || locked}
              className={`aspect-square rounded-xl flex items-center justify-center text-3xl sm:text-4xl transition-all duration-300 select-none ${
                showFace
                  ? card.matched
                    ? 'bg-green-100 dark:bg-green-900/40 ring-2 ring-green-400'
                    : 'bg-white dark:bg-gray-700'
                  : 'bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 cursor-pointer active:scale-95'
              }`}
              aria-label={showFace ? card.symbol : 'Dolt kort'}
            >
              <span style={{ opacity: showFace ? 1 : 0, transition: 'opacity 0.2s' }}>{card.symbol}</span>
            </button>
          );
        })}
      </div>

      {won && (
        <div className="mt-5 text-center">
          <p className="text-lg font-semibold text-green-600 dark:text-green-400">
            Klarat på {moves} drag! 🎉
          </p>
        </div>
      )}

      <div className="mt-5 text-center">
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md active:scale-95"
        >
          {won ? 'Spela igen' : 'Blanda om'}
        </button>
      </div>
      <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
        Vänd två kort i taget och hitta alla par med så få drag som möjligt.
      </p>
    </div>
  );
}

export default MemoryGame;
