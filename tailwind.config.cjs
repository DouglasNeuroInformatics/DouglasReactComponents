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
    plugin(({ addBase, addComponents, addUtilities, theme }) => {
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
        '.btn': {
          alignItems: 'center',
          borderRadius: theme('borderRadius.md'),
          boxShadow: theme('boxShadow.md'),
          display: 'flex',
          fontWeight: theme('fontWeight.md'),
          justifyContent: 'center',
          '&:disabled': {
            cursor: 'not-allowed',
            opacity: '0.7'
          },
          '&:focus': {
            outline: '0'
          }
        },
        '.btn-primary': {
          backgroundColor: theme('colors.slate.900'),
          color: theme('colors.slate.100'),
          '&:hover': {
            backgroundColor: theme('colors.slate.800')
          },
          '&:dark': {
            backgroundColor: theme('colors.slate.100'),
            color: theme('colors.slate.900')
          }
        },
        '.btn-secondary': {
          backgroundColor: 'inherit',
          borderWidth: '1px'
        },
        '.btn-danger': {
          backgroundColor: theme('colors.red.500'),
          color: 'white',
          '&:hover': {
            backgroundColor: theme('colors.red.600')
          }
        },
        '.field-input-base': {
          '@apply w-full bg-transparent py-2 text-left text-slate-900 hover:border-slate-300 focus:border-indigo-800 focus:outline-none':
            {},
          minHeight: '42px'
        },
        '.field-header': {
          '@apply font-medium text-slate-600': {}
        },
        '.field-input': {
          '@apply field-input-base border-b-2': {}
        },
        '.field-label': {
          '@apply pointer-events-none text-slate-600': {}
        },
        '.field-label-floating': {
          '@apply field-label absolute left-0 transition-all': {}
        },
        '.field-label-floating--active': {
          '@apply -translate-y-5 text-sm text-indigo-800': {}
        }
      });
    }),
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/container-queries')
  ]
};
