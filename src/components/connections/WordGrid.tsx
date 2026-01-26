interface WordGridProps {
  words: string[];
  selectedWords: string[];
  shakingWords: string[];
  onWordClick: (word: string) => void;
  disabled: boolean;
}

function WordGrid({ words, selectedWords, shakingWords, onWordClick, disabled }: WordGridProps) {
  const isSelected = (word: string) => selectedWords.includes(word);
  const isShaking = (word: string) => shakingWords.includes(word);

  return (
    <div className="grid grid-cols-4 gap-2">
      {words.map((word) => (
        <button
          key={word}
          onClick={() => onWordClick(word)}
          disabled={disabled}
          className={`
            h-20 sm:h-24 rounded-lg font-bold text-sm sm:text-base uppercase
            transition-all duration-200
            ${isSelected(word)
              ? 'bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900 scale-95'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }
            ${isShaking(word) ? 'animate-shake' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {word}
        </button>
      ))}
    </div>
  );
}

export default WordGrid;
