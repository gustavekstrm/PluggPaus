import { useEffect } from 'react';
import GamePageShell from '../components/GamePageShell';
import DinoGame from '../components/games/DinoGame';

function DinoRunnerPage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'kaffehopp');
    document.title = 'Kaffehopp – Hoppspelet | PluggPaus';
  }, []);

  return (
    <GamePageShell
      title="Kaffehopp"
      tagline="Vårt eget hoppspel – som dinosaurien när internet ligger nere, fast med en kaffekopp på studiepaus."
      badge="🕹️ Spelas direkt här"
      category="Reflex"
      difficulty="Easy"
      playtime="1-3 min"
      benefit="Reflexer & fokus"
      aboutTitle="Så spelar du Kaffehopp"
      about={
        <>
          <p>
            Kaffehopp är PluggPaus egna lilla hoppspel, inspirerat av det klassiska dinosaurie-spelet
            som dyker upp i Chrome när internet ligger nere. Här är hjälten istället en kaffekopp som
            tar en välförtjänt studiepaus och springer så långt den kan.
          </p>
          <p>
            <strong>Så fungerar det:</strong>
            <br />• Tryck på mellanslag, pil upp eller klicka för att hoppa
            <br />• Undvik de färgglada bokhögarna som kommer emot dig
            <br />• Farten ökar ju längre du kommer
            <br />• Ditt personliga rekord sparas automatiskt i webbläsaren
          </p>
          <p>
            Det är den perfekta mikropausen: ett snabbt spel du kan starta på en sekund mellan två
            föreläsningar utan att tappa fokus helt. Hur långt kommer du?
          </p>
        </>
      }
      tipsTitle="Tips för högre poäng"
      tips={[
        { strong: 'Hoppa sent, inte tidigt', text: '– vänta tills bokhögen är nära så minskar risken att du landar rakt på nästa hinder.' },
        { strong: 'Håll rytmen', text: '– försök hitta ett jämnt tempo istället för att spamma hoppknappen.' },
        { strong: 'Titta framåt', text: '– fokusera på hindret efter det du hoppar över, inte på kaffekoppen.' },
        { strong: 'Korta pauser', text: '– farten ökar hela tiden, så satsa på flera korta försök hellre än ett långt maratonlopp.' },
        { strong: 'Använd tangentbordet', text: '– mellanslag ger ofta snabbare reaktion än att klicka med musen.' },
      ]}
      faqTitle="Vanliga frågor om Kaffehopp"
      faqs={[
        { q: 'Behöver jag internet för att spela?', a: 'Spelet laddas i webbläsaren och körs helt lokalt när sidan väl är öppen – ingen inloggning eller nedladdning behövs.' },
        { q: 'Sparas mitt rekord?', a: 'Ja, ditt högsta resultat sparas lokalt i din webbläsare så du kan försöka slå det nästa gång.' },
        { q: 'Fungerar det på mobilen?', a: 'Absolut. På mobil och surfplatta trycker du bara på spelytan för att hoppa.' },
        { q: 'Är spelet gratis?', a: 'Ja, precis som alla spel på PluggPaus är Kaffehopp helt gratis.' },
      ]}
    >
      <DinoGame />
    </GamePageShell>
  );
}

export default DinoRunnerPage;
