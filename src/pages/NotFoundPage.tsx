import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNoIndex } from '../hooks/useNoIndex';

/**
 * Fångar adresser som inte finns. Tidigare renderades bara header och footer med en tom
 * mitt – ingen förklaring och ingen väg vidare. Sidan noindexas, eftersom en 404 aldrig
 * ska hamna i sökresultaten.
 */
const GAMES = [
  { to: '/wordle', title: 'Orda', desc: 'Gissa dagens svenska ord på sex försök.' },
  { to: '/connections', title: 'Kopplingar', desc: 'Hitta fyra grupper av ord som hör ihop.' },
  { to: '/contexto', title: 'Kontext', desc: 'Gissa ordet utifrån betydelse.' },
  { to: '/kaffehopp', title: 'Kaffehopp', desc: 'Hoppa över hindren i vårt arkadspel.' },
  { to: '/pluggorm', title: 'Pluggorm', desc: 'Klassiska Snake.' },
  { to: '/2048', title: '2048', desc: 'Pussla ihop siffrorna.' },
];

function NotFoundPage() {
  useNoIndex();

  useEffect(() => {
    document.title = 'Sidan finns inte | PluggPaus';
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="pp-panel p-6 sm:p-10 text-center">
        <p className="pp-kicker" style={{ display: 'inline-block' }}>404</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-3">
          Den här sidan finns inte
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Adressen kan ha ändrats, eller så har vi tagit bort sidan. Här är spelen som finns.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 text-left">
          {GAMES.map((g) => (
            <Link
              key={g.to}
              to={g.to}
              className="pp-panel-soft p-4 block hover:opacity-90 transition-opacity"
            >
              <span className="block font-bold text-gray-900 dark:text-white">{g.title}</span>
              <span className="block text-sm text-gray-600 dark:text-gray-400">{g.desc}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/" className="pp-cta">
            Till alla spel
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
