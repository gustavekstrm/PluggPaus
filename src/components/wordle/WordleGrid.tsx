import type { GuessLetter } from '../../types/wordle';

interface WordleGridProps {
  guesses: string[];
  currentGuess: string;
  evaluations: GuessLetter[][];
  invalidWord: boolean;
}

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

function WordleGrid({ guesses, currentGuess, evaluations, invalidWord }: WordleGridProps) {
  const empties = MAX_GUESSES - guesses.length - 1;

  const getTileClass = (status: string) => {
    switch (status) {
      case 'correct':
        return 'bg-green-600 border-green-600 text-white';
      case 'present':
        return 'bg-yellow-500 border-yellow-500 text-white';
      case 'absent':
        return 'bg-gray-500 border-gray-500 text-white dark:bg-gray-600 dark:border-gray-600';
      default:
        return 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600';
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Completed guesses */}
      {guesses.map((_, i) => (
        <div key={i} className="flex gap-1">
          {evaluations[i]?.map((item, j) => (
            <div
              key={j}
              className={`w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center text-2xl sm:text-3xl font-bold uppercase animate-flip ${getTileClass(
                item.status
              )}`}
              style={{ animationDelay: `${j * 100}ms` }}
            >
              {item.letter}
            </div>
          ))}
        </div>
      ))}

      {/* Current guess */}
      {guesses.length < MAX_GUESSES && (
        <div className={`flex gap-1 ${invalidWord ? 'animate-shake' : ''}`}>
          {Array.from({ length: WORD_LENGTH }).map((_, i) => (
            <div
              key={i}
              className={`w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center text-2xl sm:text-3xl font-bold uppercase ${
                currentGuess[i]
                  ? 'border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
              } ${currentGuess[i] ? 'animate-pop' : ''}`}
            >
              {currentGuess[i] || ''}
            </div>
          ))}
        </div>
      )}

      {/* Empty rows */}
      {Array.from({ length: empties }).map((_, i) => (
        <div key={`empty-${i}`} className="flex gap-1">
          {Array.from({ length: WORD_LENGTH }).map((_, j) => (
            <div
              key={j}
              className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default WordleGrid;
