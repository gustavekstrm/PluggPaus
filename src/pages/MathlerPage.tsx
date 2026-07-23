import { useEffect } from 'react';
import GamePageShell from '../components/GamePageShell';
import MathlerGame from '../components/games/MathlerGame';

function MathlerPage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'mathler');
    document.title = 'Mathler – Wordle med Matematik | PluggPaus';
  }, []);

  return (
    <GamePageShell
      title="Mathler"
      tagline="Wordle för mattenördar – hitta den dolda uträkningen som ger dagens svar."
      badge="🧮 Spelas direkt här"
      category="Matematik"
      difficulty="Medium"
      playtime="2-5 min"
      benefit="Mental aritmetik"
      aboutTitle="Så spelar du Mathler"
      about={
        <>
          <p>
            <strong>Mathler</strong> är Wordle för matematikälskare! Istället för att gissa ord ska du
            hitta den dolda uträkningen som ger ett visst resultat – nu spelbart direkt här på
            PluggPaus.
          </p>
          <p>
            <strong>Hur det fungerar:</strong>
            <br />• Du får ett svar (t.ex. 24) och ska hitta en 6-teckens uträkning som ger det
            <br />• Grön ruta = rätt siffra/operator på rätt plats
            <br />• Gul ruta = rätt siffra/operator, fel plats
            <br />• Grå ruta = ingår inte i uträkningen
            <br />• Du har sex försök på dig
          </p>
          <p>
            Det kräver både matematikkunskap och logiskt tänkande. Ska du använda multiplikation,
            addition eller kanske division? Varje gissning ger värdefulla ledtrådar. Ett perfekt sätt
            att hålla matematikhjärnan vaken!
          </p>
        </>
      }
      tipsTitle="Tips & strategier för Mathler"
      tips={[
        { strong: 'Börja med enkla uttryck', text: '– testa en gissning som verkligen ger svaret, t.ex. med addition, för att kartlägga vilka siffror som ingår.' },
        { strong: 'Operationsordning spelar roll', text: '– multiplikation och division beräknas före addition och subtraktion. Tänk på det när du bygger dina gissningar.' },
        { strong: 'Testa flera räknesätt', text: '– använd +, -, * och / i tidiga gissningar för att eliminera vilka operatorer som inte ingår.' },
        { strong: 'Utnyttja färgfeedbacken', text: '– precis som i Wordle betyder gul att tecknet finns men på fel plats. Flytta det och testa igen.' },
        { strong: 'Kom ihåg att svaret är fast', text: '– varje giltig gissning måste bli exakt målvärdet, annars godkänns den inte.' },
      ]}
      faqTitle="Vanliga frågor om Mathler"
      faqs={[
        { q: 'Vad är målet med Mathler?', a: 'Hitta den dolda matematiska uträkningen på sex tecken. Du vet svaret och ska lista ut vilket uttryck som ger det.' },
        { q: 'Hur lång är uträkningen?', a: 'Uträkningen är sex tecken lång, till exempel "12+3*4" eller "48/6+5".' },
        { q: 'Är det ett nytt pussel varje dag?', a: 'Ja, ett nytt målvärde och uträkning väljs varje dag. Spelet tar vanligtvis 2–5 minuter.' },
        { q: 'Behöver man vara bra på matte?', a: 'Grundläggande aritmetik räcker. Spelet handlar mer om logiskt tänkande än avancerad matematik.' },
      ]}
    >
      <MathlerGame />
    </GamePageShell>
  );
}

export default MathlerPage;
