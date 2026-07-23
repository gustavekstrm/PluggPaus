import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="pp-footer">
      <div className="pp-footer-top">
        <div>
          <div className="pp-footer-brand">PluggPaus</div>
          <p style={{ margin: '14px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--ink-muted)', maxWidth: 320 }}>
            Ett litet hjärngym för studiepauser. Spela direkt i webbläsaren – helt gratis, inget konto.
          </p>
        </div>
        <div>
          <div className="pp-footer-h">Spel</div>
          <div className="pp-footer-links">
            <Link to="/wordle">Ordspel</Link>
            <Link to="/minne">Minne</Link>
            <Link to="/kaffehopp">Arkad</Link>
            <Link to="/mathler">Matte</Link>
          </div>
        </div>
        <div>
          <div className="pp-footer-h">Om</div>
          <div className="pp-footer-links">
            <Link to="/">Alla spel</Link>
            <Link to="/om-oss">Om oss &amp; kontakt</Link>
            <Link to="/privacy-policy">Integritetspolicy</Link>
            <Link to="/cookies">Cookie-inställningar</Link>
          </div>
        </div>
      </div>
      <div className="pp-footer-bottom">
        <span>© 2026 PluggPaus</span>
        <span>Made for study breaks ✦ Insert coin</span>
      </div>
    </footer>
  );
}

export default Footer;
