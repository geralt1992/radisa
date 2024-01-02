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
    extend: {
      screens: {
        'sm': '140px',
        'md': '640px',
        'lg': '1024px',
        '2xl': '1440px', // Example of a custom breakpoint in pixels
        'xl': '1665px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
