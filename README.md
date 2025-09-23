# StyleDiscover Monorepo (Web + Mobile)

This repository contains both the web SPA (Vite + React) and the mobile app (Expo + React Native). It is organized for shared data/types, consistent UX, and a smooth developer workflow.

## 📌 Project Overview
- **Goal:** Cross-platform fashion discovery with fast search, smooth image viewing, and preference-based feeds.
- **Apps:**
  - `Web` — Vite + React SPA with Tailwind and a modern fullscreen image viewer.
  - `Mobile` — Expo + React Native app with Reanimated and Gesture Handler; custom fullscreen image viewer.

## 🧱 Repository Structure
- `src/` — Web app source (Vite + React)
- `mobile/stylediscover-expo/` — Expo mobile app (React Native + Expo Router)
- `packages/shared/` — Workspace with shared types and build output for reuse

## 🚀 Versions at a Glance
- **Web (SPA)**
  - React: `18.2.0`
  - Vite: `^7.1.7`
  - TypeScript: `^5.5.3`
  - Tailwind CSS: `^3.4.x`
- **Mobile (Expo)**
  - Expo SDK: `~51.0.17`
  - React Native: `0.74.5`
  - React: `18.2.0`
  - Reanimated: `~3.10.1`
  - RNGestureHandler: `~2.16.1`
  - Expo Router: `~3.5.16`

## ⚙️ Quickstart
- **Web**
  - From repo root:
    - `npm ci`
    - `npm run dev` (Vite on http://localhost:5173)
- **Mobile**
  - From `mobile/stylediscover-expo/`:
    - Windows PowerShell:
      - `Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue`
      - `Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue`
      - `npm install`
      - `npx expo start -c`

## 📌 Key Notes
- **Shared data/types:** Mobile imports datasets and types under `mobile/stylediscover-expo/src/shared/` (synced from web). Long term, use the `packages/shared/` workspace as the single source.
- **Reanimated setup:** `mobile/stylediscover-expo/babel.config.js` includes `'react-native-reanimated/plugin'` (must be last). The app is wrapped in `GestureHandlerRootView`.
- **Image viewer:** Mobile uses a custom, dependency-free `CustomImageViewer` with paging, pinch-to-zoom, double-tap zoom, pan, captions, zoom indicator, and swipe-down to close.

---

## Web app (Vite) details

A modern fashion discovery SPA built with Vite, React 18, and TypeScript. It includes a full-screen product image viewer with gestures, thumbnails, and controls for a premium UX.

## Features

- Full-screen image viewer
  - Tap/click any product image to open
  - Swipe left/right to navigate (mobile), or use chevrons/arrow keys
  - Pinch-to-zoom, double-tap to zoom, drag-to-pan
  - Swipe-down to close, press ESC, X button, or tap backdrop (when unzoomed)
  - Zoom percent indicator and image counter
  - Product info overlay
  - Thumbnails strip (when product has multiple images)
  - Share (Web Share API + clipboard fallback) and Download
  - Open image in new tab
- Search and filters with Tailwind UI
- Large mock dataset with multiple categories and sample multi-image galleries

## Tech Stack

- Vite 7 (bundler) + React 18.3 + TypeScript 5.5
- Tailwind CSS (configured) + Lucide React icons
- Nginx (for production static hosting)
- Docker and Docker Compose (virtualized dev and prod)
- Expo + React Native + React Native Web (hybrid app under `mobile/stylediscover-expo/`)

## Versions Matrix

The following reflects the currently installed versions in this repo. Use these when opening issues or syncing environments.

- **Web (Vite app)**
  - Vite: `^7.1.7`
  - React: `^18.3.1`
  - React DOM: `^18.3.1`
  - TypeScript: `^5.5.3`
  - Tailwind CSS: `^3.4.1`
  - PostCSS: `^8.4.35`
  - Autoprefixer: `^10.4.18`
  - @supabase/supabase-js: `^2.57.4`
  - ESLint: `^9.9.1` (+ typescript-eslint)

- **Mobile (Expo app at `mobile/stylediscover-expo/`)**
  - Expo SDK: `~51.0.17`
  - React Native: `0.74.5`
  - React / React DOM: `18.2.0`
  - Expo Router: `~3.5.16`
  - NativeWind: `^4.0.36`
  - Reanimated: `~3.10.1`
  - RNGestureHandler: `~2.16.1`
  - RNScreens: `3.31.1`
  - RN Web: `~0.19.10`
  - @supabase/supabase-js: `^2.57.4` (aligned with web)

## Compatibility Notes and Known Fixes

- **Supabase SDK alignment**
  - Web and Mobile now both use `@supabase/supabase-js@^2.57.4` to avoid subtle API mismatches.
  - If you previously installed in the mobile app, run `npm install` again inside `mobile/stylediscover-expo/` after pulling these changes.

- **Node and ESLint requirements**
  - Vite 7 and ESLint 9 require Node.js 18+. Use Node 20 LTS for the smoothest experience.

- **TypeScript versions**
  - Web uses TypeScript `^5.5.3`; Expo project uses `~5.3.x` which is compatible with SDK 51. Keeping them separate avoids breaking Expo tooling.

- **Expo SDK 51 + RN 0.74**
  - Current versions are compatible by design. If you upgrade Expo, check the official RN compatibility matrix.

## Project Structure

- `index.html` — Vite entry
- `src/`
  - `main.tsx`, `App.tsx`
  - `components/`
    - `HomePage.tsx` — grid, search, filters, and launches the viewer
    - `ImageViewer.tsx` — full-screen viewer with gestures and controls
    - `StyleQuiz.tsx`
  - `data/`
    - `outfits.ts` — large mock dataset; some items enriched with `images: string[]`
  - `types.ts` — TypeScript interfaces (including optional `Outfit.images?: string[]`)
- `vite.config.ts` — dev server bound to `0.0.0.0` for containers
- `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `.dockerignore`
 - `mobile/stylediscover-expo/` — Expo app (React Native + Web)
   - `app/` — Expo Router pages (e.g., `app/index.tsx` for Home)
   - `src/shared/` — shared `types.ts` and `outfits.ts` copied for RN use
   - `tailwind.config.js`, `babel.config.js`, `tsconfig.json` configured for NativeWind + Reanimated
   - Run on iOS/Android/Web via Expo

## Prerequisites

- Node.js 18+ (Node 20 LTS recommended)
- npm 9+ (or use `corepack` + `pnpm` if you prefer)
- Docker Desktop (optional, for containerized dev/prod)

## Local Development

```bash
# install dependencies
npm ci

# start dev server on http://localhost:5173
npm run dev

# lint and type check (optional)
npm run lint
# Vite/TS type checks run via editor; for CI type check you can do (optional):
# npx tsc --noEmit
```

If the editor shows transient TypeScript errors like “Cannot find module 'react/jsx-runtime'”:
- Ensure `node_modules/` exists and `npm ci` completed successfully.
- Restart your IDE’s TypeScript server.
- Delete `node_modules` and run `npm ci` again.

## Run in a Virtual Environment (Docker)

You can run both dev and prod in containers using Docker Compose.

### Dev in Docker (hot reload)

```bash
# build the dev image and start vite on 0.0.0.0:5173 (hot reload)
docker compose up --build web-dev
# then open http://localhost:5173
```

This mounts your working directory into the container and preserves `node_modules` inside the container.

### Prod in Docker (Nginx static server)

```bash
# build and run the production image serving the built app on port 8080
docker compose up --build web-prod
# then open http://localhost:8080
```

## Production Build

```bash
# create production build into ./dist
npm run build

# preview the production build locally (serves dist/)
npm run preview  # http://localhost:5173 by default
```

## Deployment Options

- Static hosting (Netlify, Vercel, Cloudflare Pages, GitHub Pages)
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Framework: Vite + React
- Dockerized deployment
  - Use `Dockerfile` multi-stage build; run container exposing port 80
  - Example: `docker build -t stylediscover:prod . && docker run -p 8080:80 stylediscover:prod`
- Nginx on your own server
  - `npm run build`
  - Copy `dist/` to `/usr/share/nginx/html`
  - Use `nginx.conf` (history fallback to `index.html` for SPA)

## Environment Variables

Web app currently uses only a mock dataset and does not rely on external secrets. If you later add APIs, create an `.env` and use `import.meta.env` with Vite. For Docker, pass env vars via `docker-compose.yml` or `docker run -e`.

### Expo (Mobile) security note

- The Expo app (`mobile/stylediscover-expo/app.json`) currently contains Supabase credentials in `expo.extra` for convenience in development. This is not recommended for production.
- Recommended: switch to `app.config.js` and read from environment variables so secrets are not committed to source control.

Example `mobile/stylediscover-expo/app.config.js` (do not commit real secrets):

```js
// app.config.js
export default ({ config }) => ({
  ...config,
  extra: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
});
```

Then use `expo-constants` to access values:

```ts
import Constants from 'expo-constants';

const { SUPABASE_URL, SUPABASE_ANON_KEY } = Constants.expoConfig?.extra ?? {};
```

Populate values via `.env` or your CI/CD secret manager and `EXPO_PUBLIC_*` if you need them at build time.

## QA and Bug Checks

- Visual test the viewer:
  - Click image to open, double-tap to zoom, pinch on mobile, drag to pan
  - Swipe left/right to move between results, swipe down to close
  - Use ESC and arrow keys; “?” toggles help overlay
  - Thumbnails should appear for items with `images: string[]`
- Lint and type check:
  - `npm run lint` and verify your editor shows no TypeScript errors after `npm ci`
- Build and preview:
  - `npm run build && npm run preview`

## Removing Bolt Files

You asked to remove the `.bolt/` directory. A safe command is prepared and needs your approval to run from the IDE automation. Alternatively, you can manually delete it:

```powershell
# Windows PowerShell
Remove-Item -LiteralPath ".bolt" -Recurse -Force
```

```bash
# macOS/Linux
rm -rf .bolt
```

## Troubleshooting

- Dev server not accessible inside Docker: ensure port `5173` is free and Docker binding is set. We set `server.host=true` and `strictPort=true` in `vite.config.ts`.
- TypeScript cannot find React types: verify `@types/react`, `@types/react-dom` and `typescript` are installed (they are in `devDependencies`). Try `npm ci` and IDE restart.
- Icons missing: ensure `lucide-react` is installed (already in `dependencies`).

## License

MIT

---

# React Native + Web (Expo) Hybrid App

This repo also contains a React Native + React Native Web app scaffolded with Expo, so you can run a native app on iOS/Android with largely shared UI patterns and data.

Location: `mobile/stylediscover-expo/`

## What’s included

- **Expo + Expo Router** starter layout (`app/_layout.tsx`, `app/index.tsx`)
- **NativeWind** configured (Tailwind-like styling for RN & Web)
- **Reanimated** and **Gesture Handler** pre-configured
- **lucide-react-native** icons
- **Image viewer** via `react-native-image-viewing` (basic full-screen viewer)
- **Shared data and types** in `src/shared/` (copied from the web app so you can later centralize via a workspace if you wish)

## Run the Expo app

From the project root:

```
cd mobile/stylediscover-expo
npm install
npx expo start
```

Then choose a platform:

- Press `w` to open Web in the browser (React Native Web)
- Scan the QR code with Expo Go on iOS/Android
- Or run platform builds:
  - `npm run ios`
  - `npm run android`
  - `npm run web`

## Notes

- Styling uses `className` props via NativeWind in RN components (e.g., `View`, `Text`) similar to Tailwind in the web app.
- The home screen (`app/index.tsx`) lists outfits from the shared dataset and opens a basic full-screen image viewer.
- You can progressively port complex web-only features (e.g., the custom image gestures) to RN equivalents using `react-native-gesture-handler` + `react-native-reanimated`.

## Expo Entry Configuration (Fix for "Cannot find ../../App")

Projects using Expo Router do not require a root `App.js`/`App.tsx`. Instead, the router provides an entry file and discovers routes from the `app/` directory.

- We configured the Expo app at `mobile/stylediscover-expo/` to use the router entry by setting `package.json`:

```json
{
  "main": "expo-router/entry"
}
```

- Babel config for Expo SDK 50+ should only use the Expo preset (the `expo-router/babel` plugin is deprecated):

```js
// mobile/stylediscover-expo/babel.config.js
module.exports = {
  presets: ['babel-preset-expo'],
};
```

With this setup:
- You should NOT edit `node_modules/expo/AppEntry.js`.
- You do NOT need `App.js` at the repository root.
- Routes are file-based under `mobile/stylediscover-expo/app/` (e.g., `_layout.tsx`, `index.tsx`).

If you previously saw an error about `import App from '../../App'` inside `AppEntry.js`, switching to the router entry resolves it. For SDK 50+, ensure your Babel config matches the snippet above (no `expo-router/babel` plugin).

## Deep Linking

We configured a custom URL scheme for the Expo app so it can handle deep links in production builds.

- Config file: `mobile/stylediscover-expo/app.json`
  - `"scheme": "stylediscover"`

### Test the scheme

- Android emulator (Windows PowerShell):

```powershell
adb shell am start -a android.intent.action.VIEW -d "stylediscover://"
```

- iOS Simulator (macOS):

```bash
xcrun simctl openurl booted "stylediscover://"
```

For universal/app links (https-based), additional Android/iOS configuration is needed (intent filters/associated domains). Not required for custom-scheme links.

## Future goals

- Migrate more of your web UI/logic into shared modules to avoid duplication.
- Replace the image viewer library with a custom gesture-based viewer that matches the web app exactly.
- Introduce a monorepo workspace (pnpm or npm workspaces) to share code between web and native cleanly.