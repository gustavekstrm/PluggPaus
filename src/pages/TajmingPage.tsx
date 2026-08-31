import { useEffect } from 'react';
import GamePageShell from '../components/GamePageShell';
import TimingGame from '../components/games/TimingGame';

function TajmingPage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'tajming');
    document.title = 'Tajming – Tvåspelarspel om tidskänsla | PluggPaus';
  }, []);

  return (
    <GamePageShell
      title="Tajming"
      tagline="Två spelare, en dator och en osynlig klocka. Vem har bäst tidskänsla?"
      badge="👥 Två spelare · samma dator"
      category="Reaktion"
      difficulty="Easy"
      playtime="3-6 min"
      benefit="Tidsuppfattning"
      aboutTitle="Så spelar du Tajming"
      about={
        <>
          <p>
            Tajming är ett duellspel för två personer vid samma dator. Varje runda lottas en måltid
            mellan 0,5 och 10 sekunder fram. Din uppgift är att stoppa klockan så nära den tiden som
            möjligt – utan att se den.
          </p>
          <p>
            <strong>Så fungerar det:</strong>
            <br />• Skriv in era namn och starta matchen
            <br />• Spelare 1 trycker på mellanslag för att starta klockan
            <br />• Klockan är osynlig medan den går – du ser ingenting
            <br />• Tryck på mellanslag igen när du tror att måltiden passerat
            <br />• Spelare 2 gör samma sak på samma måltid
            <br />• Närmast måltiden tar rundan. Först till fem poäng vinner matchen
          </p>
          <p>
            Ni kan också klicka på den röda knappen i stället för att använda mellanslag – lampan
            ovanför knapparna visar hela tiden vems tur det är.
          </p>
          <p>
            Att uppskatta tid utan hjälpmedel är en förmåga hjärnan är förvånansvärt dålig på, och
            den blir mätbart sämre när man är stressad eller trött. Just därför är Tajming en bra
            temperaturmätare på hur pass slut du faktiskt är efter ett långt pluggpass.
          </p>
        </>
      }
      tipsTitle="Tips för bättre tidskänsla"
      tips={[
        { strong: 'Räkna i takt', text: '– "ett tusen, två tusen" ligger nära en sekund styck och är den klassiska metoden.' },
        { strong: 'Använd kroppen', text: '– många får bättre precision genom att vagga lätt eller trumma med foten i jämn takt.' },
        { strong: 'Var beredd på korta tider', text: '– allt under en sekund hinner du inte räkna, där gäller ren reflex.' },
        { strong: 'Håll samma metod', text: '– byter du teknik mitt i matchen tappar du den kalibrering du byggt upp.' },
        { strong: 'Blunda', text: '– skärmen ger inga ledtrådar ändå, och utan synintryck blir många märkbart jämnare.' },
      ]}
      faqTitle="Vanliga frågor om Tajming"
      faqs={[
        {
          q: 'Kan man spela ensam?',
          a: 'Spelet är byggt för två spelare vid samma dator. Vill du öva själv kan du spela båda sidorna och jämföra dina egna försök mot varandra.',
        },
        {
          q: 'Ser jag verkligen ingen klocka medan den går?',
          a: 'Nej, det är hela poängen. Måltiden döljs också medan klockan är igång, så du inte kan sitta och jämföra. Du ser din tid direkt efter att du stoppat.',
        },
        {
          q: 'Får båda spelarna samma måltid?',
          a: 'Ja, inom en runda gäller samma måltid för båda. En ny tid lottas först när rundan är avgjord.',
        },
        {
          q: 'Vad händer om vi hamnar exakt lika?',
          a: 'Då delas ingen poäng ut och rundan går oavgjord. Tiden mäts i millisekunder, så det händer i praktiken nästan aldrig.',
        },
        {
          q: 'Hur många poäng krävs för att vinna?',
          a: 'Först till fem vunna rundor vinner matchen. En typisk match tar tre till sex minuter.',
        },
      ]}
    >
      <TimingGame />
    </GamePageShell>
  );
}

export default TajmingPage;
