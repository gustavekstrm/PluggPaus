import { use2048 } from '../../hooks/use2048';

const TILE_STYLES: Record<number, string> = {
  0: 'bg-gray-200/60 dark:bg-gray-700/40',
  2: 'bg-[#eee4da] text-gray-800',
  4: 'bg-[#ede0c8] text-gray-800',
  8: 'bg-[#f2b179] text-white',
  16: 'bg-[#f59563] text-white',
  32: 'bg-[#f67c5f] text-white',
  64: 'bg-[#f65e3b] text-white',
  128: 'bg-[#edcf72] text-white',
  256: 'bg-[#edcc61] text-white',
  512: 'bg-[#edc850] text-white',
  1024: 'bg-[#edc53f] text-white',
  2048: 'bg-[#edc22e] text-white',
};

function tileClass(v: number): string {
  return TILE_STYLES[v] ?? 'bg-[#3c3a32] text-white';
}

function fontSize(v: number): string {
  if (v >= 1024) return 'text-xl sm:text-2xl';
  if (v >= 128) return 'text-2xl sm:text-3xl';
  return 'text-3xl sm:text-4xl';
}

function Game2048Board() {
  const { board, score, best, gameOver, won, newGame, continueGame, doMove, onTouchStart, onTouchEnd } =
    use2048();

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-3">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-center min-w-[72px]">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Poäng</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">{score}</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-center min-w-[72px]">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Bäst</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">{best}</div>
          </div>
        </div>
        <button
          onClick={newGame}
          className="px-5 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md active:scale-95"
        >
          Nytt spel
        </button>
      </div>

      <div
        className="relative bg-gray-300/50 dark:bg-gray-800 rounded-xl p-2 sm:p-3 touch-none select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {board.flat().map((v, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg flex items-center justify-center font-bold ${tileClass(v)} ${fontSize(v)} transition-colors`}
            >
              {v !== 0 ? v : ''}
            </div>
          ))}
        </div>

        {(gameOver || won) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white/80 dark:bg-black/70">
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {won ? 'Du nådde 2048! 🎉' : 'Spelet är slut'}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {won && !gameOver && (
                <button
                  onClick={continueGame}
                  className="px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md active:scale-95"
                >
                  Fortsätt spela
                </button>
              )}
              <button
                onClick={newGame}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md active:scale-95 ${
                  won && !gameOver
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                    : 'text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                }`}
              >
                {won && !gameOver ? 'Börja om' : 'Spela igen'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* On-screen arrows for touch devices */}
      <div className="mt-5 grid grid-cols-3 gap-2 w-max mx-auto sm:hidden">
        <div />
        <button onClick={() => doMove('up')} className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xl font-bold active:scale-95 shadow" aria-label="Upp">↑</button>
        <div />
        <button onClick={() => doMove('left')} className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xl font-bold active:scale-95 shadow" aria-label="Vänster">←</button>
        <button onClick={() => doMove('down')} className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xl font-bold active:scale-95 shadow" aria-label="Ner">↓</button>
        <button onClick={() => doMove('right')} className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xl font-bold active:scale-95 shadow" aria-label="Höger">→</button>
      </div>

      <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
        Använd piltangenterna på datorn eller svep på mobilen. Slå ihop lika brickor och nå 2048!
      </p>
    </div>
  );
}

export default Game2048Board;
