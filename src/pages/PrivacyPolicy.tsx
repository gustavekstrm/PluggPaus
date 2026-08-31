import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="seo-content" style={{ margin: '0 auto', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>
          Integritetspolicy
        </h1>

        <p>Senast uppdaterad: 2026-08-21</p>

        <h2>1. Inledning</h2>
        <p>
          Inom PluggPaus är vi engagerade i att skydda och respektera din integritet.
          Denna integritetspolicy förklarar hur vi samlar in, använder och skyddar dina personuppgifter när
          du besöker vår webbplats pluggpaus.se.
        </p>

        <h2>2. Vilken information samlar vi in?</h2>
        <p>När du besöker vår webbplats kan vi samla in följande typer av information:</p>
        <ul style={{ paddingLeft: '2rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Teknisk information:</strong> IP-adress, webbläsartyp och version,
            tidszonsinställning, operativsystem och plattform
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Användningsinformation:</strong> Information om hur du använder vår webbplats,
            inklusive sidvisningar, klick och navigeringsmönster
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Cookies och liknande tekniker:</strong> Vi använder cookies för att förbättra
            din upplevelse på vår webbplats
          </li>
        </ul>

        <h2>3. Google Analytics</h2>
        <p>
          Vi använder <strong>Google Analytics</strong> för att analysera hur besökare använder
          vår webbplats. Google Analytics samlar in information som IP-adress, webbläsartyp och besökta sidor.
          Denna information används för att förbättra webbplatsens innehåll och användarupplevelse.
        </p>
        <p>
          Google Analytics använder cookies för att samla in denna information. Du kan läsa mer om hur Google
          använder information från webbplatser som använder deras tjänster på:{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://policies.google.com/technologies/partner-sites
          </a>
        </p>

        <h2>4. Google AdSense och reklamcookies</h2>
        <p>
          Vi använder <strong>Google AdSense</strong> för att visa annonser på vår webbplats.
          Tredjepartsleverantörer, inklusive Google, använder cookies för att visa annonser baserat på en användares
          tidigare besök på vår webbplats och andra webbplatser på internet.
        </p>
        <p>
          Googles användning av reklamcookies gör det möjligt för Google och dess partner att visa annonser till
          våra användare baserat på deras besök på vår webbplats och/eller andra webbplatser på internet.
        </p>
        <p>
          <strong>AdSense-policy efterlevnad:</strong> PluggPaus följer
          Google AdSenses policys och riktlinjer. Vi säkerställer att alla annonser visas i enlighet med Googles program-
          policyer för utgivare, inklusive krav på innehållskvalitet, användarupplevelse och transparens.
        </p>
        <p>
          Du kan välja bort personaliserad annonsering genom att besöka{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Googles annonsinställningar
          </a>
          . Alternativt kan du välja bort användning av cookies från tredjepartsleverantörer genom att besöka{' '}
          <a
            href="http://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Network Advertising Initiatives opt-out-sida
          </a>
          .
        </p>

        <h2>5. Hur använder vi din information?</h2>
        <p>Vi använder den insamlade informationen för att:</p>
        <ul style={{ paddingLeft: '2rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Tillhandahålla och underhålla vår webbplats</li>
          <li style={{ marginBottom: '0.5rem' }}>Förbättra användarupplevelsen och webbplatsens funktionalitet</li>
          <li style={{ marginBottom: '0.5rem' }}>Analysera hur besökare använder webbplatsen</li>
          <li style={{ marginBottom: '0.5rem' }}>Visa relevanta annonser</li>
        </ul>

        <h2>6. Dina rättigheter</h2>
        <p>Enligt GDPR har du rätt att:</p>
        <ul style={{ paddingLeft: '2rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Begära tillgång till dina personuppgifter</li>
          <li style={{ marginBottom: '0.5rem' }}>Begära rättelse av dina personuppgifter</li>
          <li style={{ marginBottom: '0.5rem' }}>Begära radering av dina personuppgifter</li>
          <li style={{ marginBottom: '0.5rem' }}>Invända mot behandling av dina personuppgifter</li>
          <li style={{ marginBottom: '0.5rem' }}>Begära begränsning av behandling av dina personuppgifter</li>
        </ul>

        <h2>7. Kontakta oss</h2>
        <p>
          Om du har frågor om denna integritetspolicy eller hur vi hanterar dina personuppgifter, vänligen kontakta oss på{' '}
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

export default PrivacyPolicy;

