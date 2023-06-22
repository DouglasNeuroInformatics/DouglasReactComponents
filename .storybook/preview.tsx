import React, { useEffect, useState } from 'react';

import type { Preview } from '@storybook/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import './tailwind.css';

const preview: Preview = {
  decorators: [
    (Story) => {
      const [theme, setTheme] = useState<'light' | 'dark'>('light');

      const handleToggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');

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
          <div className="absolute right-0 top-0 z-50 w-fit p-2">
            <button
              className="w-full rounded-full bg-slate-600 p-2 text-white transition-transform hover:bg-slate-500"
              onClick={handleToggle}
            >
              {theme === 'dark' ? <SunIcon height={24} width={24} /> : <MoonIcon height={24} width={24} />}
            </button>
          </div>
          <Story />
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
