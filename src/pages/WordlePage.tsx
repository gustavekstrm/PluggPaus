import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useWordle } from '../hooks/useWordle';
import { useCountdown } from '../hooks/useCountdown';
import WordleGrid from '../components/wordle/WordleGrid';
import Keyboard from '../components/wordle/Keyboard';
import StatsModal from '../components/wordle/StatsModal';

function WordlePage() {
  const { gameState, stats, answer, invalidWord, handleKeyPress, getKeyboardLetterStatus } = useWordle();
  const countdown = useCountdown();
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'wordle');
  }, []);

  // Show stats when game ends
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') {
      const timer = setTimeout(() => setShowStats(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState.gameStatus]);

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
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Wordle</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Gissa dagens ord på sex försök</p>
      </div>

      {/* Game status message */}
      {gameState.gameStatus === 'won' && (
        <div className="text-center mb-6">
          <div className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-6 py-3 rounded-lg">
            <p className="font-bold">Grattis! Du hittade ordet!</p>
          </div>
        </div>
      )}

      {gameState.gameStatus === 'lost' && (
        <div className="text-center mb-6">
          <div className="inline-block bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-6 py-3 rounded-lg">
            <p className="font-bold">Tyvärr! Ordet var: {answer.toUpperCase()}</p>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="flex justify-center mb-8">
        <WordleGrid
          guesses={gameState.guesses}
          currentGuess={gameState.currentGuess}
          evaluations={gameState.evaluations}
          invalidWord={invalidWord}
        />
      </div>

      {/* Invalid word message */}
      {invalidWord && (
        <div className="text-center mb-4">
          <p className="text-red-600 dark:text-red-400 font-semibold">Ogiltigt ord!</p>
        </div>
      )}

      {/* Countdown for next puzzle */}
      {gameState.gameStatus !== 'playing' && (
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Nästa pussel om: <span className="font-bold text-gray-900 dark:text-white">{countdown}</span>
          </p>
        </div>
      )}

      {/* Keyboard */}
      <div className="mt-8">
        <Keyboard onKeyPress={handleKeyPress} getLetterStatus={getKeyboardLetterStatus} />
      </div>

      {/* Stats Modal */}
      <StatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        stats={stats}
        gameStatus={gameState.gameStatus}
        evaluations={gameState.evaluations}
      />
    </main>
  );
}

export default WordlePage;
