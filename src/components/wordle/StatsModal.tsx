import { useState } from 'react';
import Modal from '../Modal';
import type { GameStats, GuessLetter } from '../../types/wordle';
import { useCountdown } from '../../hooks/useCountdown';
import { getTodayDateString, puzzleNumber } from '../../utils/dailyDate';
import { shareResult } from '../../utils/share';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  gameStatus: 'playing' | 'won' | 'lost';
  evaluations: GuessLetter[][];
}

function StatsModal({ isOpen, onClose, stats, gameStatus, evaluations }: StatsModalProps) {
  const countdown = useCountdown();
  const [copied, setCopied] = useState(false);


  const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

  const maxGuesses = Math.max(...Object.values(stats.guessDistribution));

  const generateShareText = () => {
    if (gameStatus === 'playing') return;

    const emoji = evaluations
      .map((row) =>
        row
          .map((item) => {
            switch (item.status) {
              case 'correct':
                return '🟩';
              case 'present':
                return '🟨';
              default:
                return '⬜';
            }
          })
          .join('')
      )
      .join('\n');

    const attempts = gameStatus === 'won' ? evaluations.length : 'X';
    const nr = puzzleNumber(getTodayDateString());
    const text = `Orda #${nr} ${attempts}/6\n\n${emoji}\n\nSpela på pluggpaus.se`;

    void shareResult(text).then((result) => {
      if (result !== 'copied') return;
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

        {/* Guess distribution */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Gissningsfördelning</h3>
          {Object.entries(stats.guessDistribution).map(([guesses, count]) => (
            <div key={guesses} className="flex items-center gap-2 mb-1">
              <div className="w-4 text-sm text-gray-900 dark:text-white">{guesses}</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded">
                <div
                  className="bg-green-600 text-white text-right pr-2 rounded text-sm font-bold h-6 flex items-center justify-end"
                  style={{
                    width: maxGuesses > 0 ? `${Math.max((count / maxGuesses) * 100, count > 0 ? 10 : 0)}%` : '0%',
                  }}
                >
                  {count > 0 ? count : ''}
                </div>
              </div>
            </div>
          ))}
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

export default StatsModal;
