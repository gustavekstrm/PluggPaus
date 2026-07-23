import { useEffect } from 'react';
import GamePageShell from '../components/GamePageShell';
import SnakeGame from '../components/games/SnakeGame';

function SnakePage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'pluggorm');
    document.title = 'Pluggorm – Klassiska Snake-spelet | PluggPaus';
  }, []);

  return (
    <GamePageShell
      title="Pluggorm"
      tagline="Det klassiska Snake-spelet – ät, väx och undvik att köra in i dig själv."
      badge="🐍 Spelas direkt här"
      category="Arkad"
      difficulty="Medium"
      playtime="2-5 min"
      benefit="Koncentration & planering"
      aboutTitle="Så spelar du Pluggorm"
      about={
        <>
          <p>
            Pluggorm är PluggPaus version av det tidlösa Snake-spelet som många minns från gamla
            mobiltelefoner. Du styr en orm som blir längre för varje prick den äter – men ju längre
            den blir, desto svårare är det att inte köra in i sig själv.
          </p>
          <p>
            <strong>Så fungerar det:</strong>
            <br />• Styr ormen med piltangenterna, WASD eller genom att svepa på mobilen
            <br />• Ät de rosa prickarna för att växa och samla poäng
            <br />• Kör inte in i väggarna eller i din egen svans
            <br />• Ditt rekord sparas automatiskt
          </p>
          <p>
            Ett lugnt men fokuskrävande spel som passar perfekt när du behöver koppla bort plugget
            en stund men ändå hålla hjärnan igång.
          </p>
        </>
      }
      tipsTitle="Tips & strategier för Pluggorm"
      tips={[
        { strong: 'Håll dig vid kanterna', text: '– att ringla längs ytterkanten ger dig mer öppen yta i mitten att manövrera på.' },
        { strong: 'Planera flera drag framåt', text: '– tänk inte bara på nästa prick, utan på hur svansen ligger efteråt.' },
        { strong: 'Undvik att stänga in dig', text: '– lämna alltid en väg ut när ormen blir lång.' },
        { strong: 'Jobba i mönster', text: '– att röra sig i jämna slingor gör det lättare att hålla koll på svansen.' },
        { strong: 'Ta det lugnt', text: '– spelet har fast fart, så det handlar om precision snarare än snabbhet.' },
      ]}
      faqTitle="Vanliga frågor om Pluggorm"
      faqs={[
        { q: 'Går spelet snabbare med tiden?', a: 'Farten är konstant, men utmaningen ökar naturligt eftersom ormen blir längre och tar mer plats.' },
        { q: 'Kan jag spela på mobilen?', a: 'Ja, svep i den riktning du vill styra, eller använd knapparna som visas under spelplanen.' },
        { q: 'Sparas mitt rekord?', a: 'Ja, ditt bästa resultat sparas lokalt i webbläsaren.' },
        { q: 'Kostar det något?', a: 'Nej, Pluggorm är helt gratis och spelas direkt i webbläsaren.' },
      ]}
    >
      <SnakeGame />
    </GamePageShell>
  );
}

export default SnakePage;
