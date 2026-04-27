import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuickStats from '../components/QuickStats';

function AgeOfWarPage() {
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Age of War | Strategy Game for Study Breaks | PluggPaus';
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Play Age of War - a classic strategy game for quick study breaks. Develop through 5 ages from Stone Age to Future. Improve tactical thinking and resource management skills.');

    // Add JSON-LD structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Game",
      "name": "Age of War",
      "gameType": "Strategy",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "2150"
      },
      "description": "Classic tower defense strategy game spanning 5 historical ages. Perfect for 10-15 minute study breaks to improve tactical thinking and decision-making under pressure."
    });
    document.head.appendChild(script);

    localStorage.setItem('lastPlayedGame', 'ageofwar');
    window.scrollTo(0, 0);

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Tillbaka till alla spel
        </Link>
      </div>

      {/* Game Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
          Age of War
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Utvecklas genom tiderna – Från stenåldern till framtiden!
        </p>
      </div>

      {/* Quick Stats Component */}
      <QuickStats
        category="Strategy"
        difficulty="Medium"
        playtime="10-15 min"
        benefit="Tactical thinking"
      />

      {/* Top Ad Banner */}
      <div className="ad-banner-top mb-8">
        <span style={{ fontSize: '10px', color: '#999', fontWeight: 400 }}>Annons</span>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Vad är Age of War?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            <strong>Age of War</strong> är ett legendariskt försvarsspel som har underhållit miljontals 
            spelare sedan 2007. Konceptet är enkelt men beroendeframkallande: Du styr en bas på ena 
            sidan av spelplanen medan din fiende kontrollerar basen på andra sidan. Målet är att 
            förstöra fiendens bas innan de förstör din – och längs vägen utvecklas genom hela 
            mänsklighetens historia från <span className="font-bold text-orange-600 dark:text-orange-400">stenåldern med primitiva klubbor</span> till 
            <span className="font-bold text-orange-600 dark:text-orange-400"> framtidens högteknologiska laser-soldater</span>.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            Spelet kombinerar strategi, resurshantering och timing på ett sätt som är lätt att lära 
            men svårt att bemästra. Varje tidsålder har sina unika enheter och försvarstorn, och 
            att välja rätt tidpunkt för att utvecklas är ofta skillnaden mellan seger och nederlag.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Hur man spelar
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 font-bold mr-3 flex-shrink-0">
                1
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Skapa enheter för att attackera.</strong> Använd guld för att köpa soldater som 
                automatiskt marscherar mot fiendens bas. Varje enhet har olika styrkor, svagheter och kostnad. 
                Grottmän är billiga men svaga, medan dinosaurieryttare är dyra men kraftfulla.
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 font-bold mr-3 flex-shrink-0">
                2
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Bygg försvarstorn.</strong> Din bas har platser där du kan bygga kanontorn. 
                Dessa torn skjuter automatiskt på fiender som kommer nära. Uppgradera dina torn för 
                större skada och räckvidd. Balansen mellan att spendera guld på enheter vs torn är avgörande!
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 font-bold mr-3 flex-shrink-0">
                3
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Använd specialattacker.</strong> Varje tidsålder har en unik specialattack som 
                laddas över tid. Stenåldern har regn av stenar, medeltiden har katapult-bombardemang, 
                och framtiden har orbital laserstrike. Spara dessa för kritiska ögonblick!
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 font-bold mr-3 flex-shrink-0">
                4
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Samla erfarenhetspoäng (XP).</strong> Varje gång du dödar en fiendeenhet tjänar du XP. 
                När XP-mätaren är full kan du utvecklas till nästa tidsålder. Det finns totalt 
                <span className="font-bold"> 5 tidsåldrar</span>: Stenåldern, Medeltiden, Renässansen, Modern tid och Framtiden.
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 font-bold mr-3 flex-shrink-0">
                5
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Förstör fiendens bas!</strong> Fortsätt attackera tills fiendens HP når noll. 
                Men var försiktig – om din egen bas förstörs förlorar du och måste börja om från början.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Strategi & Tips
          </h2>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 mb-4">
            <h3 className="text-xl font-bold text-orange-800 dark:text-orange-300 mb-3">
              ⚡ Utvecklas tidigt = Stor fördel
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Spara dina XP och utvecklas så snart du når gränsen. En enhet från en senare tidsålder 
              kan ofta besegra flera enheter från en tidigare. Om du når Medeltiden medan din motståndare 
              fortfarande är i Stenåldern har du en enorm fördel. Tveka inte – utvecklas aggressivt!
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 mb-4">
            <h3 className="text-xl font-bold text-orange-800 dark:text-orange-300 mb-3">
              🏰 Uppgradera dina torn
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Glöm inte bort dina försvarstorn! Ett fullt uppgraderat torn kan hålla tillbaka stora 
              fiendearmér och ge dig tid att utvecklas eller samla guld. Investera tidigt i minst 
              två torn för solid försvarslinje.
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-orange-800 dark:text-orange-300 mb-3">
              💥 Timing på specialattacker
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Spara din specialattack för rätt tillfälle. Om fienden skickar en massiv armé mot dig, 
              använd specialattacken för att utplåna dem alla på en gång. Det kan vända matchen helt!
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Varför Age of War är en bra paus
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            Age of War är perfekt för en studiepa us eftersom det kombinerar snabbt beslutsfattande 
            med strategisk planering. Varje match kräver att du balanserar <strong>kortsiktiga taktiska 
            beslut</strong> (Ska jag köpa fler soldater nu eller spara till ett torn?) med 
            <strong> långsiktig strategisk vision</strong> (När ska jag utvecklas? Vilket moment är rätt 
            för en massiv offensiv?). Denna typ av multitasking och prioritering är exakt de 
            kognitiva färdigheter som hjälper dig att organisera komplexa studieuppgifter och projekt.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            Dessutom ger varje match en tydlig start, mitt och slut – vilket betyder att du får en 
            psykologisk "reset" när matchen är över. Detta gör det lättare att återgå till studierna 
            med förnyad energi jämfört med aktiviteter utan tydliga slutpunkter (som scrollande på 
            sociala medier). En typisk match tar 10-15 minuter, vilket är den perfekta längden för 
            en Pomodoro-paus. Och det nostalgiska pixelgrafikstemat skapar en avkopplande 
            retro-atmosfär som får dig att slappna av utan att bli överstimulerad.
          </p>
        </section>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <a
            href="https://ageofwargame.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-orange-600 to-red-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Spela Age of War nu →
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

export default AgeOfWarPage;
