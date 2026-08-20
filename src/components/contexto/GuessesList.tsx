import type { Guess } from '../../types/contexto';
import { FAR_RANK } from '../../hooks/useContexto';

interface GuessesListProps {
  guesses: Guess[];
  targetWord: string;
}

// Skalan är anpassad efter att pusslen numera rankar ~13 000 ord (tidigare ~200).
// Rang 1000 är alltså inte längre botten på skalan utan ungefär mitten av fältet.
function getRankColor(rank: number, isTarget: boolean) {
  if (isTarget) return 'bg-green-600 text-white';
  if (rank <= 10) return 'bg-green-500 text-white';
  if (rank <= 50) return 'bg-yellow-500 text-white';
  if (rank <= 250) return 'bg-orange-500 text-white';
  if (rank <= 1000) return 'bg-red-500 text-white';
  if (rank < FAR_RANK) return 'bg-stone-600 text-white';
  return 'bg-gray-500 text-white';
}

function getRankLabel(rank: number) {
  if (rank === 1) return '🎯 MÅLET';
  if (rank <= 10) return 'Mycket nära!';
  if (rank <= 50) return 'Nära';
  if (rank <= 250) return 'Ljummen';
  if (rank <= 1000) return 'Kall';
  if (rank <= 4000) return 'Långt bort';
  if (rank < FAR_RANK) return 'Mycket långt bort';
  return 'Utanför ordlistan';
}

function Row({ guess, isTarget, highlight }: { guess: Guess; isTarget: boolean; highlight?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg ${getRankColor(guess.rank, isTarget)} ${
        highlight ? 'ring-2 ring-offset-2 ring-white/70 dark:ring-offset-gray-900' : ''
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="font-bold text-lg whitespace-nowrap">{guess.rank >= FAR_RANK ? '–' : `#${guess.rank}`}</div>
        <div className="font-semibold uppercase text-lg truncate">{guess.word}</div>
      </div>
      <div className="text-sm font-medium whitespace-nowrap ml-2">{getRankLabel(guess.rank)}</div>
    </div>
  );
}

function GuessesList({ guesses, targetWord }: GuessesListProps) {
  if (guesses.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        <p>Inga gissningar än. Skriv ett ord för att börja!</p>
      </div>
    );
  }

  // Latest guess = highest guessNumber. Pin it at the top so you always see your senaste resultat.
  const latest = guesses.reduce((a, b) => (b.guessNumber > a.guessNumber ? b : a));

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Pinned latest guess */}
      <div className="mb-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
          Senaste gissning
        </div>
        <Row guess={latest} isTarget={latest.word === targetWord} highlight />
      </div>

      <div className="mb-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Alla gissningar (närmast överst) ·{' '}
        <span className="font-bold text-gray-900 dark:text-white">{guesses.length}</span>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
        {guesses.map((guess) => (
          <Row
            key={guess.word}
            guess={guess}
            isTarget={guess.word === targetWord}
            highlight={guess.guessNumber === latest.guessNumber}
          />
        ))}
      </div>
    </div>
  );
}

export default GuessesList;
