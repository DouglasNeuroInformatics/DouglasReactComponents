import React from 'react';

import type { Preview } from '@storybook/react';

import './tailwind.css';

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <>
          <div>
            <button
              onClick={() => {
                const iFrameRoot = document.querySelector('.sb-show-main')?.parentNode as HTMLElement;
                if (!iFrameRoot) {
                  throw new Error('Failed to resolve root HTML element in iFrame');
                }
                iFrameRoot.classList.toggle('dark');
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
    backgrounds: {
      default: 'light'
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
