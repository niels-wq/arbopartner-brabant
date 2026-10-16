# Arbopartner Brabant

Nederlandstalige site voor Arbopartner Brabant, een label van Matchvermogen. Het label detacheert een vaste casemanager bij werkgevers met 35 of meer medewerkers in Noord-Brabant. Het kantoor staat in Uden. Reistijd binnen ongeveer 45 minuten van dat kantoor zit in het tarief.

De site is statische HTML (Astro) met interactieve calculators. Formulieren lopen via een kleine Node-server. Het domein `https://www.arbopartnerbrabant.nl` is nog niet live. Canonicals, sitemap en structured data wijzen al naar dat domein.

## Lokaal draaien

```bash
npm install
npm run dev
```

De ontwikkelsite staat op `http://127.0.0.1:4327`. Formulieren werken daar ook: de Vite-plugin gebruikt dezelfde afhandeling als de productieserver.

Productie lokaal:

```bash
npm run build
npm start
```

`npm start` luistert op `PORT` (standaard 4327) en `HOST` (standaard `0.0.0.0`).

```bash
npm test
```

## Formulieren en omgeving

Kopieer `.env.example` naar `.env`.

| Variabele | Betekenis |
| --- | --- |
| `FORM_TO_EMAIL` | Ontvanger van offerte, advies en spoed. |
| `SMTP_HOST` | Leeg laten = geen mail, de site toont een mailto-fallback. |
| `SMTP_PORT` | Meestal `587`. |
| `SMTP_SECURE` | `true` bij poort 465. |
| `SMTP_USER` / `SMTP_PASS` | Inlog van de mailbox. |
| `SMTP_FROM` | Afzender, bijvoorbeeld `Arbopartner Brabant <info@matchvermogen.nl>`. |
| `PORT` | Poort. Railway zet deze zelf. |
| `HOST` | Bind-adres. In de container `0.0.0.0`. |

Endpoints: `POST /api/offerte`, `POST /api/advies`, `POST /api/spoed` met JSON. Een verborgen veld `company_website` is een honeypot. Zonder SMTP antwoordt de server met `delivered: false` en maakt de pagina een mailto-link naar `info@matchvermogen.nl`.

## Railway

De repository bevat een `Dockerfile` en `railway.toml`. Railway bouwt de image, draait `node server/index.mjs` en injecteert `PORT`.

1. Nieuw project, koppel deze repository.
2. Builder: Dockerfile (staat in `railway.toml`).
3. Zet de SMTP-variabelen hierboven als secrets. Zonder die variabelen blijft de site werken, met mailto-fallback.
4. Geen vaste poort instellen. De server leest `PORT`.
5. Healthcheck: `GET /`.
6. DNS later: CNAME van `www.arbopartnerbrabant.nl` naar het Railway-domein. Tot die tijd is dit een preview.

Nixpacks kan ook, als u de Dockerfile niet gebruikt: startcommando `npm run build && npm start`. De Dockerfile is de bedoelde route.

## Calculators

- `/welke-casemanager` — medior, medior+ of senior, plus uurblok.
- `/verzuimkosten-berekenen` — TNO-dagkosten. Daling is een scenario, geen belofte.
- `/casemanager-inhuren-of-in-dienst` — jaarkosten van inhuren naast een dienstverband. Bronnen en aanpasbare aannames. De pagina garandeert dat inhuren goedkoper is en laat de som eerlijk, ook bij een hoge caseload. Daaronder staat het formulier “Vraag uw persoonlijke kostenvergelijking aan”. `/detacheren-of-in-dienst` verwijst door.

## Garanties

Het blok “Onze garanties” staat op de homepage, de pakketten en de vergelijking.

- Na een concrete verzuimanalyse laten we zien hoe het verzuimpercentage kan dalen. Geen vast percentage. De knop heet “Gratis verzuimanalyse”.
- Kwaliteitsgarantie als de adviezen worden gevolgd: kosteloos bijsturen of wisselen van casemanager. Geen geld-terug-bedrag. In `src/data/garanties.ts` staat `TODO(juridisch)` voor een Wtta/DBA-advocaat, ja/nee 322.
- Goedkoper dan iemand in dienst, onderbouwd met de vergelijkingscalculator. De rekenregels veranderen niet.

Bellen gaat via het vaste nummer 085-0870307 (`tel:` en schema). Het 06-nummer staat alleen op WhatsApp-links (`wa.me`).

## Placeholders

Deze punten zijn bewust open gelaten:

- Terugbeltermijn van spoedhulp.
- Aantal werkdagen voor een offerte.
- Eigen mailbox van het label (nu `info@matchvermogen.nl`).
- Btw-identificatienummer (staat niet op matchvermogen.nl).
- Apart vestigingsadres (nu het kantoor van Matchvermogen B.V., Losplaats 16d, 5404 NJ Uden, KvK 85849618).
- Namen, foto’s en directe nummers van casemanagers.
- Online agendalink voor een kantoorgesprek. De kennismaking is de belafspraak van 15 minuten op https://calendly.com/matchvermogen/call-15-min (bron: arbeidsdeskundig.com). matchvermogen.nl en werkhervattingskas.nl publiceren geen eventlink.
- Bewaartermijn van formuliergegevens.
- Standaard opzegtermijn van een urenblok.
- Juridische toets van de conceptvoorwaarden, inclusief Wtta/DBA.
- SMTP-gegevens voor echte aflevering.
- Inkoopprijzen van zzp-casemanagers zijn niet gepubliceerd. De verkooprijzen zijn richtprijzen.
- Eigen Google-reviews bestaan nog niet. Citaten zijn letterlijk van matchvermogen.nl/referenties/.
- Bewaartermijn van sollicitaties. Die is dezelfde open placeholder als bij de andere formulieren. Er staat geen aantal maanden op de site.
- Salaris en uren van de baan in dienst. Die spreken we af in de procedure.

## Werken bij

`/werken-bij` heeft twee trajecten: zzp-casemanager en een baan in dienst. Het formulier loopt in zes stappen en post multipart naar `POST /api/werken`. Honeypot-veld `company_website`. Per IP maximaal 4 aanmeldingen per 10 minuten. Een CV is pdf of docx, maximaal 10 MB.

Ontvanger van de mailfallback is vast `info@matchvermogen.nl`. Zonder `SMTP_HOST` én zonder Airtable antwoordt de site dat de aanmelding nog niet is opgeslagen. Een mailto met het CV kan de browser niet maken.

### Omgevingsvariabelen

| Variabele | Nodig | Betekenis |
| --- | --- | --- |
| `AIRTABLE_TOKEN` | voor de database | Personal access token met `data.records:write` en recht op bijlagen |
| `AIRTABLE_BASE_ID` | voor de database | Base-id, begint met `app` |
| `AIRTABLE_TABLE` | voor de database | Tabelnaam, voorstel `Kandidaten` |
| `AIRTABLE_CV_FIELD` | nee | Bijlageveld, standaard `CV` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | voor de mailfallback | Zelfde mailer als de andere formulieren |

Staan de drie Airtable-variabelen niet alle drie aan, dan gaat de aanmelding per mail, met het CV als bijlage. De Airtable-upload van het bestand zelf stopt bij 5 MB. Een CV tot 10 MB maken we wel aan als record; het bestand gaat dan per mail mee en het veld `CvNotitie` legt dat uit.

### Tabelschema

Maak de keuzes exact zo aan. `typecast` staat aan, maar een ontbrekende keuze laat de schrijfactie alsnog falen als Airtable hem weigert.

| Veld | Type | Opmerking |
| --- | --- | --- |
| Traject | single select | `Zzp`, `In dienst` |
| Naam | single line | |
| Email | email | |
| Telefoon | single line | |
| Woonplaats | single line | |
| Motivatie | long text | |
| ErvaringJaren | number | geheel getal, 0 tot 60 |
| Registraties | multiple select | `RCM`, `SKO`, `BIG`, `Geen` |
| Opleiding | single line | |
| Regios | multiple select | de plaatsen uit `server/werken.json`, inclusief `Elders in Noord-Brabant` |
| BeschikbaarheidUren | number | tot 40 |
| Uurtarief | number | alleen bij zzp, het tarief dat de kandidaat zelf opgeeft |
| KvK | single line | alleen bij zzp, 8 cijfers |
| VOG | single select | `Ja`, `Nee`, `Aangevraagd` |
| Beroepsaansprakelijkheid | single select | `Ja`, `Nee` |
| Specialisaties | multiple select | de twaalf waarden uit `server/werken.json` |
| SpecialisatieOverig | single line | vrije tekst, leeg mag |
| Toestemming | checkbox | |
| Ingediend | date | `YYYY-MM-DD` |
| Bron | single line | `https://www.arbopartnerbrabant.nl/werken-bij` |
| CV | attachment | tot 5 MB via de upload-API |
| CvNotitie | long text | alleen als het CV niet als bijlage in Airtable past |

Een boeking of aanmelding stuurt geen cv-bestandsnaam en geen e-mailadres naar `dataLayer`. Wel `form_step`, `form_error` en `generate_lead` met `form_id` `werken` en het traject.
