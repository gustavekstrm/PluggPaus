import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import QuickStats from '../components/QuickStats';

function ContextoPage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'contexto');
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

      {/* Top Ad Banner Placeholder */}
      <div className="ad-banner-top mb-8">
        <span>Annons</span>
      </div>

      {/* Game Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Spela Contexto - Gissa med AI
          </h1>
          <div className="inline-block bg-gradient-to-r from-pink-100 to-indigo-100 dark:from-pink-900/30 dark:to-indigo-900/30 text-pink-800 dark:text-pink-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Drivs av artificiell intelligens
          </div>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-8 text-center">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Gissa det hemliga ordet med hjälp av AI. Varje gissning rankas efter semantisk likhet – ju närmare #1, desto varmare!
          </p>
        </div>

        {/* Quick Stats Component */}
        <QuickStats
          category="AI Word Game"
          difficulty="Medium"
          playtime="5-15 min"
          benefit="Semantic reasoning"
        />

        {/* SEO Footer Section */}
        <section className="mb-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Contexto är ett unikt ordspel drivet av maskininlärning som jämför ord baserat på betydelse och kontext, inte stavning. Perfekt för att förstå hur AI tolkar språk samtidigt som du tränar semantisk förståelse och ordassociationer. Inget tidsgräns – spela i din egen takt.
          </p>
        </section>

        {/* Play Button */}
        <div className="text-center">
          <a
            href="https://contexto.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-700 hover:to-indigo-700 text-white font-bold text-xl px-12 py-5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            SPELA NU →
          </a>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Öppnas på Contexto.me (gratis)
          </p>
        </div>
      </div>

      {/* Why Contexto Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Varför är Contexto perfekt för studenter?
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-pink-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Språkkänsla</strong> - Tränar semantisk förståelse och ordassociationer</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-pink-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>AI-driven</strong> - Lär dig hur maskininlärning tolkar språk</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-pink-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Unikt koncept</strong> - Varje gissning ger direkt feedback</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-pink-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Avslappnande</strong> - Inget tidsgräns, spela i din egen takt</span>
          </li>
        </ul>
      </div>

      {/* Bottom Ad Banner Placeholder */}
      <div className="ad-banner-top mb-8">
        <span>Annons</span>
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

export default ContextoPage;
