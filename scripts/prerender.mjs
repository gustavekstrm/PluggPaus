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
  `<main style="max-width:820px;margin:0 auto;padding:32px 20px;font-family:'Space Grotesk',system-ui,sans-serif;background:#f6f1e8;color:#241d18;line-height:1.6">${inner}
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
        </ul>`;

const page = (h1, paras, extra = '') =>
  wrap(`<h1 style="font-size:2rem;margin:0 0 12px">${h1}</h1>${paras.map((p) => `<p>${p}</p>`).join('')}${extra}`);

const tips = (title, items) =>
  `<h2 style="font-size:1.3rem;margin:24px 0 8px">${title}</h2><ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

const faq = (items) =>
  `<h2 style="font-size:1.3rem;margin:24px 0 8px">Vanliga frågor</h2>${items
    .map(([q, a]) => `<h3 style="font-size:1.05rem;margin:16px 0 4px">${q}</h3><p>${a}</p>`)
    .join('')}`;

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
        <p>Korta, regelbundna pauser är grunden i Pomodoro-tekniken: tjugofem minuters fokuserat arbete följt av fem minuters avbrott. Poängen med avbrottet är inte att göra ingenting, utan att göra något som belastar hjärnan på ett annat sätt. När du växlar från att läsa in ny fakta till att lösa ett ordpussel får de områden du nyss pressat tid att bearbeta det du läst, i stället för att bara fortsätta ta emot.</p>
        <p>Det är också därför en paus i telefonens flöde sällan känns som en paus. Ett spel med en tydlig början och ett tydligt slut ger en avgränsad vila – du vet när den är slut och kan gå tillbaka. Alla dagliga spel här tar under tio minuter och byts vid midnatt, så pausen har en naturlig gräns inbyggd.</p>
        <h2 style="font-size:1.4rem;margin:28px 0 8px">Vad som tränas i vilket spel</h2>
        <p>Ordspelen – <a href="/wordle">Orda</a>, <a href="/connections">Kopplingar</a> och <a href="/contexto">Kontext</a> – tränar ordförråd och associativt tänkande, och de har alla ett nytt pussel varje dag. <a href="/minne">Minne</a> och <a href="/fargminne">Färgminne</a> belastar arbetsminnet, alltså förmågan att hålla information aktiv en kort stund. <a href="/2048">2048</a> och <a href="/mathler">Mathler</a> handlar om planering och huvudräkning, medan <a href="/kaffehopp">Kaffehopp</a> och <a href="/pluggorm">Pluggorm</a> är rena reflexspel för när du inte orkar tänka alls.</p>
        <p>Allt spelas direkt i webbläsaren. Inget konto, ingen nedladdning, ingen installation – och dina resultat sparas lokalt i din egen webbläsare.</p>`
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
      ]) +
      faq([
        ['Vad är skillnaden mot engelska Wordle?', 'Orda använder en svensk ordlista, så Å, Ä och Ö är fullt giltiga bokstäver och ingår i lösningarna. Svenska ord har också andra ändelser än engelska – <strong>-ING</strong>, <strong>-EN</strong>, <strong>-AR</strong> och <strong>-ER</strong> är vanliga slut, vilket påverkar vilka startord som lönar sig.'],
        ['Får alla samma ord?', 'Ja. Ordet väljs utifrån datumet i svensk tid och byts vid midnatt, så alla spelare har samma ord samma dag. Det gör resultatet jämförbart med kompisar.'],
        ['Vad händer om jag inte gissar rätt?', 'Efter sex försök visas ordet och din svit nollställs. Nästa ord kommer vid midnatt.'],
        ['Sparas mina resultat?', 'Ja, i din egen webbläsare. Statistik, svit och gissningsfördelning ligger kvar även om du stänger fliken. Inget skickas till oss och du behöver inget konto.'],
      ])
    ),
  },
  {
    path: '/connections',
    title: 'Kopplingar – Hitta Ord som Hör Ihop | PluggPaus',
    desc: 'Spela Kopplingar, PluggPaus svenska version av Connections. Gruppera 16 ord i fyra kategorier. Ett nytt pussel varje dag ur vår svenska samling.',
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
      ]) +
      faq([
        ['Hur många fel får jag göra?', 'Fyra. Varje felaktig gruppering kostar ett försök, och när alla fyra är slut avslöjas lösningen.'],
        ['Vad menas med en "röd sill"?', 'Ett ord som ser ut att självklart höra hemma i en grupp, men som egentligen tillhör en annan. Ordet KLÖVER kan till exempel kännas som en växt medan det i pusslet är slang för pengar. De fällorna är själva poängen med spelet.'],
        ['Varför är vissa kategorier svårare?', 'Kategorierna är färgkodade efter svårighet. Den enklaste är oftast en rak ämnesgrupp, medan den svåraste kan bygga på ordlekar, uttryck eller en gemensam ändelse snarare än betydelse.'],
        ['Är pusslen översatta?', 'Nej. Alla pussel är skrivna på svenska från grunden, med svenska uttryck och svensk slang som inte fungerar i en översättning.'],
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
      ]) +
      faq([
        ['Hur räknas ranken ut?', 'Varje pussel har en förberäknad lista där omkring 13 000 vanliga svenska ord sorterats efter hur nära de ligger målordet i betydelse. Närheten kommer från en svensk ordvektormodell som tränats på stora mängder svensk text. Rang 1 är målordet, rang 50 ligger nära, och flera tusen betyder att du letar i fel område.'],
        ['Varför får ett ord jag skrev ingen rang?', 'Ordet finns inte bland de rankade orden. Ordlistan täcker vanlig svenska, så ovanliga fackord, namn och böjningsformer kan saknas. Gissningen räknas ändå.'],
        ['Räknas böjningar som samma ord?', 'Nej, de rankas var för sig. HAVET ligger mycket nära HAV men är inte samma ord, så du måste hitta den exakta formen.'],
        ['Finns det någon gräns för antal gissningar?', 'Nej. Du kan gissa hur många gånger du vill, och det finns ledtrådar om du kör fast. Utmaningen ligger i att klara det på så få gissningar som möjligt.'],
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
      ]) +
      faq([
        ['Kan man fortsätta efter 2048?', 'Ja. När du når 2048 kan du välja att fortsätta spela på samma bräde och sikta vidare mot 4096 och 8192.'],
        ['Varför dyker det upp en fyra ibland?', 'Nya brickor är oftast en tvåa, men ibland en fyra. Det gör att brädet fylls snabbare än man räknar med och är en vanlig orsak till att omgångar tar slut oväntat.'],
        ['Vad är den vanligaste nybörjarmissen?', 'Att svepa nedåt. Håller du din största bricka i ett hörn och bara använder tre riktningar behåller du kontrollen mycket längre.'],
        ['Sparas mitt rekord?', 'Ja, i din webbläsare. Poängen i den aktuella omgången nollställs när du börjar om, men rekordet ligger kvar.'],
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
      ]) +
      faq([
        ['Måste uträkningen se ut precis som facit?', 'Nej. Kommutativa varianter räknas som samma lösning – <strong>12+5*3</strong> och <strong>5*3+12</strong> ger samma svar och godtas båda.'],
        ['Vilka tecken får användas?', 'Siffrorna 0–9 samt +, −, * och /. Uträkningen är alltid exakt sex tecken lång.'],
        ['Hur hittar jag ett bra startförsök?', 'Använd ett försök som testar flera olika siffror och minst två räknesätt. Att bara testa additioner ger lite information tillbaka.'],
        ['Byts pusslet varje dag?', 'Ja, vid midnatt svensk tid – samma gräns som för Orda, Kopplingar och Kontext.'],
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
      ],
      tips('Så spelar du', [
        '<strong>Mellanslag eller pil upp</strong> hoppar. På mobil trycker du på spelytan.',
        '<strong>Pil ned</strong> duckar – och mitt i ett hopp faller du snabbare, vilket behövs när hindren kommer tätt.',
        '<strong>Kaffebönorna ger bonuspoäng</strong> men ligger ofta där du helst inte vill vara.',
      ]) +
      faq([
        ['Går spelet att vinna?', 'Nej, det tar aldrig slut av sig självt. Farten ökar stegvis tills du träffar ett hinder, så det handlar om att slå sitt eget rekord.'],
        ['Sparas rekordet?', 'Ja, i din webbläsare. Det ligger kvar tills du rensar webbläsardata.'],
        ['Fungerar det på mobil?', 'Ja. Tryck på spelytan för att hoppa, eller använd knapparna under spelet för att hoppa och ducka.'],
      ])
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
      ],
      tips('Tips', [
        '<strong>Styr med piltangenterna eller W/A/S/D</strong>, och med svep på mobil.',
        '<strong>Håll dig längs kanterna</strong> tidigt i omgången och spara mitten till när ormen blivit lång.',
        '<strong>Den gyllene boken</strong> ger extrapoäng men försvinner efter en stund – ta den bara om vägen dit är fri.',
      ]) +
      faq([
        ['Dör jag om jag följer min egen svans?', 'Nej. Svansspetsen flyttar sig samtidigt som huvudet, så rutan den lämnar är ledig – utom precis när ormen växer.'],
        ['Går det att pausa?', 'Omgången fortsätter så länge fliken är aktiv. Byter du flik stannar spelet upp.'],
        ['Blir det snabbare?', 'Ja. Ormen rör sig snabbare för varje poäng, från 125 ms per steg ned till 75 ms. Tillsammans med att kroppen blir längre gör det att utrymmet krymper i två riktningar samtidigt.'],
      ])
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
      ],
      tips('Tips', [
        '<strong>Vänd korten systematiskt</strong> – rad för rad ger dig en karta i huvudet snabbare än slumpmässiga val.',
        '<strong>Säg symbolen tyst för dig själv</strong> när du vänder ett kort. Att sätta ord på det gör att det fastnar bättre.',
        '<strong>Sikta på färre drag</strong>, inte på tid. Bästa resultat räknas i antal drag.',
      ]) +
      faq([
        ['Hur många par finns det?', 'Åtta par på ett rutnät med sexton kort.'],
        ['Vad räknas som ett drag?', 'Varje gång du vänder två kort. Ett hittat par räknas också som ett drag.'],
        ['Varför är memory bra som studiepaus?', 'Spelet belastar arbetsminnet, alltså förmågan att hålla information aktiv en kort stund. Det är samma förmåga du använder när du läser in nya begrepp – men här utan krav på resultat, vilket gör det till en paus snarare än mer plugg.'],
      ])
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
      ],
      tips('Tips', [
        '<strong>Gruppera sekvensen i par eller trior</strong> i stället för att minnas varje färg för sig – det är samma teknik som gör telefonnummer lättare att komma ihåg.',
        '<strong>Titta på hela plattan</strong>, inte på en färg i taget.',
        '<strong>Stressa inte fram svaret</strong> – det finns ingen tidsgräns när det är din tur.',
      ]) +
      faq([
        ['Hur långt kan sekvensen bli?', 'Den växer med en färg per klarad nivå och har ingen övre gräns. De flesta fastnar någonstans mellan nivå åtta och tolv.'],
        ['Vad händer om jag trycker fel?', 'Omgången tar slut direkt och du får börja om från nivå ett.'],
        ['Varför blir det svårare så snabbt?', 'De flesta kan hålla ungefär fyra till sju enheter i arbetsminnet samtidigt. Bortom det krävs att du börjar gruppera sekvensen i bitar i stället för att minnas färg för färg.'],
      ])
    ),
  },
  {
    path: '/om-oss',
    title: 'Om oss & Kontakt | PluggPaus',
    desc: 'Om PluggPaus – en kuraterad samling gratis hjärntränande spel för studenter. Kontakta oss på pluggpaus@gmail.com.',
    html: page(
      'Om PluggPaus',
      [
        '<strong>PluggPaus</strong> är en svensk sajt med snabba, hjärntränande webbspel för studenter. Idén kom ur ett konkret problem: pauser mellan pluggpass blir lätt en halvtimme i ett socialt flöde som varken vilar hjärnan eller känns avslutad. Ett spel med tydlig början och tydligt slut gör pausen till en paus.',
        'Alla spel vi listar under Våra spel har vi byggt själva och de körs direkt i webbläsaren. Ordspelen bygger på svenskt material från grunden – <a href="/wordle">Orda</a> har en kurerad lista med svenska fembokstavsord, <a href="/connections">Kopplingar</a> har handskrivna kategorier med svensk slang och svenska uttryck, och <a href="/contexto">Kontext</a> rankar omkring 13 000 svenska ord efter betydelse med hjälp av en svensk ordvektormodell. Ingenting är översatt.',
        'Sajten är gratis och finansieras med annonser. Du behöver inget konto, och dina resultat sparas bara i din egen webbläsare – vi har ingen databas med spelare.',
        'Har du feedback, hittat ett fel eller förslag på ett spel? Hör av dig till <a href="mailto:pluggpaus@gmail.com">pluggpaus@gmail.com</a>. Vi läser allt.',
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
        '<strong>Vad vi samlar in.</strong> Vi har inga användarkonton och begär aldrig namn, e-post eller andra personuppgifter för att du ska kunna spela. Dina spelresultat, statistik och inställningar sparas i din webbläsares lokala lagring på din egen enhet – de skickas aldrig till oss och vi kan inte läsa dem. Rensar du webbläsardata försvinner de.',
        '<strong>Google Analytics</strong> ger oss aggregerad besöksstatistik: antal besök, vilka sidor som används och ungefärlig geografisk region. Vi kan inte identifiera enskilda besökare i den statistiken.',
        '<strong>Google AdSense.</strong> Tredjepartsleverantörer, inklusive Google, använder cookies för att visa annonser baserat på tidigare besök på den här och andra webbplatser. Du kan välja bort personaliserad annonsering i <a href="https://www.google.com/settings/ads">Googles annonsinställningar</a>, läsa mer om hur Google hanterar data hos <a href="https://policies.google.com/technologies/partner-sites">Googles partnersidor</a>, eller välja bort tredjepartsleverantörers cookies via <a href="https://www.aboutads.info/choices/">aboutads.info</a>.',
        '<strong>Dina rättigheter enligt GDPR.</strong> Du har rätt att begära tillgång till, rättelse av eller radering av personuppgifter som rör dig, samt att invända mot behandling. Eftersom vi inte lagrar personuppgifter om enskilda besökare finns i praktiken inget register att begära ut, men du är alltid välkommen att höra av dig.',
        'Frågor om den här policyn? Kontakta <a href="mailto:pluggpaus@gmail.com">pluggpaus@gmail.com</a>.',
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
        '<strong>Nödvändig lagring</strong> är det som får sajten att fungera: ditt val av ljust eller mörkt tema, vilka spel du markerat som favoriter, och dina resultat i spelen. Detta ligger i webbläsarens lokala lagring på din enhet och skickas aldrig vidare.',
        '<strong>Analyscookies</strong> från Google Analytics visar oss hur många som besöker sajten och vilka spel som används, så vi vet vad som är värt att bygga vidare på. Statistiken är aggregerad och pekar inte ut enskilda besökare.',
        '<strong>Reklamcookies</strong> från Google AdSense gör att annonserna kan anpassas efter dina intressen. Annonserna är det som betalar för sajten. Vill du slippa anpassade annonser kan du stänga av det i <a href="https://www.google.com/settings/ads">Googles annonsinställningar</a> – du får då fortfarande annonser, men mindre relevanta.',
        '<strong>Så tar du bort cookies.</strong> Alla webbläsare låter dig radera cookies och lokal lagring under inställningarna för integritet eller webbplatsdata. Gör du det försvinner även dina spelresultat och ditt temaval, eftersom de lagras på samma sätt.',
        'Läs mer om hur vi hanterar uppgifter i vår <a href="/privacy-policy">integritetspolicy</a>.',
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
    // Replace og:url så delningar pekar på rätt sida
    html = html.replace(/<meta property="og:url" content="[\s\S]*?"\s*\/>/, `<meta property="og:url" content="${canon}" />`);
    // Injicera innehållet i #root.
    // OBS: ankaret måste vara </body>, INTE <script>. I käll-index.html ligger
    // entry-scriptet efter #root, men Vite flyttar det till <head> vid bygge — så i
    // dist följs </div> av </body>. Med fel ankare matchar regexen inte, replace
    // returnerar strängen oförändrad utan att kasta, och alla sidor blir identiska.
    const beforeInject = html;
    html = html.replace(/(<div id="root">)[\s\S]*?(<\/div>\s*<\/body>)/, `$1\n      ${route.html}\n    $2`);
    if (html === beforeInject) {
      throw new Error(`kunde inte injicera innehåll för ${route.path} – #root-ankaret matchade inte`);
    }

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
  process.exit(0);
} catch (err) {
  // Medvetet högljutt. Ett prerender-steg som misslyckas tyst är värre än inget alls:
  // då deployas 14 identiska sidor och sajten ser ut som en dörrmattefarm för Google.
  console.error('✗ prerender misslyckades:', err && err.message);
  console.error('  Bygget avbryts med flit – hellre inget bygge än 14 identiska sidor.');
  process.exit(1);
}
