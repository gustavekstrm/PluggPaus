import { useEffect, useState } from 'react';
import { CONSENT_EVENT, getConsent, setConsent } from '../utils/consent';

/** Visar nuvarande cookieval och låter besökaren ändra det. Används på cookiesidan. */
function ConsentControls() {
  const [choice, setChoice] = useState(getConsent);

  useEffect(() => {
    const sync = () => setChoice(getConsent());
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  const status =
    choice === 'accepted'
      ? 'Du har godkänt statistik och personanpassade annonser.'
      : choice === 'declined'
        ? 'Du har avvisat statistik och personanpassade annonser.'
        : 'Du har inte gjort något val än. Tills dess laddas ingen statistik och annonserna är inte personanpassade.';

  return (
    <div className="consent-box">
      <p role="status" style={{ marginBottom: '1rem' }}>
        <strong>Ditt val:</strong> {status}
      </p>
      <div className="cookie-banner-buttons" style={{ justifyContent: 'flex-start' }}>
        <button
          type="button"
          className="cookie-choice-btn"
          aria-pressed={choice === 'accepted'}
          onClick={() => setConsent('accepted')}
        >
          Godkänn
        </button>
        <button
          type="button"
          className="cookie-choice-btn"
          aria-pressed={choice === 'declined'}
          onClick={() => setConsent('declined')}
        >
          Avvisa
        </button>
      </div>
    </div>
  );
}

export default ConsentControls;
