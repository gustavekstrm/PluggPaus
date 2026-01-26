import type { LetterStatus } from '../../types/wordle';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  getLetterStatus: (letter: string) => LetterStatus;
}

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

function Keyboard({ onKeyPress, getLetterStatus }: KeyboardProps) {
  const getKeyClass = (key: string) => {
    if (key === 'Enter' || key === 'Backspace') {
      return 'bg-gray-400 hover:bg-gray-500 text-white dark:bg-gray-600 dark:hover:bg-gray-500';
    }

    const status = getLetterStatus(key);
    switch (status) {
      case 'correct':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'present':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      case 'absent':
        return 'bg-gray-500 hover:bg-gray-600 text-white dark:bg-gray-700 dark:hover:bg-gray-600';
      default:
        return 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white';
    }
  };

  const getKeyLabel = (key: string) => {
    if (key === 'Backspace') {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
          />
        </svg>
      );
    }
    return key;
  };

  return (
    <div className="w-full max-w-lg mx-auto px-2">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`${
                key === 'Enter' || key === 'Backspace'
                  ? 'px-3 sm:px-4 min-w-[60px] sm:min-w-[65px]'
                  : 'w-8 sm:w-10'
              } h-12 sm:h-14 rounded font-bold text-sm sm:text-base uppercase flex items-center justify-center transition-colors ${getKeyClass(
                key
              )}`}
            >
              {getKeyLabel(key)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
