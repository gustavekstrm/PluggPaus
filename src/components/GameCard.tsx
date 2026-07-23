import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppState';

export interface Game {
  id: string;
  title: string;
  desc: string;
  to?: string;
  href?: string;
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
  const external = !!game.href;

  const activate = () => {
    if (game.href) window.open(game.href, '_blank', 'noopener,noreferrer');
    else if (game.to) navigate(game.to);
  };

  const btnStyle = { color: game.ink, background: game.color, borderColor: game.border };

  return (
    <div className="pp-card" onClick={activate}>
      <button
        className="pp-heart"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(game.id);
        }}
        aria-label={fav ? 'Ta bort favorit' : 'Lägg till favorit'}
        style={{ color: fav ? 'var(--accent)' : 'var(--ink-muted)' }}
      >
        <span aria-hidden="true">{fav ? '♥' : '♡'}</span>
      </button>

      {game.badge && <span className="pp-badge">{game.badge}</span>}

      <h3 className="pp-card-title">{game.title}</h3>
      <p className="pp-card-desc">{game.desc}</p>
      {external && <div className="pp-extern">Öppnas på extern sida ↗</div>}

      {external ? (
        <a
          className="pp-play"
          href={game.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={btnStyle}
        >
          Spela nu <span aria-hidden="true">→</span>
        </a>
      ) : (
        <Link className="pp-play" to={game.to ?? '/'} onClick={(e) => e.stopPropagation()} style={btnStyle}>
          Spela nu <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

export default GameCard;
