/* eslint-disable no-undef */
// Use ESM to enable ES6 module syntax
require = require('esm')(module);

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // corePlugins: {
  //   preflight: false,
  // },
  // important: '#root',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
