import { useEffect } from 'react';
import GamePageShell from '../components/GamePageShell';
import MemoryGame from '../components/games/MemoryGame';

function MemoryPage() {
  useEffect(() => {
    localStorage.setItem('lastPlayedGame', 'minne');
    document.title = 'Minne – Memory / Vänd par | PluggPaus';
  }, []);

  return (
    <GamePageShell
      title="Minne"
      tagline="Det klassiska memoryspelet – vänd korten och hitta alla par på så få drag som möjligt."
      badge="🧠 Spelas direkt här"
      category="Minne"
      difficulty="Easy"
      playtime="2-4 min"
      benefit="Minne & koncentration"
      aboutTitle="Så spelar du Minne"
      about={
        <>
          <p>
            Minne är PluggPaus variant av det klassiska memory-spelet. Alla kort ligger vända nedåt
            och din uppgift är att hitta alla matchande par genom att vända två kort i taget och komma
            ihåg var symbolerna finns.
          </p>
          <p>
            <strong>Så fungerar det:</strong>
            <br />• Klicka på ett kort för att vända det
            <br />• Vänd ett andra kort – matchar de blir de gröna och ligger kvar
            <br />• Matchar de inte vänds de tillbaka
            <br />• Hitta alla åtta paren på så få drag som möjligt
          </p>
          <p>
            Ett perfekt spel för en kort hjärnpaus som tränar arbetsminnet – samma förmåga du använder
            när du pluggar in nya begrepp inför en tenta.
          </p>
        </>
      }
      tipsTitle="Tips för färre drag"
      tips={[
        { strong: 'Börja systematiskt', text: '– vänd kort i en fast ordning i början så du snabbt kartlägger brädet.' },
        { strong: 'Bygg en mental karta', text: '– försök koppla varje symbol till en position, inte bara till "någonstans där borta".' },
        { strong: 'Följ upp direkt', text: '– hittar du en symbol du redan sett, ta paret på en gång.' },
        { strong: 'Ta det lugnt', text: '– det finns ingen tidspress, så prioritera att minnas rätt framför att gå snabbt.' },
        { strong: 'Repetera i huvudet', text: '– att aktivt upprepa positioner för dig själv stärker minnet.' },
      ]}
      faqTitle="Vanliga frågor om Minne"
      faqs={[
        { q: 'Hur många par finns det?', a: 'Varje omgång har åtta par (sexton kort) med studierelaterade symboler.' },
        { q: 'Blandas korten om varje gång?', a: 'Ja, korten placeras slumpmässigt varje ny omgång så det aldrig blir likadant.' },
        { q: 'Sparas mitt bästa resultat?', a: 'Ja, ditt lägsta antal drag sparas lokalt i webbläsaren som rekord.' },
        { q: 'Fungerar det på mobilen?', a: 'Ja, spelet är helt anpassat för både mobil, surfplatta och dator.' },
      ]}
    >
      <MemoryGame />
    </GamePageShell>
  );
}

export default MemoryPage;
