import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div
        id="privacy-policy-content"
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
          Integritetspolicy
        </h1>

        <p style={{ color: '#ffffff', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
        </p>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          1. Inledning
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Inom PluggPaus är vi engagerade i att skydda och respektera din integritet.
          Denna integritetspolicy förklarar hur vi samlar in, använder och skyddar dina personuppgifter när
          du besöker vår webbplats pluggpaus.se.
        </p>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          2. Vilken information samlar vi in?
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          När du besöker vår webbplats kan vi samla in följande typer av information:
        </p>
        <ul style={{ color: '#ffffff', marginBottom: '1.5rem', paddingLeft: '2rem', lineHeight: 1.8 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: '#ffffff', fontWeight: 700 }}>Teknisk information:</strong> IP-adress, webbläsartyp och version,
            tidszonsinställning, operativsystem och plattform
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: '#ffffff', fontWeight: 700 }}>Användningsinformation:</strong> Information om hur du använder vår webbplats,
            inklusive sidvisningar, klick och navigeringsmönster
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: '#ffffff', fontWeight: 700 }}>Cookies och liknande tekniker:</strong> Vi använder cookies för att förbättra
            din upplevelse på vår webbplats
          </li>
        </ul>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          3. Google Analytics
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Vi använder <strong style={{ color: '#ffffff', fontWeight: 700 }}>Google Analytics</strong> för att analysera hur besökare använder
          vår webbplats. Google Analytics samlar in information som IP-adress, webbläsartyp och besökta sidor.
          Denna information används för att förbättra webbplatsens innehåll och användarupplevelse.
        </p>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Google Analytics använder cookies för att samla in denna information. Du kan läsa mer om hur Google
          använder information från webbplatser som använder deras tjänster på: {' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ffd700', textDecoration: 'underline' }}
          >
            https://policies.google.com/technologies/partner-sites
          </a>
        </p>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          4. Google AdSense och reklamcookies
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Vi använder <strong style={{ color: '#ffffff', fontWeight: 700 }}>Google AdSense</strong> för att visa annonser på vår webbplats.
          Tredjepartsleverantörer, inklusive Google, använder cookies för att visa annonser baserat på en användares
          tidigare besök på vår webbplats och andra webbplatser på internet.
        </p>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Googles användning av reklamcookies gör det möjligt för Google och dess partner att visa annonser till
          våra användare baserat på deras besök på vår webbplats och/eller andra webbplatser på internet.
        </p>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Du kan välja bort personaliserad annonsering genom att besöka {' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ffd700', textDecoration: 'underline' }}
          >
            Googles annonsinställningar
          </a>
          . Alternativt kan du välja bort användning av cookies från tredjepartsleverantörer genom att besöka {' '}
          <a
            href="http://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ffd700', textDecoration: 'underline' }}
          >
            Network Advertising Initiatives opt-out-sida
          </a>
          .
        </p>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          5. Hur använder vi din information?
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Vi använder den insamlade informationen för att:
        </p>
        <ul style={{ color: '#ffffff', marginBottom: '1.5rem', paddingLeft: '2rem', lineHeight: 1.8 }}>
          <li style={{ marginBottom: '0.5rem' }}>Tillhandahålla och underhålla vår webbplats</li>
          <li style={{ marginBottom: '0.5rem' }}>Förbättra användarupplevelsen och webbplatsens funktionalitet</li>
          <li style={{ marginBottom: '0.5rem' }}>Analysera hur besökare använder webbplatsen</li>
          <li style={{ marginBottom: '0.5rem' }}>Visa relevanta annonser</li>
        </ul>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          6. Dina rättigheter
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Enligt GDPR har du rätt att:
        </p>
        <ul style={{ color: '#ffffff', marginBottom: '1.5rem', paddingLeft: '2rem', lineHeight: 1.8 }}>
          <li style={{ marginBottom: '0.5rem' }}>Begära tillgång till dina personuppgifter</li>
          <li style={{ marginBottom: '0.5rem' }}>Begära rättelse av dina personuppgifter</li>
          <li style={{ marginBottom: '0.5rem' }}>Begära radering av dina personuppgifter</li>
          <li style={{ marginBottom: '0.5rem' }}>Invända mot behandling av dina personuppgifter</li>
          <li style={{ marginBottom: '0.5rem' }}>Begära begränsning av behandling av dina personuppgifter</li>
        </ul>

        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          7. Kontakta oss
        </h2>
        <p style={{ color: '#ffffff', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Om du har frågor om denna integritetspolicy eller hur vi hanterar dina personuppgifter, vänligen kontakta oss.
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

export default PrivacyPolicy;

