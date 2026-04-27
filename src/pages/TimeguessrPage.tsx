import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuickStats from '../components/QuickStats';

function TimeguessrPage() {
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Timeguessr | History & Geography Quiz for Study Breaks | PluggPaus';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Test your historical and geographical knowledge with Timeguessr - guess the location and time period from historical photos. Perfect for study breaks and improving pattern recognition.');

    // Add JSON-LD structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Timeguessr",
      "applicationCategory": "GameApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "ratingCount": "890"
      },
      "description": "Interactive history and geography game where you guess locations and time periods from historical photographs. Perfect for quick study breaks to improve analytical thinking and historical knowledge."
    });
    document.head.appendChild(script);

    localStorage.setItem('lastPlayedGame', 'timeguessr');
    window.scrollTo(0, 0);

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
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Tillbaka till alla spel
        </Link>
      </div>

      {/* Game Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Timeguessr
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Gissa platsen och året i historien!
        </p>
      </div>

      {/* Quick Stats Component */}
      <QuickStats
        category="History/Geography"
        difficulty="Medium"
        playtime="2-4 min"
        benefit="Historical awareness"
      />

      {/* Top Ad Banner */}
      <div className="ad-banner-top mb-8">
        <span style={{ fontSize: '10px', color: '#999', fontWeight: 400 }}>Annons</span>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Vad är Timeguessr?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            <strong>Timeguessr</strong> är ett fascinerande geografiskt och historiskt spel där du får se 
            historiska fotografier och måste gissa både var och när bilden togs. Det är som GeoGuessr, 
            men med en tidsresa-twist! Kombinerar geografi, historia och detektivarbete i ett 
            beroendeframkallande format.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            Spelet presenterar verkliga historiska fotografier från olika epoker – från tidigt 1900-tal 
            till modern tid – och från alla hörn av världen. Din uppgift är att analysera ledtrådar som 
            arkitektur, klädstil, fordon, teknologi och miljö för att lista ut både <span className="font-bold text-blue-600 dark:text-blue-400">geografisk plats</span> och 
            <span className="font-bold text-blue-600 dark:text-blue-400"> tidsperiod</span>.
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
                <strong>Se det historiska fotot.</strong> Varje runda visar en autentisk historisk bild. 
                Det kan vara allt från en stadsgata på 1920-talet till en by i Afrika på 1960-talet.
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold mr-3 flex-shrink-0">
                2
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Analysera ledtrådarna.</strong> Leta efter detaljer som:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li><strong>Arkitektur</strong> – Europeisk, asiatisk eller amerikansk stil?</li>
                  <li><strong>Fordon</strong> – Vilka bilmodeller eller transportmedel syns?</li>
                  <li><strong>Kläder</strong> – Vilken epok representerar modet?</li>
                  <li><strong>Teknologi</strong> – Finns det telefoner, skyltar eller annan teknik?</li>
                  <li><strong>Miljö</strong> – Klimat, vegetation och landskapstyp</li>
                </ul>
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold mr-3 flex-shrink-0">
                3
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Gissa plats och tid.</strong> Peka på kartan var du tror bilden är tagen och 
                välj ett årtal eller tidsperiod. Ju närmare du gissar, desto högre poäng!
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold mr-3 flex-shrink-0">
                4
              </span>
              <p className="text-lg leading-relaxed">
                <strong>Lär dig av varje runda.</strong> Efter varje gissning får du se den korrekta 
                platsen och årtalet, ofta med intressanta historiska fakta om fotot.
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
              🏛️ Använd arkitektur som vägledning
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Olika epoker och regioner har distinkta arkitektoniska stilar. Art Deco-byggnader 
              tyder ofta på 1920-30-tal, medan Brutalism pekar mot 1960-70-tal. Koloniala stilar 
              kan ge ledtrådar om tidigare kolonialstyre.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-4">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-3">
              🚗 Fordon är tidsmarkörer
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Bilmodeller är extremt användbara för att lista ut tidsperiod. En Ford Model T tyder 
              på 1910-20-tal, medan en Volkswagen Beetle kan vara allt från 1950-tal till 1980-tal. 
              Frånvaro av bilar kan också vara en ledtråd!
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-3">
              📸 Färg vs svartvitt
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Färgfotografi blev vanligt från 1960-talet och framåt, men var dyrare än svartvitt 
              fram till 1970-talet. Ett svartvitt foto är oftast från före 1960, men kom ihåg att 
              konstnärliga svartvita foton fortfarande tas idag!
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Varför Timeguessr är en bra paus
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            Timeguessr är perfekt för studenter som vill ha en aktiv mental paus. Till skillnad från 
            passiv scrollning aktiverar spelet flera kognitiva områden samtidigt: <strong>visuell analys</strong> (vad 
            ser jag?), <strong>historisk kunskap</strong> (vilken epok var detta?), <strong>geografisk förståelse</strong> (var 
            i världen?), och <strong>deduktiv logik</strong> (hur passar alla ledtrådar ihop?). Det är som en mini-
            historiekurs packad i en 3-minuters spelrunda.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            Dessutom är varje runda en lärande upplevelse. När du ser det korrekta svaret får du ofta 
            intressant bakgrundsinformation om platsen och tiden, vilket gör att du gradvis bygger upp 
            en bredare förståelse för världshistoria. Många spelare rapporterar att Timeguessr har gjort 
            dem bättre på att känna igen historiska epoker i filmer, böcker och dokumentärer. Det är 
            perfekt för en 5-minuters paus mellan studiepass – tillräckligt kort för att inte störa 
            flödet, men tillräckligt engagerande för att ge din hjärna en mental reset.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Historien bakom Timeguessr
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
            Timeguessr skapades som en naturlig evolution av det populära GeoGuessr-konceptet. 
            Utvecklarna insåg att genom att kombinera geografisk gissning med historisk analys kunde 
            de skapa ett ännu mer utmanande och pedagogiskt spel. Spelet använder en omfattande databas 
            av historiska fotografier från arkiv världen över, vilket ger en autentisk resa genom både 
            tid och rum.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Spelet har snabbt blivit populärt bland historielärare och geografi-entusiaster som ett sätt 
            att göra inlärning mer interaktiv och engagerande. Det används även av många som ett sätt att 
            träna "visual literacy" – förmågan att läsa och tolka visuell information, vilket är en allt 
            viktigare färdighet i dagens bildtunga värld.
          </p>
        </section>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <a
            href="https://timeguessr.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Spela Timeguessr nu →
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

export default TimeguessrPage;
