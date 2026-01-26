import type { ConnectionsPuzzle } from '../types/connections';

export const PUZZLES: ConnectionsPuzzle[] = [
  {
    date: '2024-01-01',
    categories: [
      {
        name: 'TYPES OF BREAD',
        words: ['SOURDOUGH', 'BAGUETTE', 'CIABATTA', 'FOCACCIA'],
        difficulty: 'easy'
      },
      {
        name: 'PROGRAMMING LANGUAGES',
        words: ['PYTHON', 'JAVA', 'RUST', 'SWIFT'],
        difficulty: 'medium'
      },
      {
        name: 'CARD SUITS',
        words: ['HEART', 'DIAMOND', 'CLUB', 'SPADE'],
        difficulty: 'hard'
      },
      {
        name: 'THINGS THAT ARE RED',
        words: ['RUBY', 'ROSE', 'CHERRY', 'BRICK'],
        difficulty: 'tricky'
      }
    ]
  },
  {
    date: '2024-01-02',
    categories: [
      {
        name: 'WEATHER CONDITIONS',
        words: ['SUNNY', 'RAINY', 'CLOUDY', 'STORMY'],
        difficulty: 'easy'
      },
      {
        name: 'SOCIAL MEDIA PLATFORMS',
        words: ['TWITTER', 'INSTAGRAM', 'FACEBOOK', 'TIKTOK'],
        difficulty: 'medium'
      },
      {
        name: 'UNITS OF TIME',
        words: ['SECOND', 'MINUTE', 'HOUR', 'DAY'],
        difficulty: 'hard'
      },
      {
        name: 'WORDS BEFORE "BELL"',
        words: ['DOOR', 'COW', 'DUMB', 'BLUE'],
        difficulty: 'tricky'
      }
    ]
  },
  {
    date: '2024-01-03',
    categories: [
      {
        name: 'FRUITS',
        words: ['APPLE', 'BANANA', 'ORANGE', 'GRAPE'],
        difficulty: 'easy'
      },
      {
        name: 'MUSICAL INSTRUMENTS',
        words: ['GUITAR', 'PIANO', 'DRUMS', 'VIOLIN'],
        difficulty: 'medium'
      },
      {
        name: 'CHESS PIECES',
        words: ['KING', 'QUEEN', 'ROOK', 'BISHOP'],
        difficulty: 'hard'
      },
      {
        name: 'SYNONYMS FOR "LARGE"',
        words: ['BIG', 'HUGE', 'GIANT', 'MASSIVE'],
        difficulty: 'tricky'
      }
    ]
  },
  {
    date: '2024-01-04',
    categories: [
      {
        name: 'COLORS',
        words: ['RED', 'BLUE', 'GREEN', 'YELLOW'],
        difficulty: 'easy'
      },
      {
        name: 'PLANETS',
        words: ['MARS', 'VENUS', 'JUPITER', 'SATURN'],
        difficulty: 'medium'
      },
      {
        name: 'BODY PARTS',
        words: ['HAND', 'FOOT', 'HEAD', 'HEART'],
        difficulty: 'hard'
      },
      {
        name: 'WORDS AFTER "BLACK"',
        words: ['HOLE', 'JACK', 'BIRD', 'SMITH'],
        difficulty: 'tricky'
      }
    ]
  },
  {
    date: '2024-01-05',
    categories: [
      {
        name: 'SCHOOL SUBJECTS',
        words: ['MATH', 'HISTORY', 'SCIENCE', 'ENGLISH'],
        difficulty: 'easy'
      },
      {
        name: 'COFFEE DRINKS',
        words: ['LATTE', 'ESPRESSO', 'CAPPUCCINO', 'MOCHA'],
        difficulty: 'medium'
      },
      {
        name: 'TYPES OF SHOES',
        words: ['BOOT', 'SNEAKER', 'SANDAL', 'LOAFER'],
        difficulty: 'hard'
      },
      {
        name: 'PALINDROMES',
        words: ['KAYAK', 'LEVEL', 'RADAR', 'CIVIC'],
        difficulty: 'tricky'
      }
    ]
  },
  {
    date: '2024-01-06',
    categories: [
      {
        name: 'DIRECTIONS',
        words: ['NORTH', 'SOUTH', 'EAST', 'WEST'],
        difficulty: 'easy'
      },
      {
        name: 'GREEK LETTERS',
        words: ['ALPHA', 'BETA', 'GAMMA', 'DELTA'],
        difficulty: 'medium'
      },
      {
        name: 'COOKING METHODS',
        words: ['BAKE', 'BOIL', 'GRILL', 'STEAM'],
        difficulty: 'hard'
      },
      {
        name: 'WORDS ENDING IN "ING"',
        words: ['RING', 'KING', 'WING', 'SING'],
        difficulty: 'tricky'
      }
    ]
  },
  {
    date: '2024-01-07',
    categories: [
      {
        name: 'SEASONS',
        words: ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'],
        difficulty: 'easy'
      },
      {
        name: 'GEMSTONES',
        words: ['DIAMOND', 'EMERALD', 'SAPPHIRE', 'TOPAZ'],
        difficulty: 'medium'
      },
      {
        name: 'TREE TYPES',
        words: ['OAK', 'PINE', 'MAPLE', 'BIRCH'],
        difficulty: 'hard'
      },
      {
        name: 'WORDS THAT FOLLOW "NEW"',
        words: ['YORK', 'YEAR', 'MOON', 'WAVE'],
        difficulty: 'tricky'
      }
    ]
  }
];

export function getDailyPuzzle(date: Date): ConnectionsPuzzle {
  const epoch = new Date('2024-01-01T00:00:00+01:00');
  const msPerDay = 86400000;
  const daysSinceEpoch = Math.floor((date.getTime() - epoch.getTime()) / msPerDay);
  const puzzleIndex = daysSinceEpoch % PUZZLES.length;
  return PUZZLES[puzzleIndex];
}

export function getTodaysPuzzle(): ConnectionsPuzzle {
  const now = new Date();
  const swedenTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Stockholm' }));
  return getDailyPuzzle(swedenTime);
}
