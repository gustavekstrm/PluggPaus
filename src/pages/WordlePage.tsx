import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { useEffect, useState } from 'react';
import QuickStats from '../components/QuickStats';
import WordleGrid from '../components/wordle/WordleGrid';
import Keyboard from '../components/wordle/Keyboard';
import StatsModal from '../components/wordle/StatsModal';
import { useWordle } from '../hooks/useWordle';

function WordlePage() {
  const { gameState, stats, answer, invalidWord, handleKeyPress, getKeyboardLetterStatus } = useWordle();
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'wordle');
    document.title = 'Orda – Wordle på Svenska | PluggPaus';
  }, []);

  // Show stats automatically when the game ends
  useEffect(() => {
    if (gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') {
      const timer = setTimeout(() => setShowStats(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [gameState.gameStatus]);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Tillbaka till alla spel
        </Link>
      </div>

      {/* Playable Game Card */}
      <div className="pp-panel p-6 sm:p-10 mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Orda
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Som Wordle – fast på svenska. Gissa dagens ord på sex försök!
          </p>
          <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-semibold">
            Nytt ord varje dag
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <WordleGrid
            guesses={gameState.guesses}
            currentGuess={gameState.currentGuess}
            evaluations={gameState.evaluations}
            invalidWord={invalidWord}
          />

          {invalidWord && (
            <p className="text-center text-red-500 font-semibold mt-3">
              Ordet finns inte i ordlistan
            </p>
          )}

          {gameState.gameStatus === 'lost' && (
            <p className="text-center text-gray-700 dark:text-gray-300 font-semibold mt-4">
              Dagens ord var: <span className="uppercase font-bold">{answer}</span>
            </p>
          )}
          {gameState.gameStatus === 'won' && (
            <p className="text-center text-green-600 dark:text-green-400 font-semibold mt-4">
              Snyggt! Du klarade dagens ord 🎉
            </p>
          )}

          <div className="mt-6">
            <Keyboard onKeyPress={handleKeyPress} getLetterStatus={getKeyboardLetterStatus} />
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setShowStats(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              📊 Min statistik
            </button>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner slot="5092040576" className="mb-8" />

      {/* About the game */}
      <div className="pp-panel-soft p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Så spelar du Orda
        </h2>
        <QuickStats
          category="Ordspel"
          difficulty="Easy"
          playtime="5-10 min"
          benefit="Ordförråd & logik"
        />
        <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed mt-6">
          <p>
            Orda är PluggPaus egen svenska variant av det klassiska ordpusslet Wordle. Du har sex
            försök på dig att lista ut dagens hemliga ord på fem bokstäver – och alla spelare får
            samma ord samma dag.
          </p>
          <p>
            <strong>Så fungerar det:</strong><br />
            • Gissa ett svenskt ord på fem bokstäver<br />
            • Grön ruta = rätt bokstav på rätt plats<br />
            • Gul ruta = rätt bokstav, fel plats<br />
            • Grå ruta = bokstaven finns inte i ordet<br />
            • Du har 6 försök – kan du lösa det?
          </p>
          <p>
            Ett nytt ord släpps varje dag vid midnatt svensk tid. Perfekt som snabb studiepaus som
            tränar ordförråd, mönsterigenkänning och logiskt tänkande.
          </p>
        </div>
      </div>

      {/* Tips & FAQ */}
      <div className="space-y-6 mb-8">
        <div className="pp-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tips &amp; strategier</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Börja med vokalrika ord</strong> – startord som "salig", "toner" eller "raket" testar snabbt flera vanliga bokstäver samtidigt.</li>
            <li><strong>Undvik att återanvända grå bokstäver</strong> – varje gissning ska ge ny information. Grå bokstav = den finns inte i ordet.</li>
            <li><strong>Gula bokstäver anger position</strong> – bokstaven finns i ordet men på fel plats. Testa den på en annan position nästa gissning.</li>
            <li><strong>Tänk på ordstrukturer</strong> – svenska ord slutar ofta på -IG, -EN, -AR eller -ER. Utnyttja det i dina sista gissningar.</li>
            <li><strong>Å, Ä och Ö räknas</strong> – den svenska ordlistan innehåller alla svenska tecken, till skillnad från engelska Wordle.</li>
          </ul>
        </div>
        <div className="pp-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vanliga frågor</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div><strong>Är Orda samma sak som Wordle?</strong><p className="mt-1">Orda är inspirerat av Wordle (som ägs av New York Times) men är PluggPaus egen version med svenska ord och svensk ordlista. Allt spelas direkt här på sidan.</p></div>
            <div><strong>När kommer ett nytt ord?</strong><p className="mt-1">Varje dag vid midnatt, svensk tid. Alla spelare får samma ord samma dag.</p></div>
            <div><strong>Sparas min statistik?</strong><p className="mt-1">Ja, din svit och gissningsfördelning sparas lokalt i din webbläsare – ingen inloggning behövs.</p></div>
            <div><strong>Kostar det något?</strong><p className="mt-1">Nej, Orda är helt gratis och kräver ingen nedladdning eller registrering.</p></div>
          </div>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner slot="2861993283" className="mb-8" />

      {/* Back to games link */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center text-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Se alla spel
        </Link>
      </div>

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
