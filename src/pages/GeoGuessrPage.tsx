import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { useEffect } from 'react';
import QuickStats from '../components/QuickStats';

function GeoGuessrPage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'geoguessr');
    document.title = 'GeoGuessr – Utforska Världen | PluggPaus';
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
            Spela GeoGuessr - Utforska Världen
          </h1>
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🌍 Upptäck världen
          </div>
        </div>

        {/* Quick Stats Component */}
        <QuickStats
          category="Geografi"
          difficulty="Medium"
          playtime="5 min"
          benefit="Lokalkännedom"
        />

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            <strong>GeoGuessr</strong> är det ultimata geografispelet där du hamnar mitt i en Google Street View-bild och ska gissa var i världen du befinner dig. Vart i världen har du hamnat?
          </p>
          <p>
            <strong>Hur det fungerar:</strong><br />
            • Du släpps ut någonstans i världen via Street View<br />
            • Utforska omgivningen genom att panorera och förflytta dig<br />
            • Leta efter ledtrådar: skyltar, språk, arkitektur, natur, väderlek<br />
            • Peka på kartan där du tror att du är<br />
            • Poäng baseras på hur nära du gissar!
          </p>
          <p>
            Från avlägsna byar i Island till trafikkaoset i Tokyo - varje runda är en ny äventur. Utmana ditt lokalsinne, lär dig om världens geografi och imponera på dina vänner med kulturkännedom!
          </p>
        </div>

        {/* Play Button */}
        <div className="text-center">
          <a
            href="https://www.geoguessr.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-xl px-12 py-5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            SPELA NU →
          </a>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Öppnas på GeoGuessr.com (gratis och premium)
          </p>
        </div>
      </div>

      {/* Why GeoGuessr Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Varför är GeoGuessr perfekt för studenter?
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Geografiträning</strong> - Lär dig världens länder, städer och kulturer</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Detektivarbete</strong> - Tränar observationsförmåga och deduktion</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Reseinspiration</strong> - Upptäck platser du aldrig hört talas om</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Multiplayer</strong> - Tävla mot vänner och visa vem som är geografiexpert</span>
          </li>
        </ul>
      </div>


      {/* SEO Content - Tips & FAQ */}
      <div className="space-y-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tips &amp; strategier för GeoGuessr</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Läs vägskyltar och text</strong> – språket på skyltar avslöjar landet direkt. Kyrilliska = Ryssland/Östeuropa, arabiska = Mellanöstern, kanji = Japan/Kina.</li>
            <li><strong>Kolla vägens utseende</strong> – vilken sida kör man på? Gula mittlinjer är typiska för USA och Kanada, vita linjer för Europa.</li>
            <li><strong>Titta på vegetationen</strong> – palmer = tropisk zon, barrträd = norra halvklotet, savann = Afrika eller Australien.</li>
            <li><strong>Arkitekturens stil</strong> – husstil, färg på tak och byggnadsmaterial varierar markant mellan länder och regioner.</li>
            <li><strong>Google Street View-kamerans kvalitet</strong> – äldre, suddigare bilder är ofta från länder som indexerades tidigt (USA, Australien, Europa). Nyare HD-bilder kan indikera nyare regioner.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vanliga frågor om GeoGuessr</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div><strong>Hur beräknas poängen?</strong><p className="mt-1">Poäng baseras på hur nära din gissning är den faktiska platsen. Maxpoäng är 5 000 per runda – ju kortare avstånd, desto fler poäng.</p></div>
            <div><strong>Hur många rundor finns det?</strong><p className="mt-1">En standard GeoGuessr-omgång består av 5 rundor, vardera med en ny plats att identifiera.</p></div>
            <div><strong>Är det gratis att spela?</strong><p className="mt-1">GeoGuessr har en gratis version med begränsade rundor per dag. Premium ger obegränsad tillgång och fler spellägen.</p></div>
            <div><strong>Kan man öva på specifika länder?</strong><p className="mt-1">Ja, det finns landspecifika kartor och utmaningar. Perfekt om du studerar geografi eller vill förbättra dig på en kontinent.</p></div>
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

export default GeoGuessrPage;
