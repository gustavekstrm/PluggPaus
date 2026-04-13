import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function StatlePage() {
  useEffect(() => {
    document.title = 'Statle - Pokémon Stats Quiz | PluggPaus';
    localStorage.setItem('lastPlayedGame', 'statle');
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Tillbaka till alla spel
        </Link>
      </div>

      {/* Game Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Statle
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Pokémon Stats Quiz – Vilken stat är högst?
        </p>
      </div>

      {/* Top Ad Banner */}
      <div className="ad-banner-top mb-8">
        <span style={{ fontSize: '10px', color: '#999', fontWeight: 400 }}>Annons</span>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Vad är Statle?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            <strong>Statle</strong> är ett unikt Pokémon-quiz där du måste gissa vilken av en Pokémons 
            sex "Base Stats" som är högst. Är du en Pokémon-expert? Statle utmanar dina kunskaper om 
            de olika varelsernas styrkor och svagheter på ett roligt och snabbt sätt.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            Varje Pokémon har sex grundläggande statistikvärden som definierar dess stridsförmåga: 
            <span className="font-bold text-blue-600 dark:text-blue-400"> HP (hälsopoäng), Attack (fysisk attack), 
            Defense (fysiskt försvar), Special Attack (specialattack), Special Defense (specialförsvar) och 
            Speed (hastighet)</span>. Din uppgift är att lista ut vilken av dessa stats som är högst för 
            den visade Pokémon – och göra det så snabbt och korrekt som möjligt!
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Hur man spelar
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold mr-3 flex-shrink-0">
                1
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Se den slumpmässiga Pokémon.</strong> Varje runda visar spelet en Pokémon 
                från något av de olika generationerna. Det kan vara en klassiker som Pikachu eller 
                en nyare som Dragapult.
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold mr-3 flex-shrink-0">
                2
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Gissa den högsta "Base Stat".</strong> Du får sex alternativ att välja mellan:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li><strong>HP</strong> – Total hälsa</li>
                  <li><strong>Attack</strong> – Fysisk attackstyrka</li>
                  <li><strong>Defense</strong> – Motstånd mot fysiska attacker</li>
                  <li><strong>Special Attack</strong> – Styrka för speciella attacker</li>
                  <li><strong>Special Defense</strong> – Motstånd mot speciella attacker</li>
                  <li><strong>Speed</strong> – Vem som attackerar först</li>
                </ul>
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold mr-3 flex-shrink-0">
                3
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Klicka på ditt svar.</strong> Tänk snabbt och välj vilken stat du tror är högst. 
                Spelet ger dig omedelbar feedback om du hade rätt eller fel.
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold mr-3 flex-shrink-0">
                4
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Bygg upp din streak!</strong> Fortsätt gissa korrekt för att bygga upp en 
                vinstsvit. Hur många Pokémon i rad kan du gissa rätt på?
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Strategi & Tips
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-4">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-3">
              ⚡ Tänk på Pokémon-typen
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              En snabb Pokémon som <strong>Jolteon</strong> (Electric-typ) har oftast <strong>Speed</strong> som 
              högsta stat, medan en tungviktare som <strong>Snorlax</strong> (Normal-typ) oftast har <strong>HP</strong>. 
              Använd din kunskap om typiska roller: attackers har hög Attack/Special Attack, tanks har hög Defense/HP, 
              och sweepers har hög Speed.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-4">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-3">
              🎯 Lär känna evolutionslinjer
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Pokémon i samma evolutionslinje delar ofta samma "stat spread". Om du vet att 
              Charmander har hög Special Attack, är chansen stor att även Charmeleon och Charizard 
              har det. Detta gäller särskilt för legendära Pokémon som har extremt specialiserade stats.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-3">
              📊 Vissa typer har mönster
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Steel-typer</strong> har ofta hög Defense, <strong>Psychic-typer</strong> har ofta 
              hög Special Attack eller Special Defense, och <strong>Fighting-typer</strong> har ofta hög Attack. 
              Även om det finns undantag, kan dessa generella regler hjälpa dig att göra snabba beslut.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Varför Statle är en bra paus
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            Statle är perfekt för en kort mental paus där du får testa ditt minne från barndomen 
            (eller nutiden!). Spelet kräver <strong>snabb slutledningsförmåga</strong> och tränar din 
            förmåga att fatta beslut baserat på visuell information och tidigare kunskap. Till skillnad 
            från passiva aktiviteter aktiverar Statle flera kognitiva funktioner samtidigt: minne 
            (vilka Pokémon känner jag till?), mönsterigenkänning (vilka typer brukar ha vilka stats?), 
            och strategiskt tänkande (hur ska jag resonera för att öka min chans att gissa rätt?).
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            Varje runda tar bara 5-10 sekunder, vilket gör det idealiskt för mikro-pauser mellan 
            studiepass. Du kan spela en handfull rundor på 2-3 minuter och sedan återgå till 
            studierna med en fräsch hjärna. Dessutom ger den nostalgiska Pokémon-känslan en 
            positiv känslomässig laddning som kan minska stress och öka motivation – precis vad 
            du behöver när plugget känns tungt. Och för dig som fortfarande spelar moderna 
            Pokémon-spel är det dessutom praktisk träning inför competitive battles!
          </p>
        </section>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <a
            href="https://statle.fun/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Spela Statle nu →
          </a>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <div className="ad-banner-top mb-8">
        <span style={{ fontSize: '10px', color: '#999', fontWeight: 400 }}>Annons</span>
      </div>
    </main>
  );
}

export default StatlePage;
