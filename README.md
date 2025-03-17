### ANTON

# Dara Music App - Komponentöversikt

## Huvudkomponenter

### Home (`/src/pages/Home.tsx`)
Applikationens startsida som hanterar:
- Spotify-autentisering via URL-parametrar
- Växling mellan inloggnings- och sökvy
- Rendering av sökfält och resultatlistor

### SearchBar (`/src/components/SearchBar.tsx`)
Sökkomponent som möjliggör:
- Realtidssökning i Spotify's API
- Debounced sökfunktionalitet (500ms fördröjning)
- Visar både artist- och låtresultat
- Formaterar och presenterar sökresultat i två separata listor

## Hjälpfunktioner

### searchSpotify (`/src/helpers/searchSpotify.ts`)
API-integrationsfunktion som:
- Hanterar sökningar mot Spotify's API
- Begränsar resultat till 5 artister och 5 låtar
- Inkluderar felhantering och typning av resultat

## Layout och Navigation

### Router (`/src/router/Router.tsx`)
Definierar applikationens routingstruktur med följande routes:
- `/` - Startsida
- `/Player` - Musikspelare
- `/SignIn` - Inloggningssida
- `/artist/:id` - Artistsida
- `/reset` - Återställningssida
- `*` - 404-sida

### RootLayout (`/src/components/layouts/RootLayout.tsx`)
Huvudlayout som:
- Omsluter alla sidor
- Innehåller gemensam header
- Hanterar rendering av aktiv route

### Header (`/src/components/layouts/Header.tsx`)
Navigationshuvud som innehåller:
- App-logotyp med länk till startsidan
- Utloggningsfunktionalitet
- Integration med LogoutModal

### LogoutModal (`/src/components/layouts/LogoutModal.tsx`)
Modal-komponent för utloggning som:
- Visar bekräftelsedialog
- Hanterar bekräftelse/avbryt-actions
- Stilren design med mörkt tema

## Tekniska Detaljer

### State Management
- Använder Zustand för global state management (`useAccessStore`)
- Hanterar access tokens och autentiseringsstatus

### Styling
- Använder Tailwind CSS för styling
- Konsekvent färgschema med anpassade färger
- Responsiv design med flex-layouts

### Autentisering
- Implementerar Spotify OAuth-flöde
- Hanterar access tokens säkert
- Automatisk omdirigering efter autentisering

### Felhantering
- Omfattande felhantering i API-anrop
- Fallback-states för misslyckade sökningar
- Tydlig användarfeedback

## Användning
1. Användaren loggar in via Spotify
2. Efter autentisering visas sökgränssnittet
3. Sökresultat uppdateras automatiskt medan användaren skriver
4. Användaren kan logga ut via header-menyn

## Utveckling
För att utveckla vidare på dessa komponenter:
1. Se till att ha nödvändiga miljövariabler för Spotify API
2. Installera beroenden med `npm install`
3. Kör utvecklingsservern med `npm run dev`
