import type { ContextoPuzzle } from '../types/contexto';

// Svenska Kontext-pussel. rankings: ord -> rang (1 = målordet, högre = längre bort
// i betydelse). Listorna är handgjorda; ju fler relaterade ord desto bättre spel.
export const PUZZLES: ContextoPuzzle[] = [
  {
    date: '2024-01-01',
    targetWord: 'hav',
    rankings: {
      hav: 1, ocean: 2, sjö: 3, vatten: 4, våg: 5, strand: 6, kust: 7, tidvatten: 8, salt: 9, blå: 10,
      djup: 11, atlanten: 12, vik: 13, fisk: 14, båt: 15, skepp: 16, segel: 17, ö: 18, rev: 19, korall: 20,
      val: 22, delfin: 23, haj: 24, sand: 26, hamn: 28, fyr: 30, storm: 32, vind: 34, mås: 36, krabba: 38,
      mussla: 40, tång: 42, brygga: 44, simma: 46, dyka: 48, snorkel: 50, akvarium: 55, sjöman: 58, fiskare: 60, nät: 62,
      fiske: 64, flod: 70, älv: 74, bäck: 78, insjö: 82, damm: 88, regn: 100, moln: 110, himmel: 120, sol: 140,
      horisont: 150, resa: 180, semester: 190, sommar: 200, bad: 210, simhall: 240, is: 300, glaciär: 340, arktis: 360, säl: 380,
      isbjörn: 420, torsk: 205, lax: 208, sill: 212, räka: 216, bläckfisk: 260, manet: 270, sjöstjärna: 250, skal: 320, pärla: 500,
      skatt: 700, pirat: 650, ankare: 130, kompass: 160, karta: 400, land: 800, berg: 900, skog: 950, stad: 1000,
    },
  },
  {
    date: '2024-01-02',
    targetWord: 'skola',
    rankings: {
      skola: 1, klass: 2, elev: 3, lärare: 4, lektion: 5, läxa: 6, prov: 7, betyg: 8, klassrum: 9, tavla: 10,
      krita: 11, penna: 12, bok: 13, kunskap: 14, utbildning: 15, student: 16, rast: 18, skolgård: 20, matsal: 22, gymnasium: 24,
      högskola: 26, universitet: 28, examen: 30, kurs: 32, ämne: 34, matematik: 40, svenska: 42, engelska: 44, historia: 46, biologi: 48,
      kemi: 50, fysik: 52, idrott: 54, geografi: 56, rektor: 60, schema: 64, termin: 66, sommarlov: 68, plugg: 70, studera: 72,
      läsa: 74, skriva: 76, räkna: 78, fråga: 80, svar: 82, uppgift: 84, grupp: 88, projekt: 92, presentation: 96, dator: 110,
      surfplatta: 120, ryggsäck: 130, suddgummi: 140, linjal: 145, sax: 160, lim: 165, papper: 100, block: 170, pärm: 175, kompis: 200,
      vän: 210, hjärna: 260, minne: 270, koncentration: 240, motivation: 250, framtid: 400, jobb: 420, yrke: 440, dröm: 600, barn: 300,
      ungdom: 320, klasskamrat: 190, förskola: 36, dagis: 38,
    },
  },
  {
    date: '2024-01-03',
    targetWord: 'kaffe',
    rankings: {
      kaffe: 1, espresso: 2, cappuccino: 3, latte: 4, koffein: 5, kopp: 6, mugg: 7, bryggkaffe: 8, böna: 9, malen: 11,
      bryggare: 13, kaffekokare: 14, termos: 16, mjölk: 18, socker: 20, grädde: 22, svart: 24, varm: 26, dryck: 28, morgon: 30,
      frukost: 34, fika: 36, bulle: 40, kanelbulle: 42, kaka: 44, tårta: 48, te: 50, choklad: 55, kakao: 58, energi: 60,
      vaken: 64, trött: 70, sömn: 80, paus: 46, rast: 52, café: 90, kafé: 92, barista: 96, americano: 12, mocka: 15,
      filter: 100, arabica: 110, robusta: 115, rostning: 120, arom: 130, doft: 135, smak: 140, beska: 150, syra: 160, crema: 170,
      skum: 180, iskaffe: 105, kanna: 190, porslin: 200, sked: 210, servett: 220, bord: 300, stol: 320, samtal: 260, tidning: 340,
      jobb: 400, kontor: 420, plantage: 500, brasilien: 520, skörd: 540, ånga: 240, koppar: 700, vatten: 250, dricka: 65,
    },
  },
  {
    date: '2024-01-04',
    targetWord: 'vinter',
    rankings: {
      vinter: 1, snö: 2, kyla: 3, kall: 4, is: 5, frost: 6, snöflinga: 7, snögubbe: 8, skidor: 9, pulka: 10,
      skridskor: 11, halka: 12, mössa: 14, vante: 16, halsduk: 18, jacka: 20, säsong: 22, årstid: 24, december: 26, januari: 28,
      februari: 30, jul: 32, julgran: 36, tomte: 40, snöboll: 34, plog: 50, dubbdäck: 55, minusgrader: 44, termometer: 60, brasa: 64,
      eld: 70, filt: 74, varm: 200, choklad: 90, glögg: 92, pepparkaka: 96, stjärna: 150, ljus: 120, mörker: 110, midvinter: 42,
      norrsken: 130, ren: 160, älg: 170, päls: 100, isbjörn: 180, pingvin: 190, arktis: 140, nordpol: 145, glaciär: 155, snöstorm: 46,
      blåst: 210, isig: 48, vår: 300, sommar: 320, höst: 310, semester: 400, sportlov: 80, längdåkning: 84, utförsåkning: 86, slalom: 88,
      backe: 250, fjäll: 220, stuga: 240, tröja: 105, ull: 108, frusen: 52, imma: 260, andas: 500,
    },
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
