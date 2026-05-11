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

      {/* Top Ad Banner */}
      <div className="ad-banner-top mb-8">
        <span style={{ fontSize: '10px', color: '#999', fontWeight: 400 }}>Annons</span>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
        {/* Short Description */}
        <div className="max-w-2xl mx-auto mb-8 text-center">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Klassiskt försvarsspel där du utvecklas genom 5 tidsåldrar. Bygg enheter, uppgradera torn och förstör fiendens bas innan de förstör din.
          </p>
        </div>

        {/* Quick Stats Component */}
        <QuickStats
          category="Strategy"
          difficulty="Medium"
          playtime="10-15 min"
          benefit="Tactical thinking"
        />

        {/* SEO Footer Section */}
        <section className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Age of War är ett legendariskt strategispel som har underhållit spelare sedan 2007. Perfekt för studiepauser med 10-15 minuters matcher som tränar beslutsfattande, resurshantering och strategisk planering. Utvecklas från stenåldern till framtiden och bemästra balansen mellan anfall och försvar.
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
