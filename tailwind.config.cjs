const path = require('path');

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [path.join(module.path, 'src', '**/*.{js,ts,jsx,tsx}'), './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.btn': {
          '@apply flex w-fit items-center justify-center rounded-md font-medium shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-70':
            {}
        },
        '.btn-dark': {
          '@apply bg-slate-800 text-white hover:bg-slate-700': {}
        },
        '.btn-light': {
          '@apply border bg-slate-50 hover:bg-slate-100': {}
        },
        '.btn-red': {
          '@apply bg-red-600 hover:bg-red-500 text-white': {}
        }
      });
    })
  ]
};
