import { useState } from 'react';
import Modal from '../Modal';
import type { GameStats, Category } from '../../types/connections';
import { useCountdown } from '../../hooks/useCountdown';
import { getTodayDateString, puzzleNumber } from '../../utils/dailyDate';
import { shareResult } from '../../utils/share';

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
  const [copied, setCopied] = useState(false);


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
    const result = gameStatus === 'won' ? `${mistakes} ${mistakes === 1 ? 'miss' : 'missar'}` : 'X';

    const nr = puzzleNumber(getTodayDateString());
    const text = `Kopplingar #${nr}\n${grid}\n${result}\n\nSpela på pluggpaus.se`;

    void shareResult(text).then((r) => {
      if (r !== 'copied') return;
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Statistik">

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
              {copied ? 'Kopierat ✓' : 'Dela resultat'}
            </button>
          </div>
        )}
    </Modal>
  );
}

export default ConnectionsStatsModal;
