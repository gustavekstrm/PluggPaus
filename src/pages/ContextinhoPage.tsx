import { useEffect } from 'react';
import AdBanner from '../components/AdBanner';
import { Link } from 'react-router-dom';
import QuickStats from '../components/QuickStats';

function ContextinhoPage() {
  useEffect(() => {
    document.title = 'Contextinho – Hitta Dagens Fotbollsspelare | PluggPaus';
    localStorage.setItem('lastPlayedGame', 'contextinho');
    window.scrollTo(0, 0);
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

      {/* Top Ad Banner */}
      <AdBanner slot="5092040576" className="mb-8" />

      {/* Game Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Spela Contextinho - Fotboll & AI
          </h1>
          <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            ⚽ Fotbollsspel
          </div>
        </div>

        {/* Quick Stats Component */}
        <QuickStats
          category="Fotbollsquiz"
          difficulty="Medium"
          playtime="2-5 min"
          benefit="Analytisk förmåga"
        />

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            <strong>Contextinho</strong> är fotbollsversionen av Contexto – hitta dagens hemliga fotbollsspelare med hjälp av semantisk gissning!
          </p>
          <p>
            <strong>Hur det fungerar:</strong><br />
            • Gissa en fotbollsspelares namn<br />
            • AI:n jämför din gissning med det hemliga svaret baserat på likhet<br />
            • Du ser din rankning – ju lägre nummer, desto närmre!<br />
            • Algoritmen tar hänsyn till nationalitet, klubb, position och stil<br />
            • Obegränsade försök – hitta rätt spelare!
          </p>
          <p>
            Kombinerar fotbollskunskap med analytisk problemlösning. Perfekt för fotbollsfantaster!
          </p>
        </div>

        {/* Play Button */}
        <div className="text-center">
          <a
            href="https://playfootball.games/contextinho/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold text-xl px-12 py-5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            SPELA NU →
          </a>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Öppnas på PlayFootball.games (gratis)
          </p>
        </div>
      </div>

      {/* Why Contextinho Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Varför är Contextinho perfekt för studenter?
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Analytisk förmåga</strong> - Tränar systematisk problemlösning och eliminering</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Fotbollskunskap</strong> - Lär dig mer om spelare från hela världen</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Avslappnande</strong> - Inget tidsgräns, spela i din egen takt</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Daglig utmaning</strong> - Ny spelare varje dag håller spelet fräscht</span>
          </li>
        </ul>
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
    </main>
  );
}

export default ContextinhoPage;
