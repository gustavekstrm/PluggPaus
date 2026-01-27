import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lastPlayedGame');
    setLastPlayed(saved);

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteGames');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Check if cookies have been accepted
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setShowCookieBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieBanner(false);
  };

  const toggleFavorite = (gameId: string) => {
    const newFavorites = favorites.includes(gameId)
      ? favorites.filter(id => id !== gameId)
      : [...favorites, gameId];

    setFavorites(newFavorites);
    localStorage.setItem('favoriteGames', JSON.stringify(newFavorites));
  };

  const isFavorite = (gameId: string) => favorites.includes(gameId);

  const shouldShowGame = (gameId: string) => {
    if (!showFavoritesOnly) return true;
    return isFavorite(gameId);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-16 animate-fadeInUp">
        <h1 className="title-font text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            PluggPaus
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-white font-normal max-w-2xl mx-auto mb-4 leading-relaxed px-4">
          Välkommen till PluggPaus!
          <br /><br />
          Vi erbjuder smidiga webbspel som hjälper dig att hålla fokus genom en snabb paus under en lång föreläsning eller ett tråkigt pluggpass.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-200 max-w-xl mx-auto mb-6">
          Välj ditt favoritspel nedan 🎮
        </p>

        {/* Favorites Filter Button */}
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${showFavoritesOnly
            ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-2 border-pink-300 dark:border-pink-700'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:border-pink-400 dark:hover:border-pink-500'
            }`}
        >
          <svg className="w-4 h-4" fill={showFavoritesOnly ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {showFavoritesOnly ? 'Visa alla' : 'Favoriter'}
          {favorites.length > 0 && (
            <span className="bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 px-2 py-0.5 rounded-full text-xs font-semibold">
              {favorites.length}
            </span>
          )}
        </button>
      </div>

      {/* Top Ad Banner */}
      <div className="ad-banner-top">
        <span style={{ fontSize: '10px', color: '#999', fontWeight: 400 }}>Annons</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {/* Wordle Card */}
        {shouldShowGame('wordle') && (
          <div
            className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-green-500/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'wordle' ? 'ring-2 ring-green-500 shadow-glow-md' : ''
              }`}
            style={{ animationDelay: '0s' }}
          >
            <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-green-500/10 to-green-600/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

            {/* Recently Played Badge - Top Left */}
            {lastPlayed === 'wordle' && (
              <span
                className="absolute z-20 bg-green-500 text-white uppercase tracking-wide"
                style={{
                  top: '10px',
                  left: '10px',
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                ⭐ Senast
              </span>
            )}

            {/* Favorite Heart Icon - Top Right */}
            <button
              onClick={() => toggleFavorite('wordle')}
              className="absolute z-20 p-2 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-200 transform hover:scale-110 active:scale-95"
              style={{ top: '10px', right: '10px' }}
              aria-label="Toggle favorite"
            >
              <svg
                className={`w-6 h-6 transition-all duration-200 ${isFavorite('wordle')
                  ? 'fill-red-500 stroke-red-500'
                  : 'fill-none stroke-gray-400 dark:stroke-gray-500 hover:stroke-red-400'
                  }`}
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                  Wordle
                </h2>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Gissa dagens ord på sex försök
              </p>

              <div className="mb-5 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-surface py-2 px-3 rounded-lg border border-gray-200 dark:border-dark-border">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="font-medium">Öppnas på extern webbplats</span>
              </div>

              <a
                href="https://www.nytimes.com/games/wordle/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center text-white py-3.5 sm:py-4 rounded-xl hover:shadow-glow-md transition-all duration-300 font-semibold text-base sm:text-lg transform hover:scale-105 active:scale-95 shadow-lg"
                style={{ backgroundColor: '#538d4e' }}
              >
                Spela nu
              </a>
            </div>
          </div>
        )}

        {/* Connections Card */}
        {shouldShowGame('connections') && (
          <div
            className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-purple-600/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'connections' ? 'ring-2 ring-purple-600 shadow-glow-md' : ''
              }`}
            style={{ animationDelay: '0.1s' }}
          >
            <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-purple-600/10 to-pink-600/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

            {/* Recently Played Badge - Top Left */}
            {lastPlayed === 'connections' && (
              <span
                className="absolute z-20 bg-purple-600 text-white uppercase tracking-wide"
                style={{
                  top: '10px',
                  left: '10px',
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                ⭐ Senast
              </span>
            )}

            {/* Favorite Heart Icon - Top Right */}
            <button
              onClick={() => toggleFavorite('connections')}
              className="absolute z-20 p-2 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-200 transform hover:scale-110 active:scale-95"
              style={{ top: '10px', right: '10px' }}
              aria-label="Toggle favorite"
            >
              <svg
                className={`w-6 h-6 transition-all duration-200 ${isFavorite('connections')
                  ? 'fill-red-500 stroke-red-500'
                  : 'fill-none stroke-gray-400 dark:stroke-gray-500 hover:stroke-red-400'
                  }`}
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  Connections
                </h2>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Hitta grupper av fyra ord som hör ihop - spela på New York Times
              </p>

              <div className="mb-5 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-surface py-2 px-3 rounded-lg border border-gray-200 dark:border-dark-border">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="font-medium">Öppnas på extern webbplats</span>
              </div>

              <a
                href="https://www.nytimes.com/games/connections"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 sm:py-4 rounded-xl hover:shadow-glow-md transition-all duration-300 font-semibold text-base sm:text-lg transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Spela nu
              </a>
            </div>
          </div>
        )}

        {/* Contexto Card */}
        {shouldShowGame('contexto') && (
          <div
            className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-pink-600/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'contexto' ? 'ring-2 ring-pink-600 shadow-glow-md' : ''
              }`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-pink-600/10 to-indigo-600/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

            <button
              onClick={() => toggleFavorite('contexto')}
              className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-200 transform hover:scale-110 active:scale-95"
              aria-label="Toggle favorite"
            >
              <svg
                className={`w-6 h-6 transition-all duration-200 ${isFavorite('contexto')
                  ? 'fill-red-500 stroke-red-500'
                  : 'fill-none stroke-gray-400 dark:stroke-gray-500 hover:stroke-red-400'
                  }`}
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Recently Played Badge - Top Left */}
            {lastPlayed === 'contexto' && (
              <span
                className="absolute z-20 bg-pink-600 text-white uppercase tracking-wide"
                style={{
                  top: '10px',
                  left: '10px',
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                ⭐ Senast
              </span>
            )}

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                  Contexto
                </h2>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Gissa ordet baserat på kontext och likhet - spela på Contexto.me
              </p>

              <div className="mb-5 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-surface py-2 px-3 rounded-lg border border-gray-200 dark:border-dark-border">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="font-medium">Öppnas på extern webbplats</span>
              </div>

              <a
                href="https://contexto.me/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-pink-600 to-indigo-600 text-white py-3.5 sm:py-4 rounded-xl hover:shadow-glow-md transition-all duration-300 font-semibold text-base sm:text-lg transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Spela nu
              </a>
            </div>
          </div>
        )}

        {/* 2048 Card */}
        {shouldShowGame('2048') && (
          <div
            className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-orange-500/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === '2048' ? 'ring-2 ring-orange-500 shadow-glow-md' : ''
              }`}
            style={{ animationDelay: '0.3s' }}
          >
            <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

            <button
              onClick={() => toggleFavorite('2048')}
              className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-200 transform hover:scale-110 active:scale-95"
              aria-label="Toggle favorite"
            >
              <svg
                className={`w-6 h-6 transition-all duration-200 ${isFavorite('2048')
                  ? 'fill-red-500 stroke-red-500'
                  : 'fill-none stroke-gray-400 dark:stroke-gray-500 hover:stroke-red-400'
                  }`}
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Recently Played Badge - Top Left */}
            {lastPlayed === '2048' && (
              <span
                className="absolute z-20 bg-orange-500 text-white uppercase tracking-wide"
                style={{
                  top: '10px',
                  left: '10px',
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                ⭐ Senast
              </span>
            )}

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">
                  2048
                </h2>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Pussla ihop siffrorna för att nå 2048!
              </p>

              <div className="mb-5 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-surface py-2 px-3 rounded-lg border border-gray-200 dark:border-dark-border">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="font-medium">Öppnas på extern webbplats</span>
              </div>

              <a
                href="https://play2048.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3.5 sm:py-4 rounded-xl hover:shadow-glow-md transition-all duration-300 font-semibold text-base sm:text-lg transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Spela nu
              </a>
            </div>
          </div>
        )}

        {/* GeoGuessr Card */}
        {shouldShowGame('geoguessr') && (
          <div
            className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-green-600/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'geoguessr' ? 'ring-2 ring-green-600 shadow-glow-md' : ''
              }`}
            style={{ animationDelay: '0.4s' }}
          >
            <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-green-600/10 to-teal-500/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

            <button
              onClick={() => toggleFavorite('geoguessr')}
              className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-200 transform hover:scale-110 active:scale-95"
              aria-label="Toggle favorite"
            >
              <svg
                className={`w-6 h-6 transition-all duration-200 ${isFavorite('geoguessr')
                  ? 'fill-red-500 stroke-red-500'
                  : 'fill-none stroke-gray-400 dark:stroke-gray-500 hover:stroke-red-400'
                  }`}
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Recently Played Badge - Top Left */}
            {lastPlayed === 'geoguessr' && (
              <span
                className="absolute z-20 bg-green-600 text-white uppercase tracking-wide"
                style={{
                  top: '10px',
                  left: '10px',
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                ⭐ Senast
              </span>
            )}

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                  GeoGuessr
                </h2>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Utforska världen och gissa var du är.
              </p>

              <div className="mb-5 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-surface py-2 px-3 rounded-lg border border-gray-200 dark:border-dark-border">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="font-medium">Öppnas på extern webbplats</span>
              </div>

              <a
                href="https://www.geoguessr.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-600 to-teal-500 text-white py-3.5 sm:py-4 rounded-xl hover:shadow-glow-md transition-all duration-300 font-semibold text-base sm:text-lg transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Spela nu
              </a>
            </div>
          </div>
        )}

        {/* The Wiki Game Card */}
        {shouldShowGame('wikigame') && (
          <div
            className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-blue-600/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'wikigame' ? 'ring-2 ring-blue-600 shadow-glow-md' : ''
              }`}
            style={{ animationDelay: '0.5s' }}
          >
            <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

            <button
              onClick={() => toggleFavorite('wikigame')}
              className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-200 transform hover:scale-110 active:scale-95"
              aria-label="Toggle favorite"
            >
              <svg
                className={`w-6 h-6 transition-all duration-200 ${isFavorite('wikigame')
                  ? 'fill-red-500 stroke-red-500'
                  : 'fill-none stroke-gray-400 dark:stroke-gray-500 hover:stroke-red-400'
                  }`}
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Recently Played Badge - Top Left */}
            {lastPlayed === 'wikigame' && (
              <span
                className="absolute z-20 bg-blue-600 text-white uppercase tracking-wide"
                style={{
                  top: '10px',
                  left: '10px',
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                ⭐ Senast
              </span>
            )}

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  The Wiki Game
                </h2>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Tävla i att klicka dig från en Wikipedia-artikel till en annan.
              </p>

              <div className="mb-5 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-surface py-2 px-3 rounded-lg border border-gray-200 dark:border-dark-border">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="font-medium">Öppnas på extern webbplats</span>
              </div>

              <a
                href="https://www.thewikigame.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3.5 sm:py-4 rounded-xl hover:shadow-glow-md transition-all duration-300 font-semibold text-base sm:text-lg transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Spela nu
              </a>
            </div>
          </div>
        )}

        {/* Redactle Card */}
        {shouldShowGame('redactle') && (
          <div
            className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-red-600/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'redactle' ? 'ring-2 ring-red-600 shadow-glow-md' : ''
              }`}
            style={{ animationDelay: '0.6s' }}
          >
            <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-red-600/10 to-rose-500/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

            <button
              onClick={() => toggleFavorite('redactle')}
              className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-200 transform hover:scale-110 active:scale-95"
              aria-label="Toggle favorite"
            >
              <svg
                className={`w-6 h-6 transition-all duration-200 ${isFavorite('redactle')
                  ? 'fill-red-500 stroke-red-500'
                  : 'fill-none stroke-gray-400 dark:stroke-gray-500 hover:stroke-red-400'
                  }`}
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Recently Played Badge - Top Left */}
            {lastPlayed === 'redactle' && (
              <span
                className="absolute z-20 bg-red-600 text-white uppercase tracking-wide"
                style={{
                  top: '10px',
                  left: '10px',
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                ⭐ Senast
              </span>
            )}

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                  Redactle
                </h2>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Avslöja den dolda artikeln genom att gissa ord.
              </p>

              <div className="mb-5 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-surface py-2 px-3 rounded-lg border border-gray-200 dark:border-dark-border">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="font-medium">Öppnas på extern webbplats</span>
              </div>

              <a
                href="https://redactle.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-red-600 to-rose-500 text-white py-3.5 sm:py-4 rounded-xl hover:shadow-glow-md transition-all duration-300 font-semibold text-base sm:text-lg transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Spela nu
              </a>
            </div>
          </div>
        )}

        {/* Mathler Card */}
        {shouldShowGame('mathler') && (
          <div
            className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-violet-600/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'mathler' ? 'ring-2 ring-violet-600 shadow-glow-md' : ''
              }`}
            style={{ animationDelay: '0.7s' }}
          >
            <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-violet-600/10 to-fuchsia-500/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

            <button
              onClick={() => toggleFavorite('mathler')}
              className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-200 transform hover:scale-110 active:scale-95"
              aria-label="Toggle favorite"
            >
              <svg
                className={`w-6 h-6 transition-all duration-200 ${isFavorite('mathler')
                  ? 'fill-red-500 stroke-red-500'
                  : 'fill-none stroke-gray-400 dark:stroke-gray-500 hover:stroke-red-400'
                  }`}
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Recently Played Badge - Top Left */}
            {lastPlayed === 'mathler' && (
              <span
                className="absolute z-20 bg-violet-600 text-white uppercase tracking-wide"
                style={{
                  top: '10px',
                  left: '10px',
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                ⭐ Senast
              </span>
            )}

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                  Mathler
                </h2>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Hitta den dolda uträkningen. Som Wordle, fast med siffror.
              </p>

              <div className="mb-5 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-surface py-2 px-3 rounded-lg border border-gray-200 dark:border-dark-border">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="font-medium">Öppnas på extern webbplats</span>
              </div>

              <a
                href="https://www.mathler.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white py-3.5 sm:py-4 rounded-xl hover:shadow-glow-md transition-all duration-300 font-semibold text-base sm:text-lg transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Spela nu
              </a>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <section
        id="seo-article-fixed"
        className="seo-content"
        style={{
          color: '#ffffff',
          maxWidth: '800px',
          margin: '60px auto 40px',
          padding: '60px 20px',
          lineHeight: 1.6,
          fontSize: '1rem',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Roboto", system-ui, sans-serif',
          borderTop: '1px solid #444',
          backgroundColor: 'transparent',
          textAlign: 'left'
        }}
      >
        <h1 style={{ color: '#ffffff', fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem', lineHeight: 1.3 }}>
          Varför din hjärna behöver en PluggPaus
        </h1>

        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Under långa föreläsningar eller intensiva pluggpass är det lätt att tro att konstant fokus är nyckeln till framgång.
          Men forskning visar att din hjärna faktiskt presterar bättre med regelbundna mikropauser. När du tar korta pauser
          på 5-10 minuter aktiveras hjärnans <strong style={{ color: '#ffffff', fontWeight: 700 }}>dopaminsystem</strong>, vilket förbättrar både motivation och
          minneskonsolidering. Detta är grunden i den populära <strong style={{ color: '#ffffff', fontWeight: 700 }}>Pomodoro-tekniken</strong>, där du växlar mellan
          koncentrerade arbetspass och korta avbrott.
        </p>

        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Här på PluggPaus samlar vi <strong style={{ color: '#ffffff', fontWeight: 700 }}>gratis onlinespel</strong> som är perfekta för just detta ändamål.
          Våra spel är snabba, utmanande och kräver ingen nedladdning – du spelar direkt i webbläsaren.
          Dessutom fungerar de som <strong style={{ color: '#ffffff', fontWeight: 700 }}>hjärngympa för studenter</strong> genom att träna olika kognitiva förmågor
          som ordförråd, logiskt tänkande och rumslig uppfattning.
        </p>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', lineHeight: 1.4 }}>
          Wordle – Träna ditt ordförråd
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
          <strong style={{ color: '#ffffff', fontWeight: 700 }}>Wordle</strong> är ett ordspel där du har sex försök att gissa dagens femstaviga ord.
          Varje gissning ger ledtrådar genom färgkodade rutor: grön betyder rätt bokstav på rätt plats,
          gul betyder rätt bokstav men fel plats. Detta <strong style={{ color: '#ffffff', fontWeight: 700 }}>gratis webbläsarspel</strong> har blivit
          en global succé tack vare sin perfekta balans mellan utmaning och tillgänglighet.
          Att spela Wordle dagligen tränar aktivt ditt <strong style={{ color: '#ffffff', fontWeight: 700 }}>ordförråd</strong>, mönsterigenkänning
          och deduktiv förmåga – färdigheter som är ovärderliga både i studier och vardagsliv.
        </p>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', lineHeight: 1.4 }}>
          2048 – Öva logiskt tänkande
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
          I <strong style={{ color: '#ffffff', fontWeight: 700 }}>2048</strong> kombinerar du numrerade brickor på ett 4x4-rutnät för att nå målet:
          brickan med värdet 2048. Du flyttar alla brickor åt samma håll samtidigt, och när två brickor
          med samma nummer möts slås de samman till en dubbelt så stor. Detta pussel är ett utmärkt
          <strong style={{ color: '#ffffff', fontWeight: 700 }}>tidsfördriv under föreläsningar</strong> eftersom varje omgång tar bara 2-5 minuter,
          men kräver intensiv koncentration och planering. Spelet tränar din förmåga att tänka flera
          steg framåt och utveckla långsiktiga strategier – precis som när du löser komplexa matematikproblem
          eller skriver uppsatser.
        </p>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', lineHeight: 1.4 }}>
          GeoGuessr – Upptäck världen
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
          <strong style={{ color: '#ffffff', fontWeight: 700 }}>GeoGuessr</strong> placerar dig på en slumpmässig plats i världen via Google Street View,
          och din uppgift är att gissa var du befinner dig. Spelet tränar din <strong style={{ color: '#ffffff', fontWeight: 700 }}>geografiska kunskap</strong>,
          visuella minnesbild och analytiska förmåga genom att du letar efter ledtrådar som vägskyltar,
          arkitektur, vegetation och språk. Det är ett perfekt <strong style={{ color: '#ffffff', fontWeight: 700 }}>gratis onlinespel</strong> för studiepauser
          eftersom det kombinerar avkoppling med inlärning – du utforskar världen samtidigt som du ger din
          hjärna en paus från böckerna. Många användare rapporterar att de lärt sig mer geografi genom
          GeoGuessr än genom traditionella studier!
        </p>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', lineHeight: 1.4 }}>
          Vetenskapliga fördelar med spelpauser
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Studier från Stanford University visar att korta <strong style={{ color: '#ffffff', fontWeight: 700 }}>hjärngymnastik-pauser</strong> kan öka
          produktiviteten med upp till 25%. När du <strong style={{ color: '#ffffff', fontWeight: 700 }}>spelar gratis webbläsarspel</strong> aktiveras
          andra delar av hjärnan än de du använder för pluggande, vilket ger dina "studieområden" tid att
          återhämta sig och konsolidera ny information. Detta fenomen kallas för <strong style={{ color: '#ffffff', fontWeight: 700 }}>diffust tänkande</strong>
          och är lika viktigt som fokuserat lärande.
        </p>

        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Så nästa gång du känner att koncentrationen sviktar under en lång föreläsning – ta en PluggPaus!
          Välj ett av våra <strong style={{ color: '#ffffff', fontWeight: 700 }}>hjärntränande spel</strong> och ge din hjärna den paus den förtjänar.
          Du kommer tillbaka starkare, mer fokuserad och redo att ta dig an nya utmaningar.
        </p>
      </section>

      {/* Sticky Bottom Ad Bar */}
      <div className="ad-sticky-bottom">
        <span style={{ fontSize: '10px', color: '#999', fontWeight: 400 }}>Annons</span>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <Link to="/privacy-policy">Integritetspolicy</Link>
        <span>•</span>
        <a href="#" onClick={(e) => { e.preventDefault(); setShowAboutModal(true); }}>
          Om oss / Kontakt
        </a>
        <span>•</span>
        <Link to="/cookies">Cookie-inställningar</Link>
      </footer>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="cookie-banner">
          <p>
            Vi använder kakor för att optimera din pluggpaus. Genom att använda sidan godkänner du vår användning av cookies.
          </p>
          <div className="cookie-banner-buttons">
            <button onClick={acceptCookies} className="cookie-accept-btn">
              Godkänn
            </button>
            <Link to="/cookies" className="cookie-link">
              Läs mer
            </Link>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <div
          className="modal active"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAboutModal(false);
            }
          }}
        >
          <div className="modal-content">
            <span
              className="modal-close"
              onClick={() => setShowAboutModal(false)}
            >
              &times;
            </span>
            <h2>Om PluggPaus</h2>
            <p>
              PluggPaus är skapat av <strong>Eken</strong>, en systemvetarstudent som upplever att
              långa föreläsningar kan vara tröttsamma och att koncentrationen ibland behöver en kickstart.
              Idén föddes ur behovet av en snabb mental reboot.
            </p>
            <p>
              Ibland räcker kaffet helt enkelt inte till, och då är fem minuters hjärngympa den bästa
              medicinen för att orka med sista timmen. Sidan är en samlingsplats för webbens bästa
              tidsfördriv – perfekta för det diskreta fönstret längst bak i hörsalen.
            </p>
            <p>
              Projektet drivs av kodglädje (och en del prokrastinering).
            </p>

            <h2 style={{ marginTop: '2rem' }}>Kontakt</h2>
            <p>
              Har du frågor, förslag på nya spel eller vill du bara komma i kontakt med oss? Maila oss gärna!
            </p>
            <p>
              <a
                href="mailto:gurkanekstrom@gmail.com"
                style={{
                  color: '#667eea',
                  textDecoration: 'underline',
                  fontWeight: 600
                }}
              >
                gurkanekstrom@gmail.com
              </a>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
