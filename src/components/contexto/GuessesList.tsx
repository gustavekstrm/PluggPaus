import type { Guess } from '../../types/contexto';

interface GuessesListProps {
  guesses: Guess[];
  targetWord: string;
}

function GuessesList({ guesses, targetWord }: GuessesListProps) {
  const getRankColor = (rank: number, isTarget: boolean) => {
    if (isTarget) return 'bg-green-600 text-white';
    if (rank <= 10) return 'bg-green-500 text-white';
    if (rank <= 50) return 'bg-yellow-500 text-white';
    if (rank <= 200) return 'bg-orange-500 text-white';
    if (rank <= 500) return 'bg-red-500 text-white';
    return 'bg-gray-500 text-white';
  };

  const getRankLabel = (rank: number) => {
    if (rank === 1) return '🎯 TARGET';
    if (rank <= 10) return 'Very Close!';
    if (rank <= 50) return 'Close';
    if (rank <= 200) return 'Warm';
    if (rank <= 500) return 'Far';
    return 'Very Far';
  };

  if (guesses.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        <p>No guesses yet. Start guessing!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Total guesses: <span className="font-bold text-gray-900 dark:text-white">{guesses.length}</span>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {guesses.map((guess, index) => {
          const isTarget = guess.word === targetWord;
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${getRankColor(
                guess.rank,
                isTarget
              )} animate-slideIn`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="font-bold text-lg">#{guess.rank}</div>
                <div className="font-semibold uppercase text-lg">{guess.word}</div>
              </div>
              <div className="text-sm font-medium">
                {getRankLabel(guess.rank)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GuessesList;
