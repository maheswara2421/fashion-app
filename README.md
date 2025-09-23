 # Fashion App
 
 A modern fashion/style web app built with Vite, React, and TypeScript. It includes a large mock catalog, a style quiz, and Dockerized flows for development and production.
 
 ## Tech Stack
 - Vite 7
 - React 18
 - TypeScript 5
 - Tailwind CSS
 - Docker + docker-compose for dev/prod
 
 ## Project Structure (high level)
 - `index.html` — Vite HTML entry that loads `src/main.tsx` and mounts `#root`.
 - `src/` — App source code
   - `src/types.ts` — Shared TypeScript interfaces
   - `src/data/outfits.ts` — Large mock dataset of outfits (1000+ items)
   - `src/data/quiz.ts` — Questions and style result data for the style quiz
 - `docker-compose.yml` — Dev server and production (nginx) service definitions
 - `Dockerfile` — Multi-stage build for builder/prod images
 
 ## Getting Started (Local)
 1. Install dependencies
    ```bash
    npm install
    ```
 2. Start the dev server
    ```bash
    npm run dev
    ```
    Vite will start on http://localhost:5173
 
 ## Using Docker
 - Development (hot reload):
   ```bash
   docker compose up web-dev
   ```
   Then open http://localhost:5173
 
 - Production build served by nginx (static):
   ```bash
   docker compose up --build web-prod
   ```
   Then open http://localhost:8080
 
 Notes:
 - `web-dev` mounts the source and runs `npm run dev -- --host`.
 - `web-prod` builds static assets via the builder stage and serves them with nginx.
 
 ## Scripts (common)
 - `npm run dev` — Start Vite dev server
 - `npm run build` — Build production assets
 - `npm run preview` — Preview built assets locally
 
 ## Data
 - Outfit data: `src/data/outfits.ts`
 - Quiz data: `src/data/quiz.ts`
 - Types: `src/types.ts`
 
 ## Contributing
 1. Create a feature branch
 2. Commit changes with clear messages
 3. Open a PR
 
 ## License
 MIT (or project-specific; update if different)
 
