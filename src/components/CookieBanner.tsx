import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsent, setConsent, type ConsentChoice } from '../utils/consent';

/** Visas på alla sidor tills besökaren gjort ett val. Båda knapparna väger lika tungt. */
function CookieBanner() {
  const [open, setOpen] = useState(() => getConsent() === null);
  if (!open) return null;

  const choose = (c: ConsentChoice) => {
    setConsent(c);
    setOpen(false);
  };

  return (
    <section className="cookie-banner" aria-label="Cookieval">
      <p>
        Vill du tillåta statistik och personanpassade annonser? Google Analytics laddas bara om du godkänner.
        Annonser visas ändå, men utan personanpassning om du avvisar. Du kan ändra dig när som helst under{' '}
        <Link to="/cookies" className="cookie-link">Cookies</Link>.
      </p>
      <div className="cookie-banner-buttons">
        <button type="button" onClick={() => choose('accepted')} className="cookie-choice-btn">
          Godkänn
        </button>
        <button type="button" onClick={() => choose('declined')} className="cookie-choice-btn">
          Avvisa
        </button>
      </div>
    </section>
  );
}

export default CookieBanner;
