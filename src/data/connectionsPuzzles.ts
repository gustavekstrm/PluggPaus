import { getDateString, getTodayDateString, puzzleIndexForDate } from '../utils/dailyDate';
import type { ConnectionsPuzzle } from '../types/connections';

// Svenska pussel i Connections-anda. Varje pussel har fyra grupper med fyra ord.
// Svårigheten byggs med tvetydiga ord (som verkar passa i flera grupper) och
// ordlek-grupper (t.ex. "___STJÄRNA", "___VÄRK") snarare än självklara kategorier.
export const PUZZLES: ConnectionsPuzzle[] = [
  {
    date: '2024-01-01',
    categories: [
      { name: 'HUNDRASER', words: ['PUDEL', 'TAX', 'MOPS', 'BOXER'], difficulty: 'easy' },
      { name: 'KORTSPEL', words: ['VIRA', 'CANASTA', 'KILLE', 'BRIDGE'], difficulty: 'medium' },
      { name: 'SLANG FÖR PENGAR', words: ['STÅLAR', 'DEG', 'KOSING', 'KLÖVER'], difficulty: 'hard' },
      { name: 'BAKVERK', words: ['BULLE', 'KAKA', 'TÅRTA', 'LIMPA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-02',
    categories: [
      { name: 'SVENSKA STÄDER', words: ['LUND', 'MALMÖ', 'KIRUNA', 'YSTAD'], difficulty: 'easy' },
      { name: 'TRÄD', words: ['TALL', 'GRAN', 'LÖNN', 'LIND'], difficulty: 'medium' },
      { name: 'BILMÄRKEN', words: ['VOLVO', 'SAAB', 'FORD', 'KIA'], difficulty: 'hard' },
      { name: 'FYSIKALISKA ENHETER', words: ['VOLT', 'WATT', 'NEWTON', 'TESLA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-03',
    categories: [
      { name: 'FÅGLAR', words: ['KRÅKA', 'SKATA', 'MÅS', 'TRAST'], difficulty: 'easy' },
      { name: 'SCHACKPJÄSER', words: ['KUNG', 'DAM', 'TORN', 'LÖPARE'], difficulty: 'medium' },
      { name: 'YRKEN', words: ['LÄKARE', 'LÄRARE', 'SNICKARE', 'BAGARE'], difficulty: 'hard' },
      { name: 'KÖKSREDSKAP', words: ['VISP', 'SLEV', 'KAVEL', 'DURKSLAG'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-04',
    categories: [
      { name: 'VÄDERTYPER', words: ['REGN', 'SNÖ', 'DIMMA', 'HAGEL'], difficulty: 'easy' },
      { name: 'MUSIKGENRER', words: ['ROCK', 'JAZZ', 'PUNK', 'SOUL'], difficulty: 'medium' },
      { name: 'DELAR AV ANSIKTET', words: ['PANNA', 'HAKA', 'KIND', 'LÄPP'], difficulty: 'hard' },
      { name: '___STJÄRNA', words: ['FILM', 'SJÖ', 'POP', 'POL'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-05',
    categories: [
      { name: 'FRÅGEORD', words: ['VEM', 'VAR', 'HUR', 'VAD'], difficulty: 'easy' },
      { name: 'KROPPSDELAR', words: ['ARM', 'LÅR', 'NACKE', 'HÄL'], difficulty: 'medium' },
      { name: '___VÄRK', words: ['HUVUD', 'TAND', 'RYGG', 'MAG'], difficulty: 'hard' },
      { name: '___STEG', words: ['FOT', 'BAK', 'FRAM', 'TRAPP'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-06',
    categories: [
      { name: 'GREKISKA BOKSTÄVER', words: ['ALFA', 'BETA', 'GAMMA', 'SIGMA'], difficulty: 'easy' },
      { name: 'PALINDROM', words: ['ANNA', 'OTTO', 'KAJAK', 'RADAR'], difficulty: 'medium' },
      { name: '___LJUS', words: ['SOL', 'MÅN', 'DAG', 'STJÄRN'], difficulty: 'hard' },
      { name: '___PAPPER', words: ['SAND', 'SMÖR', 'TOA', 'TIDNINGS'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-07',
    categories: [
      { name: 'HUNDRASER', words: ['PUDEL', 'TAX', 'MOPS', 'BOXER'], difficulty: 'easy' },
      { name: 'SLAG I BOXNING', words: ['JABB', 'KROK', 'UPPERCUT', 'SVING'], difficulty: 'medium' },
      { name: 'GOLFTERMER', words: ['PUTT', 'BIRDIE', 'GREEN', 'TEE'], difficulty: 'hard' },
      { name: 'FÅGLAR', words: ['MES', 'STARE', 'VIPA', 'KAJA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-08',
    categories: [
      { name: 'KRYDDOR', words: ['TIMJAN', 'OREGANO', 'BASILIKA', 'DRAGON'], difficulty: 'easy' },
      { name: 'KVINNONAMN', words: ['SALVIA', 'IRIS', 'LINNEA', 'VIOLA'], difficulty: 'medium' },
      { name: 'SAGOVÄSEN', words: ['TROLL', 'VÄTTE', 'NÄCKEN', 'DRAKE'], difficulty: 'hard' },
      { name: 'STRÄNGINSTRUMENT', words: ['CELLO', 'LUTA', 'HARPA', 'BANJO'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-09',
    categories: [
      { name: 'LYFTREDSKAP', words: ['TRANA', 'TALJA', 'DOMKRAFT', 'VINSCH'], difficulty: 'easy' },
      { name: 'SVÄLJA LÅNGSAMT', words: ['SMUTTA', 'SIPPA', 'SUGA', 'LÄPPJA'], difficulty: 'medium' },
      { name: 'SVENSKA ÖAR', words: ['GOTLAND', 'ÖLAND', 'ORUST', 'TJÖRN'], difficulty: 'hard' },
      { name: 'VADARFÅGLAR', words: ['SVALA', 'LÄRKA', 'SNÄPPA', 'BECKASIN'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-10',
    categories: [
      { name: 'FISKAR', words: ['ABBORRE', 'GÄDDA', 'LAKE', 'MÖRT'], difficulty: 'easy' },
      { name: 'RINNANDE VATTEN', words: ['BÄCK', 'FORS', 'ÅFÅRA', 'STRÖM'], difficulty: 'medium' },
      { name: 'KÖKSREDSKAP', words: ['SLEV', 'VISP', 'SIL', 'KAVEL'], difficulty: 'hard' },
      { name: 'DANSER', words: ['VALS', 'POLKA', 'TANGO', 'SAMBA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-11',
    categories: [
      { name: 'MÅNADER PÅ ENGELSKA', words: ['MAY', 'MARCH', 'JUNE', 'APRIL'], difficulty: 'easy' },
      { name: 'SÄTT ATT GÅ', words: ['LUNKA', 'SPATSERA', 'STEGA', 'TRASKA'], difficulty: 'medium' },
      { name: 'MELODI', words: ['LÅT', 'VISA', 'SLINGA', 'TRALL'], difficulty: 'hard' },
      { name: 'VÄGENS DELAR', words: ['KURVA', 'BACKE', 'VÄGREN', 'RAKSTRÄCKA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-12',
    categories: [
      { name: 'SCHACKPJÄSER', words: ['BONDE', 'TORN', 'LÖPARE', 'DAM'], difficulty: 'easy' },
      { name: 'FRIIDROTTSGRENAR', words: ['HÖJDHOPP', 'KULA', 'SPJUT', 'DISKUS'], difficulty: 'medium' },
      { name: 'ENKLA BYGGNADER', words: ['LADA', 'SKJUL', 'BOD', 'LIDER'], difficulty: 'hard' },
      { name: 'SPANSKA KVINNONAMN', words: ['CARMEN', 'PILAR', 'DOLORES', 'ROSA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-13',
    categories: [
      { name: 'KROPPSDELAR', words: ['VAD', 'LÅR', 'HÄL', 'VRIST'], difficulty: 'easy' },
      { name: 'FRÅGEORD', words: ['VEM', 'VAR', 'HUR', 'VARFÖR'], difficulty: 'medium' },
      { name: 'SKODELAR', words: ['SULA', 'KLACK', 'SNÖRE', 'PLOS'], difficulty: 'hard' },
      { name: 'STYCKNINGSDETALJER', words: ['BOG', 'FILÉ', 'ENTRECÔTE', 'RYGG'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-14',
    categories: [
      { name: 'PLANETER', words: ['JUPITER', 'SATURNUS', 'MERKURIUS', 'URANUS'], difficulty: 'easy' },
      { name: 'MÅNADER', words: ['MARS', 'MAJ', 'JUNI', 'APRIL'], difficulty: 'medium' },
      { name: 'ROMERSKA GUDINNOR', words: ['VENUS', 'JUNO', 'MINERVA', 'DIANA'], difficulty: 'hard' },
      { name: 'SVENSK CHOKLAD', words: ['MARABOU', 'DAIM', 'PLOPP', 'KEXCHOKLAD'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-15',
    categories: [
      { name: 'SVAMPAR', words: ['KANTARELL', 'MURKLA', 'CHAMPINJON', 'KREMLA'], difficulty: 'easy' },
      { name: 'SVENSK OST', words: ['GREVÉ', 'HERRGÅRD', 'VÄSTERBOTTEN', 'PRÄSTOST'], difficulty: 'medium' },
      { name: 'GAMLA YRKEN', words: ['SMED', 'MJÖLNARE', 'GARVARE', 'TUNNBINDARE'], difficulty: 'hard' },
      { name: 'KORTFÄRGER', words: ['KLÖVER', 'HJÄRTER', 'SPADER', 'RUTER'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-16',
    categories: [
      { name: 'KATTDJUR', words: ['LO', 'TIGER', 'GEPARD', 'JAGUAR'], difficulty: 'easy' },
      { name: 'SPORTMÄRKEN', words: ['PUMA', 'ADIDAS', 'NIKE', 'ASICS'], difficulty: 'medium' },
      { name: 'LUGN OCH RO', words: ['FRID', 'STILLHET', 'HARMONI', 'VILA'], difficulty: 'hard' },
      { name: 'SVENSKA SJÖAR', words: ['VÄNERN', 'VÄTTERN', 'MÄLAREN', 'HJÄLMAREN'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-17',
    categories: [
      { name: 'KVÄLLSTIDNINGAR', words: ['EXPRESSEN', 'AFTONBLADET', 'GT', 'KVÄLLSPOSTEN'], difficulty: 'easy' },
      { name: 'TÅGTYPER', words: ['PENDELTÅG', 'NATTÅG', 'GODSTÅG', 'SNABBTÅG'], difficulty: 'medium' },
      { name: 'NEDERBÖRD', words: ['REGN', 'HAGEL', 'SNÖ', 'SLASK'], difficulty: 'hard' },
      { name: 'HAVSVÅGOR', words: ['DYNING', 'BRÄNNING', 'SVALL', 'KRABBSJÖ'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-18',
    categories: [
      { name: 'SVENSKA LANDSKAP', words: ['SKÅNE', 'HALLAND', 'DALSLAND', 'BLEKINGE'], difficulty: 'easy' },
      { name: 'BRÖDSORTER', words: ['LIMPA', 'FRANSKA', 'RÅGKAKA', 'KUVERTBRÖD'], difficulty: 'medium' },
      { name: 'GREKISKA BOKSTÄVER', words: ['ALFA', 'BETA', 'GAMMA', 'DELTA'], difficulty: 'hard' },
      { name: 'FLODENS SLUT', words: ['MYNNING', 'UTLOPP', 'ESTUARIE', 'DELTAARM'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-19',
    categories: [
      { name: 'BURFÅGLAR', words: ['UNDULAT', 'KANARIEFÅGEL', 'NYMFPARAKIT', 'ARA'], difficulty: 'easy' },
      { name: 'GNAGARE', words: ['MARSVIN', 'BÄVER', 'EKORRE', 'SORK'], difficulty: 'medium' },
      { name: 'SPARA PÅ', words: ['HAMSTRA', 'SNÅLA', 'SPARA', 'LÄGGA UNDAN'], difficulty: 'hard' },
      { name: 'TRÄDGÅRDSREDSKAP', words: ['SPADE', 'KRATTA', 'SEKATÖR', 'GREP'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-20',
    categories: [
      { name: 'MUSIKGENRER', words: ['ROCK', 'POP', 'JAZZ', 'BLUES'], difficulty: 'easy' },
      { name: 'YTTERPLAGG', words: ['KAPPA', 'JACKA', 'ANORAK', 'PONCHO'], difficulty: 'medium' },
      { name: 'VEMOD', words: ['SORG', 'SVÅRMOD', 'MELANKOLI', 'TUNGSINNE'], difficulty: 'hard' },
      { name: 'HOPP', words: ['SKUTT', 'SPRÅNG', 'SATS', 'VOLT'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-21',
    categories: [
      { name: 'BILDELAR', words: ['RATT', 'KOPPLING', 'BROMS', 'VÄXELLÅDA'], difficulty: 'easy' },
      { name: 'ELTERMER', words: ['FAS', 'JORD', 'NOLLA', 'SPÄNNING'], difficulty: 'medium' },
      { name: 'TV-FORMAT', words: ['SERIE', 'DOKUMENTÄR', 'TALKSHOW', 'MINISERIE'], difficulty: 'hard' },
      { name: 'LIVETS SKEDEN', words: ['BARNDOM', 'UNGDOM', 'VUXENLIV', 'ÅLDERDOM'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-22',
    categories: [
      { name: 'SMÖRGÅSPÅLÄGG', words: ['SKINKA', 'LEVERPASTEJ', 'MARMELAD', 'KAVIAR'], difficulty: 'easy' },
      { name: 'TRÄDETS DELAR', words: ['BARK', 'GREN', 'ROT', 'STAM'], difficulty: 'medium' },
      { name: 'MATEMATIK', words: ['POTENS', 'FAKTOR', 'TERM', 'NÄMNARE'], difficulty: 'hard' },
      { name: 'HUNDLÄTEN', words: ['SKALL', 'GNY', 'MORRNING', 'YLANDE'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-23',
    categories: [
      { name: 'KRIGSFARTYG', words: ['FREGATT', 'KORVETT', 'JAGARE', 'UBÅT'], difficulty: 'easy' },
      { name: 'SVENSKA ROVDJUR', words: ['VARG', 'JÄRV', 'LODJUR', 'BJÖRN'], difficulty: 'medium' },
      { name: 'SEGEL', words: ['STORSEGEL', 'FOCK', 'SPINNAKER', 'MESAN'], difficulty: 'hard' },
      { name: 'ITALIENSKA STÄDER', words: ['GENUA', 'TURIN', 'NEAPEL', 'VERONA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-24',
    categories: [
      { name: 'VINTERSPORTER', words: ['SLALOM', 'BACKHOPPNING', 'CURLING', 'SKELETON'], difficulty: 'easy' },
      { name: 'HÅRVÅRD', words: ['BALSAM', 'SCHAMPO', 'VAX', 'GELÉ'], difficulty: 'medium' },
      { name: 'BIKUPANS PRODUKTER', words: ['HONUNG', 'PROPOLIS', 'POLLEN', 'BIVAX'], difficulty: 'hard' },
      { name: 'BOTEMEDEL', words: ['KUR', 'MEDICIN', 'SALVA', 'VACCIN'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-25',
    categories: [
      { name: 'TIDSENHETER', words: ['DYGN', 'VECKA', 'MÅNAD', 'SEKEL'], difficulty: 'easy' },
      { name: 'VINKELMÅTT', words: ['GRAD', 'MINUT', 'SEKUND', 'RADIAN'], difficulty: 'medium' },
      { name: 'AKADEMISKA TITLAR', words: ['DOKTOR', 'DOCENT', 'PROFESSOR', 'LICENTIAT'], difficulty: 'hard' },
      { name: 'VÄRMEKÄLLOR', words: ['KAMIN', 'BRASA', 'ELEMENT', 'KAKELUGN'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-26',
    categories: [
      { name: 'SVENSKA FÖRFATTARE', words: ['LAGERLÖF', 'STRINDBERG', 'MOBERG', 'LINDGREN'], difficulty: 'easy' },
      { name: 'BERGSKEDJOR', words: ['ANDERNA', 'ALPERNA', 'URAL', 'HIMALAYA'], difficulty: 'medium' },
      { name: 'MOLNTYPER', words: ['CUMULUS', 'CIRRUS', 'STRATUS', 'NIMBUS'], difficulty: 'hard' },
      { name: 'LJUSKRANS', words: ['GLORIA', 'AURA', 'STRÅLKRANS', 'HALO'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-27',
    categories: [
      { name: 'TRÄBLÅSINSTRUMENT', words: ['FLÖJT', 'OBOE', 'KLARINETT', 'FAGOTT'], difficulty: 'easy' },
      { name: 'ANDAS TUNGT', words: ['FLÅSA', 'FLÄMTA', 'PUSTA', 'FNYSA'], difficulty: 'medium' },
      { name: 'SVENSKA FJÄLLTOPPAR', words: ['KEBNEKAISE', 'SAREK', 'ÅRESKUTAN', 'HELAGS'], difficulty: 'hard' },
      { name: 'KRUKVÄXTER', words: ['MONSTERA', 'PALM', 'KAKTUS', 'FIKUS'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-28',
    categories: [
      { name: 'PIZZASORTER', words: ['MARGHERITA', 'CAPRICCIOSA', 'QUATTRO', 'CALZONE'], difficulty: 'easy' },
      { name: 'VULKANER', words: ['VESUVIUS', 'ETNA', 'FUJI', 'HEKLA'], difficulty: 'medium' },
      { name: 'ÖGRUPPER', words: ['AZORERNA', 'KANARIEÖARNA', 'MALDIVERNA', 'HAWAII'], difficulty: 'hard' },
      { name: 'DRINKAR', words: ['MOJITO', 'DAIQUIRI', 'NEGRONI', 'MARTINI'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-29',
    categories: [
      { name: 'TANDVÅRD', words: ['TANDBORSTE', 'TANDTRÅD', 'FLUOR', 'TANDKRÄM'], difficulty: 'easy' },
      { name: 'SYSAKER', words: ['NÅL', 'FINGERBORG', 'SAX', 'SYMASKIN'], difficulty: 'medium' },
      { name: 'SKOGSDJUR', words: ['ÄLG', 'RÅDJUR', 'GRÄVLING', 'VILDSVIN'], difficulty: 'hard' },
      { name: 'PÄLSDJUR', words: ['MÅRD', 'MINK', 'SOBEL', 'HERMELIN'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-30',
    categories: [
      { name: 'BRÄDSPEL', words: ['FIA', 'BACKGAMMON', 'YATZY', 'SCHACK'], difficulty: 'easy' },
      { name: 'EKONOMI', words: ['MONOPOL', 'INFLATION', 'RÄNTA', 'UTBUD'], difficulty: 'medium' },
      { name: 'SVENSKA KVINNONAMN', words: ['MAJA', 'SIGRID', 'ELSA', 'ASTRID'], difficulty: 'hard' },
      { name: 'NAMNGIVNA STORMAR', words: ['GUDRUN', 'PER', 'SIMONE', 'ALFRIDA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-31',
    categories: [
      { name: 'KAFFEDRYCKER', words: ['ESPRESSO', 'LATTE', 'CORTADO', 'AMERICANO'], difficulty: 'easy' },
      { name: 'MUSIKTEMPON', words: ['PRESTO', 'ADAGIO', 'ALLEGRO', 'LARGO'], difficulty: 'medium' },
      { name: 'SNABB PÅ SVENSKA', words: ['KVICK', 'RAPP', 'FLINK', 'RASK'], difficulty: 'hard' },
      { name: 'LÅNGSAM PÅ SVENSKA', words: ['TRÖG', 'SEG', 'SLÖ', 'MASIG'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-01',
    categories: [
      { name: 'NATURVETENSKAP', words: ['BIOLOGI', 'KEMI', 'FYSIK', 'GEOLOGI'], difficulty: 'easy' },
      { name: 'METALLER', words: ['JÄRN', 'KOPPAR', 'ZINK', 'TENN'], difficulty: 'medium' },
      { name: 'MEDALJER', words: ['GULD', 'SILVER', 'BRONS', 'PLAKETT'], difficulty: 'hard' },
      { name: 'VINDSTYRKOR', words: ['KULING', 'STORM', 'ORKAN', 'BRIS'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-02',
    categories: [
      { name: 'PAPPERSFORMAT', words: ['FOLIO', 'KVARTO', 'OKTAV', 'A4'], difficulty: 'easy' },
      { name: 'BOKENS DELAR', words: ['PÄRM', 'RYGG', 'OMSLAG', 'BLAD'], difficulty: 'medium' },
      { name: 'VÄXTENS DELAR', words: ['STJÄLK', 'KNOPP', 'GRODD', 'PISTILL'], difficulty: 'hard' },
      { name: 'ALUMINIUMFÖREMÅL', words: ['FOLIE', 'BURK', 'FÄLG', 'STEGE'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-03',
    categories: [
      { name: 'SLAGVERK', words: ['TRUMMA', 'CYMBAL', 'MARIMBA', 'TAMBURIN'], difficulty: 'easy' },
      { name: 'GEOMETRISKA FIGURER', words: ['ROMB', 'TRAPETS', 'CIRKEL', 'TRIANGEL'], difficulty: 'medium' },
      { name: 'CIRKUS', words: ['LINA', 'TRAMPOLIN', 'MANEGE', 'KLOT'], difficulty: 'hard' },
      { name: 'KASTGRENAR', words: ['SLÄGGA', 'VIKTKASTNING', 'SPJUTKAST', 'DISKUSKAST'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-04',
    categories: [
      { name: 'GAMLA SVENSKA MYNT', words: ['ÖRE', 'DALER', 'RIKSDALER', 'SKILLING'], difficulty: 'easy' },
      { name: 'NORSKA STÄDER', words: ['OSLO', 'BERGEN', 'TROMSÖ', 'STAVANGER'], difficulty: 'medium' },
      { name: 'I EN GRUVA', words: ['SCHAKT', 'ORT', 'STOLL', 'GÅNG'], difficulty: 'hard' },
      { name: 'I EN STAD', words: ['TORG', 'KVARTER', 'GRÄND', 'ALLÉ'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-05',
    categories: [
      { name: 'SÄTT ATT SKRATTA', words: ['FNISSA', 'GAPSKRATTA', 'FLINA', 'GARVA'], difficulty: 'easy' },
      { name: 'RÖTTER MAN ÄTER', words: ['PALSTERNACKA', 'KÅLROT', 'MOROT', 'RÖDBETA'], difficulty: 'medium' },
      { name: 'SÖTNINGSMEDEL', words: ['HONUNG', 'SIRAP', 'AGAVE', 'STEVIA'], difficulty: 'hard' },
      { name: 'BEHANDLA LÄDER', words: ['BETA', 'LOOKA', 'FÄRGA', 'INFETTA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-06',
    categories: [
      { name: 'HÄSTENS GÅNGARTER', words: ['SKRITT', 'TRAV', 'GALOPP', 'PASSGÅNG'], difficulty: 'easy' },
      { name: 'BANSPORTER', words: ['SPEEDWAY', 'GOKART', 'VELODROM', 'RALLYCROSS'], difficulty: 'medium' },
      { name: 'I STALLET', words: ['MOCKA', 'STRIGLA', 'FODRA', 'SKO'], difficulty: 'hard' },
      { name: 'KAFFE MED CHOKLAD', words: ['MOCCACINO', 'MOCHA', 'CAFFÈMOCHA', 'CHOKLADLATTE'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-07',
    categories: [
      { name: 'KÖKSREDSKAP', words: ['RIVJÄRN', 'MORTEL', 'DURKSLAG', 'STEKSPADE'], difficulty: 'easy' },
      { name: 'BOXNING', words: ['JABB', 'KLINCH', 'GONG', 'RINGHÖRNA'], difficulty: 'medium' },
      { name: 'GOLF', words: ['PUTT', 'BUNKER', 'FAIRWAY', 'CADDIE'], difficulty: 'hard' },
      { name: 'ENGELSKA FÄRGORD', words: ['GREEN', 'BLUE', 'AMBER', 'CORAL'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-08',
    categories: [
      { name: 'REV OCH GRUND', words: ['KORALLREV', 'ATOLL', 'BARRIÄRREV', 'SANDBANK'], difficulty: 'easy' },
      { name: 'VASSA DELAR', words: ['EGG', 'UDD', 'TAGG', 'SPETS'], difficulty: 'medium' },
      { name: 'TAGGIGA DJUR', words: ['IGELKOTT', 'SJÖBORRE', 'PIGGSVIN', 'BÄLTDJUR'], difficulty: 'hard' },
      { name: 'ORD FÖR MUSIKALBUM', words: ['SKIVA', 'PLATTA', 'ALBUM', 'VINYL'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-09',
    categories: [
      { name: 'BAKHJÄLPMEDEL', words: ['JÄST', 'BIKARBONAT', 'BAKPULVER', 'HJORTHORN'], difficulty: 'easy' },
      { name: 'FERMENTERAT', words: ['SURKÅL', 'KIMCHI', 'KEFIR', 'SURDEG'], difficulty: 'medium' },
      { name: 'MOGNAD', words: ['MOGEN', 'LAGRAD', 'OMOGEN', 'ÖVERMOGEN'], difficulty: 'hard' },
      { name: 'HIMLENS UTSEENDE', words: ['KLAR', 'MULEN', 'DISIG', 'HALVKLAR'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-10',
    categories: [
      { name: 'MÅTT I RECEPT', words: ['MSK', 'TSK', 'KRM', 'DL'], difficulty: 'easy' },
      { name: 'KEMISKA TECKEN', words: ['FE', 'AU', 'AG', 'CU'], difficulty: 'medium' },
      { name: 'TONER', words: ['DO', 'RE', 'MI', 'FA'], difficulty: 'hard' },
      { name: 'ORD PÅ ___SKAP', words: ['VÄNSKAP', 'LANDSKAP', 'SÄLLSKAP', 'BUDSKAP'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-11',
    categories: [
      { name: 'SOVA LÄTT', words: ['SLUMRA', 'DÅSA', 'TUPPLURA', 'HALVSOVA'], difficulty: 'easy' },
      { name: 'TUPPENS DELAR', words: ['KAM', 'SPORRE', 'STJÄRTFJÄDER', 'NÄBB'], difficulty: 'medium' },
      { name: 'MORGONLJUD', words: ['VÄCKARKLOCKA', 'FÅGELSÅNG', 'GALANDE', 'KAFFEBRYGGARE'], difficulty: 'hard' },
      { name: 'ORD PÅ ___VÄRK', words: ['HUVUDVÄRK', 'TANDVÄRK', 'MAGVÄRK', 'RYGGVÄRK'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-12',
    categories: [
      { name: 'JAKANDE SVAR', words: ['JA', 'VISST', 'JAVISST', 'ABSOLUT'], difficulty: 'easy' },
      { name: 'NEKANDE SVAR', words: ['NEJ', 'ALDRIG', 'KNAPPAST', 'ICKE'], difficulty: 'medium' },
      { name: 'ORD PÅ ___STJÄRNA', words: ['FILMSTJÄRNA', 'SJÖSTJÄRNA', 'POLSTJÄRNA', 'MORGONSTJÄRNA'], difficulty: 'hard' },
      { name: 'HIMLAKROPPAR', words: ['KOMET', 'ASTEROID', 'METEOR', 'MÅNE'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-13',
    categories: [
      { name: 'SÖMNAD', words: ['FÅLL', 'SÖM', 'STYGN', 'TRÅCKEL'], difficulty: 'easy' },
      { name: 'BRANTA KLIPPOR', words: ['KLINT', 'BRANT', 'STUP', 'LODVÄGG'], difficulty: 'medium' },
      { name: 'I ANSIKTET', words: ['RYNKA', 'SKRATTGROP', 'POR', 'FRÄKNE'], difficulty: 'hard' },
      { name: 'ORD PÅ ___KANT', words: ['STRANDKANT', 'BORDSKANT', 'SKOGSKANT', 'VÄGKANT'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-14',
    categories: [
      { name: 'FRANSK OST', words: ['BRIE', 'CAMEMBERT', 'ROQUEFORT', 'COMTÉ'], difficulty: 'easy' },
      { name: 'FRANSKA FLODER', words: ['SEINE', 'LOIRE', 'RHÔNE', 'GARONNE'], difficulty: 'medium' },
      { name: 'MODEHUS', words: ['CHANEL', 'DIOR', 'HERMÈS', 'LANVIN'], difficulty: 'hard' },
      { name: 'PARFYMENS TONER', words: ['BAS', 'HJÄRTA', 'TOPP', 'AMBRA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-15',
    categories: [
      { name: 'SÄTT ATT TITTA', words: ['GLO', 'SPANA', 'KIKA', 'SNEGLA'], difficulty: 'easy' },
      { name: 'SMÅFÅGLAR', words: ['STARE', 'BOFINK', 'NÖTVÄCKA', 'SIDENSVANS'], difficulty: 'medium' },
      { name: 'OPTISKA INSTRUMENT', words: ['KIKARE', 'MIKROSKOP', 'TELESKOP', 'LUPP'], difficulty: 'hard' },
      { name: 'ÖGATS DELAR', words: ['PUPILL', 'IRIS', 'NÄTHINNA', 'HORNHINNA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-16',
    categories: [
      { name: 'SMÅ BÅTAR', words: ['EKA', 'JOLLE', 'KANOT', 'KAJAK'], difficulty: 'easy' },
      { name: 'NEDSÄTTANDE OM BÅT', words: ['SKUTA', 'BALJA', 'LÅDA', 'VRAK'], difficulty: 'medium' },
      { name: 'LÖVTRÄD', words: ['EK', 'ASK', 'AL', 'ALM'], difficulty: 'hard' },
      { name: 'ORD PÅ ___BÅT', words: ['SEGELBÅT', 'MOTORBÅT', 'RÄDDNINGSBÅT', 'ROBÅT'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-17',
    categories: [
      { name: 'KRYDDVÄXTER', words: ['GRÄSLÖK', 'PERSILJA', 'DILL', 'KÖRVEL'], difficulty: 'easy' },
      { name: 'TUGGUMMISMAKER', words: ['MYNTA', 'MELON', 'JORDGUBB', 'TUTTI'], difficulty: 'medium' },
      { name: 'SVENSKT GODIS', words: ['LAKRITS', 'KOLA', 'POLKAGRIS', 'GELÉHALLON'], difficulty: 'hard' },
      { name: 'MANDELBAKVERK', words: ['MARSIPAN', 'NOUGAT', 'MAKRON', 'BISKVI'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-18',
    categories: [
      { name: 'CYKELNS DELAR', words: ['STYRE', 'KEDJA', 'EKER', 'PEDAL'], difficulty: 'easy' },
      { name: 'STYRELSESKICK', words: ['MONARKI', 'REPUBLIK', 'DIKTATUR', 'OLIGARKI'], difficulty: 'medium' },
      { name: 'SVENSKA FJÄLLKEDJAN', words: ['SKANDERNA', 'KÖLEN', 'SYLARNA', 'SARVFJÄLLET'], difficulty: 'hard' },
      { name: 'ORD PÅ ___KEDJA', words: ['BUTIKSKEDJA', 'GULDKEDJA', 'NÄRINGSKEDJA', 'SNÖKEDJA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-02-19',
    categories: [
      { name: 'MJUKA TYGER', words: ['SAMMET', 'SIDEN', 'FLANELL', 'CHIFFONG'], difficulty: 'easy' },
      { name: 'I BADRUMMET', words: ['FROTTÉ', 'BADLAKAN', 'TVÄTTLAPP', 'BADROCK'], difficulty: 'medium' },
      { name: 'VINDRUVOR', words: ['MERLOT', 'RIESLING', 'SYRAH', 'PINOT'], difficulty: 'hard' },
      { name: 'FRANSKA MÅNADER', words: ['JANVIER', 'FÉVRIER', 'DÉCEMBRE', 'AVRIL'], difficulty: 'tricky' },
    ],
  },
];

export function getPuzzleForDate(dateString: string): ConnectionsPuzzle {
  return PUZZLES[puzzleIndexForDate(dateString, PUZZLES.length)];
}

/** Stabil identitet för ett pussel, så sparat spelläge kan kasseras när pusslet bytts. */
export function getPuzzleId(puzzle: ConnectionsPuzzle): string {
  return puzzle.date;
}

export function getDailyPuzzle(date: Date): ConnectionsPuzzle {
  return getPuzzleForDate(getDateString(date));
}

export function getTodaysPuzzle(): ConnectionsPuzzle {
  return getPuzzleForDate(getTodayDateString());
}
