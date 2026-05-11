import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuickStats from '../components/QuickStats';

function StatlePage() {
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Statle | Pokémon Stats Quiz for Study Breaks | PluggPaus';
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Test your Pokémon knowledge with Statle - an interactive quiz game that helps students take focused micro-breaks. Guess which Base Stat is highest and improve your pattern recognition.');

    // Add JSON-LD structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Statle",
      "applicationCategory": "GameApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "ratingCount": "1250"
      },
      "description": "Interactive Pokémon stats quiz designed for quick study breaks. Test your knowledge of Base Stats while improving pattern recognition and decision-making skills."
    });
    document.head.appendChild(script);

    localStorage.setItem('lastPlayedGame', 'statle');
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
        {/* Short Description */}
        <div className="max-w-2xl mx-auto mb-8 text-center">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Gissa vilken Base Stat (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed) som är högst för varje Pokémon. Testa ditt minne och bygg upp din streak!
          </p>
        </div>

        {/* Quick Stats Component */}
        <QuickStats
          category="Pokémon Quiz"
          difficulty="Medium"
          playtime="1-3 min"
          benefit="Pattern recognition"
        />

        {/* SEO Footer Section */}
        <section className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Statle är ett Pokémon-quiz som utmanar dina kunskaper om Base Stats. Perfekt för 1-3 minuters mikropauser som tränar snabb slutledningsförmåga och mönsterigenkänning. Använd din kunskap om Pokémon-typer och evolutionslinjer för att gissa rätt och bygga upp en imponerande vinstsvit.
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
