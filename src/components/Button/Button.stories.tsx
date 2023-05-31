import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

type Story = StoryObj<typeof Button>;

export default { component: Button } as Meta<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary'
  }
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger'
  }
};
