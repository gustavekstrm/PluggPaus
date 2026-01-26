import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useConnections } from '../hooks/useConnections';
import SolvedCategories from '../components/connections/SolvedCategories';
import WordGrid from '../components/connections/WordGrid';
import GameControls from '../components/connections/GameControls';
import ConnectionsStatsModal from '../components/connections/ConnectionsStatsModal';

function ConnectionsPage() {
  const {
    gameState,
    stats,
    toggleWordSelection,
    deselectAll,
    shuffleWords,
    submitGuess,
  } = useConnections();

  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'connections');
  }, []);

  // Show stats when game ends
  useEffect(() => {
    if (gameState && gameState.gameStatus !== 'playing') {
      const timer = setTimeout(() => setShowStats(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState?.gameStatus]);

  if (!gameState) {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Connections</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hitta grupper av fyra ord som hör ihop
        </p>
      </div>

      {/* Game status messages */}
      {gameState.gameStatus === 'won' && (
        <div className="text-center mb-6">
          <div className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-6 py-3 rounded-lg">
            <p className="font-bold">Perfekt! Du hittade alla grupper!</p>
          </div>
        </div>
      )}

      {gameState.gameStatus === 'lost' && (
        <div className="text-center mb-6">
          <div className="inline-block bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-6 py-3 rounded-lg">
            <p className="font-bold">Slut på försök! Bättre lycka nästa gång!</p>
          </div>
        </div>
      )}

      {/* Mistakes remaining */}
      {gameState.gameStatus === 'playing' && (
        <div className="text-center mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Misstag kvar:{' '}
            <span className="font-bold text-gray-900 dark:text-white">
              {gameState.mistakesRemaining}
            </span>
          </div>
        </div>
      )}

      {/* Solved categories */}
      {gameState.solvedCategories.length > 0 && (
        <div className="mb-6">
          <SolvedCategories categories={gameState.solvedCategories} />
        </div>
      )}

      {/* Word grid */}
      {gameState.remainingWords.length > 0 && (
        <div className="mb-6">
          <WordGrid
            words={gameState.remainingWords}
            selectedWords={gameState.selectedWords}
            shakingWords={gameState.shakingWords}
            onWordClick={toggleWordSelection}
            disabled={gameState.gameStatus !== 'playing'}
          />
        </div>
      )}

      {/* Game controls */}
      {gameState.remainingWords.length > 0 && (
        <div className="mb-6">
          <GameControls
            onShuffle={shuffleWords}
            onDeselectAll={deselectAll}
            onSubmit={submitGuess}
            selectedCount={gameState.selectedWords.length}
            disabled={gameState.gameStatus !== 'playing'}
          />
        </div>
      )}

      {/* Stats Modal */}
      <ConnectionsStatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        stats={stats}
        gameStatus={gameState.gameStatus}
        solvedCategories={gameState.solvedCategories}
        mistakesRemaining={gameState.mistakesRemaining}
      />
    </main>
  );
}

export default ConnectionsPage;
