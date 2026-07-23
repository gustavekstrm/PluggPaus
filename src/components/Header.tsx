import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppState } from '../context/AppState';

function Header() {
  const { theme, toggleTheme, favorites, favsOnly, toggleFavsOnly, setFavsOnly } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();

  const favCount = favorites.length;
  const favLabel = favsOnly ? 'Alla spel' : favCount ? `Favoriter (${favCount})` : 'Favoriter';

  const onFav = () => {
    if (location.pathname !== '/') {
      setFavsOnly(true);
      navigate('/');
    } else {
      toggleFavsOnly();
    }
  };

  return (
    <header className="pp-header">
      <div className="pp-header-inner">
        <Link to="/" className="pp-logo" aria-label="PluggPaus startsida">
          <span>PluggPaus</span>
          <span className="pp-logo-cursor" aria-hidden="true">_</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="pp-surfacebtn" onClick={onFav} aria-pressed={favsOnly}>
            <span className="pp-heart-accent" aria-hidden="true">♥</span>
            <span>{favLabel}</span>
          </button>
          <button className="pp-iconbtn" onClick={toggleTheme} aria-label="Byt tema">
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
