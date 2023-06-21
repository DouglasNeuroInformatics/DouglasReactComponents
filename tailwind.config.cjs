// @ts-check

const fs = require('fs');
const path = require('path');

const plugin = require('tailwindcss/plugin');

// @ts-expect-error
const distDir = path.resolve(module.path, 'dist');
// @ts-expect-error
const srcDir = path.resolve(module.path, 'src');

// When installed from npm, src will not be included
const isDev = fs.existsSync(srcDir);

const baseContentPath = isDev ? path.join(srcDir, '**/*.{js,ts,jsx,tsx}') : path.join(distDir, '**/*.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [baseContentPath],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem'
        }
      }
    }
  },
  plugins: [
    plugin(({ addBase, addComponents, theme }) => {
      addBase({
        'html.dark': {
          backgroundColor: theme('colors.slate.900'),
          color: theme('colors.slate.100')
        },
        'html.light': {
          backgroundColor: theme('colors.slate.100'),
          color: theme('colors.slate.900')
        }
      });
      addComponents({
        '.field-input-base': {
          '@apply w-full bg-transparent py-2 text-left hover:border-slate-300 dark:hover:border-slate-400 focus:border-sky-800 dark:focus:border-sky-500 focus:outline-none':
            {},
          minHeight: '42px'
        },
        '.field-input': {
          '@apply field-input-base border-b-2 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-500':
            {}
        },
        '.field-label': {
          '@apply first-letter:capitalize pointer-events-none text-slate-600 dark:text-slate-300': {}
        },
        '.field-label-floating': {
          '@apply field-label absolute left-0 transition-all': {}
        },
        '.field-label-floating--active': {
          '@apply -translate-y-5 text-sm text-sky-800 dark:text-sky-500': {}
        }
      });
    }),
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/container-queries')
  ]
};
