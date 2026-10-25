import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppState';

export interface Game {
  id: string;
  title: string;
  desc: string;
  to: string;
  badge?: string;
  /** Button fill colour */
  color: string;
  /** Button border colour */
  border: string;
  /** Button text colour */
  ink: string;
}

function GameCard({ game }: { game: Game }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useAppState();
  const fav = isFavorite(game.id);
  // Hela kortet är klickbart med mus; för tangentbord och skärmläsare är det
  // länken "Spela nu" som är det fokuserbara elementet.
  const activate = () => navigate(game.to);

  const btnStyle = { color: game.ink, background: game.color, borderColor: game.border };

  return (
    <div className="pp-card" onClick={activate}>
      <button
        className="pp-heart"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(game.id);
        }}
        aria-label={fav ? `Ta bort ${game.title} från favoriter` : `Lägg till ${game.title} i favoriter`}
        aria-pressed={fav}
        style={{ color: fav ? 'var(--accent)' : 'var(--ink-muted)' }}
      >
        <span aria-hidden="true">{fav ? '♥' : '♡'}</span>
      </button>

      {game.badge && <span className="pp-badge">{game.badge}</span>}

      <h3 className="pp-card-title">{game.title}</h3>
      <p className="pp-card-desc">{game.desc}</p>
      <Link
        className="pp-play"
        to={game.to}
        onClick={(e) => e.stopPropagation()}
        style={btnStyle}
        aria-label={`Spela ${game.title}`}
      >
        Spela nu <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

export default GameCard;
