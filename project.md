# 🚴 VeloDash — 7-dniowy plan projektu Vue 3 + Tailwind

**Stack:** Vue 3 (Composition API + `<script setup>`) · Vite · Tailwind CSS · Pinia · Vue Router · Chart.js · Leaflet · Open-Meteo API
**Czas:** 7 dni × 2–3 h/dzień ≈ 17 h
**Poziom:** średni
**Cel nauki:** Composition API, integracja z API, animacje/Transitions, zarządzanie stanem, persystencja danych

---

## 🎯 Koncepcja aplikacji

**VeloDash** to osobisty dashboard rowerzysty. Logujesz przejazdy (km, czas, trasa, samopoczucie), a aplikacja:

- pokazuje **statystyki** (km w tym tygodniu/miesiącu, średnia prędkość, najdłuższy przejazd),
- pobiera **aktualną pogodę i prognozę** dla Szczecina z [Open-Meteo](https://open-meteo.com) (bez klucza API),
- wyświetla **wykresy** (km dziennie, miesięcznie, rozkład pór dnia),
- pozwala **rysować trasę na mapie** (Leaflet) i zapisuje dystans,
- pilnuje **celów miesięcznych** (np. 150 km — Twój realny target),
- przechowuje wszystko w `localStorage` przez `pinia-plugin-persistedstate`.

Realny use-case: codziennie po przejeździe wbijasz dane i widzisz progres.

---

## 📅 Harmonogram dzień po dniu

### Dzień 1 — Fundamenty i layout (2–3 h)
**Cel:** działający szkielet aplikacji + nawigacja.

- [ ] `npm create vue@latest velodash` (wybierz: Router, Pinia, ESLint)
- [ ] Instalacja Tailwind v4: `npm install tailwindcss @tailwindcss/vite`
- [ ] Konfiguracja `vite.config.js` + import `@import "tailwindcss"` w `main.css`
- [ ] Stwórz layout: `<AppHeader>`, `<AppSidebar>`, `<RouterView>`
- [ ] Routing dla 4 widoków: `/` (Dashboard), `/rides` (Lista), `/new` (Dodaj), `/map` (Mapa)
- [ ] Dark mode toggle (Tailwind `dark:` + `ref` w composable `useTheme.js`)

**🧠 Czego się nauczysz:** struktura projektu Vue 3, Tailwind v4 (nowa konfiguracja przez CSS, nie `tailwind.config.js`), pierwszy composable.

---

### Dzień 2 — Pinia store + formularz dodawania przejazdu (2–3 h)
**Cel:** możesz dodać przejazd i zobaczyć go na liście.

- [ ] Store `useRidesStore` z akcjami: `addRide`, `deleteRide`, `updateRide`
- [ ] Model przejazdu: `{ id, date, distanceKm, durationMin, mood, notes, weather }`
- [ ] `pinia-plugin-persistedstate` — automatyczny zapis do `localStorage`
- [ ] Komponent `<RideForm>` z walidacją (czysty Vue, bez bibliotek)
- [ ] Computed: `totalKm`, `avgSpeed`, `ridesThisWeek`, `ridesThisMonth`

**🧠 Czego się nauczysz:** `defineStore` z Composition API, `ref` vs `reactive`, `computed`, persystencja stanu, `v-model` na własnych komponentach.

**💡 Wyzwanie:** zrób input dystansu obsługujący zarówno `12.5` jak i `12,5` (polski format).

---

### Dzień 3 — Integracja z API pogodowym (2–3 h)
**Cel:** prawdziwe dane z internetu w aplikacji.

- [ ] Composable `useWeather.js` — fetch do [Open-Meteo](https://open-meteo.com/en/docs) dla Szczecina (53.43°N, 14.55°E)
- [ ] Stany: `loading`, `error`, `data` — obsługa wszystkich trzech
- [ ] Karta `<WeatherCard>`: temperatura, wiatr, opady, ikona pogody
- [ ] Prognoza 7-dniowa z rekomendacją: „Jutro 18°C i bezwietrznie — idealnie na rower 🚴"
- [ ] Auto-zapis pogody przy dodawaniu przejazdu (snapshot z dnia)

**🧠 Czego się nauczysz:** `async/await` w composable, `onMounted`, obsługa błędów HTTP, `AbortController` dla anulowania zapytań, parsowanie JSON.

**📚 Endpoint:** `https://api.open-meteo.com/v1/forecast?latitude=53.43&longitude=14.55&current=temperature_2m,wind_speed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe/Warsaw`

---

### Dzień 4 — Wykresy z Chart.js (2–3 h)
**Cel:** ładne, interaktywne wizualizacje.

- [ ] `npm install chart.js vue-chartjs`
- [ ] Komponent `<DistanceChart>` — bar chart, km dziennie z ostatnich 14 dni
- [ ] Komponent `<MonthlyChart>` — line chart, suma km miesiąc po miesiącu
- [ ] Komponent `<MoodPieChart>` — rozkład samopoczucia (świetnie/ok/zmęczony)
- [ ] Reaktywność: zmiana danych w store → wykres animuje się sam
- [ ] Style Chart.js zgodne z paletą Tailwind (czytaj zmienne CSS przez `getComputedStyle`)

**🧠 Czego się nauczysz:** `watch` i `watchEffect`, wrappery komponentów, przekazywanie reaktywnych propsów do bibliotek zewnętrznych.

---

### Dzień 5 — Mapa Leaflet + rysowanie trasy (2–3 h)
**Cel:** klikasz po mapie, aplikacja liczy długość trasy.

- [ ] `npm install leaflet @vue-leaflet/vue-leaflet`
- [ ] Komponent `<RouteMap>` z mapą OpenStreetMap, centrum: Szczecin
- [ ] Klikanie po mapie dodaje punkty trasy (`L.polyline`)
- [ ] Live obliczanie dystansu (`L.latLng.distanceTo`) — wyświetlane w nagłówku
- [ ] Przycisk „Zapisz jako przejazd" — dodaje do store z geometrią
- [ ] Bonus: przycisk „Wyczyść" + undo ostatniego punktu

**🧠 Czego się nauczysz:** integracja Vue z bibliotekami opartymi na DOM, `template ref`, lifecycle hooks (`onMounted`, `onUnmounted`), praca z geometrią.

---

### Dzień 6 — Animacje, Transitions, polish UI (2–3 h)
**Cel:** aplikacja wygląda i czuje się profesjonalnie.

- [ ] `<Transition>` na modalach (dodawanie przejazdu jako overlay)
- [ ] `<TransitionGroup>` na liście przejazdów — animacja wstawiania/usuwania
- [ ] Animowane liczniki na dashboardzie (counter od 0 do `totalKm`)
- [ ] Skeleton loadery zamiast „Loading..." (Tailwind `animate-pulse`)
- [ ] Toast notifications po zapisie/usunięciu (composable `useToast.js`)
- [ ] Pasek postępu celu miesięcznego (150 km) z animacją wypełnienia
- [ ] Responsywność — sprawdź na 375px, 768px, 1280px

**🧠 Czego się nauczysz:** wbudowane komponenty `<Transition>` i `<TransitionGroup>`, klasy `enter-active-class`, kompozycja animacji Tailwind + Vue.

---

### Dzień 7 — Refaktor, testy manualne, deploy (2–3 h)
**Cel:** projekt na GitHubie + live demo do CV.

- [ ] Code review samego siebie: czy są dziwne `any`? Czy composables są reużywalne?
- [ ] Wyciągnij magic numbers do `constants.js`
- [ ] Pusty stan każdego widoku („Nie masz jeszcze przejazdów — dodaj pierwszy!")
- [ ] `README.md`: opis, screenshoty, stack, instrukcja uruchomienia
- [ ] Eksport danych do JSON (przycisk „Pobierz moje dane")
- [ ] Deploy na [Vercel](https://vercel.com) lub [Netlify](https://www.netlify.com) (free)
- [ ] Push na GitHub z dobrymi commitami

**🧠 Czego się nauczysz:** dobre praktyki czystego kodu, dokumentacja projektu, deploy, podstawy Git workflow.

---

## 🧰 Lista bibliotek (tylko sprawdzone i darmowe)

| Biblioteka | Po co | Dokumentacja |
|---|---|---|
| Vue 3 | Framework | [vuejs.org](https://vuejs.org) |
| Vite | Bundler | [vite.dev](https://vite.dev) |
| Tailwind CSS v4 | Styling | [tailwindcss.com](https://tailwindcss.com) |
| Pinia | State | [pinia.vuejs.org](https://pinia.vuejs.org) |
| pinia-plugin-persistedstate | localStorage | [Pinia Persisted State](https://prazdevs.github.io/pinia-plugin-persistedstate/) |
| Vue Router | Routing | [router.vuejs.org](https://router.vuejs.org) |
| Chart.js + vue-chartjs | Wykresy | [vue-chartjs.org](https://vue-chartjs.org) |
| Leaflet | Mapy | [leafletjs.com](https://leafletjs.com) |
| Open-Meteo | API pogody (bez klucza) | [open-meteo.com](https://open-meteo.com) |

---

## 🏆 Co będziesz umiał po projekcie

✅ Pisać komponenty Vue 3 z Composition API i `<script setup>`
✅ Tworzyć i konsumować composables (logika reużywalna)
✅ Integrować zewnętrzne API z obsługą stanów (loading/error/data)
✅ Zarządzać stanem globalnym przez Pinia + persystencja
✅ Robić ładne animacje z `<Transition>` / `<TransitionGroup>`
✅ Łączyć Vue z bibliotekami DOM-owymi (Leaflet)
✅ Stylować dashboardy w Tailwind (grid, dark mode, responsywność)
✅ Deployować aplikację Vue na produkcję

---

## 💪 Wyzwania bonusowe (jeśli starczy czasu)

1. **PWA** — aplikacja działa offline, instalowalna na telefonie (`vite-plugin-pwa`)
2. **Strava import** — wczytaj GPX z plikiem przez `<input type="file">`
3. **Heatmapa kalendarza** — jak GitHub contributions, ale dla przejazdów
4. **Ranga rowerzysty** — gamifikacja: brąz/srebro/złoto za km
5. **i18n** — wersja PL + FR (przyda się przy Twoim francuskim 🇫🇷)

---

## 📌 Konwencje (warto trzymać od początku)

- **Composables** w `src/composables/` — `useWeather.js`, `useTheme.js`, `useToast.js`
- **Stores** w `src/stores/` — `rides.js`, `settings.js`
- **Komponenty UI** w `src/components/ui/` — `Button.vue`, `Card.vue`, `Modal.vue`
- **Komponenty domenowe** w `src/components/rides/`, `components/weather/`
- **Nazewnictwo:** PascalCase dla komponentów, camelCase dla composables z prefiksem `use`
- **Commity:** `feat:`, `fix:`, `refactor:`, `docs:` (Conventional Commits)

Powodzenia 🚴‍♂️ — to projekt, który realnie wpiszesz do CV i pokażesz na rekrutacji do Sorbonne.
