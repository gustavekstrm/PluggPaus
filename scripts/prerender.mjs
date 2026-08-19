/**
 * Post-build prerender (SSG-lite).
 *
 * After `vite build`, this writes a real, crawlable static HTML file for every
 * important route into dist/<route>/index.html, with a unique <title>, meta
 * description and genuine Swedish content injected into the #root element.
 *
 * GitHub Pages then serves real content for /wordle, /kopplingar, etc. instead of
 * an empty SPA shell. The React app still boots and replaces #root on load, so the
 * interactive games, design and behaviour are completely unchanged.
 *
 * It only manipulates HTML strings (it does NOT import the app), and the whole
 * thing is wrapped in try/catch and always exits 0 — so if anything goes wrong the
 * normal SPA build is left untouched and the deploy still succeeds.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

const wrap = (inner) =>
  `<main style="max-width:820px;margin:0 auto;padding:32px 20px;font-family:'Space Grotesk',system-ui,sans-serif;color:#241d18;line-height:1.6">${inner}
        <p style="margin-top:28px"><a href="/">← Alla spel på PluggPaus</a> · <a href="/om-oss">Om oss</a> · <a href="/privacy-policy">Integritetspolicy</a> · <a href="/cookies">Cookies</a></p>
      </main>`;

const gamesList = `
        <h2 style="font-size:1.4rem;margin:28px 0 8px">Våra egna spel – spelas direkt här</h2>
        <ul>
          <li><a href="/wordle">Orda</a> – gissa dagens svenska ord på sex försök (svensk Wordle).</li>
          <li><a href="/connections">Kopplingar</a> – hitta fyra grupper av ord som hör ihop, på svenska.</li>
          <li><a href="/contexto">Kontext</a> – gissa det dolda ordet utifrån hur nära i betydelse dina gissningar är.</li>
          <li><a href="/kaffehopp">Kaffehopp</a> – vårt eget arkadspel: hoppa över och ducka för hindren.</li>
          <li><a href="/pluggorm">Pluggorm</a> – den klassiska ormen, samla kaffebönor och böcker.</li>
          <li><a href="/minne">Minne</a> – vänd korten och hitta alla par.</li>
          <li><a href="/fargminne">Färgminne</a> – härma den allt längre färgsekvensen.</li>
          <li><a href="/2048">2048</a> – pussla ihop siffrorna för att nå 2048.</li>
          <li><a href="/mathler">Mathler</a> – Wordle med matematik: hitta den dolda uträkningen.</li>
          <li><a href="/fifanostalgia">Fifa Nostalgia</a> – gissa spelarna från klassiska FUT-kort.</li>
        </ul>`;

const page = (h1, paras, extra = '') =>
  wrap(`<h1 style="font-size:2rem;margin:0 0 12px">${h1}</h1>${paras.map((p) => `<p>${p}</p>`).join('')}${extra}`);

const tips = (title, items) =>
  `<h2 style="font-size:1.3rem;margin:24px 0 8px">${title}</h2><ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

/** @type {{path:string,title:string,desc:string,html:string}[]} */
const ROUTES = [
  {
    path: '/',
    title: 'PluggPaus – Gratis Hjärntränande Spel för Studenter',
    desc: 'Ta en smart studiepaus! PluggPaus erbjuder gratis hjärntränande webbspel som Orda (svensk Wordle), Kopplingar, Kontext, 2048 och Mathler. Perfekt mellan föreläsningar.',
    html: wrap(
      `<h1 style="font-size:2rem;margin:0 0 12px">PluggPaus – gratis hjärntränande spel för din studiepaus</h1>
        <p>PluggPaus är ett litet svenskt hjärngym för studiepauser. Här hittar du snabba, gratis webbspel som tränar ordförråd, logik, minne och reflexer – perfekt för en femminuterspaus mellan föreläsningar eller pluggpass. De flesta spelen har vi byggt själva och de spelas direkt i webbläsaren, utan konto och utan nedladdning.</p>${gamesList}
        <h2 style="font-size:1.4rem;margin:28px 0 8px">Varför en studiepaus är bra för hjärnan</h2>
        <p>Forskning visar att korta, regelbundna pauser förbättrar både motivation och minneskonsolidering – grunden i den populära Pomodoro-tekniken. Genom att växla mellan fokuserat arbete och korta avbrott där du aktiverar andra delar av hjärnan återhämtar sig dina "studieområden" och du kommer tillbaka mer fokuserad.</p>`
    ),
  },
  {
    path: '/wordle',
    title: 'Orda – Wordle på Svenska | PluggPaus',
    desc: 'Spela Orda, PluggPaus egen svenska variant av Wordle. Gissa dagens femstaviga ord på sex försök. Gratis, direkt i webbläsaren.',
    html: page(
      'Orda – svensk Wordle',
      [
        '<strong>Orda</strong> är PluggPaus egna svenska ordspel i samma anda som Wordle. Du har sex försök på dig att gissa dagens hemliga ord på fem bokstäver – och alla spelare får samma ord samma dag.',
        'Grön ruta betyder rätt bokstav på rätt plats, gul ruta betyder rätt bokstav men fel plats, och grå ruta betyder att bokstaven inte finns i ordet. Att spela dagligen tränar ordförråd, mönsterigenkänning och deduktiv förmåga.',
      ],
      tips('Tips för att lyckas', [
        '<strong>Börja med vokalrika ord</strong> – startord som "raket" eller "solig" testar snabbt flera vanliga bokstäver.',
        '<strong>Å, Ä och Ö räknas</strong> – den svenska ordlistan innehåller alla svenska tecken.',
        '<strong>Återanvänd inte grå bokstäver</strong> – varje gissning ska ge ny information.',
      ])
    ),
  },
  {
    path: '/connections',
    title: 'Kopplingar – Hitta Ord som Hör Ihop | PluggPaus',
    desc: 'Spela Kopplingar, PluggPaus svenska version av Connections. Gruppera 16 ord i fyra kategorier. Nytt, klurigt pussel varje dag.',
    html: page(
      'Kopplingar – svensk Connections',
      [
        '<strong>Kopplingar</strong> är PluggPaus eget kategoripussel på svenska, inspirerat av Connections. Du ser 16 ord och ska hitta fyra grupper med fyra ord som hör ihop.',
        'Var vaksam – orden är ofta knepigt överlappande och ett ord kan verka passa i flera grupper. Spelet bygger på associativt tänkande och semantisk förståelse. Du har fyra felgissningar på dig.',
      ],
      tips('Tips & strategier', [
        '<strong>Börja med den tydligaste gruppen</strong> och lös den först för att minska röran.',
        '<strong>Akta dig för röda sillar</strong> – ord kan verka passa i en grupp men tillhöra en annan.',
        '<strong>Tänk på dubbla betydelser</strong> – ofta är ordets mindre uppenbara betydelse den rätta.',
      ])
    ),
  },
  {
    path: '/contexto',
    title: 'Kontext – Gissa Ordet via Ledtrådar | PluggPaus',
    desc: 'Spela Kontext, PluggPaus svenska ordspel där du gissar det hemliga ordet utifrån hur nära i betydelse dina gissningar ligger.',
    html: page(
      'Kontext – gissa ordet via betydelse',
      [
        '<strong>Kontext</strong> är PluggPaus svenska variant av Contexto. Du gissar det hemliga ordet, och för varje gissning får du veta hur nära i betydelse du är – ju lägre rang, desto närmare.',
        'Spelet bygger på semantisk närhet mellan ord och tränar associativt tänkande. Ett nytt hemligt ord väljs varje dag.',
      ],
      tips('Tips', [
        '<strong>Börja brett</strong> – testa vanliga ord från olika ämnesområden för att hitta rätt tema.',
        '<strong>Följ ledtrådarna</strong> – när ett ord ligger nära, prova synonymer och närbesläktade ord.',
      ])
    ),
  },
  {
    path: '/2048',
    title: '2048 – Pussel med Siffror | PluggPaus',
    desc: 'Spela 2048 gratis direkt i webbläsaren. Slå ihop brickor med samma siffra och nå 2048. Tränar logiskt tänkande och planering.',
    html: page(
      '2048 – sifferpusslet',
      [
        '<strong>2048</strong> är det klassiska pusselspelet. Flytta alla brickor åt samma håll samtidigt; när två brickor med samma nummer möts slås de samman till en dubbelt så stor. Målet är att nå brickan 2048.',
        'Varje omgång tar bara några minuter men kräver koncentration och planering flera steg framåt.',
      ],
      tips('Tips & strategier', [
        '<strong>Håll din högsta bricka i ett hörn</strong> och bygg en kedja därifrån.',
        '<strong>Fyll inte brädet</strong> – ha alltid några lediga rutor kvar.',
      ])
    ),
  },
  {
    path: '/mathler',
    title: 'Mathler – Wordle med Matematik | PluggPaus',
    desc: 'Spela Mathler, ett sifferpussel där du gissar den dolda uträkningen som ger dagens svar. Wordle för matematikälskare.',
    html: page(
      'Mathler – Wordle med matematik',
      [
        '<strong>Mathler</strong> är Wordle för matematikälskare. Istället för att gissa ord ska du hitta den dolda uträkningen på sex tecken som ger dagens svar, med samma färgledtrådar som i Wordle.',
        'Det tränar huvudräkning och logiskt tänkande, och spelas direkt här på sidan.',
      ],
      tips('Tips', [
        '<strong>Kom ihåg räkneordningen</strong> – multiplikation och division före addition och subtraktion.',
        '<strong>Utnyttja färgfeedbacken</strong> – gult tecken finns men på fel plats.',
      ])
    ),
  },
  {
    path: '/kaffehopp',
    title: 'Kaffehopp – Hoppspelet | PluggPaus',
    desc: 'Spela Kaffehopp, PluggPaus egna arkadspel. Hoppa över bokhögar, ducka för hindren och samla kaffebönor. Slå ditt rekord!',
    html: page(
      'Kaffehopp – vårt eget arkadspel',
      [
        '<strong>Kaffehopp</strong> är PluggPaus egna hoppspel, inspirerat av det klassiska dinosaurie-spelet. En kaffekopp på studiepaus springer så långt den kan – du hoppar över bokhögarna och duckar för pappersplanen, och samlar kaffebönor för bonuspoäng.',
        'Farten ökar hela tiden och ditt rekord sparas. Perfekt som snabb mikropaus som tränar reflexer och timing.',
      ]
    ),
  },
  {
    path: '/pluggorm',
    title: 'Pluggorm – Klassiska Snake | PluggPaus',
    desc: 'Spela Pluggorm, PluggPaus version av Snake. Ät kaffebönor, fånga den gyllene boken och undvik dig själv. Gratis i webbläsaren.',
    html: page(
      'Pluggorm – den klassiska ormen',
      [
        '<strong>Pluggorm</strong> är PluggPaus version av det tidlösa Snake-spelet. Styr ormen, ät kaffebönor för att växa och fånga den gyllene boken för bonuspoäng – men kör inte in i väggarna eller din egen svans.',
        'Ju längre ormen blir desto svårare blir det. Ett lugnt men fokuskrävande spel för en kort paus.',
      ]
    ),
  },
  {
    path: '/minne',
    title: 'Minne – Memory / Vänd Par | PluggPaus',
    desc: 'Spela Minne, ett klassiskt memoryspel. Vänd korten och hitta alla par på så få drag som möjligt. Tränar arbetsminnet.',
    html: page(
      'Minne – memoryspelet',
      [
        '<strong>Minne</strong> är PluggPaus variant av det klassiska memoryspelet. Alla kort ligger vända nedåt och du ska hitta alla matchande par genom att vända två kort i taget och komma ihåg var symbolerna finns.',
        'Ett perfekt spel för en kort hjärnpaus som tränar arbetsminnet – samma förmåga du använder när du pluggar in nya begrepp.',
      ]
    ),
  },
  {
    path: '/fargminne',
    title: 'Färgminne – Simon-spelet | PluggPaus',
    desc: 'Spela Färgminne, PluggPaus version av Simon. Härma den allt längre färgsekvensen. Tränar sekvensminne och koncentration.',
    html: page(
      'Färgminne – härma sekvensen',
      [
        '<strong>Färgminne</strong> är PluggPaus version av det klassiska Simon-spelet. Spelet visar en sekvens av färger som blinkar, och du ska härma sekvensen i exakt rätt ordning. Klarar du en nivå läggs en ny färg till.',
        'Ett riktigt hjärngympa-spel som tränar sekvensminne och koncentration.',
      ]
    ),
  },
  {
    path: '/fifanostalgia',
    title: 'Fifa Nostalgia – Gissa Spelaren | PluggPaus',
    desc: 'Spela Fifa Nostalgia, ett quiz där du gissar spelarnas efternamn från klassiska FIFA Ultimate Team-kort på 90 sekunder.',
    html: page(
      'Fifa Nostalgia – testa ditt fotbollsminne',
      [
        '<strong>Fifa Nostalgia</strong> är ett unikt quiz exklusivt för PluggPaus. Gissa spelarnas efternamn från klassiska FIFA Ultimate Team-kort på 90 sekunder. Spelet testar korttidsminnet och visuell igenkänning – en rolig utmaning för alla fotbollsfans.',
      ]
    ),
  },
  {
    path: '/om-oss',
    title: 'Om oss & Kontakt | PluggPaus',
    desc: 'Om PluggPaus – en kuraterad samling gratis hjärntränande spel för studenter. Kontakta oss på pluggpaus@gmail.com.',
    html: page(
      'Om PluggPaus',
      [
        '<strong>PluggPaus</strong> är en svensk plattform som samlar snabba, hjärntränande webbspel för studenter. Vår idé är enkel: korta, roliga pauser hjälper hjärnan att återhämta sig och plugga bättre. Vi bygger egna spel och tipsar om några av världens bästa pusselspel.',
        'Har du feedback, förslag eller frågor? Hör av dig till <a href="mailto:pluggpaus@gmail.com">pluggpaus@gmail.com</a>.',
      ]
    ),
  },
  {
    path: '/privacy-policy',
    title: 'Integritetspolicy | PluggPaus',
    desc: 'PluggPaus integritetspolicy – hur vi använder cookies, Google Analytics och Google AdSense, och hur du kan välja bort personaliserad annonsering.',
    html: page(
      'Integritetspolicy',
      [
        'Denna integritetspolicy förklarar hur PluggPaus samlar in, använder och skyddar dina uppgifter. Vi använder <strong>cookies</strong>, <strong>Google Analytics</strong> för besöksstatistik och <strong>Google AdSense</strong> för att visa annonser.',
        'Tredjepartsleverantörer, inklusive Google, använder cookies för att visa annonser baserat på tidigare besök. Du kan välja bort personaliserad annonsering via Googles annonsinställningar (google.com/settings/ads). Fullständig policy finns på sidan när den laddats. Kontakt: <a href="mailto:pluggpaus@gmail.com">pluggpaus@gmail.com</a>.',
      ]
    ),
  },
  {
    path: '/cookies',
    title: 'Cookie-inställningar | PluggPaus',
    desc: 'Information om hur PluggPaus använder cookies för nödvändig funktion, Google Analytics och Google AdSense-annonser.',
    html: page(
      'Cookies på PluggPaus',
      [
        'Cookies är små textfiler som lagras på din enhet när du besöker en webbplats. PluggPaus använder <strong>nödvändiga cookies</strong> för att sidan ska fungera, <strong>analyscookies</strong> (Google Analytics) samt <strong>reklamcookies</strong> (Google AdSense).',
        'Du väljer själv om du vill godkänna eller avvisa icke-nödvändiga cookies via cookie-rutan på sidan. Läs mer i vår <a href="/privacy-policy">integritetspolicy</a>.',
      ]
    ),
  },
];

function prerender() {
  const templatePath = join(DIST, 'index.html');
  const template = readFileSync(templatePath, 'utf8');
  let count = 0;

  for (const route of ROUTES) {
    let html = template;

    // Replace <title>
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`);
    // Replace meta description
    html = html.replace(
      /<meta name="description" content="[\s\S]*?"\s*\/>/,
      `<meta name="description" content="${route.desc}" />`
    );
    // Replace canonical
    const canon = route.path === '/' ? 'https://pluggpaus.se/' : `https://pluggpaus.se${route.path}`;
    html = html.replace(/<link rel="canonical" href="[\s\S]*?"\s*\/>/, `<link rel="canonical" href="${canon}" />`);
    // Inject content into #root (non-greedy up to first closing div)
    html = html.replace(/(<div id="root">)[\s\S]*?(<\/div>\s*<script)/, `$1\n      ${route.html}\n    $2`);

    const outDir = route.path === '/' ? DIST : join(DIST, route.path);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html, 'utf8');
    count++;
  }
  return count;
}

try {
  const n = prerender();
  console.log(`✓ prerender: skrev ${n} statiska sidor`);
} catch (err) {
  console.warn('⚠ prerender hoppades över (bygget påverkas inte):', err && err.message);
}
process.exit(0);
