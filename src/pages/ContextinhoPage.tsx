import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuickStats from '../components/QuickStats';

function ContextinhoPage() {
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Contextinho | Football Player Quiz for Study Breaks | PluggPaus';
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Test your football knowledge with Contextinho - a semantic guessing game that helps students take productive micro-breaks. Improve deductive reasoning while having fun.');

    // Add JSON-LD structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Contextinho",
      "applicationCategory": "GameApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.6",
        "ratingCount": "980"
      },
      "description": "Interactive football player guessing game using semantic similarity. Designed for quick study breaks to improve deductive reasoning and analytical thinking."
    });
    document.head.appendChild(script);

    localStorage.setItem('lastPlayedGame', 'contextinho');
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
          className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Tillbaka till alla spel
        </Link>
      </div>

      {/* Game Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
          Contextinho
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Fotbollsvariant av Contexto – Hitta dagens hemliga spelare!
        </p>
      </div>

      {/* Quick Stats Component */}
      <QuickStats
        category="Football Quiz"
        difficulty="Medium"
        playtime="2-5 min"
        benefit="Deductive reasoning"
      />

      {/* Top Ad Banner */}
      <div className="ad-banner-top mb-8">
        <span style={{ fontSize: '10px', color: '#999', fontWeight: 400 }}>Annons</span>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Vad är Contextinho?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            <strong>Contextinho</strong> är en fotbollsvariant av det populära ordspelet Contexto. 
            Målet är att hitta dagens hemliga fotbollsspelare genom att gissa på andra spelare. 
            En intelligent algoritm räknar ut hur lik din gissning är den hemliga spelaren baserat på 
            faktorer som nationalitet, klubbhistorik, ålder, position och spelstil.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            Till skillnad från traditionella fotbollsquiz där du antingen har rätt eller fel, 
            använder Contextinho semantisk analys för att ge dig kontinuerlig feedback. 
            Varje gissning får en poäng mellan 1 och 100,000+, där <span className="font-bold text-green-600 dark:text-green-400">nummer 1 är det rätta svaret</span>. 
            Ju lägre nummer, desto närmare är du!
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Hur man spelar
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-bold mr-3 flex-shrink-0">
                1
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Skriv namnet på en fotbollsspelare.</strong> Du kan gissa på både aktiva spelare och legender. 
                Spelet känner igen tusentals spelare från hela världen.
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-bold mr-3 flex-shrink-0">
                2
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Få feedback baserad på likhet.</strong> Algoritmen jämför din gissning med den hemliga spelaren 
                och ger dig en siffra. Om du gissar "Cristiano Ronaldo" och får nummer 450, betyder det att det finns 
                449 spelare som är mer lika den hemliga spelaren.
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-bold mr-3 flex-shrink-0">
                3
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Fortsätt gissa smartare.</strong> Använd feedbacken för att ringa in rätt spelare. 
                Om dina gissningar från Premier League får höga nummer men en La Liga-spelare får ett lågt nummer, 
                vet du att svaret troligen spelar i Spanien.
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-bold mr-3 flex-shrink-0">
                4
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Vinn när du når nummer 1!</strong> Fortsätt tills du hittar den exakta spelaren. 
                Ju färre gissningar du behöver, desto bättre.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Strategi & Tips
          </h2>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 mb-4">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3">
              💡 Börja brett
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Gissa kända spelare från olika ligor (Premier League, La Liga, Serie A, Bundesliga) 
              för att snabbt ringa in rätt land eller klubb. Om Messi ger dig nummer 2000 men 
              Kevin De Bruyne ger dig nummer 150, vet du att spelaren troligen spelar i Premier League.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 mb-4">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3">
              ⚽ Testa olika positioner
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Om dina anfallare får höga nummer men en mittfältare får ett lågt nummer, 
              fokusera på mittfältare i nästa gissning. Position spelar ofta en stor roll i likhetsalgoritmen.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3">
              🌍 Använd nationalitet som ledtråd
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              När du kommit ner till nummer under 100, börja gissa spelare från samma nationalitet 
              eller som spelat i samma klubb. Contextinho väger nationalitet och klubbhistorik tungt.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Varför Contextinho är en bra paus
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            Contextinho kombinerar fotbollskunskap med deduktiv problemlösning på ett unikt sätt. 
            Till skillnad från passiv scrollning på sociala medier aktiverar det här spelet flera 
            kognitiva områden samtidigt: minne (vilka spelare känner jag till?), analys (vilken feedback 
            får jag?) och strategiskt tänkande (hur kan jag använda denna information för nästa gissning?). 
            Detta gör det till en perfekt <strong>aktiv paus</strong> som ger din hjärna en välbehövlig 
            förändring från studiematerial, samtidigt som du tränar värdefulla färdigheter.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            Dessutom är varje omgång tidsbegränsad till cirka 5-10 minuter – exakt rätt längd för en 
            mikropaus enligt Pomodoro-tekniken. Du hinner återhämta dig mentalt utan att förlora 
            studiemomentumet. Och eftersom spelet uppdateras dagligen med nya spelare får du alltid 
            en fräsch utmaning som håller det intressant dag efter dag.
          </p>
        </section>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <a
            href="https://playfootball.games/contextinho/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Spela Contextinho nu →
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

export default ContextinhoPage;
