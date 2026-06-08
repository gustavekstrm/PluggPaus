import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Cookies() {
  useEffect(() => {
    document.title = 'Cookie-inställningar | PluggPaus';
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="seo-content" style={{ margin: '0 auto', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>
          Cookie-inställningar
        </h1>

        <p>Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}</p>

        <h2>Vad är cookies?</h2>
        <p>
          Cookies är små textfiler som lagras på din enhet (dator, surfplatta eller mobiltelefon) när du besöker
          en webbplats. Cookies används för att webbplatsen ska fungera effektivt, förbättra användarupplevelsen
          och ge information till webbplatsens ägare.
        </p>
        <p>
          Cookies innehåller information som till exempel språkinställningar, sessionsinformation eller unika
          identifierare som hjälper webbplatsen att känna igen dig vid återkommande besök.
        </p>

        <h2>Vilka cookies använder vi?</h2>

        <h3>1. Nödvändiga cookies (Essential Cookies)</h3>
        <p>
          Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt. De möjliggör grundläggande
          funktioner som sidnavigering och tillgång till säkra områden på webbplatsen. Webbplatsen kan inte
          fungera ordentligt utan dessa cookies.
        </p>
        <ul style={{ paddingLeft: '2rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>lastPlayedGame:</strong> Sparar vilket spel du senast spelade
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>favoriteGames:</strong> Sparar dina favoritspel
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>cookiesAccepted:</strong> Sparar ditt val gällande cookies
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>darkMode:</strong> Sparar ditt val av ljust/mörkt tema
          </li>
        </ul>

        <h3>2. Analyscookies (Google Analytics)</h3>
        <p>
          Vi använder <strong>Google Analytics</strong> för att samla in
          anonym statistik om hur besökare använder vår webbplats. Denna information hjälper oss att förbättra
          webbplatsen och användarupplevelsen.
        </p>
        <p>Google Analytics använder cookies för att spåra:</p>
        <ul style={{ paddingLeft: '2rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Antal besökare och sidvisningar</li>
          <li style={{ marginBottom: '0.5rem' }}>Hur länge besökare stannar på webbplatsen</li>
          <li style={{ marginBottom: '0.5rem' }}>Vilka sidor som besöks mest</li>
          <li style={{ marginBottom: '0.5rem' }}>Var besökare kommer ifrån (geografiskt och referenskälla)</li>
        </ul>
        <p>
          Läs mer om Google Analytics cookies:{' '}
          <a
            href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics Cookie Usage
          </a>
        </p>

        <h3>3. Reklamcookies (Google AdSense)</h3>
        <p>
          Vi använder <strong>Google AdSense</strong> för att visa annonser
          på vår webbplats. Google och dess partners använder cookies för att:
        </p>
        <ul style={{ paddingLeft: '2rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Visa annonser baserat på dina tidigare besök på vår webbplats och andra webbplatser</li>
          <li style={{ marginBottom: '0.5rem' }}>Visa mer relevanta annonser baserat på dina intressen</li>
          <li style={{ marginBottom: '0.5rem' }}>Förhindra att samma annons visas för ofta</li>
          <li style={{ marginBottom: '0.5rem' }}>Mäta effektiviteten av annonser</li>
        </ul>
        <p>
          Du kan välja bort personaliserad annonsering genom att besöka:{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Googles annonsinställningar
          </a>
        </p>

        <h2>Hur hanterar jag cookies?</h2>
        <p>
          De flesta webbläsare accepterar cookies automatiskt, men du kan ändra inställningarna för att blockera
          cookies om du föredrar det. Tänk på att om du blockerar cookies kan vissa delar av webbplatsen inte
          fungera korrekt.
        </p>
        <p>Så här hanterar du cookies i olika webbläsare:</p>
        <ul style={{ paddingLeft: '2rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
              Google Chrome
            </a>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="https://support.mozilla.org/sv/kb/webbplatscookies" target="_blank" rel="noopener noreferrer">
              Mozilla Firefox
            </a>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="https://support.apple.com/sv-se/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
              Safari
            </a>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="https://support.microsoft.com/sv-se/microsoft-edge/ta-bort-cookies-i-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h2>Mer information</h2>
        <p>
          Om du har frågor om hur vi använder cookies, vänligen läs vår{' '}
          <Link to="/privacy-policy">integritetspolicy</Link>
          {' '}eller kontakta oss på{' '}
          <a href="mailto:pluggpaus@gmail.com">pluggpaus@gmail.com</a>.
        </p>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link
            to="/"
            className="inline-block px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            ← Tillbaka till hem
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Cookies;
