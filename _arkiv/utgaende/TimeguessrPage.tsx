import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuickStats from '../components/QuickStats';
import { useNoIndex } from '../hooks/useNoIndex';

function TimeguessrPage() {
  useNoIndex();

  useEffect(() => {
    document.title = 'Timeguessr – Gissa Plats och År i Historien | PluggPaus';
    localStorage.setItem('lastPlayedGame', 'timeguessr');
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


      {/* Game Info Card */}
      <div className="pp-panel p-8 sm:p-12 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Spela Timeguessr - Historia & Geografi
          </h1>
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🕰️ Historia & Geografi
          </div>
        </div>

        {/* Quick Stats Component */}
        <QuickStats
          category="Historia/Geografi"
          difficulty="Medium"
          playtime="2-4 min"
          benefit="Historisk kunskap"
        />

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            <strong>Timeguessr</strong> kombinerar geografi och historia i ett fascinerande spel. Gissa både plats och tidsperiod från historiska fotografier!
          </p>
          <p>
            <strong>Hur det fungerar:</strong><br />
            • Du visas ett historiskt fotografi<br />
            • Gissa VAR bilden togs – peka på kartan<br />
            • Gissa NÄR bilden togs – vilket år?<br />
            • Analysera arkitektur, fordon, kläder och miljö<br />
            • Poäng baseras på hur nära du gissar i både plats och tid
          </p>
          <p>
            Tränar visuell analys, historisk kunskap och deduktiv logik. Varje runda tar 2-4 minuter!
          </p>
        </div>

        {/* Play Button */}
        <div className="text-center">
          <a
            href="https://timeguessr.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xl px-12 py-5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            SPELA NU →
          </a>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Öppnas på Timeguessr.com (gratis)
          </p>
        </div>
      </div>

      {/* Why Timeguessr Section */}
      <div className="pp-panel-soft p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Varför är Timeguessr perfekt för studenter?
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Historisk kunskap</strong> - Lär dig känna igen historiska epoker och platser</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Visuell analys</strong> - Tränar observationsförmåga och deduktiv logik</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Dubbel utmaning</strong> - Kombinerar geografi och historia i ett spel</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Kort & effektivt</strong> - Varje runda tar 2-4 minuter, perfekt för en snabb paus</span>
          </li>
        </ul>
      </div>


      {/* SEO Content - Tips & FAQ */}
      <div className="space-y-6 mb-8">
        <div className="pp-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tips &amp; strategier för Timeguessr</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Titta på fordonsmodeller</strong> – bilmärken och -modeller är utmärkta tidsindikatorer. En VW Bubbla säger 1950–70-tal, en fyrkantig Volvo 240 säger 1970–80-tal.</li>
            <li><strong>Analysera fotokvaliteten</strong> – svartvitt = före 1970-tal (ofta), blekta färger = 1970–80-tal, skarp HD-bild = 2000-talet och framåt.</li>
            <li><strong>Klädmode som ledtråd</strong> – mode ändras tydligt per decennium. Breda slag och vida byxor signalerar 70-tal, axelvaddar och kraftiga mönster = 80-tal.</li>
            <li><strong>Arkitekturstil och teknik</strong> – antenner på tak, reklamskyltar och teknisk utrustning i bakgrunden ger tydliga periodtips.</li>
            <li><strong>Hitta kontinenten först</strong> – vegetation, infrastruktur och arkitektur avslöjar kontinent innan du försöker peka ut exakt stad eller land.</li>
          </ul>
        </div>
        <div className="pp-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vanliga frågor om Timeguessr</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div><strong>Hur beräknas poängen?</strong><p className="mt-1">Poängen baseras på två faktorer: hur nära du gissade platsen och hur nära du gissade årtalet. Maxpoäng kräver träff på båda.</p></div>
            <div><strong>Hur många rundor finns det?</strong><p className="mt-1">En standard Timeguessr-omgång består av 5 rundor med historiska fotografier från olika platser och epoker.</p></div>
            <div><strong>Vilket tidsintervall täcker spelet?</strong><p className="mt-1">Spelet täcker huvudsakligen 1900-talet fram till nutid, med fokus på decennierna 1920–2000.</p></div>
            <div><strong>Kan man förbättra sig?</strong><p className="mt-1">Absolut. Ju mer historia och geografi du lär dig, desto bättre blir du. Spelet är ett roligt sätt att träna historisk allmänbildning.</p></div>
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

export default TimeguessrPage;
