import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function WikiGamePage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'wikigame');
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
            Spela The Wiki Game - Wikipedia-Racet
          </h1>
          <div className="inline-block bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            📚 Kunskapsjakt
          </div>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            <strong>The Wiki Game</strong> är det ultimata Wikipedia-spelet där du tävlar i att klicka dig från en artikel till en annan så snabbt som möjligt. Kan du nå från "Napoleon" till "Pizza" på minsta antal klick?
          </p>
          <p>
            <strong>Hur det fungerar:</strong><br />
            • Du får en startartikel (ex. "Solsystemet")<br />
            • Du får en målartikel (ex. "Fotboll")<br />
            • Klicka endast på länkar inom Wikipedia-artiklarna<br />
            • Nå målet på så få klick som möjligt!<br />
            • Tävla mot klockan eller mot vänner
          </p>
          <p>
            Det är ett genialt sätt att utforska hur allt är kopplat på Wikipedia. Du lär dig oväntade samband och tränar förmågan att hitta kreativa vägar mellan ämnen. "Allt leder till filosofi" - men vad är den kortaste vägen?
          </p>
        </div>

        {/* Play Button */}
        <div className="text-center">
          <a
            href="https://www.thewikigame.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold text-xl px-12 py-5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            SPELA NU →
          </a>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Öppnas på TheWikiGame.com (gratis)
          </p>
        </div>
      </div>

      {/* Why Wiki Game Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Varför är The Wiki Game perfekt för studenter?
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-teal-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Kunskapsbreddning</strong> - Lär dig oväntade fakta under spelets gång</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-teal-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Strategiskt tänkande</strong> - Hitta snabbaste vägen mellan ämnen</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-teal-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Snabb & rolig</strong> - Perfekt 5-minuters mental paus</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-teal-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Multiplayer</strong> - Tävla mot klasskamrater i realtid</span>
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

export default WikiGamePage;
