/**
 * File: tailwind.config.js
 * Purpose: Tailwind CSS v3.4 configuration for the web app.
 * Notes:
 * - Scans index.html and all files in src/ for class usage.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
