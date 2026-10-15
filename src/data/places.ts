export type Place = {
  slug: string;
  name: string;
  in: string;
  minutes: number;
  municipality: string;
  nearby: string[];
  sectors: string[];
  lead: string;
  body: string[];
  faq: { q: string; a: string }[];
};

export const places: Place[] = [
  {
    slug: "uden",
    name: "Uden",
    in: "in Uden",
    minutes: 5,
    municipality: "Maashorst",
    nearby: ["veghel", "schijndel", "gemert", "oss"],
    sectors: ["voeding", "logistiek", "maakindustrie", "zorg"],
    lead: "Uden is onze uitvalsbasis. De casemanager die bij u komt, vertrekt vanaf het kantoor aan de Losplaats en kent de bedrijven op de bedrijventerreinen rond de A50.",
    body: [
      "Uden hoort bij de gemeente Maashorst, samen met Volkel en Schaijk. Op loop- en rijafstand van het kantoor zitten voedselproducenten, groothandels, technische maakbedrijven en een groot zorgaanbod. Die mix geeft ander verzuim dan een puur kantoorgebied: ploegendiensten, fysieke belasting en tegelijk veel psychische uitval in zorg en staf.",
      "Omdat we hier zelf zitten, is een afspraak op locatie dezelfde dag vaak haalbaar. De reistijd rekenen we niet na. Een werkgever in Uden met 35 of meer medewerkers krijgt één vaste casemanager, niet een wisselende pool. Dossiers blijven bij dezelfde persoon, ook als een arbeidsdeskundige van Matchvermogen later meekijkt.",
      "Veel familiebedrijven in Maashorst hebben één HR-medewerker of een directeur die verzuim erbij doet. Dan is tien uur per week al genoeg om de lopende dossiers bij te houden en nieuwe ziekmeldingen de eerste week op te pakken. Grotere plants met meerdere langdurige dossiers schuiven door naar twintig of vierentwintig uur.",
    ],
    faq: [
      {
        q: "Werken jullie ook in Volkel en Schaijk?",
        a: "Ja. Die kernen horen bij Maashorst en vallen ruim binnen de 45 minuten rond Uden. U krijgt dezelfde vaste casemanager als een werkgever in Uden zelf.",
      },
      {
        q: "Kunnen we op kantoor aan de Losplaats afspreken?",
        a: "Ja. Losplaats 16d is het kantoor van Matchvermogen B.V. Wie voor een gesprek daarheen komt, blijft in beweging. Dat verhoogt de drempel om zich ziek te melden en kan verzuim minder en korter maken. We noemen geen percentage. Wie echt niet kan reizen, spreken we op het bedrijf of online.",
      },
      {
        q: "Is de reistijd in Uden echt inbegrepen?",
        a: "Ja. Binnen het werkgebied van ongeveer 45 minuten zit de reistijd in het uurtarief. We schrijven die niet apart.",
      },
    ],
  },
  {
    slug: "veghel",
    name: "Veghel",
    in: "in Veghel",
    minutes: 15,
    municipality: "Meierijstad",
    nearby: ["uden", "schijndel", "oss"],
    sectors: ["food", "groothandel", "logistiek", "techniek"],
    lead: "Veghel is een kwartier rijden. Food, groothandel en logistiek bepalen hier het verzuim: vroege diensten, koelcellen, magazijn en een kantoorlaag erboven.",
    body: [
      "Veghel hoort bij Meierijstad. De voedselketen is er groot, van productie tot de groothandel die de rest van het land belevert. Dat betekent seizoenspieken, uitzendkrachten naast vaste ploegen, en verzuim dat snel oploopt als een teamleider ook de dossiers moet bijhouden.",
      "Een casemanager uit Uden staat hier binnen een kwartier op de stoep, buiten de spits. We plannen de uren zo dat de casemanager een vaste ochtend of middag op locatie is, niet een los uur tussen twee andere klanten door. Medewerkers zien hetzelfde gezicht bij het plan van aanpak en bij de vervolggesprekken.",
      "Voor een plant van tachtig tot tweehonderd mensen is twintig uur per week een gangbare start. Kleinere voedselbedrijven vanaf 35 medewerkers beginnen vaak met tien uur, plus een arbeidsdeskundige op de dossiers die richting het tweede jaar gaan. Die arbeidsdeskundige komt via Matchvermogen, met 8% korting voor klanten van dit label.",
    ],
    faq: [
      {
        q: "Hoe snel is een casemanager in Veghel?",
        a: "De rit vanuit Uden is ongeveer een kwartier buiten de spits. Bij een nieuwe ziekmelding bellen we dezelfde dag. De precieze terugbeltermijn leggen we nog vast.",
      },
      {
        q: "Werken jullie ook in Erp en Keldonk?",
        a: "Ja. Die dorpen liggen tegen Veghel aan en horen bij hetzelfde werkgebied. De pagina voor Veghel dekt de oostkant van Meierijstad.",
      },
      {
        q: "Past detachering bij een foodbedrijf met veel uitzendkrachten?",
        a: "De casemanager begeleidt uw eigen medewerkers. Uitzendkrachten vallen onder het verzuim van het uitzendbureau. We maken dat onderscheid meteen scherp, zodat u geen dubbele trajecten betaalt.",
      },
    ],
  },
  {
    slug: "oss",
    name: "Oss",
    in: "in Oss",
    minutes: 20,
    municipality: "Oss",
    nearby: ["uden", "grave", "den-bosch"],
    sectors: ["life sciences", "industrie", "zorg", "logistiek"],
    lead: "Oss combineert life sciences rond Pivot Park met klassieke industrie en een groot zorgcluster. De dossiers zijn daardoor vaker medisch complex dan in een gemiddeld mkb-bedrijf.",
    body: [
      "Vanuit Uden is Oss ongeveer twintig minuten via de A50. Op de industrieterreinen zitten productiebedrijven met ploegen, en op Pivot Park onderzoeks- en farmabedrijven met hoogopgeleide specialisten. Beide typen verzuim vragen iets anders: bij productie telt fysieke belasting, bij de labs telt langdurige psychische uitval en een krappe vervangingsmarkt.",
      "Een senior casemanager is hier vaker de juiste match dan een medior, vooral als er al een WIA-aanvraag speelt of een verschil van inzicht met de bedrijfsarts. De bedrijfsarts blijft van u. Wij zijn geen arbodienst. Wel houden we het dossier bij, zodat de bedrijfsarts, de leidinggevende en de medewerker hetzelfde plan volgen.",
      "Werkgevers in Oss die al met Matchvermogen werken voor een arbeidsdeskundig onderzoek, kunnen de begeleiding en het onderzoek bij één club laten. Het onderzoek loopt via het zustermerk, de wekelijkse regie via Arbopartner Brabant. U krijgt korting op dat onderzoek.",
    ],
    faq: [
      {
        q: "Begeleiden jullie ook life-sciencebedrijven?",
        a: "Ja. We hebben geen aparte lab-cao, maar de casemanager houdt rekening met specialistische functies waarin vervanging schaars is en aangepast werk lastig te organiseren is.",
      },
      {
        q: "Wat als ons dossier al bij een arbodienst ligt?",
        a: "Dat kan naast elkaar. De arbodienst levert de bedrijfsarts. De casemanager bewaakt het proces, de afspraken en de terugkeer. We stappen niet in de medische behandeling.",
      },
      {
        q: "Hoe ver is Oss van Uden?",
        a: "Ongeveer twintig minuten buiten de spits. Die rit zit in het tarief.",
      },
    ],
  },
  {
    slug: "den-bosch",
    name: "'s-Hertogenbosch",
    in: "in 's-Hertogenbosch",
    minutes: 25,
    municipality: "'s-Hertogenbosch",
    nearby: ["schijndel", "boxtel", "oss", "veghel"],
    sectors: ["zakelijke diensten", "overheid", "logistiek", "food"],
    lead: "Den Bosch is de bestuurlijke en dienstverlenende kern van de Meierij. Verzuim speelt hier vaak op kantoor, in de zorg en in de distributie rond de stad.",
    body: [
      "'s-Hertogenbosch ligt ongeveer 25 minuten van Uden. U vindt er kantoren van zakelijke dienstverleners, overheidsorganisaties, zorginstellingen en de logistiek die de stad en de A2 bedient. Psychisch verzuim en frequent kort verzuim komen we hier vaker tegen dan zware fysieke uitval, al heeft de stadsdistributie die fysieke kant juist wel.",
      "Een vacature voor een casemanager in Den Bosch zelf lag in september 2026 rond €3.500 tot €4.500 bruto per maand bij een volle werkweek. Dat is de mediorband. Zelf iemand aannemen kan. De vergelijking op deze site laat zien wat een productief uur dan kost, inclusief lasten, verzuim en werving. Veel werkgevers kiezen toch voor detachering omdat een zieke eigen casemanager het dossier stillegt, en omdat dertig of veertig uur per week meer is dan het verzuim vraagt.",
      "We werken in de binnenstad, op de kantorenparken en in de wijken eromheen, inclusief Rosmalen. De casemanager heeft een vaste dag. HR hoeft niet elke week opnieuw uit te leggen hoe de organisatie in elkaar zit.",
    ],
    faq: [
      {
        q: "Rekenen jullie Den Bosch nog binnen 45 minuten?",
        a: "Ja. Buiten de spits is de rit vanuit Uden ongeveer 25 minuten. In de avondspits plannen we niet de enige afspraak van de dag om half zes.",
      },
      {
        q: "Werken jullie voor gemeenten en andere overheden?",
        a: "Ja, als opdrachtgever met 35 of meer medewerkers. We kennen het verschil tussen een ambtelijke organisatie en een familiebedrijf, en schrijven het dossier in gewone taal.",
      },
      {
        q: "Is Rosmalen een aparte pagina?",
        a: "Nee. Rosmalen hoort bij 's-Hertogenbosch en valt onder deze pagina.",
      },
    ],
  },
  {
    slug: "eindhoven",
    name: "Eindhoven",
    in: "in Eindhoven",
    minutes: 35,
    municipality: "Eindhoven",
    nearby: ["helmond", "veldhoven", "best"],
    sectors: ["hightech", "maakindustrie", "kenniswerk", "zorg"],
    lead: "Eindhoven is Brainport: hightech, toelevering en kenniswerk. Verzuim is er duur omdat een specialist niet zomaar een week wordt vervangen.",
    body: [
      "De rit van Uden naar Eindhoven is ongeveer 35 minuten via de A50. We rekenen de stad tot het werkgebied, inclusief de bedrijventerreinen aan de rand. Strijp, Flight Forum, de High Tech Campus-omgeving en de maakbedrijven in de wijken daaromheen vragen een casemanager die een technisch functiehuis kan lezen.",
      "Aangepast werk is in een cleanroom of aan een assemblagelijn iets anders dan op een kantoor. De casemanager vertaalt het advies van de bedrijfsarts naar taken die er echt zijn, in overleg met de leidinggevende. Lukt dat niet, dan schakelen we op tijd een arbeidsdeskundige in. Dat onderzoek loopt via Matchvermogen, niet via een bureau dat het dossier voor het eerst ziet.",
      "Voor organisaties boven de tweehonderd medewerkers adviseren we vaak het Pro-blok, zeker bij meerdere langdurige dossiers. Vanaf dertig uur per week zetten we twee mensen in, zodat vakantie van de casemanager het proces niet stilzet.",
    ],
    faq: [
      {
        q: "Komen jullie ook op de High Tech Campus?",
        a: "Ja, als uw organisatie daar zit en binnen de afspraak van 35 of meer medewerkers valt. De reistijd vanuit Uden blijft binnen de 45 minuten en is inbegrepen.",
      },
      {
        q: "Wat als een specialist niet vervangbaar is?",
        a: "Dan sturen we niet aan op een papieren terugkeer. We kijken welke taken wél kunnen, en wanneer een tweede spoor eerlijker is. Tweede spoor loopt via Best Match, met 10% korting.",
      },
      {
        q: "Is Eindhoven niet te ver voor een vaste casemanager?",
        a: "Nee. 35 minuten is de rand van ons gebied, en juist daarom plannen we een blok uren op één dag in plaats van losse uurtjes.",
      },
    ],
  },
  {
    slug: "helmond",
    name: "Helmond",
    in: "in Helmond",
    minutes: 25,
    municipality: "Helmond",
    nearby: ["eindhoven", "deurne", "gemert"],
    sectors: ["automotive", "maakindustrie", "logistiek", "zorg"],
    lead: "Helmond is automotive en maakindustrie, dichter bij Uden dan Eindhoven. De casemanager is hier vaker op de werkvloer dan in een boardroom.",
    body: [
      "Helmond ligt op ongeveer 25 minuten van Uden. De Automotive Campus en de toeleveranciers eromheen hebben ploegen, lassers, monteurs en een dunne laag engineers. Fysiek verzuim is er normaal. De schade ontstaat als een rugklacht een half jaar blijft liggen zonder aangepast werk, of als een conflict met een leidinggevende als ziekte wordt weggezet.",
      "We beginnen met een korte dossierlijst: wie is langer dan zes weken ziek, wie meldt zich elke maand, en waar ontbreekt een plan. Dat is geen onderzoek van €995, al kan een verzuimanalyse dat wel zijn. In het Premium-pakket zit die analyse het eerste jaar inbegrepen.",
      "Helmond deelt zijn arbeidsmarkt met Deurne, Gemert en Eindhoven. Een monteur die uitvalt, is niet de volgende dag vervangen. De besparingscalculator op deze site laat zien wat een verzuimdag ongeveer kost. Het effect van begeleiding vult u zelf in. We beloven geen daling van uw percentage.",
    ],
    faq: [
      {
        q: "Kennen jullie de automotive-cao?",
        a: "De casemanager werkt met de cao die op uw bedrijf van toepassing is. Er is geen landelijke cao voor casemanagers zelf. De regels van úw sector volgen we in het dossier.",
      },
      {
        q: "Kunnen twee planten van één groep samen een blok afnemen?",
        a: "Ja, als ze allebei in het werkgebied zitten. In de offerte splitsen we de uren, zodat elk filiaal een herkenbaar aanspreekpunt houdt.",
      },
      {
        q: "Hoe snel starten jullie in Helmond?",
        a: "Na het adviesgesprek zoeken we een casemanager die past. Een startdatum spreken we in de offerte af. Direct inzetbaar betekent: geen wervingsmaand, wel een kennismaking.",
      },
    ],
  },
  {
    slug: "boxmeer",
    name: "Boxmeer",
    in: "in Boxmeer",
    minutes: 30,
    municipality: "Land van Cuijk",
    nearby: ["cuijk", "grave", "nijmegen"],
    sectors: ["agrifood", "productie", "logistiek", "grensarbeid"],
    lead: "Boxmeer hoort bij Land van Cuijk. Agrifood en productie zitten er stevig, met personeel dat soms over de Duitse grens woont.",
    body: [
      "Vanuit Uden rijdt u in ongeveer een half uur naar Boxmeer. De voedingsindustrie is er zichtbaar, met bedrijven die diervoeding en food produceren en een schil van toeleveranciers en logistiek. Diensten beginnen vroeg. Een verzuimgesprek om tien uur op kantoor mist de ploeg die om zes uur begint. De casemanager plant daarom op de tijden dat de leidinggevende er echt is.",
      "Grensarbeid maakt een dossier niet vanzelf anders, maar de praktische vragen wel: bereikbaarheid, re-integratie bij een andere werkgever in de regio, en soms een werknemer die in Duitsland woont. We blijven binnen Nederlands arbeidsrecht. Voor het tweede spoor schakelen we Best Match in, dat landelijk werkt.",
      "Gemeente Land van Cuijk omvat ook Cuijk, Grave en Sint Anthonis. U kunt dus één casemanager voor meerdere vestigingen in deze hoek afspreken, zolang de uren kloppen met het aantal dossiers.",
    ],
    faq: [
      {
        q: "Vallen Sint Anthonis en Beugen hier ook onder?",
        a: "Ja. Ze liggen tussen Boxmeer en Cuijk en horen bij hetzelfde werkgebied.",
      },
      {
        q: "Begeleiden jullie Duitse grensgangers?",
        a: "Als zij bij een Nederlandse werkgever in dienst zijn, ja. Het dossier volgt de Nederlandse regels voor loondoorbetaling en re-integratie.",
      },
      {
        q: "Is dertig minuten nog binnen jullie gebied?",
        a: "Ja. De grens die we aanhouden is ongeveer 45 minuten vanaf Uden. Boxmeer zit daar ruim binnen.",
      },
    ],
  },
  {
    slug: "cuijk",
    name: "Cuijk",
    in: "in Cuijk",
    minutes: 25,
    municipality: "Land van Cuijk",
    nearby: ["boxmeer", "grave", "nijmegen"],
    sectors: ["haven en logistiek", "industrie", "mkb", "bouw"],
    lead: "Cuijk ligt aan de Maas, met haven, industrie en een brede laag mkb. Vanuit Uden is het ongeveer 25 minuten.",
    body: [
      "Cuijk is de scharnier tussen Noordoost-Brabant en Nijmegen. Over de Maas zit de logistiek, in het dorp en op de terreinen het mkb: bouw, metaal, groothandel. Verzuim is er vaak een zaak van de eigenaar of een office-manager. Een formeel HR-team is er lang niet altijd. In de matchcalculator telt dat mee: zonder HR adviseren we eerder een ervaren casemanager dan een junior.",
      "De haven en de bedrijven eromheen hebben fysiek werk en een veiligheidsrisico als iemand te vroeg terugkeert. We duwen niet op aanwezigheid. We vragen de bedrijfsarts om een belastbaarheidsprofiel en vertalen dat naar taken. Ontbreekt dat profiel, dan is dat het eerste gat in het dossier.",
      "Werkgevers met vestigingen in Cuijk én Nijmegen kunnen beide locaties in één opdracht zetten. Nijmegen rekenen we als rand van het gebied. Verder Gelderland in is het label niet bedoeld; arbeidsdeskundig onderzoek kan Matchvermogen daar wel landelijk doen.",
    ],
    faq: [
      {
        q: "Doen jullie ook de havenbedrijven?",
        a: "Ja, vanaf 35 medewerkers. Veiligheid en fysieke belasting bespreken we met de leidinggevende, niet alleen met HR.",
      },
      {
        q: "Kunnen we de uren delen met een vestiging in Nijmegen?",
        a: "Ja. In de offerte staat hoeveel uur naar welke locatie gaat, en wie het vaste gezicht is.",
      },
      {
        q: "Wat kost een start met tien uur?",
        a: "Het medior-tarief voor een blok van tien uur is €112,50 exclusief btw. Per maand is dat €4.875 bij 52 weken. Dat is een richtprijs, geen offerte.",
      },
    ],
  },
  {
    slug: "schijndel",
    name: "Schijndel",
    in: "in Schijndel",
    minutes: 20,
    municipality: "Meierijstad",
    nearby: ["veghel", "den-bosch", "boxtel", "uden"],
    sectors: ["maakindustrie", "bouw", "agrarisch", "mkb"],
    lead: "Schijndel zit midden in Meierijstad, op een kleine twintig minuten van Uden. Maakbedrijven, bouw en familiebedrijven bepalen het straatbeeld.",
    body: [
      "Schijndel deelt de gemeente Meierijstad met Veghel en Sint-Oedenrode. De bedrijven zijn vaak groter dan het dorpsbeeld doet vermoeden: metaal, bouwmaterialen, food-toelevering en logistieke schakels naar Den Bosch en Eindhoven. De directeur kent de mensen bij naam. Dat is een voordeel, tot een lang dossier persoonlijk wordt en niemand het meer durft aan te kaarten.",
      "Een externe casemanager haalt die spanning uit de lijn. Niet door het over te nemen alsof HR niet bestaat, maar door het gesprek voor te bereiden, de afspraken op te schrijven en de termijn te bewaken. In een familiebedrijf is dat vaak waardevoller dan een extra beleidsdocument.",
      "Sint-Oedenrode en Wijbosch rekenen we bij deze pagina. De rit blijft kort, dus een wekelijks spreekuur op locatie is hier vanzelfsprekend.",
    ],
    faq: [
      {
        q: "Horen Sint-Oedenrode en Erp bij Schijndel of bij Veghel?",
        a: "Erp ligt tegen Veghel. Sint-Oedenrode en Wijbosch sluiten aan op Schijndel. In de praktijk komt dezelfde casemanager uit Uden, en plannen we op de vestiging waar de dossiers zitten.",
      },
      {
        q: "Kunnen jullie naast onze office-manager werken?",
        a: "Ja. Veel opdrachten in Schijndel zijn precies dat: één interne kracht, plus een casemanager voor de langere dossiers en de regie.",
      },
      {
        q: "Maken jullie ook een verzuimprotocol?",
        a: "Ja. Dat is een aparte dienst, of onderdeel van een pakket als u de uren daarvoor wilt gebruiken. Zie de pagina over verzuimbeleid.",
      },
    ],
  },
  {
    slug: "boxtel",
    name: "Boxtel",
    in: "in Boxtel",
    minutes: 30,
    municipality: "Boxtel",
    nearby: ["den-bosch", "schijndel", "best", "eindhoven"],
    sectors: ["food", "industrie", "zorg", "logistiek"],
    lead: "Boxtel ligt tussen Den Bosch en Eindhoven, ongeveer een half uur van Uden. Food, industrie en zorg vragen hier om een casemanager die beide werelden aankan.",
    body: [
      "Boxtel is compact en industrieel tegelijk. Langs het spoor en op de terreinen zitten productie en logistiek, in het dorp zorg en mkb. Een werkgever van vijftig mensen heeft soms drie langdurige dossiers en verder weinig verzuim. Dan is het uurvolume laag, maar de inhoud zwaar. De matchcalculator kijkt daarom niet alleen naar het personeelsbestand, maar ook naar het aantal dossiers boven de zes weken.",
      "We combineren Boxtel goed met een dag in Den Bosch of Best. U betaalt geen voorrijkosten. Wel spreken we een vaste dag af, zodat leidinggevenden niet hun agenda hoeven open te houden voor een casemanager die ‘ergens in de middag’ langskomt.",
      "Luchtkastelen over een halvering van het verzuim verkopen we niet. Wel zorgen we dat een dossier van week zes niet pas in week dertig een plan krijgt. Die vertraging is, in onze praktijk bij het moederbedrijf, de duurste fout.",
    ],
    faq: [
      {
        q: "Is Liempde ook jullie werkgebied?",
        a: "Ja. Liempde hoort bij Boxtel en ligt op dezelfde rit vanuit Uden.",
      },
      {
        q: "Wat als we maar drie zware dossiers hebben?",
        a: "Dan is tien uur per week vaak genoeg, met een medior+ of senior als de inhoud daarom vraagt. Het kleine blok is geen lichte casemanager.",
      },
      {
        q: "Kunnen jullie overleggen met onze bedrijfsarts in Eindhoven?",
        a: "Ja. We sluiten aan bij de arts die u al heeft. We vervangen die arts niet.",
      },
    ],
  },
  {
    slug: "veldhoven",
    name: "Veldhoven",
    in: "in Veldhoven",
    minutes: 40,
    municipality: "Veldhoven",
    nearby: ["eindhoven", "best"],
    sectors: ["hightech-toelevering", "techniek", "kenniswerk"],
    lead: "Veldhoven is de hightech-schil van Eindhoven. Functies zijn specialistisch, verzuim is duur, en een vaste casemanager moet het werk kunnen uitleggen aan iemand die er nooit heeft gestaan.",
    body: [
      "De rit vanuit Uden duurt ongeveer 40 minuten. Daarmee zit Veldhoven aan de buitenrand van het gebied, nog binnen de 45 minuten die we aanhouden. We komen er voor werkgevers met 35 of meer medewerkers, vooral toeleveranciers en technische dienstverleners rond het ASML-ecosysteem. We noemen geen klanten die we niet hebben. Het type werk is genoeg om de aanpak te bepalen.",
      "Aangepast eigen werk is hier schaars. Een procesengineer kan niet een middag orders picken. De casemanager moet dus vroeg de vraag stellen of terugkeer in de eigen functie realistisch is, en anders op tijd het tweede spoor openen. Te laat starten is een klassieke reden voor een loonsanctie. Die toets doet UWV, niet wij. Wij zorgen dat het dossier leesbaar is als die toets komt.",
      "Omdat de rit langer is, werken we met dagdelen. Een uurtje heen en weer is voor niemand productief. Tien uur op één dag, of twee keer vijf, houdt de reistijd in verhouding.",
    ],
    faq: [
      {
        q: "Zit 40 minuten nog in het tarief?",
        a: "Ja. Tot ongeveer 45 minuten vanaf Uden is de reistijd inbegrepen. Daarbuiten maken we aparte afspraken, of verwijzen we door binnen de zustermerken.",
      },
      {
        q: "Werken jullie alleen voor hightech?",
        a: "Nee. Ook zorg, bouw en voedsel in Veldhoven kunnen terecht, vanaf 35 medewerkers.",
      },
      {
        q: "Kunnen gesprekken deels online?",
        a: "Ja. Kennismaking met de medewerker kan online als die dat wil. De afstemming met de leidinggevende doen we het liefst op locatie, zodat we de werkplek zien.",
      },
    ],
  },
  {
    slug: "best",
    name: "Best",
    in: "in Best",
    minutes: 35,
    municipality: "Best",
    nearby: ["eindhoven", "veldhoven", "boxtel"],
    sectors: ["logistiek", "techniek", "mkb", "zorg"],
    lead: "Best ligt tegen Eindhoven aan en is vanaf Uden ongeveer 35 minuten. Logistiek en techniek zitten er naast een gewone mkb-laag.",
    body: [
      "Best is geen voorstad zonder eigen economie. Distributie, technische installatie en middelgrote productie zorgen voor een mix van kort frequent verzuim en een paar dossiers die het jaar doorgaan. Het korte verzuim lost een protocol vaak al op. De lange dossiers niet. Daar zetten we de uren op.",
      "Een verzuimprotocol schrijven we samen met de mensen die het moeten gebruiken: planner, teamleider, HR. Een document dat alleen de directie kent, verandert de eerste week van een ziekmelding niet. Op de kennispagina over de eerste week na een ziekmelding staat wat er praktisch moet gebeuren.",
      "Best combineren we met Eindhoven of Boxtel als u meerdere vestigingen heeft. Eén casemanager, één manier van vastleggen, zodat een medewerker die van locatie wisselt niet opnieuw begint.",
    ],
    faq: [
      {
        q: "Is Best een aparte markt of een buitenwijk van Eindhoven?",
        a: "Een aparte gemeente, met eigen werkgevers. We behandelen de plaats daarom apart, ook al ligt Eindhoven om de hoek.",
      },
      {
        q: "Wat als ons verzuim vooral kort is?",
        a: "Dan kijken we eerst naar het protocol en het gedrag van leidinggevenden, niet naar een zwaar traject. Tien uur per week kan dan vooral coaching van leidinggevenden zijn.",
      },
      {
        q: "Leveren jullie een bedrijfsarts in Best?",
        a: "Nee. De verplichte toegang tot een bedrijfsarts organiseert u zelf, via uw arbodienst of een zelfstandig gevestigde arts. Wij doen de begeleiding en de regie.",
      },
    ],
  },
  {
    slug: "nijmegen",
    name: "Nijmegen",
    in: "in Nijmegen",
    minutes: 35,
    municipality: "Nijmegen",
    nearby: ["cuijk", "grave", "oss"],
    sectors: ["zorg", "life sciences", "onderwijs", "mkb"],
    lead: "Nijmegen is de rand van ons gebied: ongeveer 35 minuten vanaf Uden, net over de provinciegrens. Zorg en life sciences domineren het verzuim.",
    body: [
      "We noemen Nijmegen bewust een randgebied. De stad zelf en de bedrijventerreinen aan de Brabantse kant halen we binnen 45 minuten. Verder Gelderland in, richting Arnhem of Wijchen-west bij files, spreken we alleen af als de rit reëel binnen die grens blijft. Arbeidsdeskundig onderzoek kan Matchvermogen landelijk doen. De gedetacheerde casemanager is een Brabantse afspraak.",
      "Zorginstellingen en health-organisaties hebben te maken met diensten, emotionele belasting en een cao die de loondoorbetaling vaak boven het wettelijk minimum van 70% legt. De casemanager leest die cao voordat er afspraken op papier komen. Een plan dat de cao negeert, is bij de eerste vraag van de ondernemingsraad al stuk.",
      "Psychisch verzuim duurt landelijk gemiddeld veel langer dan een gebroken arm. TNO raamde die duur op ongeveer 63 werkdagen. In Nijmegen zien we die dossiers vaak. Dan is een senior met gevoel voor conflict en herstel op zijn plaats, met een arbeidsdeskundige als achtervang.",
    ],
    faq: [
      {
        q: "Werken jullie in heel Gelderland?",
        a: "Nee. Nijmegen is de rand. Verder de provincie in is dit label niet de juiste vorm. Voor een arbeidsdeskundig onderzoek kunt u bij Matchvermogen terecht, dat landelijk werkt.",
      },
      {
        q: "Geldt de korting op een arbeidsdeskundige ook in Nijmegen?",
        a: "Ja. Klanten van Arbopartner Brabant krijgen 8% korting op arbeidsdeskundig onderzoek via Matchvermogen en 10% op tweede spoor via Best Match.",
      },
      {
        q: "Komen jullie ook in Beuningen of Wijchen?",
        a: "Alleen als de rit vanuit Uden binnen ongeveer 45 minuten blijft en de opdracht bij een werkgever met 35 of meer medewerkers hoort. Dat toetsen we in het adviesgesprek, niet op de gok.",
      },
    ],
  },
  {
    slug: "grave",
    name: "Grave",
    in: "in Grave",
    minutes: 20,
    municipality: "Land van Cuijk",
    nearby: ["cuijk", "oss", "nijmegen"],
    sectors: ["mkb", "zorg", "toerisme en horeca", "agrarisch"],
    lead: "Grave ligt aan de Maas, op een kleine twintig minuten van Uden. Het mkb is er kleinschaliger, maar de ondergrens van 35 medewerkers halen zorg, productie en grotere horeca-achtige bedrijven wel.",
    body: [
      "Grave hoort bij Land van Cuijk en voelt kleiner dan Oss of Nijmegen. Juist daarom blijft verzuim vaak liggen bij de eigenaar. Die kent iedereen, en stelt het moeilijke gesprek uit. Een casemanager van buiten het dorp kan dat gesprek wel voeren, zonder de relatie te hoeven bewaren op de sportclub.",
      "We weigeren opdrachten onder de 35 medewerkers niet uit desinteresse, maar omdat het uurblok dan te groot wordt voor het aantal dossiers. Een kleiner bedrijf verwijzen we liever naar een gerichte opdracht, zoals één arbeidsdeskundig onderzoek, dan naar een wekelijkse detachering die niet rondkomt.",
      "De combinatie met Cuijk en Oss is logisch. Vestigingen in die drie plaatsen bedient één casemanager zonder dat de dag versnippert.",
    ],
    faq: [
      {
        q: "Nemen jullie ook een hotel of zorglocatie van 40 mensen aan?",
        a: "Ja, vanaf 35 medewerkers. De sector mag horeca, zorg of productie zijn. We kijken naar de dossiers, niet naar de gevel.",
      },
      {
        q: "Is Velp of Escharen meegerekend?",
        a: "De kernen rond Grave vallen onder deze pagina zolang ze in Land van Cuijk liggen en de rit kort blijft.",
      },
      {
        q: "Kunnen we eerst alleen een adviesgesprek doen?",
        a: "Ja. Dertig minuten, zonder kosten. U houdt daarna zelf de keuze om een offerte te vragen.",
      },
    ],
  },
  {
    slug: "gemert",
    name: "Gemert",
    in: "in Gemert",
    minutes: 15,
    municipality: "Gemert-Bakel",
    nearby: ["uden", "helmond", "deurne"],
    sectors: ["agrifood", "maakindustrie", "bouw", "mkb"],
    lead: "Gemert ligt een kwartier van Uden. Agrifood, maakbedrijven en bouw zitten er door elkaar, vaak in familiebezit.",
    body: [
      "Gemert-Bakel omvat Gemert, Bakel, Milheeze en De Rips. De rit is kort, het type bedrijf herkenbaar: productiehallen achter een bescheiden kantoor, een bedrijfsleider die ook HR doet, en verzuim dat pas aandacht krijgt als iemand de zes weken passeert. Dan is de eerste analyse al laat.",
      "We zetten de casemanager daarom niet alleen op de lange dossiers, maar ook op de eerste week. Een goed eerste gesprek voorkomt dat een medewerker afhaakt en dat een leidinggevende te veel of te weinig vraagt. Wat u wel en niet mag vragen, staat in ons artikel over de privacyregels. Kort gezegd: geen diagnose uitvragen, wel werk en herstel bespreken.",
      "Bakel en Milheeze doen we vanaf dezelfde pagina. Deurne heeft een eigen pagina, omdat de afstand en het agrarische profiel net anders liggen.",
    ],
    faq: [
      {
        q: "Horen Bakel en Milheeze bij Gemert?",
        a: "Ja, voor deze site wel. Het is één gemeente en één rit vanuit Uden.",
      },
      {
        q: "Wat als de bedrijfsleider geen tijd heeft voor verzuim?",
        a: "Dan nemen we de regie over en houden we de bedrijfsleider alleen bij de beslissingen die echt van hem of haar zijn: aangepast werk, loon en een eventueel tweede spoor.",
      },
      {
        q: "Is een kwartier reistijd apart zichtbaar op de factuur?",
        a: "Nee. Binnen het gebied is reistijd inbegrepen in het uurtarief.",
      },
    ],
  },
  {
    slug: "deurne",
    name: "Deurne",
    in: "in Deurne",
    minutes: 25,
    municipality: "Deurne",
    nearby: ["helmond", "gemert", "boxmeer"],
    sectors: ["agrarisch", "maakindustrie", "logistiek", "zorg"],
    lead: "Deurne is de Peel: agrarisch, maak en zorg, op ongeveer 25 minuten van Uden. Verzuim speelt in de stal, de hal en het verzorgingshuis.",
    body: [
      "Deurne, Liessel, Vlierden en Neerkant vormen een gemeente met veel fysiek werk. Agrarische toelevering en maakbedrijven hebben te maken met seizoen, machines en een kleine vaste kern personeel. Eén langdurig zieke is dan meteen een gat in de ploeg. Vervanging is duur en niet altijd te vinden. Dat is precies de kost die TNO naast de loondoorbetaling zet.",
      "Een casemanager helpt die vervanging niet te organiseren alsof wij een uitzendbureau zijn. Wel zorgen we dat duidelijk is welke taken de zieke medewerker wél kan doen, zodat u niet langer een volle kracht inhuurt dan nodig is. De keuze om iemand te vervangen blijft van u.",
      "Asten en Someren liggen net naast deze pagina. Als de rit binnen 45 minuten blijft, werken we daar ook. Voor de duidelijkheid houden we Deurne als anker van de Peel.",
    ],
    faq: [
      {
        q: "Doen jullie agrarische bedrijven?",
        a: "Ja, vanaf 35 medewerkers. Seizoensdruk en fysieke belasting nemen we mee in het plan van aanpak.",
      },
      {
        q: "En Asten of Someren?",
        a: "Die kunnen we meenemen als de opdracht binnen het gebied en de ondergrens valt. Vraag het in het adviesgesprek, dan zeggen we ja of nee op de rit.",
      },
      {
        q: "Kunnen we maandelijks terug naar minder uren?",
        a: "De inzet is bedoeld om mee te bewegen met het aantal dossiers. De precieze opzeg- en wijzigingstermijn staat in de offerte. Die termijn is nog een placeholder in onze standaardafspraak.",
      },
    ],
  },
];

export function getPlace(slug: string): Place | undefined {
  return places.find((place) => place.slug === slug);
}
