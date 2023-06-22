import React, { useEffect } from 'react';

import type { Preview } from '@storybook/react';

import './tailwind.css';

const preview: Preview = {
  decorators: [
    (Story) => {
      useEffect(() => {
        const iFrameRoot = document.querySelector('.sb-show-main')?.parentNode as HTMLElement;
        iFrameRoot.classList.add('light');
      }, []);

      return (
        <>
          <div>
            <button
              onClick={() => {
                const iFrameRoot = document.querySelector('.sb-show-main')?.parentNode as HTMLElement;
                if (!iFrameRoot) {
                  throw new Error('Failed to resolve root HTML element in iFrame');
                } else if (iFrameRoot.classList.contains('dark')) {
                  iFrameRoot.classList.replace('dark', 'light');
                } else {
                  iFrameRoot.classList.replace('light', 'dark');
                }
              }}
            >
              Dark
            </button>
          </div>
          <Story />
        </>
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
