const fs = require('fs');
const path = require('path');

const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const distDir = path.resolve(module.path, 'dist');
const srcDir = path.resolve(module.path, 'src');

// When installed from npm, src will not be included
const isDev = fs.existsSync(srcDir);

const baseContentPath = isDev ? path.join(srcDir, '**/*.{js,ts,jsx,tsx}') : path.join(distDir, '**/*.js');

/**
 * @param {Object} [options]
 * @param {string[]} [options.content]
 * @returns {import('tailwindcss').Config}
 */
function createConfig(options) {
  return {
    content: [baseContentPath, ...(options?.content ? options.content : [])],
    darkMode: 'class',
    theme: {
      extend: {
        animation: {
          spinner: 'spinner-spin 1.7s infinite ease, spinner-round 1.7s infinite ease'
        },
        container: {
          center: true,
          padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
            xl: '5rem',
            '2xl': '6rem'
          }
        },
        keyframes: {
          'spinner-round': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
          },
          'spinner-spin': {
            '0%': {
              'box-shadow':
                '0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em'
            },
            '5%, 95%': {
              'box-shadow':
                '0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em'
            },
            '10%, 59%': {
              'box-shadow':
                '0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em'
            },
            '20%': {
              'box-shadow':
                '0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em'
            },
            '38%': {
              'box-shadow':
                '0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em'
            },
            '100%': {
              'box-shadow':
                '0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em'
            }
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
        addUtilities({
          '.bg-light': {
            '@apply bg-slate-100': {}
          },
          '.bg-dark': {
            '@apply bg-slate-900': {}
          }
        });
      }),
      require('@headlessui/tailwindcss'),
      require('@tailwindcss/container-queries')
    ]
  };
}

module.exports = { createConfig };
