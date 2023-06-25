import React, { useEffect, useState } from 'react';

import type { Preview } from '@storybook/react';
import { LanguageIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import './tailwind.css';
import i18n from '../src/services/i18n';

const preview: Preview = {
  decorators: [
    (Story) => {
      const [theme, setTheme] = useState<'light' | 'dark'>('light');

      const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

      const toggleLanguage = () => i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'fr' : 'en');

      useEffect(() => {
        const iFrameRoot = document.querySelector('.sb-show-main')?.parentNode as HTMLElement;
        if (theme === 'dark') {
          iFrameRoot.classList.add('dark');
        } else {
          iFrameRoot.classList.remove('dark');
        }
      }, [theme]);

      return (
        <div className="h-screen w-screen">
          <div className="right-6 absolute top-0 z-50 flex w-fit gap-2 py-2">
            <button
              className="w-full rounded-full bg-slate-600 p-2 text-white transition-transform hover:bg-slate-500"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon height={24} width={24} />}
            </button>
            <button
              className="w-full rounded-full bg-slate-600 p-2 text-white transition-transform hover:bg-slate-500"
              onClick={toggleLanguage}
            >
              <LanguageIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="h-full w-full p-6 pt-14">
            <Story />
          </div>
        </div>
      );
    }
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    layout: 'fullscreen'
  }
};

export default preview;
