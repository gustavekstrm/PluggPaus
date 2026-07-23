interface QuickStatsProps {
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  playtime: string;
  benefit: string;
}

const iconClass = 'w-5 h-5 flex-shrink-0';

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8m0 0h-5m5 0v5" />
    </svg>
  );
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
    <div className="p-6 mb-8" style={{ background: 'var(--surface2)', border: '2px solid var(--border)', borderRadius: 'var(--radius)' }}>
      <h3 className="pp-mono text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--ink-muted)' }}>
        Spelinformation
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <TagIcon className={`${iconClass} text-blue-600 dark:text-blue-400`} />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Kategori</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{category}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TargetIcon className={`${iconClass} ${difficultyColor[difficulty]}`} />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Svårighetsgrad</p>
            <p className={`text-sm font-semibold ${difficultyColor[difficulty]}`}>{difficultyLabel[difficulty]}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ClockIcon className={`${iconClass} text-purple-600 dark:text-purple-400`} />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Speltid</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{playtime}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TrendingUpIcon className={`${iconClass} text-green-600 dark:text-green-400`} />
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
