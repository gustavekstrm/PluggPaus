import { useState, type FormEvent } from 'react';

interface GuessInputProps {
  onGuess: (word: string) => void;
  disabled: boolean;
  error: string;
}

function GuessInput({ onGuess, disabled, error }: GuessInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onGuess(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Enter your guess..."
          className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          autoFocus
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Guess
        </button>
      </div>
      {error && (
        <div className="mt-2 text-red-600 dark:text-red-400 text-sm text-center">
          {error}
        </div>
      )}
    </form>
  );
}

export default GuessInput;
