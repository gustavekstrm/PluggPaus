interface GameControlsProps {
  onShuffle: () => void;
  onDeselectAll: () => void;
  onSubmit: () => void;
  selectedCount: number;
  disabled: boolean;
}

function GameControls({ onShuffle, onDeselectAll, onSubmit, selectedCount, disabled }: GameControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
      <div className="flex gap-3">
        <button
          onClick={onShuffle}
          disabled={disabled}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Shuffle
        </button>
        <button
          onClick={onDeselectAll}
          disabled={disabled || selectedCount === 0}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Deselect All
        </button>
      </div>
      <button
        onClick={onSubmit}
        disabled={disabled || selectedCount !== 4}
        className="px-8 py-3 bg-gray-900 dark:bg-gray-300 text-white dark:text-gray-900 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Submit
      </button>
    </div>
  );
}

export default GameControls;
