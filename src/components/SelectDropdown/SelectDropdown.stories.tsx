import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SelectDropdown } from './SelectDropdown';

type Story = StoryObj<typeof SelectDropdown>;

export default { component: SelectDropdown } as Meta<typeof SelectDropdown>;

const options = [
  {
    key: 'o1',
    label: 'Option 1'
  },
  {
    key: 'o2',
    label: 'Option 2'
  },
  {
    key: 'o3',
    label: 'Option 3'
  }
];

export const Default: Story = {
  decorators: [
    (Story) => {
      const [selected, setSelected] = useState<typeof options>([]);
      return (
        <Story
          args={{
            title: 'My Select Dropdown',
            options,
            selected,
            setSelected
          }}
        />
      );
    }
  ]
};
