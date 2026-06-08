import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { useEffect } from 'react';
import QuickStats from '../components/QuickStats';

function ConnectionsPage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'connections');
    document.title = 'Connections – Hitta Ord som Hör Ihop | PluggPaus';
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
            Spela Connections - Hitta Sambanden
          </h1>
          <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Nytt pussel varje dag
          </div>
        </div>

        {/* Quick Stats Component */}
        <QuickStats
          category="Mönsterigenkänning"
          difficulty="Medium"
          playtime="5-10 min"
          benefit="Kreativt tänkande"
        />

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            <strong>Connections</strong> är New York Times ordpussel-sensation. Gruppera 16 ord i fyra kategorier om fyra ord och hitta de dolda sambanden.
          </p>
          <p>
            <strong>Hur det fungerar:</strong><br />
            • Du ser 16 ord på skärmen<br />
            • Hitta fyra grupper om fyra ord som hör ihop<br />
            • Varje grupp har ett tema (ex. typer av musik, filmtitlar...)<br />
            • Se upp – ord kan verka höra till flera grupper!<br />
            • Fyra felgissningar och spelet är slut
          </p>
          <p>
            Tränar kreativt tänkande, mönsterigenkänning och mental gymnastik. Nytt pussel varje dag!
          </p>
        </div>

        {/* Play Button */}
        <div className="text-center">
          <a
            href="https://www.nytimes.com/games/connections"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl px-12 py-5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            SPELA NU →
          </a>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Öppnas på New York Times (gratis)
          </p>
        </div>
      </div>

      {/* Why Connections Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Varför är Connections perfekt för studenter?
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Kreativt tänkande</strong> - Tränar förmågan att se mönster och samband</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Mental gymnastik</strong> - Aktiverar olika delar av hjärnan samtidigt</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Snabbt & roligt</strong> - Ta en paus på 10 minuter och kom tillbaka fräschare</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Utmanande</strong> - Varje pussel är unikt och ger känsla av prestation</span>
          </li>
        </ul>
      </div>


      {/* SEO Content - Tips & FAQ */}
      <div className="space-y-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tips &amp; strategier för Connections</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Börja med den mest uppenbara gruppen</strong> – leta efter ord som tydligt hör ihop och lös dem först. Det minskar röran och gör resterande grupper tydligare.</li>
            <li><strong>Akta dig för röda sillar</strong> – ord kan verka passa in i en grupp men egentligen tillhöra en annan. Connections är designat för att lura dig med överlappande teman.</li>
            <li><strong>Tänk på dubbla betydelser</strong> – ett ord kan vara ett adjektiv, ett substantiv och ett verb. Ofta är det ordets mindre uppenbara betydelse som är rätt.</li>
            <li><strong>Spara lila gruppen till sist</strong> – den svåraste kategorin (lila) är alltid knepigast. Löser du de tre enklare grupperna först är lila kvar av sig själv.</li>
            <li><strong>Läs alla ord innan du väljer</strong> – skumma igenom alla 16 ord och låt hjärnan jobba i bakgrunden innan du bestämmer dig.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vanliga frågor om Connections</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div><strong>Hur många grupper finns det?</strong><p className="mt-1">Det finns alltid exakt fyra grupper med fyra ord vardera – totalt 16 ord att sortera.</p></div>
            <div><strong>Vad betyder färgerna?</strong><p className="mt-1">Gul är lättast, grön är medel, blå är svår och lila är svårast. Lila innehåller alltid en lömsk twist.</p></div>
            <div><strong>Hur många misstag tillåts?</strong><p className="mt-1">Du kan göra fyra misstag innan spelet tar slut. Använd dem klokt – spara dem till osäkra gissningar.</p></div>
            <div><strong>Är det ett nytt pussel varje dag?</strong><p className="mt-1">Ja, ett nytt Connections-pussel publiceras dagligen med helt nya ord och kategorier.</p></div>
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

export default ConnectionsPage;
