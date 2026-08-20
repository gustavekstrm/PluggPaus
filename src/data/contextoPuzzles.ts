import type { ContextoPuzzle } from '../types/contexto';

// Svenska Kontext-pussel. rankings: ord -> rang (1 = målordet, högre = längre bort
// i betydelse). Orden är ordnade ungefär efter semantisk närhet. Ord som inte finns
// i listan registreras av spelet som "långt bort" (se useContexto), så varje rimlig
// svensk gissning räknas.
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
      'hav', 'sjö', 'ocean', 'vatten', 'våg', 'vågor', 'saltvatten', 'tidvatten', 'kust', 'strand',
      'salt', 'djup', 'blå', 'vik', 'bukt', 'fjord', 'sund', 'horisont', 'marin', 'dyning',
      'svall', 'skum', 'bränning', 'ebb', 'ström', 'strömmar', 'öppethav', 'sjövatten', 'brännvåg', 'vidd',
      'fisk', 'fiskar', 'torsk', 'sill', 'makrill', 'lax', 'ål', 'haj', 'val', 'delfin',
      'tumlare', 'säl', 'krabba', 'hummer', 'räka', 'mussla', 'ostron', 'bläckfisk', 'manet', 'sjöstjärna',
      'korall', 'rev', 'tång', 'alger', 'plankton', 'fiske', 'fiskare', 'fiskebåt', 'trål', 'nät',
      'hamn', 'brygga', 'kaj', 'pir', 'fyr', 'boj', 'ankare', 'segel', 'segelbåt', 'båt',
      'skepp', 'fartyg', 'roder', 'köl', 'kanot', 'kajak', 'roddbåt', 'ubåt', 'flotta', 'sjöman',
      'matros', 'kapten', 'kompass', 'navigering', 'simma', 'dyka', 'dykning', 'snorkel', 'bada', 'badning',
      'sand', 'klippa', 'skär', 'ö', 'öar', 'skärgård', 'holme', 'udde', 'lagun', 'tropisk',
      'strandkant', 'storm', 'blåst', 'vind', 'bris', 'kuling', 'orkan', 'regn', 'moln', 'himmel',
      'sol', 'solnedgång', 'måne', 'saltstänk', 'sjösjuk', 'pirat', 'skatt', 'atlanten', 'stilla', 'medelhavet',
      'östersjön', 'nordsjön',
    ]),
  },
  {
    date: '2024-01-02',
    targetWord: 'skola',
    rankings: ranked([
      'skola', 'klass', 'elev', 'lärare', 'lektion', 'läxa', 'prov', 'tenta', 'betyg', 'kunskap',
      'utbildning', 'undervisning', 'klassrum', 'skolbänk', 'kateder', 'tavla', 'whiteboard', 'krita', 'penna', 'blyerts',
      'suddgummi', 'linjal', 'sax', 'papper', 'block', 'pärm', 'ryggsäck', 'dator', 'surfplatta', 'miniräknare',
      'student', 'studera', 'plugga', 'plugg', 'läsa', 'skriva', 'räkna', 'fråga', 'svar', 'uppgift',
      'inlämning', 'redovisning', 'presentation', 'grupparbete', 'projekt', 'seminarium', 'föreläsning', 'workshop', 'examen', 'examination',
      'rektor', 'skolsköterska', 'vaktmästare', 'kurator', 'mentor', 'schema', 'termin', 'läsår', 'sommarlov', 'höstlov',
      'sportlov', 'påsklov', 'rast', 'håltimme', 'ringklocka', 'skolmat', 'matsal', 'skolgård', 'korridor', 'skåp',
      'bibliotek', 'matematik', 'svenska', 'engelska', 'historia', 'geografi', 'samhällskunskap', 'religion', 'biologi', 'kemi',
      'fysik', 'teknik', 'idrott', 'musik', 'bild', 'slöjd', 'hemkunskap', 'språk', 'filosofi', 'gymnasium',
      'högskola', 'universitet', 'folkhögskola', 'förskola', 'dagis', 'grundskola', 'mellanstadiet', 'högstadiet', 'lågstadiet', 'kunskaper',
      'intelligens', 'hjärna', 'minne', 'koncentration', 'motivation', 'disciplin', 'framtid', 'karriär', 'jobb', 'yrke',
      'dröm', 'kompis', 'klasskamrat', 'vän',
    ]),
  },
  {
    date: '2024-01-03',
    targetWord: 'kaffe',
    rankings: ranked([
      'kaffe', 'espresso', 'cappuccino', 'latte', 'koffein', 'kaffekopp', 'kopp', 'mugg', 'bryggkaffe', 'kaffeböna',
      'böna', 'malen', 'kaffebryggare', 'bryggare', 'kaffekokare', 'perkolator', 'termos', 'kaffekanna', 'kanna', 'mjölk',
      'grädde', 'socker', 'svart', 'varm', 'het', 'ånga', 'arom', 'doft', 'smak', 'beska',
      'syra', 'crema', 'skum', 'rostning', 'rostad', 'arabica', 'robusta', 'filter', 'filterkaffe', 'kokkaffe',
      'iskaffe', 'koffeinfri', 'americano', 'macchiato', 'cortado', 'mocka', 'barista', 'café', 'kafé', 'fik',
      'fika', 'fikapaus', 'fikabröd', 'bulle', 'kanelbulle', 'wienerbröd', 'kaka', 'tårta', 'småkakor', 'te',
      'choklad', 'kakao', 'energidryck', 'dryck', 'morgon', 'frukost', 'morgonkaffe', 'uppiggande', 'vaken', 'pigg',
      'trött', 'sömnig', 'sömn', 'paus', 'rast', 'arbetsdag', 'kontor', 'jobb', 'plantage', 'skörd',
      'bönor', 'brasilien', 'colombia', 'etiopien', 'importerad', 'kvarn', 'kaffekvarn', 'sked', 'kaffesked', 'servett',
      'porslin', 'fat', 'bord', 'gäst', 'samtal', 'tidning', 'brygga', 'hälla', 'dricka', 'smutta',
    ]),
  },
  {
    date: '2024-01-04',
    targetWord: 'vinter',
    rankings: ranked([
      'vinter', 'snö', 'kyla', 'kall', 'is', 'frost', 'snöflinga', 'snöfall', 'snötäcke', 'driva',
      'snökaos', 'minusgrader', 'kylig', 'frusen', 'isig', 'halka', 'halkig', 'rimfrost', 'snöstorm', 'yrsnö',
      'snödriva', 'blötsnö', 'kramsnö', 'skidor', 'skidåkning', 'längdåkning', 'utförsåkning', 'slalom', 'snowboard', 'pulka',
      'kälke', 'skridskor', 'skridskoåkning', 'konståkning', 'ishockey', 'snögubbe', 'snöboll', 'snöängel', 'snölykta', 'snöskottning',
      'snöskyffel', 'plog', 'snöplog', 'mössa', 'vante', 'vantar', 'halsduk', 'jacka', 'täckjacka', 'ull',
      'ylletröja', 'tröja', 'filt', 'pläd', 'stövlar', 'dubbdäck', 'december', 'januari', 'februari', 'jul',
      'julgran', 'tomte', 'julafton', 'advent', 'lucia', 'glögg', 'pepparkaka', 'julklapp', 'nyår', 'midvinter',
      'vintersolstånd', 'norrsken', 'polcirkeln', 'arktis', 'nordpol', 'glaciär', 'isbjörn', 'pingvin', 'ren', 'älg',
      'päls', 'ide', 'dvala', 'brasa', 'eld', 'eldstad', 'kamin', 'värme', 'choklad', 'varmchoklad',
      'mörker', 'mörk', 'stjärnor', 'ljus', 'stearinljus', 'årstid', 'säsong', 'höst', 'vår', 'sommar',
      'termometer', 'andedräkt', 'imma', 'froströk', 'kallfront',
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
