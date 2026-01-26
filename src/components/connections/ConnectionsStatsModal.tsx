import type { GameStats, Category } from '../../types/connections';
import { useCountdown } from '../../hooks/useCountdown';

interface ConnectionsStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  gameStatus: 'playing' | 'won' | 'lost';
  solvedCategories: Category[];
  mistakesRemaining: number;
}

function ConnectionsStatsModal({
  isOpen,
  onClose,
  stats,
  gameStatus,
  solvedCategories,
  mistakesRemaining,
}: ConnectionsStatsModalProps) {
  const countdown = useCountdown();

  if (!isOpen) return null;

  const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

  const generateShareText = () => {
    if (gameStatus === 'playing') return;

    const difficultyEmojis: Record<string, string> = {
      easy: '🟨',
      medium: '🟩',
      hard: '🟦',
      tricky: '🟪',
    };

    const grid = solvedCategories
      .map((cat) => difficultyEmojis[cat.difficulty] || '⬜')
      .join('');

    const mistakes = 4 - mistakesRemaining;
    const result = gameStatus === 'won' ? `${mistakes} ${mistakes === 1 ? 'mistake' : 'mistakes'}` : 'X';

    const text = `PluggPaus Connections\n${grid}\n${result}\n\nUtmana mig på pluggpaus.se`;

    navigator.clipboard.writeText(text);
    alert('Kopierat till urklipp!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Statistik</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.gamesPlayed}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Spelade</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{winRate}%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Vinster</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.currentStreak}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Nuvarande</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.maxStreak}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Bästa</div>
          </div>
        </div>

        {/* Countdown and share */}
        {gameStatus !== 'playing' && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="text-center mb-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Nästa pussel om</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{countdown}</div>
            </div>
            <button
              onClick={generateShareText}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Dela resultat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectionsStatsModal;
