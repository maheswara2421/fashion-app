# 🧵 StyleDiscover Expo

A cross-platform fashion discovery app built with Expo and React Native. It focuses on a polished mobile experience with smooth animations, modular architecture, and clean UI/UX.

---

## 📌 Project Overview
- **Goal:** Build a cross-platform fashion discovery app using Expo and React Native, optimized for performance, scalability, and developer experience.
- **Outcome:** A polished mobile experience with smooth animations, modular architecture, and clean UI/UX.

---

## 🚀 Tech Stack & Versions
| Technology | Version | Why We Chose It |
|---|---:|---|
| React Native | 0.74.5 | Core mobile framework with native performance and wide community support |
| Expo SDK | ~51.0.17 | Simplifies development, testing, and deployment across platforms |
| Expo Router | ~3.5.16 | File-based routing with great DX in Expo projects |
| Reanimated | ~3.10.1 | Enables performant animations and gesture handling |
| RNGH (react-native-gesture-handler) | ~2.16.1 | Low-latency gesture recognition for mobile |
| React | 18.2.0 | Stable, widely adopted React runtime |
| TypeScript | ~5.3.3 | Type safety and excellent tooling |
| Babel (preset: expo) | latest in SDK 51 | Transpilation and plugin support for modern JS features |

Notes:
- We previously used `react-native-image-viewing`. It has been removed in favor of a custom, dependency-free fullscreen viewer (`CustomImageViewer`) to avoid third‑party regressions.
- To update exact versions locally, run:
  - `npm list --depth=0`
  - `npx expo-doctor`

---

## 🧱 Architecture
- **Monorepo layout:** The repository includes a `packages/shared/` workspace used by web and mobile.
- **Modular folders:** Screens, components, shared state, and assets are organized for clarity and scale.
- **Custom hooks:** Co-locate logic where used; lift to hooks as patterns emerge.
- **Centralized styles:** NativeWind utility classes for consistency and speed.

Directory highlights (mobile):
- `app/_layout.tsx` — Root layout; wraps app in `GestureHandlerRootView` and `SafeAreaProvider` and renders router stack.
- `app/index.tsx` — Home screen (grid feed, search, cart, favorites) + fullscreen image viewer.
- `app/feed/index.tsx` — For You feed cards (simplified navigation).
- `app/quiz/index.tsx` — Multi-step style preferences quiz.
- `src/components/CustomImageViewer.tsx` — Modal-based fullscreen viewer with paging, pinch-to-zoom, double-tap zoom, pan, swipe-down to close, captions, and zoom indicator.
- `src/state/AppState.tsx` — Global app state (quiz preferences, favorites, cart) via Context.
- `src/shared/` — Dataset (`outfits`) and shared types reused across screens.

---

## 🧪 Setup Instructions (Windows PowerShell)
From the mobile app folder: `mobile/stylediscover-expo/`

```powershell
# Clean install
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install

# Start Expo with cache reset
npx expo start -c

# Sanity checks
npx expo-doctor
npm ls react-native-reanimated
npm ls react-native-gesture-handler
```

If you previously used the third-party image viewer, ensure it is uninstalled:
```powershell
npm uninstall react-native-image-viewing
```

---

## ⚙️ Configuration
- `babel.config.js`
  ```js
  module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
      // Reanimated plugin MUST be last
      'react-native-reanimated/plugin',
    ],
  };
  ```
- Root gestures wrapper
  - File: `app/_layout.tsx`
  - Wraps the app with `GestureHandlerRootView` and `SafeAreaProvider` to enable gestures.

---

## 🧗 Obstacles & How We Overcame Them
- **Deprecated packages noise**
  - Issue: Flood of warnings during `npm install` from transitive dependencies.
  - Fix: Used `npm audit fix` and `npm dedupe` when safe. Avoided risky overrides unless necessary.

- **Reanimated plugin missing**
  - Issue: Animations not working / runtime errors.
  - Fix: Added `'react-native-reanimated/plugin'` to `babel.config.js` and restarted Metro with cache reset.

- **Image viewer build regression**
  - Issue: `react-native-image-viewing` referenced a missing file in some builds (broken import).
  - Fix: Replaced entirely with `CustomImageViewer` (no external dependency), featuring paging, pinch/pan, double-tap zoom, swipe-down to close, captions, and zoom indicator.

---

## 🧩 Features Implemented
- **Image discovery:** Grid feed with search, cart, and favorites.
- **Fullscreen viewer:** Paging, pinch-to-zoom, double-tap zoom, pan, swipe-down to close, captions, and zoom indicator.
- **Quiz:** Multi-step style preferences with large, accessible controls.
- **Animations:** Smooth transitions using Reanimated and RNGH.
- **Consistent styling:** NativeWind utility classes and shared patterns.

---

## 📚 Documentation & Guides
- **Setup guide** for new developers (see Setup Instructions above)
- **Troubleshooting** common Expo issues (`npx expo-doctor`, cache reset)
- **Reanimated integration** checklist (Babel plugin ordering, cache reset)

---

## 🌱 Future Plans
- Backend integration (Supabase available in deps; wire wishlist/orders/profile)
- Authentication (email OTP or OAuth via Supabase)
- Expanded filters (price, brand, more categories)
- Onboarding polish and a11y audit (screen reader labels, focus order)
- Snapshot tests for critical UI flows

---

## 🗂️ File-by-File Breakdown (mobile)
| File / Folder | Purpose |
|---|---|
| `app/_layout.tsx` | Root layout with gesture and safe area providers, renders the router stack |
| `app/index.tsx` | Home screen with grid feed, search, cart/favorites, and fullscreen viewer |
| `app/feed/index.tsx` | For You feed cards and details modal |
| `app/quiz/index.tsx` | Multi-step style preferences quiz (categories, styles, seasons, occasions, colors) |
| `src/components/CustomImageViewer.tsx` | Modal viewer: paging, pinch/pan, double-tap zoom, swipe-down to close, captions, zoom indicator |
| `src/state/AppState.tsx` | Global state for quiz, favorites, and cart |
| `src/shared/` | Outfits dataset and TypeScript types shared across screens |
| `.expo/` | Expo-specific cache/config (auto-generated) |
| `babel.config.js` | Babel preset and Reanimated plugin configuration |
| `package.json` | Dependencies, scripts, and metadata |
| `tsconfig.json` | TypeScript config |

---

## 🧰 Useful Commands
```powershell
# From mobile/stylediscover-expo
npm install                 # Install deps
npx expo start -c           # Start with cache clear
npx expo-doctor             # Project health checks
npm dedupe                 # De-duplicate packages when safe
npm audit fix              # Auto-fix known vulnerabilities
```

---

## 🤝 Contributing
- Please open an issue for bugs or feature requests.
- We can add a `CONTRIBUTING.md` and GitHub Actions CI/CD workflow upon request.

---

## 📄 License
- This project can be licensed based on your preference. Add a `LICENSE` file (MIT, Apache-2.0, etc.) if you plan to open-source it.
