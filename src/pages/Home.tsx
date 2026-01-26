import { useEffect, useState } from 'react';

function Home() {
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lastPlayedGame');
    setLastPlayed(saved);

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteGames');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

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
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
          <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary bg-clip-text text-transparent">
            Tråkig föreläsning?
          </span>
          <br />
          <span className="text-gray-900 dark:text-white">Ta en paus!</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto mb-6">
          Välj ett spel och utmana dig själv med dagens ordpussel
        </p>

        {/* Favorites Filter Button */}
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${showFavoritesOnly
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:shadow-glow-md'
              : 'bg-white dark:bg-dark-card text-gray-900 dark:text-white border-2 border-gray-200 dark:border-dark-border hover:border-pink-500'
            }`}
        >
          <svg className="w-5 h-5" fill={showFavoritesOnly ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {showFavoritesOnly ? 'Visa alla spel' : 'Visa favoriter'}
          {favorites.length > 0 && (
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
              {favorites.length}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {/* Wordle Card */}
        {shouldShowGame('wordle') && (
          <div
            className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-accent-primary/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'wordle' ? 'ring-2 ring-accent-primary shadow-glow-md' : ''
              }`}
            style={{ animationDelay: '0s' }}
          >
            <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

            {/* Favorite Heart Icon */}
            <button
              onClick={() => toggleFavorite('wordle')}
              className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-200 transform hover:scale-110 active:scale-95"
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
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  Wordle
                </h2>
                {lastPlayed === 'wordle' && (
                  <span className="text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-full shadow-glow-sm animate-pulse">
                    Senast spelad
                  </span>
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Gissa dagens ord på sex försök - spela på New York Times
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
                className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 sm:py-4 rounded-xl hover:shadow-glow-md transition-all duration-300 font-semibold text-base sm:text-lg transform hover:scale-105 active:scale-95 shadow-lg"
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

            <button
              onClick={() => toggleFavorite('connections')}
              className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-200 transform hover:scale-110 active:scale-95"
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
                {lastPlayed === 'connections' && (
                  <span className="text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-full shadow-glow-sm animate-pulse">
                    Senast spelad
                  </span>
                )}
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

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                  Contexto
                </h2>
                {lastPlayed === 'contexto' && (
                  <span className="text-xs font-semibold bg-gradient-to-r from-pink-600 to-indigo-600 text-white px-3 py-1.5 rounded-full shadow-glow-sm animate-pulse">
                    Senast spelad
                  </span>
                )}
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

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">
                  2048
                </h2>
                {lastPlayed === '2048' && (
                  <span className="text-xs font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full shadow-glow-sm animate-pulse">
                    Senast spelad
                  </span>
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Join the numbers and get to the 2048 tile!
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

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                  GeoGuessr
                </h2>
                {lastPlayed === 'geoguessr' && (
                  <span className="text-xs font-semibold bg-gradient-to-r from-green-600 to-teal-500 text-white px-3 py-1.5 rounded-full shadow-glow-sm animate-pulse">
                    Senast spelad
                  </span>
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Explore the world and guess where you are.
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

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  The Wiki Game
                </h2>
                {lastPlayed === 'wikigame' && (
                  <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-1.5 rounded-full shadow-glow-sm animate-pulse">
                    Senast spelad
                  </span>
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Race from one Wikipedia article to another.
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

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                  Redactle
                </h2>
                {lastPlayed === 'redactle' && (
                  <span className="text-xs font-semibold bg-gradient-to-r from-red-600 to-rose-500 text-white px-3 py-1.5 rounded-full shadow-glow-sm animate-pulse">
                    Senast spelad
                  </span>
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Uncover the hidden Wikipedia article by guessing words one by one.
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

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                  Mathler
                </h2>
                {lastPlayed === 'mathler' && (
                  <span className="text-xs font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-3 py-1.5 rounded-full shadow-glow-sm animate-pulse">
                    Senast spelad
                  </span>
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-5 min-h-[3rem] leading-relaxed">
                Find the hidden calculation. Like Wordle, but for math lovers.
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
    </main>
  );
}

export default Home;
