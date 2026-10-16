# Voorstel Arbopartner Brabant

De paragrafen 1 tot en met 5 staan niet in deze repository. Hieronder staat alleen paragraaf 6, de total-cost-vergelijking, naar aanleiding van de feedback van oktober 2026.

## 6. Total cost of ownership: inhuren of in dienst

De vergelijking staat op `/casemanager-inhuren-of-in-dienst`. Het oude adres `/detacheren-of-in-dienst` verwijst daarheen. De homepage en de tariefpagina tonen de uitkomst van het standaardscenario. Die uitkomst komt uit dezelfde functie als de tool, niet uit een vast getal in de tekst.

### Wat de tool vergelijkt

Aan de kant van inhuren: de uren die de werkgever nodig heeft, met een minimum van tien, maal het bestaande staffeltarief van het gekozen niveau, maal 52. Er is geen nieuw tarief bedacht.

Aan de kant van een dienstverband: één volledig contract, ook als de werkgever minder uren nodig heeft. Heeft de werkgever meer uren nodig dan één persoon productief kan leveren, dan telt de tool een tweede persoon. Er wordt niet met een fractie van een fte gerekend.

### Standaardwaarden en bron

Elke waarde is in de tool aan te passen.

- Bruto maandloon. Afgeleid van CBS StatLine 86355NED, mediaan bruto uurloon €32,80 in 2025 (voorlopig), beroepsgroep 0415 Specialisten personeels- en loopbaanontwikkeling, sleutel A000198. Maandloon = uurloon × contracturen × 52 / 12. Bij 40 uur is dat een afleiding, geen CBS-maandloon. De groep is breder dan alleen casemanagers verzuim. Vakantiegeld en eindejaarsuitkering zitten niet in het CBS-uurloon.
- Vakantiegeld. 8 procent, Wet minimumloon en minimumvakantiebijslag, artikel 15.
- Eindejaarsuitkering. Standaard 0 procent. Er is geen wettelijk percentage. De werkgever vult het percentage uit de eigen cao in, gerekend over bruto jaarloon plus vakantiegeld.
- Werkgeverspremies 2026. AWf laag 2,74 procent of hoog 7,74 procent. Aof hoog 7,63 procent bij een grote werkgever, laag 6,27 procent als de knop uit staat. Wko 0,50 procent. Zvw-werkgeversheffing 6,10 procent. Maximumpremieloon €79.409. Whk standaard 1,52 procent, het landelijk gemiddelde, niet de eigen beschikking. De premiegrondslag is het loon tot het maximum, inclusief vakantiegeld en de ingevulde eindejaarsuitkering. Middelgrote werkgevers hebben geen eigen knop, omdat die mix per werkgever verschilt.
- Pensioen. Standaard 0 procent van het bruto jaarloon. Er is geen landelijk percentage voor deze functie.
- Verzuim van de casemanager. CBS 5,4 procent (StatLine 80072ned, 2025). Dat gemiddelde bevat lange gevallen. Een jaar volledige uitval wordt daarom naast de som getoond en telt niet nog eens mee.
- Loondoorbetaling. Standaard 100 procent. De wettelijke bodem is 70 procent (BW 7:629). 100 procent is een aanname.
- Vervanging. Standaard het eigen uurtarief voor het gekozen niveau en de benodigde uren. De band €85 tot €120 is context, niet de standaard.
- Verlof. Viermaal de wekelijkse arbeidsduur (BW 7:634).
- Feestdagen. Standaard 6 werkdagen in 2026: 1 januari, tweede paasdag, Koningsdag, Hemelvaart, tweede pinksterdag en eerste kerstdag. Tweede kerstdag valt op zaterdag.
- Werving. €5.000 eenmalig en 60 kalenderdagen vacature, afgeschreven over standaard 3 dienstjaren. Bron: Intelligence Group via het AD, met Recruiting Roundtable (€3.818 en circa 65 dagen) als context.
- Inwerken en niet-productieve uren. Standaard 0. Er is geen landelijk cijfer. Leegloop bij een lage caseload zit in het volle contract: de onbenutte productieve uren worden uitgelegd, niet als extra euroregel opgevoerd.
- Opleiding. €4.290 exclusief btw, de zakelijke lijstprijs van CS Opleidingen voor CROV. Eén aanbieder, geen gemiddelde. Afgeschreven over de dienstjaren.
- Registratie. €380 per jaar, RNVC 2026.
- Laptop, software, lease en kilometers. Standaard 0. Het kilometertarief staat op €0,25, de onbelaste vergoeding vanaf 1 januari 2026. Er is geen landelijke prijs voor een laptop of leaseauto.
- Transitievergoeding. Jaarlijkse opbouw van een derde maandsalaris. Per 1 januari 2026 is het maximum €102.000 bruto, of een bruto jaarsalaris als dat hoger is (Rijksoverheid). De knop staat aan. De tool zegt erbij dat de werkgever dit pas betaalt als het contract op diens initiatief eindigt.

### Risicokosten naast de directe loonkosten

De staaf van een dienstverband is gestapeld. Onderin staan de directe kosten: loon, vakantiegeld, eindejaarsuitkering, premies, pensioen, opleiding, registratie, laptop, lease en kilometers. Daarboven staan de risicokosten. Arbopartner is één staaf: de gefactureerde uren, zonder die loonlijst.

Vier risicoposten horen bij het dienstverband. Elk getal is aanpasbaar, ook naar nul.

1. Verzuim van de casemanager zelf, inclusief vervanging. Het percentage is CBS 5,4% (StatLine 80072ned, 2025). De vervanging is het eigen uurtarief maal de verzuimuren. De loondoorbetaling zit in het loon. Een jaar volledige uitval blijft een scenario naast de som, omdat het CBS-gemiddelde lange gevallen al bevat.

2. Verlies van continuïteit bij vertrek of uitval. Werving €5.000 en 60 kalenderdagen vacature, afgeschreven over drie dienstjaren, zoals hierboven. Inwerktijd blijft standaard 0 weken, omdat daar geen landelijk cijfer voor is. Daarnaast een aanname voor de dossiers: elke melding die langer duurt dan 42 weken duurt extra werkdagen, standaard de vacaturewerkdagen gedeeld door de dienstjaren. Die dagen worden gewaardeerd met de TNO-dagkosten. De ingekochte vervanging tijdens de vacature staat apart en haalt deze aanname niet weg, omdat een nieuwe persoon het dossier nog niet kent.

3. Verwachte waarde van een loonsanctie. Formule: kans per 42-wekencase × weken / 52 × jaarloon van een zieke werknemer × aantal 42-wekencases. UWV, Kwantitatieve informatie 2025: 1.825 inhoudelijke loonsancties en 163.464 meldingen met een ziekteduur langer dan 42 weken. De standaardkans is dat quotiënt, ongeveer 1,1%. UWV publiceert geen aparte kans voor minder ervaring of discontinuïteit. Er komt geen toeslag op. De publicatie uit 2018 (11% van de getoetste re-integratieverslagen, waarvan 85% omdat re-integratie niet, te laat of verkeerd was opgepakt) geldt voor verslagen na twee ziektejaren, niet voor elke 42-wekencase, en is daarom niet de standaardkans. Het aantal dossiers per medewerker is 163.464 / 9.338.000. Die noemer volgt uit CBS, De arbeidsmarkt in cijfers 2025: werknemersbanen +138 duizend (+1,5%). De 1,5% kan afgerond zijn. De weken staan op 52, het wettelijk maximum. UWV schrijft dat de gerealiseerde duur niet betrouwbaar is geregistreerd, en dat in 2018 24% van de verlengingen succesvol werd bekort. Het jaarloon is het TNO-referentieloon van €36.500, niet een gemeten loon van zieke werknemers. De factor 1,3 uit de verzuimkostencalculator zit hier niet in.

4. Minder sturing op loonwaarde en benutbare mogelijkheden. AKC Cahier 32 (database sociaal-emotionele klachten) zag dat 4,8% van de cases met vroege arbeidsdeskundige inzet na twee jaar nog open stond, tegen 11,2% zonder. Hetzelfde cahier noemt 31,7% hogere loonwaarde bij eerder onderzoek (Hulleman en Brinkman). Geen van beide cijfers meet een interne casemanager tegenover detachering. De standaard is daarom een gelabelde aanname: een halve extra verzuimdag per medewerker per jaar bij 5,4% verzuim, meeschalend met het ingevulde percentage, gewaardeerd met de TNO-dagkosten. Op nul gezet verdwijnt de post.

### Eerlijkheid bij een hoge caseload

Is het verschil positief, dan is de kop: “U bespaart circa €X per jaar”. Is een dienstverband lager, dan zegt de kop dat ook, in euro’s. Er wordt geen positief bedrag geforceerd. Met de standaardwaarden hierboven, medior en 5,4% verzuim, valt de uitkomst voor 35 tot en met 500 medewerkers in het voordeel van inhuren. Zet de kans, de extra dossierdagen en de halve loonwaardedag op nul, dan kan een dienstverband lager uitvallen. Bij een senior en 24 uur, zonder die drie posten, blijft dat zo. De tool moet dat blijven laten zien.
