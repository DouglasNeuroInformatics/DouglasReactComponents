const fs = require('fs');
const path = require('path');

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
      }),
      require('@headlessui/tailwindcss'),
      require('@tailwindcss/container-queries')
    ]
  };
}

module.exports = { createConfig };
