/*
 * File: src/main.tsx
 * Purpose: Web app entry rendered by Vite 7. Mounts React 18 root and loads global styles.
 * Notes:
 * - Uses React 18's createRoot API.
 * - Imports App from src/App.tsx.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
