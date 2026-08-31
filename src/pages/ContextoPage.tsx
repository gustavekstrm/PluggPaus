import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { useEffect, useState } from 'react';
import QuickStats from '../components/QuickStats';
import GuessInput from '../components/contexto/GuessInput';
import GuessesList from '../components/contexto/GuessesList';
import ContextoStatsModal from '../components/contexto/ContextoStatsModal';
import { useContexto } from '../hooks/useContexto';

function ContextoPage() {
  const { puzzle, gameState, stats, error, loading, makeGuess, getHint, giveUp } = useContexto();
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'contexto');
    document.title = 'Kontext – Gissa Ordet via Ledtrådar | PluggPaus';
  }, []);

  useEffect(() => {
    if (gameState.gameStatus === 'won' || gameState.gameStatus === 'gaveup') {
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
            Kontext
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Som Contexto – fast på svenska. Gissa det hemliga ordet, ju närmare i betydelse desto bättre rank!
          </p>
          <div className="inline-block bg-gradient-to-r from-pink-100 to-indigo-100 dark:from-pink-900/30 dark:to-indigo-900/30 text-pink-800 dark:text-pink-200 px-4 py-2 rounded-full text-sm font-semibold">
            Nytt hemligt ord varje dag
          </div>
        </div>

        <div className="max-w-xl mx-auto">
          <GuessInput
            onGuess={makeGuess}
            disabled={loading || gameState.gameStatus !== 'playing'}
            error={error}
          />

          {loading && (
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm my-4">
              Laddar dagens ord…
            </p>
          )}

          {gameState.gameStatus === 'won' && puzzle && (
            <p className="text-center text-green-600 dark:text-green-400 font-semibold my-4">
              Ordet var "{puzzle.targetWord}" – klarat på {gameState.guesses.length} gissningar! 🎉
            </p>
          )}

          {gameState.gameStatus === 'gaveup' && puzzle && (
            <p className="text-center text-gray-600 dark:text-gray-300 font-semibold my-4">
              Ordet var "{puzzle.targetWord}". Nytt ord i morgon.
            </p>
          )}

          <div className="mt-6">
            <GuessesList
              guesses={gameState.guesses}
              targetWord={puzzle?.targetWord ?? ''}
            />
          </div>

          {gameState.gameStatus === 'playing' && gameState.guesses.length > 0 && (
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={getHint}
                className="px-5 py-2.5 rounded-lg font-medium text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
              >
                💡 Ledtråd
              </button>
              <button
                onClick={giveUp}
                className="px-5 py-2.5 rounded-lg font-medium text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Ge upp
              </button>
            </div>
          )}

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
          Så spelar du Kontext
        </h2>
        <QuickStats
          category="Ordspel"
          difficulty="Medium"
          playtime="5-15 min"
          benefit="Ordförståelse"
        />
        <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed mt-6">
          <p>
            Kontext är PluggPaus egen svenska variant av ordspelet Contexto. Du gissar det hemliga
            ordet baserat på semantisk likhet – varje gissning rankas efter hur nära den ligger i
            betydelse. Ju närmare #1, desto varmare!
          </p>
          <p>
            <strong>Så fungerar det:</strong><br />
            • Skriv in ett ord och se dess rank<br />
            • Ranken bygger på ordets <em>betydelse</em>, inte stavning<br />
            • Låg rank = nära det hemliga ordet, hög rank = långt ifrån<br />
            • Ingen tidsgräns – spela i din egen takt<br />
            • Obegränsat antal försök, och ledtrådar om du kör fast
          </p>
          <p>
            Tränar semantisk förståelse och ordassociationer – och är beroendeframkallande på bästa sätt.
          </p>
        </div>
      </div>

      {/* Tips & FAQ */}
      <div className="space-y-6 mb-8">
        <div className="pp-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tips &amp; strategier</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Börja brett</strong> – starta med ord inom vanliga kategorier (djur, mat, sport, känslor) för att snabbt identifiera vilket område det hemliga ordet tillhör.</li>
            <li><strong>Använd rankingen som karta</strong> – rang 1–10 är mycket nära. Rang 11–100 är på rätt spår. Höga tal betyder att du letar i fel område.</li>
            <li><strong>Testa synonymer</strong> – om "glad" ger bra rank, testa "lycklig", "nöjd", "belåten". Semantiskt nära ord avslöjar snabbt rätt riktning.</li>
            <li><strong>Tänk på sammanhang, inte bara definitioner</strong> – spelet bygger på ord som hör ihop i betydelse och sammanhang, inte ordbokens definitioner.</li>
            <li><strong>Använd ledtrådarna klokt</strong> – kör du fast kan en ledtråd öppna ett helt nytt spår att följa.</li>
          </ul>
        </div>
        <div className="pp-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vanliga frågor</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div><strong>Är Kontext samma sak som Contexto?</strong><p className="mt-1">Kontext är inspirerat av Contexto men är PluggPaus egen version med svenska ord. Allt spelas direkt här på sidan.</p></div>
            <div><strong>Vad innebär ranknumret?</strong><p className="mt-1">Ranknumret visar hur semantiskt nära ditt ord är det hemliga svaret. Rang 1 är själva ordet, höga nummer är långt ifrån.</p></div>
            <div><strong>Finns det en gräns för antal gissningar?</strong><p className="mt-1">Nej, du kan gissa hur många gånger du vill. Utmaningen är att klara det på så få gissningar som möjligt.</p></div>
            <div><strong>Vad är en bra poäng?</strong><p className="mt-1">Under 20 gissningar är utmärkt. Under 50 är bra. Nybörjare brukar behöva fler – det är helt normalt.</p></div>
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
