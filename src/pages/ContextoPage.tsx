import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { useEffect } from 'react';
import QuickStats from '../components/QuickStats';

function ContextoPage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'contexto');
    document.title = 'Contexto – Gissa Ordet via Kontext | PluggPaus';
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
            Spela Contexto - Gissa med AI
          </h1>
          <div className="inline-block bg-gradient-to-r from-pink-100 to-indigo-100 dark:from-pink-900/30 dark:to-indigo-900/30 text-pink-800 dark:text-pink-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Drivs av artificiell intelligens
          </div>
        </div>

        {/* Quick Stats Component */}
        <QuickStats
          category="Ordspel"
          difficulty="Medium"
          playtime="5-15 min"
          benefit="Ordförståelse"
        />

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            <strong>Contexto</strong> är ett unikt AI-drivet ordspel där du gissar det hemliga ordet baserat på semantisk likhet. Varje gissning rankas – ju närmare #1, desto varmare!
          </p>
          <p>
            <strong>Hur det fungerar:</strong><br />
            • Gissa vilket ord som är det hemliga målet<br />
            • AI:n jämför ditt ord baserat på <em>betydelse</em>, inte stavning<br />
            • Du ser din rankning – tusentals ord bort eller nära #1?<br />
            • Inget tidsgräns – spela i din egen takt<br />
            • Obegränsade försök!
          </p>
          <p>
            Tränar semantisk förståelse och ordassociationer. Perfekt för att förstå hur AI tolkar språk.
          </p>
        </div>

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


      {/* SEO Content - Tips & FAQ */}
      <div className="space-y-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tips &amp; strategier för Contexto</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Börja brett</strong> – starta med ord inom en vanlig kategori (djur, mat, sport) för att snabbt identifiera vilket område det hemliga ordet tillhör.</li>
            <li><strong>Använd rankingen som karta</strong> – rang 1–50 är mycket nära. Rang 51–200 är på rätt spår. Över 500 är du långt ifrån.</li>
            <li><strong>Testa synonymer</strong> – om "glad" ger rang 150, testa "lycklig", "nöjd", "belåten". Semantiskt nära ord avslöjar snabbt rätt riktning.</li>
            <li><strong>Tänk på sammanhang, inte bara definitioner</strong> – Contexto bygger på ord som ofta förekommer tillsammans i text, inte ordböckens definitioner.</li>
            <li><strong>Dra nytta av associationer</strong> – ord som ofta dyker upp i samma meningar som svaret rankas högt. Tänk: vad skriver man om när man skriver om det här ordet?</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vanliga frågor om Contexto</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div><strong>Vad innebär ranknumret?</strong><p className="mt-1">Ranknumret visar hur semantiskt nära ditt ord är det hemliga svaret. Rang 1 är perfekt matchning, höga nummer är långt ifrån.</p></div>
            <div><strong>Finns det en gränser för antal gissningar?</strong><p className="mt-1">Nej, du kan gissa hur många gånger du vill. Utmaningen är att klara det på så få gissningar som möjligt.</p></div>
            <div><strong>Är det samma ord för alla?</strong><p className="mt-1">Ja, alla spelare världen över gissar samma hemliga ord varje dag.</p></div>
            <div><strong>Vad är en bra poäng?</strong><p className="mt-1">Under 20 gissningar är utmärkt. Under 50 är bra. Nybörjare brukar behöva 50–100 gissningar.</p></div>
          </div>
        </div>
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

export default ContextoPage;
