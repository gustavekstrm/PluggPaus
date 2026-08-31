import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import GameCard, { type Game } from '../components/GameCard';
import { useAppState } from '../context/AppState';

const GAMES: Game[] = [
  // Våra egna svenska versioner
  { id: 'connections', title: 'Kopplingar', desc: 'Hitta fyra grupper av ord som hör ihop – på svenska.', to: '/connections', color: '#9b5cf0', border: '#6a34b8', ink: '#fff' },
  { id: 'wordle', title: 'Orda', desc: 'Gissa dagens svenska ord på sex försök.', to: '/wordle', color: '#2fb6ad', border: '#167a74', ink: '#08201f' },
  { id: 'contexto', title: 'Kontext', desc: 'Gissa dagens svenska ord utifrån kontext och likhet.', to: '/contexto', color: '#f0554a', border: '#b52f28', ink: '#fff' },
  // Nya egna spel
  { id: 'kaffehopp', title: 'Kaffehopp', desc: 'Hoppa över hindren i vårt eget arkadspel.', to: '/kaffehopp', badge: 'NYTT', color: '#6366f1', border: '#3b3fb0', ink: '#fff' },
  { id: 'pluggorm', title: 'Pluggorm', desc: 'Klassiska Snake – ät, väx och överlev.', to: '/pluggorm', badge: 'NYTT', color: '#2fb56a', border: '#167a45', ink: '#08201a' },
  { id: 'minne', title: 'Minne', desc: 'Vänd korten och hitta alla par.', to: '/minne', badge: 'NYTT', color: '#3b9ef0', border: '#1f6cb5', ink: '#fff' },
  { id: 'tajming', title: 'Tajming', desc: 'Tvåspelarduell: stoppa den osynliga klockan närmast måltiden.', to: '/tajming', badge: 'NYTT', color: '#e2452f', border: '#a3220f', ink: '#fff' },
  { id: 'fargminne', title: 'Färgminne', desc: 'Härma den växande färgsekvensen.', to: '/fargminne', badge: 'NYTT', color: '#e050c0', border: '#a52e8c', ink: '#fff' },
  { id: '2048', title: '2048', desc: 'Pussla ihop siffrorna för att nå 2048!', to: '/2048', color: '#f0972f', border: '#b56717', ink: '#241703' },
  { id: 'mathler', title: 'Mathler', desc: 'Wordle med matematik – hitta den dolda uträkningen.', to: '/mathler', color: '#7b5cf0', border: '#4f34b8', ink: '#fff' },
];

const MARQUEE = 'Insert coin ✦ 5 minuters paus ✦ ordspel ✦ minne ✦ arkad ✦ matte ✦ high score ✦ inget konto ✦ helt gratis ✦';

function Home() {
  const { isFavorite, favsOnly } = useAppState();
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    document.title = 'PluggPaus – Gratis Hjärntränande Spel för Studenter';
    const cookieChoice = localStorage.getItem('cookiesAccepted');
    if (!cookieChoice) setShowCookieBanner(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'accepted');
    setShowCookieBanner(false);
  };
  const declineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'declined');
    setShowCookieBanner(false);
  };

  const visible = favsOnly ? GAMES.filter((g) => isFavorite(g.id)) : GAMES;
  const heading = favsOnly ? 'Dina favoriter' : 'Välj ett spel';
  const isEmpty = favsOnly && visible.length === 0;

  return (
    <>
      {/* Hero */}
      <section className="pp-hero">
        <div className="pp-kicker">
          <span aria-hidden="true">★</span>
          <span>Insert coin · hjärngym</span>
          <span aria-hidden="true">★</span>
        </div>
        <h1 className="pp-h1">PluggPaus</h1>
        <p className="pp-sub">Snabba hjärntränande spel för din studiepaus</p>
        <p className="pp-lead">
          Ladda om hjärnan med ett snabbt spel mellan föreläsningarna. Allt spelas direkt här på sidan,
          utan konto och utan nedladdning – välj ett nedan och kör igång.
        </p>
        <div className="pp-chips">
          <span className="pp-chip"><span className="pp-chip-check" aria-hidden="true">✓</span><span>Helt gratis</span></span>
          <span className="pp-chip"><span className="pp-chip-check" aria-hidden="true">✓</span><span>Inget konto</span></span>
          <span className="pp-chip"><span className="pp-chip-check" aria-hidden="true">✓</span><span>Funkar på mobilen</span></span>
        </div>
        <div style={{ marginTop: 36 }}>
          <a href="#spel" className="pp-cta">Börja spela <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      {/* Marquee */}
      <div className="pp-marquee">
        <div className="pp-track">
          <span>{MARQUEE}</span>
          <span aria-hidden="true">{MARQUEE}</span>
        </div>
      </div>

      {/* Top Ad Banner */}
      <AdBanner slot="5092040576" className="ad-banner-top" />

      {/* Game grid */}
      <section id="spel" className="pp-section">
        <div className="pp-sechead">
          <div>
            <div className="pp-sec-kicker">▸ Spelbibliotek</div>
            <h2 className="pp-h2">{heading}</h2>
          </div>
          <div className="pp-count">{visible.length} spel</div>
        </div>

        {isEmpty ? (
          <div className="pp-empty">Inga favoriter än – tryck på ♥ på ett spel.</div>
        ) : (
          <div className="pp-grid">
            {visible.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        )}
      </section>

      {/* SEO Content Section */}
      <section id="seo-article-fixed" className="seo-content">
        <h2>Varför din hjärna behöver en PluggPaus</h2>

        <p>
          Under långa föreläsningar eller intensiva pluggpass är det lätt att tro att konstant fokus är nyckeln till framgång.
          Men forskning visar att din hjärna faktiskt presterar bättre med regelbundna mikropauser. När du tar korta pauser
          på 5–10 minuter aktiveras hjärnans <strong>dopaminsystem</strong>, vilket förbättrar både motivation och
          minneskonsolidering. Detta är grunden i den populära <strong>Pomodoro-tekniken</strong>, där du växlar mellan
          koncentrerade arbetspass och korta avbrott.
        </p>

        <p>
          Här på PluggPaus samlar vi <strong>gratis onlinespel</strong> som är perfekta för just detta ändamål.
          Alla spel har vi byggt själva och de spelas direkt i webbläsaren, utan konto och utan nedladdning.
          Tillsammans fungerar de som <strong>hjärngympa för studenter</strong> genom att träna olika kognitiva
          förmågor som ordförråd, logiskt tänkande och minne.
        </p>

        <h2>Orda – Träna ditt ordförråd</h2>
        <p>
          <strong>Orda</strong> är PluggPaus egna svenska ordspel i samma anda som Wordle. Du har sex försök att gissa
          dagens femstaviga ord, och varje gissning ger ledtrådar genom färgkodade rutor: grön betyder rätt bokstav på
          rätt plats, gul betyder rätt bokstav men fel plats. Att spela dagligen tränar aktivt ditt <strong>ordförråd</strong>,
          mönsterigenkänning och deduktiva förmåga.
        </p>

        <h2>Kopplingar – Testa ditt associativa tänkande</h2>
        <p>
          <strong>Kopplingar</strong> är PluggPaus eget kategoriseringsspel på svenska, inspirerat av Connections. Hitta fyra
          grupper av ord som hör ihop – men var vaksam, orden är ofta knepigt överlappande och ett ord kan verka passa i flera
          grupper! Spelet bygger på <strong>associativt tänkande</strong> och semantisk förståelse, vilket stärker din analytiska
          förmåga.
        </p>

        <h2>2048 – Öva logiskt tänkande</h2>
        <p>
          I <strong>2048</strong> kombinerar du numrerade brickor på ett 4×4-rutnät för att nå målet: brickan med värdet 2048.
          Du flyttar alla brickor åt samma håll samtidigt, och när två brickor med samma nummer möts slås de samman. Detta pussel
          är ett utmärkt <strong>tidsfördriv under föreläsningar</strong> eftersom varje omgång tar bara 2–5 minuter, men kräver
          intensiv koncentration och planering flera steg framåt.
        </p>

        <h2>Kaffehopp – Vårt eget arkadspel</h2>
        <p>
          <strong>Kaffehopp</strong> är PluggPaus egna hoppspel, inspirerat av det klassiska dinosaurie-spelet som dyker upp i
          webbläsaren när internet ligger nere. Här springer en kaffekopp på studiepaus så långt den kan medan du hoppar över
          hindren. Spelet tränar <strong>reflexer och timing</strong> och är den perfekta mikropausen – du startar det på en
          sekund och kan alltid försöka slå ditt eget rekord.
        </p>

        <h2>Mathler – Wordle med matematik</h2>
        <p>
          <strong>Mathler</strong> är ett sifferpussel för dig som gillar matematik. Istället för ord gissar du en dold uträkning
          som ger dagens svar, med samma färgledtrådar som i Wordle. Det tränar <strong>huvudräkning</strong> och logiskt tänkande,
          och spelas direkt här på sidan utan nedladdning.
        </p>

        <h2>Pluggorm, Minne och Färgminne – Klassiker som tränar hjärnan</h2>
        <p>
          Utöver ordspelen har PluggPaus flera egna arkad- och minnesspel. <strong>Pluggorm</strong> är den tidlösa Snake-klassikern
          där du äter, växer och undviker dig själv. <strong>Minne</strong> är ett memoryspel som tränar arbetsminnet genom att du
          vänder kort och hittar par. I <strong>Färgminne</strong> ska du härma en allt längre färgsekvens, vilket tränar
          sekvensminne och koncentration. Alla spelas gratis direkt i webbläsaren – perfekt för en snabb paus mellan föreläsningarna.
        </p>

        <h2>Vetenskapliga fördelar med spelpauser</h2>
        <p>
          Korta <strong>hjärngymnastik-pauser</strong> är själva idén bakom Pomodoro-tekniken. När du
          <strong>spelar gratis webbläsarspel</strong> aktiveras andra delar av hjärnan än de du använder för pluggande, vilket ger
          dina "studieområden" tid att återhämta sig och konsolidera ny information. Detta fenomen kallas för <strong>diffust tänkande</strong>
          och är lika viktigt som fokuserat lärande.
        </p>

        <p>
          Så nästa gång du känner att koncentrationen sviktar under en lång föreläsning – ta en PluggPaus!
          Välj ett av våra <strong>hjärntränande spel</strong> och ge din hjärna den paus den förtjänar.
          Du kommer tillbaka starkare, mer fokuserad och redo att ta dig an nya utmaningar.
        </p>
      </section>

      {/* Sticky Bottom Ad Bar */}
      <AdBanner slot="2861993283" className="ad-sticky-bottom" />

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="cookie-banner">
          <p>
            Vi använder cookies för analys och annonser. Du väljer själv om du vill godkänna eller avvisa icke-nödvändiga cookies.
          </p>
          <div className="cookie-banner-buttons">
            <button onClick={acceptCookies} className="cookie-accept-btn">Godkänn alla</button>
            <button onClick={declineCookies} className="cookie-decline-btn">Avvisa</button>
            <Link to="/cookies" className="cookie-link">Läs mer</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
