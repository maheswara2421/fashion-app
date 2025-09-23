/**
 * File: mobile/stylediscover-expo/tailwind.config.js
 * Purpose: Tailwind CSS config for the Expo (React Native) app using NativeWind.
 * Notes:
 * - Scans app/ and components/ for className usage.
 * - NativeWind plugin injects Tailwind styles for RN components.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("nativewind/tailwind/css")],
};
