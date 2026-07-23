import { useEffect } from 'react';
import GamePageShell from '../components/GamePageShell';
import SimonGame from '../components/games/SimonGame';

function FargminnePage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'fargminne');
    document.title = 'Färgminne – Simon-spelet | PluggPaus';
  }, []);

  return (
    <GamePageShell
      title="Färgminne"
      tagline="Härma den växande färgsekvensen – hur långt räcker ditt minne?"
      badge="🎨 Spelas direkt här"
      category="Minne"
      difficulty="Medium"
      playtime="2-5 min"
      benefit="Sekvensminne & fokus"
      aboutTitle="Så spelar du Färgminne"
      about={
        <>
          <p>
            Färgminne är PluggPaus version av det klassiska Simon-spelet. Spelet visar en sekvens av
            färger som blinkar i tur och ordning, och din uppgift är att härma sekvensen genom att
            trycka på plattorna i exakt rätt ordning.
          </p>
          <p>
            <strong>Så fungerar det:</strong>
            <br />• Titta noga när färgerna blinkar
            <br />• Tryck på plattorna i samma ordning som de visades
            <br />• Klarar du en nivå läggs en ny färg till i sekvensen
            <br />• Ett fel avslutar omgången – hur lång sekvens klarar du?
          </p>
          <p>
            Ett riktigt hjärngympa-spel som tränar sekvensminne och koncentration. Perfekt som kort,
            intensiv paus mitt i plugget.
          </p>
        </>
      }
      tipsTitle="Tips för längre sekvenser"
      tips={[
        { strong: 'Säg färgerna högt', text: '– att verbalisera "grön, röd, blå" hjälper hjärnan att komma ihåg ordningen.' },
        { strong: 'Gruppera i bitar', text: '– dela långa sekvenser i mindre grupper om två eller tre färger.' },
        { strong: 'Håll blicken i mitten', text: '– då ser du alla fyra plattorna samtidigt utan att flacka med blicken.' },
        { strong: 'Slappna av', text: '– stress gör att du tappar sekvensen. Andas ut och lita på minnet.' },
        { strong: 'Hitta en rytm', text: '– att trycka i jämnt tempo minskar risken för slarvfel.' },
      ]}
      faqTitle="Vanliga frågor om Färgminne"
      faqs={[
        { q: 'Hur räknas poängen?', a: 'Din nivå motsvarar hur många färger lång sekvens du senast klarade av att upprepa korrekt.' },
        { q: 'Blir det svårare?', a: 'Ja, för varje klarad nivå läggs en ny färg till, så sekvensen blir allt längre.' },
        { q: 'Sparas mitt rekord?', a: 'Ja, din längsta klarade sekvens sparas lokalt i webbläsaren.' },
        { q: 'Fungerar det på mobil?', a: 'Ja, du trycker bara på färgplattorna – det fungerar lika bra på mobil som på dator.' },
      ]}
    >
      <SimonGame />
    </GamePageShell>
  );
}

export default FargminnePage;
