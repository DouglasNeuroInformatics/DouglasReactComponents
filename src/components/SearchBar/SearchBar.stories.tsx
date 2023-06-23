import type { Meta, StoryObj } from '@storybook/react';

import { SearchBar } from './SearchBar';

type Story = StoryObj<typeof SearchBar>;

export default { component: SearchBar } as Meta<typeof SearchBar>;

export const Default: Story = {
  args: {
    size: 'sm'
  }
};
