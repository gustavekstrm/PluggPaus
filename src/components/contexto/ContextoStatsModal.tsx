import { useState } from 'react';
import Modal from '../Modal';
import type { GameStats } from '../../types/contexto';
import { useCountdown } from '../../hooks/useCountdown';
import { getTodayDateString, puzzleNumber } from '../../utils/dailyDate';

interface ContextoStatsModalProps {
  isOpen: boolean;
  /** Pusslets datum – styr numret i delningstexten (arkivomgångar har äldre nummer). */
  date?: string;
  onClose: () => void;
  stats: GameStats;
  gameStatus: 'playing' | 'won' | 'gaveup';
  guessCount: number;
}

function ContextoStatsModal({ isOpen, date, onClose, stats, gameStatus, guessCount }: ContextoStatsModalProps) {
  const countdown = useCountdown();
  const [copied, setCopied] = useState(false);


  const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

  const generateShareText = async () => {
    if (gameStatus !== 'won') return;

    const nr = puzzleNumber(date ?? getTodayDateString());
    const text = `Kontext #${nr}\n🎯 Löst på ${guessCount} gissningar\n\nSpela på pluggpaus.se`;

    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* spelaren avbröt delningen, eller så nekades urklippet – inget att göra */
    }
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
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.averageGuesses}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Snitt</div>
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

export default ContextoStatsModal;
