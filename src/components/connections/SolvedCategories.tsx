import type { Category } from '../../types/connections';

interface SolvedCategoriesProps {
  categories: Category[];
}

function SolvedCategories({ categories }: SolvedCategoriesProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-yellow-400 dark:bg-yellow-500';
      case 'medium':
        return 'bg-green-500 dark:bg-green-600';
      case 'hard':
        return 'bg-blue-500 dark:bg-blue-600';
      case 'tricky':
        return 'bg-purple-600 dark:bg-purple-700';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-2">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`${getDifficultyColor(category.difficulty)} rounded-lg p-4 text-white animate-slideIn`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="font-bold text-center mb-2 text-sm sm:text-base uppercase">
            {category.name}
          </div>
          <div className="text-center text-xs sm:text-sm">
            {category.words.join(', ')}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SolvedCategories;
