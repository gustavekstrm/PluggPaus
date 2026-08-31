import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { useEffect, useState } from 'react';
import QuickStats from '../components/QuickStats';
import WordGrid from '../components/connections/WordGrid';
import GameControls from '../components/connections/GameControls';
import SolvedCategories from '../components/connections/SolvedCategories';
import ConnectionsStatsModal from '../components/connections/ConnectionsStatsModal';
import { useConnections } from '../hooks/useConnections';

function ConnectionsPage() {
  const { gameState, stats, toggleWordSelection, deselectAll, shuffleWords, submitGuess } = useConnections();
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'connections');
    document.title = 'Kopplingar – Hitta Ord som Hör Ihop | PluggPaus';
  }, []);

  useEffect(() => {
    if (gameState && (gameState.gameStatus === 'won' || gameState.gameStatus === 'lost')) {
      const timer = setTimeout(() => setShowStats(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [gameState?.gameStatus]);

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
            Kopplingar
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Som Connections – fast på svenska. Hitta fyra grupper av fyra ord som hör ihop!
          </p>
          <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-semibold">
            Nytt pussel varje dag
          </div>
        </div>

        {gameState && (
          <div className="max-w-2xl mx-auto">
            <SolvedCategories categories={gameState.solvedCategories} />

            {gameState.remainingWords.length > 0 && (
              <WordGrid
                words={gameState.remainingWords}
                selectedWords={gameState.selectedWords}
                shakingWords={gameState.shakingWords}
                onWordClick={toggleWordSelection}
                disabled={gameState.gameStatus !== 'playing'}
              />
            )}

            {/* Mistakes remaining */}
            {gameState.gameStatus === 'playing' && (
              <div className="flex items-center justify-center gap-2 my-4 text-gray-700 dark:text-gray-300">
                <span className="text-sm font-medium">Försök kvar:</span>
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full ${i < gameState.mistakesRemaining
                      ? 'bg-purple-600'
                      : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                  />
                ))}
              </div>
            )}

            {gameState.gameStatus === 'playing' && (
              <GameControls
                onShuffle={shuffleWords}
                onDeselectAll={deselectAll}
                onSubmit={submitGuess}
                selectedCount={gameState.selectedWords.length}
                disabled={gameState.gameStatus !== 'playing'}
              />
            )}

            {gameState.gameStatus === 'won' && (
              <p className="text-center text-green-600 dark:text-green-400 font-semibold mt-4">
                Alla grupper lösta – snyggt jobbat! 🎉
              </p>
            )}
            {gameState.gameStatus === 'lost' && (
              <p className="text-center text-red-500 font-semibold mt-4">
                Slut på försök – nytt pussel kommer imorgon!
              </p>
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
        )}
      </div>

      {/* Ad Banner */}
      <AdBanner slot="5092040576" className="mb-8" />

      {/* About the game */}
      <div className="pp-panel-soft p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Så spelar du Kopplingar
        </h2>
        <QuickStats
          category="Mönsterigenkänning"
          difficulty="Medium"
          playtime="5-10 min"
          benefit="Kreativt tänkande"
        />
        <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed mt-6">
          <p>
            Kopplingar är PluggPaus egen svenska version av kategoripusslet Connections. Gruppera 16
            ord i fyra kategorier om fyra ord och hitta de dolda sambanden.
          </p>
          <p>
            <strong>Så fungerar det:</strong><br />
            • Du ser 16 ord på skärmen<br />
            • Markera fyra ord som du tror hör ihop och tryck "Gissa"<br />
            • Varje grupp har ett tema (t.ex. musikstilar, saker i köket...)<br />
            • Se upp – ord kan verka höra till flera grupper!<br />
            • Fyra felgissningar och spelet är slut
          </p>
          <p>
            Tränar kreativt tänkande, mönsterigenkänning och mental flexibilitet. Nytt pussel varje dag!
          </p>
        </div>
      </div>

      {/* Tips & FAQ */}
      <div className="space-y-6 mb-8">
        <div className="pp-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tips &amp; strategier</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Börja med den mest uppenbara gruppen</strong> – leta efter ord som tydligt hör ihop och lös dem först. Det minskar röran och gör resterande grupper tydligare.</li>
            <li><strong>Akta dig för röda sillar</strong> – ord kan verka passa in i en grupp men egentligen tillhöra en annan. Pusslet är designat för att lura dig med överlappande teman.</li>
            <li><strong>Tänk på dubbla betydelser</strong> – ett ord kan vara ett adjektiv, ett substantiv och ett verb. Ofta är det ordets mindre uppenbara betydelse som är rätt.</li>
            <li><strong>Spara den svåraste gruppen till sist</strong> – löser du de tre enklare grupperna först är den sista kvar av sig själv.</li>
            <li><strong>Läs alla ord innan du väljer</strong> – skumma igenom alla 16 ord och låt hjärnan jobba i bakgrunden innan du bestämmer dig.</li>
          </ul>
        </div>
        <div className="pp-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vanliga frågor</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div><strong>Är Kopplingar samma sak som Connections?</strong><p className="mt-1">Kopplingar är inspirerat av NYT Connections men är PluggPaus egen version med svenska ord och egna pussel. Allt spelas direkt här på sidan.</p></div>
            <div><strong>Hur många grupper finns det?</strong><p className="mt-1">Det finns alltid exakt fyra grupper med fyra ord vardera – totalt 16 ord att sortera.</p></div>
            <div><strong>Hur många misstag tillåts?</strong><p className="mt-1">Du kan göra fyra misstag innan spelet tar slut. Använd dem klokt – spara dem till osäkra gissningar.</p></div>
            <div><strong>Är det ett nytt pussel varje dag?</strong><p className="mt-1">Ja, ett nytt pussel varje dag ur vår samling på 50 handskrivna svenska pussel. Samlingen växer efter hand.</p></div>
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

      {gameState && (
        <ConnectionsStatsModal
          isOpen={showStats}
          onClose={() => setShowStats(false)}
          stats={stats}
          gameStatus={gameState.gameStatus}
          solvedCategories={gameState.solvedCategories}
          mistakesRemaining={gameState.mistakesRemaining}
        />
      )}
    </main>
  );
}

export default ConnectionsPage;
