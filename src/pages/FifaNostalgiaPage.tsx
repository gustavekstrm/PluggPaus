import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

// FIFA Cards data structure - The Nostalgia List (22 Players)
const FIFA_CARDS = [
  {
    id: 1,
    lastName: 'Florenzi',
    year: 'FIFA 21',
    imageUrl: '/fifa_spelare/alessandroflorenzi.png',
  },
  {
    id: 2,
    lastName: 'Martial',
    year: 'FIFA 22',
    imageUrl: '/fifa_spelare/anthonymartial.png',
  },
  {
    id: 3,
    lastName: 'Bakambu',
    year: 'FIFA 21',
    imageUrl: '/fifa_spelare/bakambu.png',
  },
  {
    id: 4,
    lastName: 'Dost',
    year: 'FIFA 18',
    imageUrl: '/fifa_spelare/basdost.png',
  },
  {
    id: 5,
    lastName: 'Valderrama',
    year: 'FIFA 15',
    imageUrl: '/fifa_spelare/carlosvalderrama.png',
  },
  {
    id: 6,
    lastName: 'Costa',
    year: 'FIFA 19',
    imageUrl: '/fifa_spelare/douglascosta.png',
  },
  {
    id: 7,
    lastName: 'Torres',
    year: 'FIFA 22',
    imageUrl: '/fifa_spelare/ferrantorres.png',
  },
  {
    id: 8,
    lastName: 'Ribery',
    year: 'FIFA 22',
    imageUrl: '/fifa_spelare/franckribery.png',
  },
  {
    id: 9,
    lastName: 'Kondogbia',
    year: 'FIFA 19',
    imageUrl: '/fifa_spelare/geoffreykondogbia.png',
  },
  {
    id: 10,
    lastName: 'Sancho',
    year: 'FIFA 22',
    imageUrl: '/fifa_spelare/jadonsancho.png',
  },
  {
    id: 11,
    lastName: 'Pastore',
    year: 'FIFA 17',
    imageUrl: '/fifa_spelare/javierpastore.png',
  },
  {
    id: 12,
    lastName: 'Trapp',
    year: 'FIFA 19',
    imageUrl: '/fifa_spelare/kevintrapp.png',
  },
  {
    id: 13,
    lastName: 'Baines',
    year: 'FIFA 18',
    imageUrl: '/fifa_spelare/leightonbaines.png',
  },
  {
    id: 14,
    lastName: 'Pereira',
    year: 'FIFA 21',
    imageUrl: '/fifa_spelare/matheuspereira.png',
  },
  {
    id: 15,
    lastName: 'Matuidi',
    year: 'FIFA 21',
    imageUrl: '/fifa_spelare/matuidi.png',
  },
  {
    id: 16,
    lastName: 'Ake',
    year: 'FIFA 20',
    imageUrl: '/fifa_spelare/nathanake.png',
  },
  {
    id: 17,
    lastName: 'Nolito',
    year: 'FIFA 17',
    imageUrl: '/fifa_spelare/nolito.png',
  },
  {
    id: 18,
    lastName: 'Paulinho',
    year: 'FIFA 19',
    imageUrl: '/fifa_spelare/paulinho.png',
  },
  {
    id: 19,
    lastName: 'Remy',
    year: 'FIFA 16',
    imageUrl: '/fifa_spelare/remy.png',
  },
  {
    id: 20,
    lastName: 'Pereira',
    year: 'FIFA 22',
    imageUrl: '/fifa_spelare/ricardopereira.png',
  },
  {
    id: 21,
    lastName: 'Kagawa',
    year: 'FIFA 15',
    imageUrl: '/fifa_spelare/shinjikagawa.png',
  },
  {
    id: 22,
    lastName: 'Willian',
    year: 'FIFA 20',
    imageUrl: '/fifa_spelare/willian.png',
  },
];

type GameState = 'not-started' | 'playing' | 'ended';

function FifaNostalgiaPage() {
  const [gameState, setGameState] = useState<GameState>('not-started');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [guess, setGuess] = useState('');
  const [shuffledCards, setShuffledCards] = useState<typeof FIFA_CARDS>([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [skipCount, setSkipCount] = useState(0);
  const [scoreAnimation, setScoreAnimation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'fifanostalgia');
  }, []);

  // Start game
  const startGame = () => {
    const shuffled = [...FIFA_CARDS].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setGameState('playing');
    setScore(0);
    setTimeLeft(90);
    setCurrentCardIndex(0);
    setGuess('');
    setShowCorrect(false);
    setSkipCount(0);
    setScoreAnimation(false);
    setIsProcessing(false);
  };

  // Timer countdown
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('ended');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft]);

  // Move to next card
  const moveToNextCard = useCallback(() => {
    setCurrentCardIndex((prevIndex) => {
      // Simple increment with wrap-around
      const nextIndex = (prevIndex + 1) % shuffledCards.length;
      return nextIndex;
    });
  }, [shuffledCards.length]);

  // Check answer
  const checkAnswer = useCallback((value: string) => {
    if (isProcessing || !shuffledCards.length) return;
    
    const currentCard = shuffledCards[currentCardIndex];
    if (!currentCard) return;

    const normalizedGuess = value.trim().toLowerCase();
    const normalizedAnswer = currentCard.lastName.toLowerCase();

    if (normalizedGuess === normalizedAnswer) {
      // Prevent double-trigger
      setIsProcessing(true);
      
      // Correct answer!
      setScore((prev) => prev + 1);
      setShowCorrect(true);
      setScoreAnimation(true);
      
      // Show feedback for 0.6s then move to next card
      setTimeout(() => {
        setGuess('');
        setShowCorrect(false);
        setScoreAnimation(false);
        setIsProcessing(false);
        moveToNextCard();
        
        // Auto-focus input immediately
        setTimeout(() => {
          document.getElementById('guess-input')?.focus();
        }, 50);
      }, 600);
    }
  }, [shuffledCards, currentCardIndex, isProcessing, moveToNextCard]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcessing) return; // Prevent input during animation
    const value = e.target.value;
    setGuess(value);
    checkAnswer(value);
  };

  // Skip current card
  const skipCard = () => {
    if (isProcessing) return; // Prevent double-skip
    
    setSkipCount(prev => prev + 1);
    setGuess('');
    moveToNextCard();
    
    // Auto-focus input
    setTimeout(() => {
      document.getElementById('guess-input')?.focus();
    }, 50);
  };

  const currentCard = shuffledCards[currentCardIndex];

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

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Fifa Nostalgia
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Minns du de klassiska FIFA-korten?
        </p>
      </div>

      {/* Start Screen */}
      {gameState === 'not-started' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 text-center">
          <div className="mb-8">
            <div className="inline-block bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-800 dark:text-yellow-200 px-6 py-3 rounded-full text-lg font-semibold mb-6">
              🎮 FIFA Ultimate Team Quiz
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-10 space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hur det fungerar:
            </h2>
            <ul className="text-left space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3 text-2xl">⏱️</span>
                <span><strong>90 sekunder</strong> - Gissa så många spelare som möjligt!</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3 text-2xl">⚽</span>
                <span><strong>Skriv efternamn</strong> - Svaret kollas automatiskt</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3 text-2xl">⏭️</span>
                <span><strong>Hoppa över</strong> - Fastnat? Tryck Skip!</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3 text-2xl">🏆</span>
                <span><strong>1 poäng</strong> per rätt svar</span>
              </li>
            </ul>
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold text-xl px-12 py-5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            STARTA SPELET →
          </button>
        </div>
      )}

      {/* Playing Screen */}
      {gameState === 'playing' && currentCard && (
        <div className="space-y-6">
          {/* Enhanced HUD - Head-Up Display */}
          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-yellow-600 dark:to-amber-700 rounded-xl shadow-2xl p-5">
            <div className="grid grid-cols-3 gap-4 text-white">
              {/* Score */}
              <div className="text-center">
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1 opacity-90">
                  Korrekta svar
                </div>
                <div className={`text-3xl sm:text-4xl font-bold transition-all duration-300 ${scoreAnimation ? 'scale-125 text-green-300' : 'scale-100'}`}>
                  {score}
                </div>
              </div>

              {/* Skip Counter */}
              <div className="text-center border-x border-white/30">
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1 opacity-90">
                  Antal skips
                </div>
                <div className="text-3xl sm:text-4xl font-bold">
                  {skipCount}
                </div>
              </div>

              {/* Timer */}
              <div className="text-center">
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1 opacity-90">
                  Tid kvar
                </div>
                <div className={`text-3xl sm:text-4xl font-bold transition-colors ${timeLeft <= 10 ? 'text-red-300 animate-pulse' : ''}`}>
                  {timeLeft}s
                </div>
              </div>
            </div>
          </div>

          {/* Card Display */}
          <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center relative transition-all duration-200 ${showCorrect ? 'ring-4 ring-green-500' : ''}`} style={{ boxShadow: showCorrect ? '0 0 40px rgba(34, 197, 94, 0.5)' : '' }}>
            {/* "RÄTT!" Overlay - Smooth fade-in */}
            {showCorrect && (
              <div 
                className="absolute inset-0 bg-green-500/15 dark:bg-green-500/25 rounded-2xl flex items-center justify-center z-30 transition-opacity duration-200"
                style={{ opacity: showCorrect ? 1 : 0 }}
              >
                <div className="bg-green-500 text-white text-4xl sm:text-5xl font-bold px-8 sm:px-12 py-4 sm:py-6 rounded-xl shadow-2xl transition-transform duration-200" style={{ transform: showCorrect ? 'scale(1)' : 'scale(0.8)' }}>
                  ✓ RÄTT!
                </div>
              </div>
            )}

            {/* Card Image Container - Fixed Size */}
            <div className="mb-6 flex justify-center">
              <div className="relative" style={{ width: '350px', height: '490px' }}>
                <img
                  src={currentCard.imageUrl}
                  alt="FIFA Card"
                  className="absolute inset-0 w-full h-full object-contain rounded-lg shadow-2xl select-none"
                />
              </div>
            </div>

            <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {currentCard.year}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Ultimate Team
            </div>

            {/* Input Field */}
            <div className="max-w-md mx-auto mb-6">
              <input
                id="guess-input"
                type="text"
                value={guess}
                onChange={handleInputChange}
                placeholder="Skriv spelarens efternamn..."
                className="w-full px-6 py-4 text-lg text-center border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white transition-all"
                autoFocus
                disabled={showCorrect}
              />
            </div>

            {/* Skip Button */}
            <button
              onClick={skipCard}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Hoppa över →
            </button>

            {/* Correct Answer Flash */}
            {showCorrect && (
              <div className="mt-4 text-green-500 font-bold text-xl animate-pulse">
                ✓ Rätt!
              </div>
            )}
          </div>
        </div>
      )}

      {/* End Screen */}
      {gameState === 'ended' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tiden är slut!
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Bra jobbat!</strong> Du fick <span className="text-green-500 font-bold">{score} rätt</span> och hoppade över <span className="text-orange-500 font-bold">{skipCount} spelare</span> på 90 sekunder.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-xl p-8 mb-8">
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Korrekta svar</div>
                <div className="text-5xl font-bold text-green-600 dark:text-green-400">
                  {score}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Skips</div>
                <div className="text-5xl font-bold text-orange-600 dark:text-orange-400">
                  {skipCount}
                </div>
              </div>
            </div>
            <div className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
              {score === 0 && 'Ge det ett till försök!'}
              {score > 0 && score <= 5 && 'Bra början!'}
              {score > 5 && score <= 10 && 'Imponerande!'}
              {score > 10 && score <= 15 && 'FIFA-Expert! ⭐'}
              {score > 15 && 'FIFA-Legend! 🌟'}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Spela igen
            </button>
            <Link
              to="/"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition-colors inline-block"
            >
              Tillbaka till meny
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default FifaNostalgiaPage;
