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
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1665px',
        '2xl': '1440px', // Example of a custom breakpoint in pixels
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
