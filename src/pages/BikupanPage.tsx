import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import GamePageShell from '../components/GamePageShell';
import BikupanGame from '../components/games/BikupanGame';
import { writeString } from '../utils/safeStorage';
import { usePuzzleDate } from '../utils/archive';
import ArchiveBanner from '../components/ArchiveBanner';

function BikupanPage() {
  const { date, isArchive } = usePuzzleDate();
  useEffect(() => {
    writeString('lastPlayedGame', 'bikupan');
    document.title = 'Bikupan – Spelling Bee på Svenska | PluggPaus';
  }, []);

  return (
    <GamePageShell
      title="Bikupan"
      tagline="Sju bokstäver, en bikaka. Hur många svenska ord kan du bilda?"
      badge="🐝 Ny bikupa varje dag"
      category="Ordspel"
      difficulty="Medium"
      playtime="5-15 min"
      benefit="Ordförråd & böjningar"
      aboutTitle="Så spelar du Bikupan"
      about={
        <>
          <p>
            Bikupan är PluggPaus svenska version av ordpusslet Spelling Bee. Du får sju bokstäver ordnade som
            en bikaka – en i mitten och sex runt om – och ska bilda så många svenska ord som möjligt av dem.
          </p>
          <p>
            <strong>Reglerna:</strong>
            <br />• Varje ord måste innehålla <strong>mittbokstaven</strong>
            <br />• Orden ska vara minst fyra bokstäver långa
            <br />• Samma bokstav får användas flera gånger i ett ord
            <br />• Böjningsformer räknas som egna ord – <em>sorg</em>, <em>sorgen</em> och <em>sorger</em> ger poäng var för sig
            <br />• Egennamn räknas inte
          </p>
          <p>
            <strong>Poäng:</strong> ett ord på fyra bokstäver ger 1 poäng, längre ord ger en poäng per bokstav.
            Ett <strong>pangram</strong> – ett ord som använder alla sju bokstäverna – ger dessutom 7 bonuspoäng.
            Varje dag finns minst ett pangram gömt i kupan.
          </p>
          <p>
            När poängen växer klättrar du i rang, från <em>Ägg</em> och <em>Larv</em> via <em>Arbetsbi</em> och
            <em> Honungssamlare</em> upp till <em>Drottning</em>. Hittar du varenda ord når du <em>Hela kupan</em>.
            Ranggränserna räknas i procent av dagens maxpoäng, så de är lika svåra att nå oavsett hur många ord
            pusslet råkar ha.
          </p>
        </>
      }
      tipsTitle="Tips för fler ord"
      tips={[
        { strong: 'Leta efter ändelser', text: '– -en, -et, -er, -ar och -or gör ett ord till flera. Hittar du "sorg", testa "sorgen" och "sorger".' },
        { strong: 'Jaga pangrammet tidigt', text: '– det ger flest poäng på en gång och avslöjar ofta ordets stam, som i sin tur ger fler kortare ord.' },
        { strong: 'Blanda bokstäverna', text: '– en ny ordning bryter de mönster ögat fastnat i. Knappen Blanda ändrar bara placeringen, inte pusslet.' },
        { strong: 'Tänk sammansättningar', text: '– svenska älskar att sätta ihop ord. Två korta ord ur kupan blir ofta ett långt och poängrikt.' },
        { strong: 'Kom tillbaka senare', text: '– pusslet gäller hela dagen och dina ord sparas. Många hittar flest ord efter en paus.' },
      ]}
      faqTitle="Vanliga frågor om Bikupan"
      faqs={[
        {
          q: 'Varför godkänns inte mitt ord?',
          a: 'Ordlistan bygger på vanliga svenska ord som också finns i en svensk stavningsordbok. Väldigt ovanliga ord, facktermer, egennamn och engelska lånord är bortrensade, så ibland säger spelet nej till ett ord som faktiskt finns. Det är medvetet – pusslet ska gå att klara utan ordbok.',
        },
        {
          q: 'Vad är ett pangram?',
          a: 'Ett ord som använder alla sju bokstäverna minst en gång. Det ger ordets längd i poäng plus 7 i bonus, och det finns alltid minst ett i varje bikupa.',
        },
        {
          q: 'När kommer en ny bikupa?',
          a: 'Vid midnatt svensk tid. Alla spelare får samma bokstäver samma dag, och gårdagens alla svar kan du se längst ner under spelet.',
        },
        {
          q: 'Hur fungerar sviten?',
          a: 'Sviten ökar för varje dag i rad du når rangen Arbetsbi. Missar du en dag börjar den om från noll. Statistiken sparas lokalt i din webbläsare.',
        },
        {
          q: 'Finns det fler svenska ordspel?',
          a: 'Ja. Testa Orda (svensk Wordle), Kopplingar (svensk Connections) och Kontext – alla med ett nytt pussel varje dag.',
        },
      ]}
    >
      {isArchive && <ArchiveBanner date={date} path="/bikupan" />}
      <BikupanGame key={date} date={date} isArchive={isArchive} />
      {!isArchive && (
        <p className="text-center mt-6 text-sm" style={{ color: 'var(--ink-muted)' }}>
          Missat en dag? <Link to="/arkiv" className="underline">Spela tidigare pussel i arkivet</Link>.
        </p>
      )}
      <p className="text-center mt-6 text-sm" style={{ color: 'var(--ink-muted)' }}>
        Gillar du ordspel? Prova även <Link to="/wordle" className="underline">Orda</Link> och{' '}
        <Link to="/connections" className="underline">Kopplingar</Link>.
      </p>
    </GamePageShell>
  );
}

export default BikupanPage;
