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

### Eerlijkheid bij een hoge caseload

Is het verschil positief, dan is de kop: “U bespaart circa €X per jaar”. Is een dienstverband lager, dan zegt de kop dat ook, in euro’s, en daarna volgt het kwalitatieve voordeel: continuïteit, onafhankelijkheid, wisselen zonder ontslag, geen werkgeversrisico, direct inzetbaar en uren die meeschalen. Er wordt geen positief bedrag geforceerd.

De zin “vrijwel altijd voordeliger” geldt daarom niet als absolute claim. Hij geldt zolang de werkgever geen volle werkweek nodig heeft. In het standaardscenario (medior, tien uur) is inhuren lager. Bij een senior en 24 uur is het dienstverband in dit model lager in euro’s. De tool moet dat blijven laten zien.
