import { Link } from 'react-router-dom';
import { formatSwedishDate } from '../utils/archive';

/** Visas överst i ett spel när ett äldre pussel spelas från arkivet. */
function ArchiveBanner({ date, path }: { date: string; path: string }) {
  return (
    <div className="pp-archive-banner" role="note">
      <span>
        <strong>Arkiv:</strong> pusslet från {formatSwedishDate(date, true)}. Räknas inte i din statistik.
      </span>
      <span className="pp-archive-links">
        <Link to={path}>Dagens pussel</Link>
        <Link to="/arkiv">Fler dagar</Link>
      </span>
    </div>
  );
}

export default ArchiveBanner;
