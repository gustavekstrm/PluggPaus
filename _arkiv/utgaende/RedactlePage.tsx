import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import QuickStats from '../components/QuickStats';
import { useNoIndex } from '../hooks/useNoIndex';

function RedactlePage() {
  useNoIndex();

  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'redactle');
    document.title = 'Redactle – Avslöja den Dolda Artikeln | PluggPaus';
  }, []);

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


      {/* Game Info Card */}
      <div className="pp-panel p-8 sm:p-12 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Spela Redactle - Avslöja Artikeln
          </h1>
          <div className="inline-block bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🕵️ Hemlig artikel
          </div>
        </div>

        {/* Quick Stats Component */}
        <QuickStats
          category="Logik"
          difficulty="Hard"
          playtime="10 min"
          benefit="Deduktiv logik"
        />

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            <strong>Redactle</strong> är ett unikt pusselspel där en hel Wikipedia-artikel är censurerad och du måste avslöja den dolda artikeln genom att gissa ord ett i taget. Varje ord du gissar avslöjas i hela texten!
          </p>
          <p>
            <strong>Hur det fungerar:</strong><br />
            • En Wikipedia-artikel är helt maskerad (████████)<br />
            • Gissa ett ord - om det finns i artikeln avslöjas ALLA förekomster<br />
            • Använd kontexten för att lista ut vad artikeln handlar om<br />
            • Målet: Gissa artikelns titel!<br />
            • Vanliga ord (a, the, is) avslöjas automatiskt
          </p>
          <p>
            Det är som en kombination av Wordle och detektivarbete. Börja med breda ord som "country", "war", "music" för att få kontext. Sedan kan du smalna av med mer specifika termer tills du listar ut ämnet!
          </p>
        </div>

        {/* Play Button */}
        <div className="text-center">
          <a
            href="https://redactle.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-bold text-xl px-12 py-5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            SPELA NU →
          </a>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Öppnas på Redactle.net (gratis)
          </p>
        </div>
      </div>

      {/* Why Redactle Section */}
      <div className="pp-panel-soft p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Varför är Redactle perfekt för studenter?
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Ordförrådsträning</strong> - Utöka ditt engelska vokabulär</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Kontextuellt tänkande</strong> - Tränar förmågan att tolka sammanhang</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Deduktiv logik</strong> - Tränar problemlösning och slutledningsförmåga</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Unikt</strong> - Varje dag en ny artikel från Wikipedia</span>
          </li>
        </ul>
      </div>


      {/* SEO Content - Tips & FAQ */}
      <div className="space-y-6 mb-8">
        <div className="pp-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tips &amp; strategier för Redactle</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Börja med de vanligaste orden</strong> – gissa "the", "of", "and", "in", "is" och "was" direkt. De avslöjar artikelns struktur och ger sammanhang gratis.</li>
            <li><strong>Titta på meningsstrukturen</strong> – antalet ord i en mening och interpunktion avslöjar ofta om texten är faktabaserad, historisk eller vetenskaplig.</li>
            <li><strong>Gissa ordklasser strategiskt</strong> – gissa vanliga verb ("born", "known", "used"), adjektiv ("large", "major", "national") för att snabbt fylla ut texten.</li>
            <li><strong>Räkna blanketter</strong> – ett redigerat ord med 10+ bokstäver är troligen ett substantiv eller egennamn. Korta redaktioner är ofta prepositioner eller artiklar.</li>
            <li><strong>Var uppmärksam på siffror</strong> – år och datum är ofta synliga och ger ledtrådar om tidsperiod och ämne.</li>
          </ul>
        </div>
        <div className="pp-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vanliga frågor om Redactle</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div><strong>Vad är redigerat i artikeln?</strong><p className="mt-1">Alla innehållsord (substantiv, verb, adjektiv, egennamn) är dolda. Strukturord som kommatecken och siffror är ofta synliga.</p></div>
            <div><strong>Hur många gissningar har man?</strong><p className="mt-1">Obegränsade gissningar, men spelet räknar och visar ditt totala antal. Utmaningen är att klara det på så få som möjligt.</p></div>
            <div><strong>Är det en ny artikel varje dag?</strong><p className="mt-1">Ja, varje dag publiceras en ny hemlig Wikipedia-artikel att avkoda.</p></div>
            <div><strong>Hur svårt är spelet?</strong><p className="mt-1">Redactle är ett av de svårare ordspelen. Genomsnittliga spelare behöver 50–150 gissningar. Experter klarar det ibland på under 20.</p></div>
          </div>
        </div>
      </div>


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
    </main>
  );
}

export default RedactlePage;
