import { useEffect } from 'react';
import GamePageShell from '../components/GamePageShell';
import Game2048Board from '../components/games/Game2048Board';

function Game2048Page() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', '2048');
    document.title = '2048 – Pussel med Siffror | PluggPaus';
  }, []);

  return (
    <GamePageShell
      title="2048"
      tagline="Det klassiska och beroendeframkallande sifferpusslet – slå ihop brickorna och nå 2048."
      badge="🔢 Spelas direkt här"
      category="Pussel"
      difficulty="Easy"
      playtime="1-5 min"
      benefit="Logiskt tänkande"
      aboutTitle="Så spelar du 2048"
      about={
        <>
          <p>
            <strong>2048</strong> är det klassiska pusselspelet som tog internet med storm. Slå ihop
            siffrorna och nå den magiska summan 2048 på en 4×4-bricka – nu spelbart direkt här på
            PluggPaus.
          </p>
          <p>
            <strong>Regler:</strong>
            <br />• Dra brickorna åt valfritt håll (↑ ↓ ← →)
            <br />• När två brickor med samma nummer kolliderar slås de ihop till en
            <br />• 2 + 2 = 4, 4 + 4 = 8, 8 + 8 = 16 … och så vidare!
            <br />• Spelet är över när brädet är fullt och inga drag går att göra
          </p>
          <p>
            Det verkar enkelt, men strategin är djup. Ska du bygga upp ett hörn? Hålla den högsta
            siffran på en viss plats? Varje drag påverkar spelplanen och rätt strategi kan ta dig långt
            förbi 2048!
          </p>
        </>
      }
      tipsTitle="Tips & strategier för 2048"
      tips={[
        { strong: 'Håll din högsta bricka i ett hörn', text: '– välj ett hörn (helst nedre vänster) och håll din största bricka där hela spelet. Bygg en kedja från det hörnet.' },
        { strong: 'Svep bara i två riktningar', text: '– försök hålla dig till nedåt och åt vänster. Svep uppåt och åt höger bara när det är absolut nödvändigt.' },
        { strong: 'Bygg en nedåtgående kedja', text: '– längs en kant: 1024 → 512 → 256 → 128 → 64. Det gör det enkelt att slå ihop brickorna i ordning.' },
        { strong: 'Fyll inte brädet', text: '– ha alltid minst ett fåtal lediga rutor. Om brädet fylls är du nära game over.' },
        { strong: 'Planera tre drag framåt', text: '– tänk inte bara på nästa drag utan vad som händer med brädet de tre närmaste svepningarna.' },
      ]}
      faqTitle="Vanliga frågor om 2048"
      faqs={[
        { q: 'Vad är målet med 2048?', a: 'Målet är att kombinera brickor tills du når brickan med värdet 2048. Du kan fortsätta spela och sikta på 4096 eller ännu högre.' },
        { q: 'Kan man gå förbi 2048?', a: 'Ja! Spelet slutar inte när du når 2048 om du inte vill. Många spelare siktar på 4096, 8192 eller ännu högre rekord.' },
        { q: 'Finns det tidsgräns?', a: 'Nej, 2048 spelas i din egen takt. Du kan tänka hur länge du vill innan varje drag.' },
        { q: 'Hur startar en ny omgång?', a: 'Tryck på "Nytt spel" när som helst för att börja om från noll.' },
      ]}
    >
      <Game2048Board />
    </GamePageShell>
  );
}

export default Game2048Page;
