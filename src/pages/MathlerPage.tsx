import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { useEffect } from 'react';
import QuickStats from '../components/QuickStats';

function MathlerPage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'mathler');
    document.title = 'Mathler – Wordle med Matematik | PluggPaus';
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
      <AdBanner slot="5092040576" className="mb-8" />

      {/* Game Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Spela Mathler - Wordle för Mattenördar
          </h1>
          <div className="inline-block bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🧮 Matematisk utmaning
          </div>
        </div>

        {/* Quick Stats Component */}
        <QuickStats
          category="Matematik"
          difficulty="Medium"
          playtime="2 min"
          benefit="Mental aritmetik"
        />

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            <strong>Mathler</strong> är Wordle för matematikälskare! Istället för att gissa ord, ska du hitta den dolda uträkningen som ger ett visst resultat. Perfekt för dig som älskar siffror lika mycket som bokstäver!
          </p>
          <p>
            <strong>Hur det fungerar:</strong><br />
            • Du får ett resultat (ex. "25")<br />
            • Gissa en 6-teckens uträkning (ex. "12+13=" eller "5*5+0=")<br />
            • Grön = rätt siffra/operator på rätt plats<br />
            • Gul = rätt siffra/operator, fel plats<br />
            • Grå = finns inte i uträkningen
          </p>
          <p>
            Det kräver både matematik-kunskap och logiskt tänkande. Ska du använda multiplikation, addition eller kanske division? Varje gissning ger värdefulla ledtrådar om vilka siffror och operatorer som ingår. Ett perfekt sätt att hålla matematikhjärnan vaken!
          </p>
        </div>

        {/* Play Button */}
        <div className="text-center">
          <a
            href="https://www.mathler.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold text-xl px-12 py-5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            SPELA NU →
          </a>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Öppnas på Mathler.com (gratis)
          </p>
        </div>
      </div>

      {/* Why Mathler Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Varför är Mathler perfekt för studenter?
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Räkneövning</strong> - Tränar grundläggande aritmetik på ett roligt sätt</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Operator-förståelse</strong> - Lär dig hur +, -, *, / samverkar</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Mental aritmetik</strong> - Håller hjärnan skarp inför tentor</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Nytt varje dag</strong> - Daglig matematiköst som tar bara några minuter</span>
          </li>
        </ul>
      </div>

      {/* Bottom Ad Banner Placeholder */}
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

export default MathlerPage;
