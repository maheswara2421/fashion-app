/**
 * File: mobile/stylediscover-expo/babel.config.js
 * Purpose: Babel configuration for Expo SDK 51 project.
 * Notes:
 * - Use only 'babel-preset-expo' for SDK 50+; no 'expo-router/babel' plugin needed.
 * - NativeWind v4 works without a Babel plugin; types added via tsconfig.
 */
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    // Keep additional transform plugins minimal; add only if you hit syntax errors.
    // Reanimated plugin MUST be last:
    'react-native-reanimated/plugin',
  ],
};
