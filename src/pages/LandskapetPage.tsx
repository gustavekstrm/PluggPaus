import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import GamePageShell from '../components/GamePageShell';
import LandskapetGame from '../components/games/LandskapetGame';
import { writeString } from '../utils/safeStorage';
import { usePuzzleDate } from '../utils/archive';
import ArchiveBanner from '../components/ArchiveBanner';

function LandskapetPage() {
  const { date, isArchive } = usePuzzleDate();
  useEffect(() => {
    writeString('lastPlayedGame', 'landskapet');
    document.title = 'Landskapet – Gissa Sveriges Landskap | PluggPaus';
  }, []);

  return (
    <GamePageShell
      title="Landskapet"
      tagline="Känner du igen dagens landskap bara på konturen?"
      badge="🗺️ Nytt landskap varje dag"
      category="Geografi"
      difficulty="Medium"
      playtime="2-5 min"
      benefit="Geografi & rumsuppfattning"
      aboutTitle="Så spelar du Landskapet"
      about={
        <>
          <p>
            Landskapet är ett dagligt geografispel om Sveriges 25 landskap. Du ser konturen av ett landskap –
            utan namn, utan grannar och utan städer – och har sex försök på dig att gissa vilket det är.
          </p>
          <p>
            <strong>Så fungerar det:</strong>
            <br />• Skriv ett landskap och välj det i listan
            <br />• Är det fel ser du hur många kilometer bort rätt landskap ligger
            <br />• Pilen visar åt vilket håll du ska leta, och procenten hur nära du är
            <br />• Efter tre missar får du veta om landskapet ligger i Götaland, Svealand eller Norrland
            <br />• När rundan är slut visas hela Sverigekartan med svaret markerat
          </p>
          <p>
            Avstånden mäts mellan landskapens mittpunkter, så två grannlandskap kan ändå ligga en bit isär.
            Alla får samma landskap samma dag. Vill du köra fler finns ett övningsläge med slumpade landskap
            som inte påverkar din statistik.
          </p>
          <p>
            Landskapen har ingen administrativ roll i dag – det är länen som sköter förvaltningen – men de lever
            kvar i dialekter, landskapsdjur och -blommor och i hur vi pratar om var vi kommer ifrån. Götaland har
            tio landskap, Svealand sex och Norrland nio. Störst är Lappland och minst är Öland.
          </p>
        </>
      }
      tipsTitle="Tips för att känna igen landskapen"
      tips={[
        { strong: 'Kusten avslöjar mest', text: '– en flikig skärgårdskust pekar mot östkusten eller Bohuslän, en rak sandkust mot Halland eller Skåne.' },
        { strong: 'Titta på proportionerna', text: '– långsmala former i nord–sydlig riktning är ofta Öland, Gotland, Bohuslän eller Halland.' },
        { strong: 'Följ pilen, inte bara avståndet', text: '– två gissningar med samma avstånd men olika riktning ringar in svaret snabbt.' },
        { strong: 'Gissa brett först', text: '– ett landskap mitt i landet, som Dalarna eller Västmanland, ger en riktning som halverar kartan.' },
        { strong: 'Öva på de små', text: '– Gästrikland, Medelpad, Närke och Blekinge är de som oftast lurar folk.' },
      ]}
      faqTitle="Vanliga frågor om Landskapet"
      faqs={[
        {
          q: 'Hur många landskap har Sverige?',
          a: 'Sverige har 25 landskap: tio i Götaland, sex i Svealand och nio i Norrland. Alla 25 finns med i spelet, och vart och ett kommer tillbaka ungefär en gång i månaden.',
        },
        {
          q: 'Vad är skillnaden mellan landskap och län?',
          a: 'Landskapen är historiska och kulturella indelningar som inte har någon förvaltning i dag. Länen är de administrativa regionerna. Gränserna överlappar ofta men stämmer sällan helt – Småland är till exempel uppdelat på flera län.',
        },
        {
          q: 'Hur räknas avståndet?',
          a: 'Som fågelvägen mellan landskapens mittpunkter. Procenten jämför avståndet med det längsta möjliga avståndet mellan två landskap, så 100 % betyder rätt svar.',
        },
        {
          q: 'Varifrån kommer kartan?',
          a: 'Gränserna kommer från öppna geodata (CC0) baserade på Lantmäteriets distriktskarta, förenklade så att de laddar snabbt. Små öar är bortplockade för att konturen ska bli tydlig.',
        },
        {
          q: 'Påverkar övningsläget min svit?',
          a: 'Nej. Bara dagens landskap räknas i statistiken. Övningsrundorna är till för att plugga in kartan.',
        },
      ]}
    >
      {isArchive && <ArchiveBanner date={date} path="/landskapet" />}
      <LandskapetGame key={date} date={date} isArchive={isArchive} />
      {!isArchive && (
        <p className="text-center mt-6 text-sm" style={{ color: 'var(--ink-muted)' }}>
          Missat en dag? <Link to="/arkiv" className="underline">Spela tidigare pussel i arkivet</Link>.
        </p>
      )}
    </GamePageShell>
  );
}

export default LandskapetPage;
