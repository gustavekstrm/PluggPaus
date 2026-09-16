import { useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Redaktionell artikel: vilket startord är statistiskt bäst i svensk Wordle?
 *
 * Till skillnad från spelsidorna finns den här sidan till för sitt eget innehåll.
 * Siffrorna kommer från en egen beräkning över 11 012 svenska fembokstavsord
 * (scripts/startord-analys.py), inte från tyckande.
 */

const TOP: [string, number][] = [
  ['SAKER', 5.8],
  ['RENSA', 5.79],
  ['SATIR', 5.79],
  ['LETAR', 5.75],
  ['RESAN', 5.74],
  ['SNART', 5.73],
  ['SAKEN', 5.71],
  ['SLANT', 5.67],
  ['SLITA', 5.66],
  ['TANKE', 5.65],
];

const PAIRS: [string, string, number, number][] = [
  ['RIKTA', 'SOLEN', 9.37, 4.9],
  ['LITER', 'SÄNKA', 9.32, 5.0],
  ['KARTA', 'SOLEN', 9.29, 4.9],
  ['LITER', 'SAKNA', 9.25, 5.4],
  ['LITER', 'SOMNA', 9.22, 5.6],
  ['KRONA', 'LÄSTE', 9.17, 5.5],
];

const LETTERS: [string, number][] = [
  ['A', 52], ['R', 36], ['E', 35], ['T', 35], ['S', 32], ['N', 31], ['L', 27], ['K', 22],
];

const POSITIONS: [string, string][] = [
  ['1', 'S (15 %), B (8 %), L (7 %), K (6 %)'],
  ['2', 'A (14 %), I (8 %), R (8 %), E (8 %)'],
  ['3', 'R (10 %), N (9 %), L (8 %), T (8 %)'],
  ['4', 'E (17 %), A (13 %), T (10 %), N (7 %)'],
  ['5', 'A (25 %), T (13 %), R (12 %), N (12 %)'],
];

function StartordPage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'startord');
    document.title = 'Bästa startordet i svensk Wordle – vi räknade på 11 012 ord | PluggPaus';
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/" className="pp-backlink">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Tillbaka till alla spel
        </Link>
      </div>

      <article className="pp-panel p-6 sm:p-10 mb-8 art">
        <p className="art-kicker pp-mono">Analys · uppdaterad september 2026</p>
        <h1 className="art-h1">Bästa startordet i svensk Wordle</h1>
        <p className="art-lead">
          Det finns gott om tyckande om vilket ord man ska öppna med. Vi tyckte ingenting – vi
          räknade i stället ut hur mycket information varje tänkbart startord faktiskt ger, över
          11 012 svenska fembokstavsord. Här är resultatet, och metoden bakom det.
        </p>

        <h2 className="art-h2">Kort svar</h2>
        <p>
          <strong>SAKER</strong> är det statistiskt bästa enskilda startordet. Det ger i genomsnitt
          5,80 bitar information och krymper fältet från 2 000 möjliga svar till ungefär 59.
          Skillnaden mot de närmaste konkurrenterna är dock liten – <strong>RENSA</strong>,{' '}
          <strong>SATIR</strong> och <strong>LETAR</strong> ligger så nära att valet mellan dem i
          praktiken saknar betydelse.
        </p>
        <p>
          Spelar du två fasta öppningsord är <strong>RIKTA + SOLEN</strong> den starkaste
          kombinationen vi hittade. Tillsammans lämnar de i snitt fem kandidater kvar, vilket
          nästan alltid räcker för att lösa ordet på fjärde försöket.
        </p>

        <h2 className="art-h2">Vad "bäst" betyder här</h2>
        <p>
          Ett bra startord är inte det som oftast råkar vara rätt. Det är det som delar upp
          möjligheterna jämnast. Tänk på det som tjugo frågor: den bästa frågan är den där du inte
          kan gissa svaret i förväg, eftersom den då skiljer flest fall åt.
        </p>
        <p>
          Måttet heter <strong>entropi</strong> och mäts i bitar. Ett startord som ger 5,8 bitar
          halverar fältet knappt sex gånger om. Ett svagt startord – säg <em>ÅKARE</em>, med två
          ovanliga bokstäver och ett Å – ger under fyra bitar och lämnar dig med flera hundra
          kandidater kvar.
        </p>

        <h2 className="art-h2">Topp tio startord</h2>
        <div className="art-table">
          {TOP.map(([w, bits], i) => (
            <div key={w} className="art-row">
              <span className="art-rank pp-mono">{i + 1}</span>
              <span className="art-word pp-mono">{w}</span>
              <span className="art-bar" aria-hidden="true">
                <span style={{ width: `${((bits - 5.4) / 0.5) * 100}%` }} />
              </span>
              <span className="art-num pp-mono">{bits.toFixed(2)} bitar</span>
            </div>
          ))}
        </div>
        <p className="art-note">
          Alla tio är vardagliga ord som går att skriva utan att tveka. Det är en poäng i sig: ett
          teoretiskt optimalt ord som du inte kommer på när du sitter framför rutnätet är värt
          mindre än ett näst bästa ord du minns.
        </p>

        <h2 className="art-h2">Varför just de här orden?</h2>
        <p>
          De består nästan uteslutande av de sex bokstäver som är vanligast i svenska
          fembokstavsord. Så här ofta förekommer de, räknat på de 2 000 vanligaste orden:
        </p>
        <div className="art-letters">
          {LETTERS.map(([c, pct]) => (
            <div key={c} className="art-letter">
              <span className="art-letter-c pp-mono">{c}</span>
              <span className="art-letter-p">{pct} %</span>
            </div>
          ))}
        </div>
        <p>
          A är i särklass – drygt hälften av alla svenska fembokstavsord innehåller minst ett A.
          Det förklarar varför ett startord utan A nästan alltid presterar sämre.
        </p>

        <h2 className="art-h2">Bokstävernas plats i ordet</h2>
        <p>
          Var en bokstav sitter spelar lika stor roll som om den finns. Vanligast per position:
        </p>
        <div className="art-pos">
          {POSITIONS.map(([n, s]) => (
            <div key={n} className="art-pos-row">
              <span className="art-pos-n pp-mono">{n}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <p>
          Slutpositionen är den mest förutsägbara i hela ordet: en fjärdedel av orden slutar på A.
          Räknar man in T, R och N täcker fyra bokstäver drygt 60 procent av alla slut. Har du
          bränt tre gissningar utan att hitta sista bokstaven är A alltså en bättre chansning än
          magkänslan säger.
        </p>

        <h2 className="art-h2">Bästa paret att öppna med</h2>
        <p>
          Många spelar med två fasta öppningsord och börjar tänka först på tredje gissningen. Då
          gäller det att orden inte överlappar. Här är de par som tillsammans ger mest information,
          räknat på tio olika bokstäver:
        </p>
        <div className="art-table">
          {PAIRS.map(([a, b, bits, left]) => (
            <div key={a + b} className="art-row art-row-pair">
              <span className="art-word pp-mono">
                {a} <span className="art-plus">+</span> {b}
              </span>
              <span className="art-num pp-mono">{bits.toFixed(2)} bitar</span>
              <span className="art-left">≈ {left.toFixed(1)} ord kvar</span>
            </div>
          ))}
        </div>
        <p className="art-note">
          Att gå från 2 000 möjliga svar till fem på två gissningar låter dramatiskt, och är det.
          Baksidan är att du bränner två försök oavsett hur nära du råkat komma – hittar första
          ordet fyra gröna rutor är det slöseri att envist skriva sitt andra fasta ord ändå.
        </p>

        <h2 className="art-h2">Så räknade vi</h2>
        <p>
          Underlaget är en frekvensordlista över svenska, filtrerad till ord på exakt fem bokstäver
          skrivna med svenska tecken. Efter att ord som är klart vanligare på engelska sorterats
          bort återstod <strong>11 012 ord</strong>. De 2 000 vanligaste används som svarsmängd,
          eftersom lösningen i den här typen av spel alltid är ett ord folk känner igen.
        </p>
        <p>
          För varje kandidatstartord jämförs ordet mot samtliga 2 000 tänkbara svar, och
          färgmönstret beräknas precis som spelet gör det – inklusive den kluriga hanteringen av
          dubbla bokstäver. Svaren grupperas sedan efter vilket mönster de skulle ge. Ett startord
          som sprider svaren över många små grupper får hög entropi; ett som lämnar en enda stor
          grupp får låg.
        </p>
        <p>
          Beräkningen är alltså inte en rangordning av hur "bra" orden känns, utan av hur mycket de
          faktiskt avslöjar. Samma metod används för engelska Wordle, men eftersom svenskans
          bokstavsfördelning ser annorlunda ut – med A:s dominans och Å, Ä, Ö i mängden – blir
          svaren andra än de engelska listorna ger.
        </p>

        <h2 className="art-h2">Tre saker statistiken inte fångar</h2>
        <p>
          <strong>Ordlistan avgör.</strong> Olika svenska Wordle-varianter använder olika
          ordlistor. Ett spel som tillåter böjningsformer har en annan svarsfördelning än ett med
          bara grundformer, och då förskjuts topplistan något.
        </p>
        <p>
          <strong>Andra gissningen är viktigare än den första.</strong> Skillnaden mellan det bästa
          och det tionde bästa startordet är några hundradels bitar. Skillnaden mellan att spela
          andra gissningen genomtänkt eller slarvigt är betydligt större.
        </p>
        <p>
          <strong>Att ha kul räknas.</strong> Att skriva samma ord varje dag är effektivt och en
          aning trist. Många av oss spelar hellre med ett nytt öppningsord varje gång och tar den
          halva extra gissningen det kostar.
        </p>

        <div className="art-cta">
          <p className="art-cta-text">
            Vill du testa teorin? <strong>Orda</strong> är vårt svenska ordspel – nytt ord varje
            dag, sex försök, samma ord för alla.
          </p>
          <Link to="/wordle" className="pp-cta">
            Spela Orda
          </Link>
        </div>
      </article>

      <div className="text-center">
        <Link to="/" className="pp-backlink" style={{ fontSize: 16 }}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Se alla spel
        </Link>
      </div>
    </main>
  );
}

export default StartordPage;
