import { useEffect, useState } from 'react';

function Home() {
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('lastPlayedGame');
    setLastPlayed(saved);
  }, []);

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
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto">
          Välj ett spel och utmana dig själv med dagens ordpussel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {/* Wordle Card */}
        <div
          className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-accent-primary/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'wordle' ? 'ring-2 ring-accent-primary shadow-glow-md' : ''
            }`}
          style={{ animationDelay: '0s' }}
        >
          <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

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

        {/* Connections Card */}
        <div
          className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-purple-600/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'connections' ? 'ring-2 ring-purple-600 shadow-glow-md' : ''
            }`}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-purple-600/10 to-pink-600/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

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

        {/* Contexto Card */}
        <div
          className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-pink-600/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'contexto' ? 'ring-2 ring-pink-600 shadow-glow-md' : ''
            }`}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-pink-600/10 to-indigo-600/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

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

        {/* 2048 Card */}
        <div
          className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-orange-500/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === '2048' ? 'ring-2 ring-orange-500 shadow-glow-md' : ''
            }`}
          style={{ animationDelay: '0.3s' }}
        >
          <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

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

        {/* GeoGuessr Card */}
        <div
          className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-green-600/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'geoguessr' ? 'ring-2 ring-green-600 shadow-glow-md' : ''
            }`}
          style={{ animationDelay: '0.4s' }}
        >
          <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-green-600/10 to-teal-500/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

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

        {/* The Wiki Game Card */}
        <div
          className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-blue-600/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'wikigame' ? 'ring-2 ring-blue-600 shadow-glow-md' : ''
            }`}
          style={{ animationDelay: '0.5s' }}
        >
          <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

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

        {/* Redactle Card */}
        <div
          className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-red-600/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'redactle' ? 'ring-2 ring-red-600 shadow-glow-md' : ''
            }`}
          style={{ animationDelay: '0.6s' }}
        >
          <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-red-600/10 to-rose-500/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

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

        {/* Mathler Card */}
        <div
          className={`group relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6 sm:p-8 border border-gray-200 dark:border-dark-border hover:border-violet-600/50 transform hover:-translate-y-2 animate-scaleIn ${lastPlayed === 'mathler' ? 'ring-2 ring-violet-600 shadow-glow-md' : ''
            }`}
          style={{ animationDelay: '0.7s' }}
        >
          <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-gradient-to-br from-violet-600/10 to-fuchsia-500/10 group-hover:opacity-70 dark:group-hover:opacity-50 rounded-2xl transition-all duration-500 pointer-events-none" />

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
      </div>
    </main>
  );
}

export default Home;
