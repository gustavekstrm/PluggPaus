import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import AdBanner from './AdBanner';
import QuickStats from './QuickStats';

export interface Faq {
  q: string;
  a: string;
}

export interface Tip {
  strong: string;
  text: string;
}

interface GamePageShellProps {
  title: string;
  tagline: string;
  badge: string;
  children: ReactNode;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  playtime: string;
  benefit: string;
  aboutTitle: string;
  about: ReactNode;
  tipsTitle: string;
  tips: Tip[];
  faqTitle: string;
  faqs: Faq[];
}

function BackArrow() {
  return (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function GamePageShell({
  title,
  tagline,
  badge,
  children,
  category,
  difficulty,
  playtime,
  benefit,
  aboutTitle,
  about,
  tipsTitle,
  tips,
  faqTitle,
  faqs,
}: GamePageShellProps) {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link to="/" className="pp-backlink">
          <BackArrow />
          Tillbaka till alla spel
        </Link>
      </div>

      {/* Playable Game Card */}
      <div className="pp-panel p-6 sm:p-10 mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: 'var(--ink)', letterSpacing: '-.02em' }}>
            {title}
          </h1>
          <p className="mb-4" style={{ color: 'var(--ink-muted)' }}>{tagline}</p>
          <div
            className="pp-mono"
            style={{ display: 'inline-block', textTransform: 'uppercase', letterSpacing: '.1em', fontSize: 12, color: 'var(--accent)', border: '2px solid var(--accent)', borderRadius: 999, padding: '7px 16px' }}
          >
            {badge}
          </div>
        </div>

        {/* The actual playable game */}
        {children}
      </div>

      {/* Ad Banner */}
      <AdBanner slot="5092040576" className="mb-8" />

      {/* About the game */}
      <div className="pp-panel-soft p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>{aboutTitle}</h2>
        <QuickStats category={category} difficulty={difficulty} playtime={playtime} benefit={benefit} />
        <div className="space-y-4 text-lg leading-relaxed mt-6" style={{ color: 'var(--ink-muted)' }}>
          {about}
        </div>
      </div>

      {/* Tips & FAQ */}
      <div className="space-y-6 mb-8">
        <div className="pp-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--ink)' }}>{tipsTitle}</h2>
          <ul className="space-y-2" style={{ color: 'var(--ink-muted)' }}>
            {tips.map((tip, i) => (
              <li key={i}>
                <strong style={{ color: 'var(--ink)' }}>{tip.strong}</strong> {tip.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="pp-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--ink)' }}>{faqTitle}</h2>
          <div className="space-y-4" style={{ color: 'var(--ink-muted)' }}>
            {faqs.map((faq, i) => (
              <div key={i}>
                <strong style={{ color: 'var(--ink)' }}>{faq.q}</strong>
                <p className="mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner slot="2861993283" className="mb-8" />

      {/* Back to games link */}
      <div className="text-center">
        <Link to="/" className="pp-backlink" style={{ fontSize: 16 }}>
          <BackArrow />
          Se alla spel
        </Link>
      </div>
    </main>
  );
}

export default GamePageShell;
