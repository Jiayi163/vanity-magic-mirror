# Vanity Magic Mirror

A desktop AI magic mirror for personal use, built phase by phase.

The mirror is a **display**. It has no touch input. Calendar and settings are managed from a **phone companion app** at `/control`.

## Design Principles

| Surface | Role |
|---------|------|
| Mirror | Read-only dashboard: clock, weather, calendar, briefing |
| Phone app (`/control`) | Manage calendar, toggle makeup mode |
| Voice (optional) | Hands-free shortcuts while standing at the mirror |

## Tech Stack

- React + Vite
- Express sync server (local network)

## Project Structure

```text
server/           # Sync API for mirror ↔ phone
src/
  components/     # UI components
  hooks/          # Custom React hooks
  services/       # API clients
  styles/         # Global and shared styles
```

## Getting Started

```bash
npm install
npm run dev
```

This starts:

- Mirror UI: http://localhost:5173/
- Phone control: http://localhost:5173/control
- Sync API: http://localhost:3001/api

On your phone (same Wi‑Fi), open `http://<your-computer-ip>:5173/control`.

## Pairing

1. Open the mirror in the browser (`/`)
2. Check the dev panel at the bottom for the **6-digit pairing code**
3. On your phone, open `/control` and enter the code
4. Control makeup mode and calendar events from the phone

## Mirror Layout

- **Clock** — centered in the upper-middle of the screen
- **Weather** — top-left placeholder (live data in Phase 8)
- **Calendar** — bottom-left, synced from phone
- **Makeup mode** — white border light around the frame; screen stays dark

## Completed Phases

| Phase | Goal | Status |
|-------|------|--------|
| 0 | Project setup | Complete |
| 1 | Mirror dashboard UI | Complete |
| 3 | Makeup mode | Complete |
| 4 | Mirror read-only UI | Complete |
| 5 | Phone companion app + sync | Complete |

## Development Phases

| Phase | Goal | Status |
|-------|------|--------|
| 6 | Voice control | Not started |
| 7 | Presence detection | Not started |
| 8 | Calendar & weather integration | Not started |
| 9 | AI briefing | Not started |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start sync server + mirror UI |
| `npm run dev:client` | Vite only |
| `npm run dev:server` | Sync API only |
| `npm run build` | Build mirror UI for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Production Notes

Run the sync server alongside the built mirror UI:

```bash
npm run build
npm run dev:server
npm run preview
```

Both the mirror and phone must reach the same sync server on your local network.
