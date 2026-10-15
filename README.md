# Arbopartner Brabant

Nederlandstalige site voor Arbopartner Brabant, een label van Matchvermogen. Het label detacheert een vaste casemanager bij werkgevers met 35 of meer medewerkers, binnen ongeveer 45 minuten rijden van Uden.

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
- `/detacheren-of-in-dienst` — kosten per productief uur. Indicatie, geen offerte. Geen claim dat detacheren goedkoper is.

## Placeholders

Deze punten zijn bewust open gelaten:

- Terugbeltermijn van spoedhulp.
- Aantal werkdagen voor een offerte.
- Eigen mailbox van het label (nu `info@matchvermogen.nl`).
- Btw-identificatienummer (staat niet op matchvermogen.nl).
- Apart vestigingsadres (nu het kantoor van Matchvermogen B.V., Losplaats 16d, 5404 NJ Uden, KvK 85849618).
- Namen, foto’s en directe nummers van casemanagers.
- Online agendalink voor het adviesgesprek.
- Bewaartermijn van formuliergegevens.
- Standaard opzegtermijn van een urenblok.
- Juridische toets van de conceptvoorwaarden, inclusief Wtta/DBA.
- SMTP-gegevens voor echte aflevering.
- Inkoopprijzen van zzp-casemanagers zijn niet gepubliceerd. De verkooprijzen zijn richtprijzen.
- Eigen Google-reviews bestaan nog niet. Citaten zijn letterlijk van matchvermogen.nl/referenties/.
