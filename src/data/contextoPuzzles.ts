import type { ContextoPuzzle } from '../types/contexto';

// Svenska Kontext-pussel. rankings: ord -> rang (1 = målordet, högre = längre bort i
// betydelse). Orden är ordnade ungefär efter semantisk närhet (närmast först). Ord som
// inte finns i listan registreras av spelet som "långt bort" (se useContexto), så varje
// rimlig svensk gissning räknas.
//
// Hjälpare: bygg en rankning från en ordnad lista (närmast först => rang 1, 2, 3 ...).
function ranked(words: string[]): Record<string, number> {
  const out: Record<string, number> = {};
  words.forEach((w, i) => {
    if (!(w in out)) out[w] = i + 1;
  });
  return out;
}

export const PUZZLES: ContextoPuzzle[] = [
  {
    date: '2024-01-01',
    targetWord: 'hav',
    rankings: ranked([
      'hav', 'ocean', 'sjö', 'vatten', 'salt', 'saltvatten', 'våg', 'vågor', 'dyning', 'svall',
      'bränning', 'tidvatten', 'ebb', 'ström', 'strömmar', 'kust', 'kustlinje', 'strand', 'stranden', 'strandkant',
      'djup', 'djupt', 'blått', 'blå', 'yta', 'havsyta', 'havsvatten', 'havsbotten', 'botten', 'vidd',
      'horisont', 'marin', 'maritim', 'nautisk', 'vik', 'bukt', 'fjord', 'sund', 'kanal', 'lagun',
      'atoll', 'rev', 'korallrev', 'grund', 'skär', 'ö', 'öar', 'holme', 'skärgård', 'arkipelag',
      'udde', 'näs', 'halvö', 'kap', 'delta', 'mynning', 'fisk', 'fiskar', 'torsk', 'sill',
      'strömming', 'makrill', 'lax', 'ål', 'sardin', 'tonfisk', 'haj', 'val', 'valar', 'blåval',
      'späckhuggare', 'delfin', 'tumlare', 'säl', 'valross', 'krabba', 'hummer', 'räka', 'kräfta', 'mussla',
      'blåmussla', 'ostron', 'snäcka', 'bläckfisk', 'manet', 'sjöstjärna', 'sjöborre', 'korall', 'tång', 'sjögräs',
      'alger', 'plankton', 'krill', 'fiske', 'fiskare', 'fiskebåt', 'trålare', 'trål', 'nät', 'garn',
      'krok', 'mete', 'spö', 'agn', 'hamn', 'brygga', 'kaj', 'pir', 'vågbrytare', 'fyr',
      'fyrtorn', 'boj', 'ankare', 'segel', 'segelbåt', 'båt', 'båtar', 'skepp', 'fartyg', 'skuta',
      'roder', 'köl', 'mast', 'däck', 'kanot', 'kajak', 'roddbåt', 'motorbåt', 'färja', 'kryssning',
      'tanker', 'lastfartyg', 'ubåt', 'flotta', 'sjöman', 'matros', 'kapten', 'styrman', 'skeppare', 'lots',
      'dykare', 'livräddare', 'kompass', 'sjökort', 'navigering', 'latitud', 'longitud', 'ekvatorn', 'kurs', 'knop',
      'simma', 'simning', 'simmare', 'dyk', 'dyka', 'dykning', 'snorkel', 'snorkling', 'bada', 'badning',
      'badplats', 'badstrand', 'baddräkt', 'surfing', 'surfa', 'segling', 'rodd', 'paddla', 'sola', 'solbränna',
      'sand', 'sandstrand', 'sanddyn', 'snäckor', 'klippa', 'klippor', 'sten', 'kiselsten', 'mås', 'måsar',
      'fiskmås', 'trut', 'tärna', 'storm', 'blåst', 'vind', 'bris', 'kuling', 'orkan', 'tyfon',
      'tsunami', 'flodvåg', 'regn', 'moln', 'dimma', 'himmel', 'sol', 'solnedgång', 'måne', 'saltstänk',
      'sjösjuk', 'sjörövare', 'pirat', 'skatt', 'skattkista', 'atlanten', 'stilla', 'indiska', 'ishavet', 'medelhavet',
      'östersjön', 'nordsjön', 'kattegatt', 'skagerrak',
    ]),
  },
  {
    date: '2024-01-02',
    targetWord: 'skola',
    rankings: ranked([
      'skola', 'skolan', 'klass', 'klassen', 'elev', 'elever', 'lärare', 'lärarinna', 'lektion', 'lektioner',
      'läxa', 'läxor', 'prov', 'tenta', 'tentamen', 'betyg', 'kunskap', 'kunskaper', 'utbildning', 'undervisning',
      'lärande', 'inlärning', 'klassrum', 'klassrummet', 'skolbänk', 'bänk', 'kateder', 'tavla', 'whiteboard', 'griffeltavla',
      'krita', 'penna', 'blyerts', 'blyertspenna', 'kulspetspenna', 'suddgummi', 'linjal', 'passare', 'gradskiva', 'sax',
      'papper', 'block', 'anteckningsblock', 'anteckningar', 'pärm', 'mapp', 'ryggsäck', 'skolväska', 'pennskrin', 'dator',
      'surfplatta', 'miniräknare', 'student', 'studerande', 'studera', 'studier', 'plugga', 'plugg', 'läsa', 'läsning',
      'skriva', 'räkna', 'stava', 'fråga', 'frågor', 'svar', 'uppgift', 'uppgifter', 'inlämning', 'redovisning',
      'presentation', 'grupparbete', 'projekt', 'seminarium', 'föreläsning', 'workshop', 'kurs', 'kurser', 'ämne', 'ämnen',
      'examen', 'examination', 'diplom', 'intyg', 'rektor', 'lärarrum', 'skolsköterska', 'vaktmästare', 'kurator', 'mentor',
      'klassföreståndare', 'schema', 'schemat', 'termin', 'läsår', 'sommarlov', 'höstlov', 'sportlov', 'påsklov', 'jullov',
      'lov', 'ledighet', 'rast', 'håltimme', 'ringklocka', 'skolklocka', 'skolmat', 'matsal', 'skolbespisning', 'skolgård',
      'korridor', 'skåp', 'omklädningsrum', 'bibliotek', 'aula', 'gymnastiksal', 'idrottshall', 'matematik', 'matte', 'svenska',
      'engelska', 'historia', 'geografi', 'samhällskunskap', 'religion', 'biologi', 'kemi', 'fysik', 'naturkunskap', 'teknik',
      'idrott', 'gymnastik', 'musik', 'bild', 'teckning', 'slöjd', 'träslöjd', 'syslöjd', 'hemkunskap', 'språk',
      'moderna', 'filosofi', 'psykologi', 'ekonomi', 'gymnasium', 'gymnasiet', 'högskola', 'universitet', 'folkhögskola', 'komvux',
      'förskola', 'dagis', 'fritids', 'grundskola', 'mellanstadiet', 'högstadiet', 'lågstadiet', 'årskurs', 'skolplikt', 'schemabrytande',
      'intelligens', 'begåvning', 'hjärna', 'minne', 'tänka', 'koncentration', 'fokus', 'motivation', 'disciplin', 'flit',
      'ambition', 'framtid', 'karriär', 'jobb', 'yrke', 'dröm', 'utbilda', 'undervisa', 'pedagog', 'pedagogik',
      'kompis', 'klasskamrat', 'skolkamrat', 'vän', 'kamrat', 'ungdom', 'barn', 'tonåring', 'skolk', 'mobbning',
    ]),
  },
  {
    date: '2024-01-03',
    targetWord: 'kaffe',
    rankings: ranked([
      'kaffe', 'espresso', 'cappuccino', 'latte', 'kaffelatte', 'macchiato', 'cortado', 'americano', 'ristretto', 'doppio',
      'mocka', 'koffein', 'koffeinfri', 'bryggkaffe', 'kokkaffe', 'filterkaffe', 'iskaffe', 'bryggd', 'dropp', 'kaffekopp',
      'kopp', 'koppen', 'mugg', 'kaffemugg', 'termos', 'kaffekanna', 'kanna', 'karaff', 'kaffeböna', 'böna',
      'bönor', 'kaffebönor', 'malen', 'malning', 'mald', 'kaffebryggare', 'bryggare', 'kaffekokare', 'kaffemaskin', 'perkolator',
      'presskanna', 'frenchpress', 'mokabryggare', 'kapselmaskin', 'kapsel', 'nespresso', 'filter', 'kaffefilter', 'kaffekvarn', 'kvarn',
      'brygga', 'hälla', 'dricka', 'smutta', 'sippa', 'servera', 'varm', 'varmt', 'värme', 'het',
      'hetta', 'rykande', 'brännhet', 'kokhet', 'kokande', 'koka', 'kok', 'ljummen', 'sval', 'kall',
      'kallt', 'temperatur', 'uppvärmd', 'ånga', 'ryker', 'doft', 'doftar', 'arom', 'smak', 'smakar',
      'beska', 'bitter', 'besk', 'syra', 'syrlig', 'fyllig', 'robust', 'mild', 'stark', 'starkt',
      'rostad', 'rostning', 'mörkrostad', 'ljusrostad', 'arabica', 'robusta', 'mjölk', 'varmmjölk', 'grädde', 'kaffegrädde',
      'mjölkskum', 'skum', 'latteart', 'socker', 'sockerbit', 'sötma', 'sött', 'honung', 'kanel', 'vanilj',
      'karamell', 'choklad', 'kakao', 'sirap', 'fika', 'fikapaus', 'fikarast', 'fikabröd', 'fikastund', 'bulle',
      'kanelbulle', 'wienerbröd', 'kaka', 'kakor', 'småkakor', 'tårta', 'bakverk', 'smörgås', 'macka', 'frukost',
      'morgon', 'morgonkaffe', 'morgonrutin', 'uppvaknande', 'uppiggande', 'pigg', 'vaken', 'vakna', 'koffeinkick', 'energi',
      'trött', 'trötthet', 'sömnig', 'sömn', 'sova', 'gäspning', 'paus', 'kaffepaus', 'rast', 'vila',
      'avkoppling', 'mys', 'café', 'kafé', 'fik', 'kaffebar', 'barista', 'servitris', 'servering', 'meny',
      'papperskopp', 'porslin', 'porslinskopp', 'fat', 'tefat', 'sked', 'kaffesked', 'servett', 'bord', 'cafébord',
      'stol', 'gäst', 'sällskap', 'samtal', 'prata', 'tidning', 'morgontidning', 'jobb', 'kontor', 'arbetsdag',
      'möte', 'arbete', 'plantage', 'kaffeplantage', 'odling', 'skörd', 'tropikerna', 'brasilien', 'colombia', 'etiopien',
      'kenya', 'importerad', 'export', 'handel', 'ekologisk', 'sump', 'kaffesump', 'kaffefläck', 'törst', 'dryck',
      'te', 'energidryck', 'läsk',
    ]),
  },
  {
    date: '2024-01-04',
    targetWord: 'vinter',
    rankings: ranked([
      'vinter', 'vintern', 'snö', 'snön', 'kyla', 'kall', 'kallt', 'is', 'isen', 'frost',
      'snöflinga', 'snöflingor', 'snöfall', 'snötäcke', 'snömassor', 'snökaos', 'minusgrader', 'kylig', 'frusen', 'isig',
      'halka', 'halkig', 'rimfrost', 'snöstorm', 'yrsnö', 'snödriva', 'blötsnö', 'kramsnö', 'nysnö', 'pudersnö',
      'iskall', 'iskyla', 'köldknäpp', 'frostnatt', 'köld', 'bister', 'snöig', 'vit', 'vitt', 'snövit',
      'skidor', 'skidåkning', 'längdåkning', 'utförsåkning', 'slalom', 'störtlopp', 'snowboard', 'pjäxor', 'stavar', 'skidspår',
      'pulka', 'kälke', 'stjärtlapp', 'skridskor', 'skridskoåkning', 'konståkning', 'ishockey', 'bandy', 'curling', 'snögubbe',
      'snöboll', 'snöbollskrig', 'snöänglar', 'snöfästning', 'snölykta', 'snöskottning', 'snöskyffel', 'snöslunga', 'plog', 'snöplog',
      'mössa', 'luva', 'vante', 'vantar', 'tumvantar', 'halsduk', 'jacka', 'täckjacka', 'vinterjacka', 'överdrag',
      'ull', 'ylle', 'ylletröja', 'tröja', 'fleece', 'filt', 'pläd', 'stövlar', 'kängor', 'vinterskor',
      'dubbdäck', 'vinterdäck', 'december', 'januari', 'februari', 'jul', 'julen', 'julgran', 'gran', 'tomte',
      'julafton', 'advent', 'lucia', 'glögg', 'pepparkaka', 'julklapp', 'julbord', 'julmust', 'nyår', 'nyårsafton',
      'midvinter', 'vintersolstånd', 'norrsken', 'polcirkeln', 'arktis', 'nordpol', 'sydpol', 'glaciär', 'isberg', 'isbjörn',
      'pingvin', 'ren', 'älg', 'hare', 'räv', 'päls', 'ide', 'dvala', 'vinterdvala', 'övervintra',
      'brasa', 'eld', 'eldstad', 'kamin', 'brasved', 'värme', 'varm', 'varmt', 'ombonad', 'choklad',
      'varmchoklad', 'te', 'filttäcke', 'mörker', 'mörk', 'mörkt', 'stjärnor', 'ljus', 'stearinljus', 'levandeljus',
      'årstid', 'säsong', 'höst', 'vår', 'sommar', 'termometer', 'grader', 'gradantal', 'andedräkt', 'imma',
      'froströk', 'kallfront', 'köldrekord', 'snölandskap', 'vinterlandskap', 'fjäll', 'fjällen', 'lappland', 'kiruna', 'fryser',
      'frysa', 'skotta', 'åka',
    ]),
  },
];

export function getDailyPuzzle(date: Date): ContextoPuzzle {
  const epoch = new Date('2024-01-01T00:00:00+01:00');
  const msPerDay = 86400000;
  const daysSinceEpoch = Math.floor((date.getTime() - epoch.getTime()) / msPerDay);
  const puzzleIndex = ((daysSinceEpoch % PUZZLES.length) + PUZZLES.length) % PUZZLES.length;
  return PUZZLES[puzzleIndex];
}

export function getTodaysPuzzle(): ContextoPuzzle {
  const now = new Date();
  const swedenTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Stockholm' }));
  return getDailyPuzzle(swedenTime);
}
