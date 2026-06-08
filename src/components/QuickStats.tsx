import { Clock, Target, TrendingUp, Tag } from 'lucide-react';

interface QuickStatsProps {
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  playtime: string;
  benefit: string;
}

function QuickStats({ category, difficulty, playtime, benefit }: QuickStatsProps) {
  const difficultyColor = {
    Easy: 'text-green-600 dark:text-green-400',
    Medium: 'text-yellow-600 dark:text-yellow-400',
    Hard: 'text-red-600 dark:text-red-400',
  };

  const difficultyLabel = {
    Easy: 'Lätt',
    Medium: 'Medel',
    Hard: 'Svår',
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-600">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
        Spelinformation
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Kategori</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{category}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Target className={`w-5 h-5 flex-shrink-0 ${difficultyColor[difficulty]}`} />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Svårighetsgrad</p>
            <p className={`text-sm font-semibold ${difficultyColor[difficulty]}`}>{difficultyLabel[difficulty]}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Speltid</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{playtime}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tränar</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{benefit}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickStats;
