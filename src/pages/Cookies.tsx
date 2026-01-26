import { Link } from 'react-router-dom';

function Cookies() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div 
        id="cookies-content"
        style={{
          color: '#ffffff',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '40px 20px',
          lineHeight: 1.6,
          fontSize: '1rem',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Roboto", system-ui, sans-serif',
        }}
      >
        <h1 style={{ color: '#ffffff', fontWeight: 700, fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
          Cookie-inställningar
        </h1>

        <p style={{ color: '#ffffff', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
        </p>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          Vad är cookies?
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Cookies är små textfiler som lagras på din enhet (dator, surfplatta eller mobiltelefon) när du besöker 
          en webbplats. Cookies används för att webbplatsen ska fungera effektivt, förbättra användarupplevelsen 
          och ge information till webbplatsens ägare.
        </p>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Cookies innehåller information som till exempel språkinställningar, sessionsinformation eller unika 
          identifierare som hjälper webbplatsen att känna igen dig vid återkommande besök.
        </p>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          Vilka cookies använder vi?
        </h2>

        <h3 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.8rem' }}>
          1. Nödvändiga cookies (Essential Cookies)
        </h3>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt. De möjliggör grundläggande 
          funktioner som sidnavigering och tillgång till säkra områden på webbplatsen. Webbplatsen kan inte 
          fungera ordentligt utan dessa cookies.
        </p>
        <ul style={{ color: '#ffffff', marginBottom: '1.5rem', paddingLeft: '2rem', lineHeight: 1.8 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: '#ffffff', fontWeight: 700 }}>lastPlayedGame:</strong> Sparar vilket spel du senast spelade
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: '#ffffff', fontWeight: 700 }}>favoriteGames:</strong> Sparar dina favoritspel
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: '#ffffff', fontWeight: 700 }}>cookiesAccepted:</strong> Sparar att du har accepterat vår cookie-policy
          </li>
        </ul>

        <h3 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.8rem' }}>
          2. Analyscookies (Google Analytics)
        </h3>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Vi använder <strong style={{ color: '#ffffff', fontWeight: 700 }}>Google Analytics</strong> för att samla in 
          anonym statistik om hur besökare använder vår webbplats. Denna information hjälper oss att förbättra 
          webbplatsen och användarupplevelsen.
        </p>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Google Analytics använder cookies för att spåra:
        </p>
        <ul style={{ color: '#ffffff', marginBottom: '1.5rem', paddingLeft: '2rem', lineHeight: 1.8 }}>
          <li style={{ marginBottom: '0.5rem' }}>Antal besökare och sidvisningar</li>
          <li style={{ marginBottom: '0.5rem' }}>Hur länge besökare stannar på webbplatsen</li>
          <li style={{ marginBottom: '0.5rem' }}>Vilka sidor som besöks mest</li>
          <li style={{ marginBottom: '0.5rem' }}>Var besökare kommer ifrån (geografiskt och referenskälla)</li>
        </ul>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Läs mer om Google Analytics cookies: {' '}
          <a 
            href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffd700', textDecoration: 'underline' }}
          >
            Google Analytics Cookie Usage
          </a>
        </p>

        <h3 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.8rem' }}>
          3. Reklamcookies (Google AdSense)
        </h3>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Vi använder <strong style={{ color: '#ffffff', fontWeight: 700 }}>Google AdSense</strong> för att visa annonser 
          på vår webbplats. Google och dess partners använder cookies för att:
        </p>
        <ul style={{ color: '#ffffff', marginBottom: '1.5rem', paddingLeft: '2rem', lineHeight: 1.8 }}>
          <li style={{ marginBottom: '0.5rem' }}>Visa annonser baserat på dina tidigare besök på vår webbplats och andra webbplatser</li>
          <li style={{ marginBottom: '0.5rem' }}>Visa mer relevanta annonser baserat på dina intressen</li>
          <li style={{ marginBottom: '0.5rem' }}>Förhindra att samma annons visas för ofta</li>
          <li style={{ marginBottom: '0.5rem' }}>Mäta effektiviteten av annonser</li>
        </ul>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Du kan välja bort personaliserad annonsering genom att besöka: {' '}
          <a 
            href="https://www.google.com/settings/ads" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffd700', textDecoration: 'underline' }}
          >
            Googles annonsinställningar
          </a>
        </p>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          Hur hanterar jag cookies?
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          De flesta webbläsare accepterar cookies automatiskt, men du kan ändra inställningarna för att blockera 
          cookies om du föredrar det. Tänk på att om du blockerar cookies kan vissa delar av webbplatsen inte 
          fungera korrekt.
        </p>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Så här hanterar du cookies i olika webbläsare:
        </p>
        <ul style={{ color: '#ffffff', marginBottom: '1.5rem', paddingLeft: '2rem', lineHeight: 1.8 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a 
              href="https://support.google.com/chrome/answer/95647" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#ffd700', textDecoration: 'underline' }}
            >
              Google Chrome
            </a>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a 
              href="https://support.mozilla.org/sv/kb/webbplatscookies" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#ffd700', textDecoration: 'underline' }}
            >
              Mozilla Firefox
            </a>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a 
              href="https://support.apple.com/sv-se/guide/safari/sfri11471/mac" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#ffd700', textDecoration: 'underline' }}
            >
              Safari
            </a>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a 
              href="https://support.microsoft.com/sv-se/microsoft-edge/ta-bort-cookies-i-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#ffd700', textDecoration: 'underline' }}
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          Mer information
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Om du har frågor om hur vi använder cookies, vänligen läs vår {' '}
          <Link to="/privacy-policy" style={{ color: '#ffd700', textDecoration: 'underline' }}>
            integritetspolicy
          </Link>
          {' '}eller kontakta oss.
        </p>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#ffffff',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            ← Tillbaka till hem
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Cookies;

