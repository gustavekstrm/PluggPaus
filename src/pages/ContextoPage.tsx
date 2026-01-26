import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContexto } from '../hooks/useContexto';
import GuessInput from '../components/contexto/GuessInput';
import GuessesList from '../components/contexto/GuessesList';
import ContextoStatsModal from '../components/contexto/ContextoStatsModal';

function ContextoPage() {
  const { puzzle, gameState, stats, error, makeGuess, getHint, giveUp } = useContexto();
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'contexto');
  }, []);

  // Show stats when game ends
  useEffect(() => {
    if (gameState.gameStatus === 'won') {
      const timer = setTimeout(() => setShowStats(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState.gameStatus]);

  if (!puzzle) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Tillbaka till spel
        </Link>

        <button
          onClick={() => setShowStats(true)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Visa statistik"
        >
          <svg
            className="w-6 h-6 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Contexto</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Gissa ordet baserat på kontext och likhet
        </p>
        <div className="text-xs text-gray-500 dark:text-gray-500 max-w-md mx-auto">
          Find the secret word by guessing words. Each guess is ranked by similarity - #1 is the target!
        </div>
      </div>

      {/* Game status message */}
      {gameState.gameStatus === 'won' && (
        <div className="text-center mb-6">
          <div className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-6 py-3 rounded-lg">
            <p className="font-bold">
              🎉 Grattis! Du hittade ordet "{puzzle.targetWord.toUpperCase()}" på {gameState.guesses.length}{' '}
              {gameState.guesses.length === 1 ? 'gissning' : 'gissningar'}!
            </p>
          </div>
        </div>
      )}

      {/* Guess input */}
      <div className="mb-8">
        <GuessInput
          onGuess={makeGuess}
          disabled={gameState.gameStatus !== 'playing'}
          error={error}
        />
      </div>

      {/* Action buttons */}
      {gameState.gameStatus === 'playing' && (
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={getHint}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            💡 Get Hint
          </button>
          <button
            onClick={giveUp}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Give Up
          </button>
        </div>
      )}

      {/* Color legend */}
      <div className="mb-6 max-w-2xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Very Close (1-10)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Close (11-50)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Warm (51-200)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Far (201-500)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Very Far (500+)</span>
          </div>
        </div>
      </div>

      {/* Guesses list */}
      <GuessesList guesses={gameState.guesses} targetWord={puzzle.targetWord} />

      {/* Stats Modal */}
      <ContextoStatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        stats={stats}
        gameStatus={gameState.gameStatus}
        guessCount={gameState.guesses.length}
      />
    </main>
  );
}

export default ContextoPage;
