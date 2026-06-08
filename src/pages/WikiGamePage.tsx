import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { useEffect } from 'react';
import QuickStats from '../components/QuickStats';

function WikiGamePage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'wikigame');
    document.title = 'The Wiki Game – Navigera Wikipedia | PluggPaus';
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
            Spela The Wiki Game - Wikipedia-Racet
          </h1>
          <div className="inline-block bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            📚 Kunskapsjakt
          </div>
        </div>

        {/* Quick Stats Component */}
        <QuickStats
          category="Kunskap"
          difficulty="Hard"
          playtime="3-5 min"
          benefit="Kreativt tänkande"
        />

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


      {/* SEO Content - Tips & FAQ */}
      <div className="space-y-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tips &amp; strategier för Wiki Game</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Gå via stora noder</strong> – artiklar som "USA", "Europa", "Krig" eller "Historia" länkar till nästan allt. Använd dem som genvägar.</li>
            <li><strong>Tänk kategorier, inte innehåll</strong> – istället för att läsa artiklarna, hoppa direkt till kategorisektionen längst ned. Kategorier ger ofta snabba vägar vidare.</li>
            <li><strong>Undvik döda grenar</strong> – smala specialämnen kan sakna vidare länkar. Välj alltid en länk som leder mot något brett och välkänt.</li>
            <li><strong>Bakåt-strategin</strong> – om du är nära målet, tänk: vilka artiklar länkas från målartikeln? Gå dit istället för att försöka ta sig direkt dit.</li>
            <li><strong>Geografi och politik är snabbvägar</strong> – de flesta ämnen kan nås via ett lands eller en stads Wikipedia-artikel, som i sin tur länkas från otaliga andra sidor.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vanliga frågor om Wiki Game</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div><strong>Vad är målet med spelet?</strong><p className="mt-1">Navigera från en Wikipedia-artikel till en annan, enbart genom att klicka på länkar inom artiklarna. Kortast väg vinner.</p></div>
            <div><strong>Finns det tidsgräns?</strong><p className="mt-1">Det beror på spelläge. I tävlingsläge tävlar du mot klockan, i casual läge spelar du i din egen takt.</p></div>
            <div><strong>Vad är ett bra resultat?</strong><p className="mt-1">Att klara banan på 4–6 klick anses vara bra. Riktiga experter klarar de flesta kombinationer på 3 klick eller färre.</p></div>
            <div><strong>Tränar spelet verkligen hjärnan?</strong><p className="mt-1">Ja! Spelet kräver associativt tänkande, kunskapsbredd och strategisk planering – alla kognitiva förmågor som är värdefulla i studier.</p></div>
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

export default WikiGamePage;
