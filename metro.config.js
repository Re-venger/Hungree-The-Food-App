// metro.config.js
const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require("nativewind/dist/metro/index.js"); // correct require for NativeWind

// Load the default Expo Metro config
const defaultConfig = getDefaultConfig(__dirname);

// Apply NativeWind configuration
const config = withNativeWind(defaultConfig, {
  input: "./app/globals.css", // your Tailwind globals
});

module.exports = config;