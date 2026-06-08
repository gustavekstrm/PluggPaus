import { useEffect } from 'react';
import AdBanner from '../components/AdBanner';
import { Link } from 'react-router-dom';
import QuickStats from '../components/QuickStats';

function StatlePage() {
  useEffect(() => {
    document.title = 'Statle – Pokémon Stats Quiz | PluggPaus';
    localStorage.setItem('lastPlayedGame', 'statle');
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
            Spela Statle - Pokémon Stats Quiz
          </h1>
          <div className="inline-block bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🎮 Pokémon Quiz
          </div>
        </div>

        {/* Quick Stats Component */}
        <QuickStats
          category="Pokémon Quiz"
          difficulty="Medium"
          playtime="1-3 min"
          benefit="Mönsterigenkänning"
        />

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            <strong>Statle</strong> är ett Pokémon-quiz som utmanar dina kunskaper om Base Stats. Gissa vilken stat som är högst för varje Pokémon och bygg upp din streak!
          </p>
          <p>
            <strong>Hur det fungerar:</strong><br />
            • Du visas en Pokémon med sina Base Stats<br />
            • Gissa vilken stat (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed) som är högst<br />
            • Rätt svar förlänger din streak!<br />
            • Använd dina kunskaper om Pokémon-typer och evolutionslinjer<br />
            • En runda tar bara 1-3 minuter
          </p>
          <p>
            Tränar snabb slutledningsförmåga och mönsterigenkänning. Perfekt för korta mikropauser!
          </p>
        </div>

        {/* Play Button */}
        <div className="text-center">
          <a
            href="https://statle.fun/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xl px-12 py-5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            SPELA NU →
          </a>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Öppnas på Statle.fun (gratis)
          </p>
        </div>
      </div>

      {/* Why Statle Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Varför är Statle perfekt för studenter?
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Snabb paus</strong> - Perfekt för en 1-3 minuters mikropaus mellan studiesessioner</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Mönsterigenkänning</strong> - Tränar förmågan att snabbt klassificera och jämföra data</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Nostalgi</strong> - Rolig nostalgitripp som ger positiv energi inför mer plugg</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong>Streakbygge</strong> - Motiverande vinstsvit skapar känsla av prestation</span>
          </li>
        </ul>
      </div>


      {/* SEO Content - Tips & FAQ */}
      <div className="space-y-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tips &amp; strategier för Statle</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Lär dig legendärernas stats</strong> – legendariska Pokémon (Mewtwo, Rayquaza, Arceus) har extremt höga totalstats och sticker ofta ut tydligt.</li>
            <li><strong>Typ avgör starkaste stat</strong> – snabba Pokémon (Jolteon, Crobat) har nästan alltid Speed som högst. Tunga försvarare (Shuckle, Steelix) har Defence som högst.</li>
            <li><strong>Startpokémon har balanserade stats</strong> – de tre startpokémons stat-fördelning är relativt jämn. Ingen stat är extrem, vilket gör dem svårare att gissa rätt på.</li>
            <li><strong>Memorera extremfallen</strong> – Shedinja har alltid HP=1. Shuckle har extremt hög Def/Sp.Def men uselt allt annat. Dessa är enkla att identifiera.</li>
            <li><strong>Generation ger ledtrådar</strong> – Gen 1-Pokémon har ofta mer obalanserade stats jämfört med nyare generationers mer välbalanserade design.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vanliga frågor om Statle</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div><strong>Vilka stats ingår?</strong><p className="mt-1">De sex bas-statsen: HP, Attack, Defense, Special Attack, Special Defense och Speed. Du gissar vilken av de sex som är högst.</p></div>
            <div><strong>Vilka Pokémon ingår?</strong><p className="mt-1">Spelet inkluderar Pokémon från generation 1–9. Mega-evolutioner och regionala varianter används normalt inte.</p></div>
            <div><strong>Vad händer vid oavgjort?</strong><p className="mt-1">Om två stats är lika höga kan båda vara korrekta svar. Spelet hanterar detta med fleralternativsfrågor.</p></div>
            <div><strong>Behöver man vara Pokémon-expert?</strong><p className="mt-1">Inte alls! Grundläggande Pokémon-kunskap räcker. Spelet är roligt även för casual fans och ett bra sätt att lära sig mer.</p></div>
          </div>
        </div>
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

export default StatlePage;
