const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [tailwindcss, autoprefixer]
};
