import React from 'react';

import { randomInt, range } from '@douglasneuroinformatics/utils';
import type { Meta, StoryObj } from '@storybook/react';

import { Table, TableColumn } from './Table';

type ExampleItem = {
  id: string;
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  c5: number;
  c6: number;
  c7: number;
  c8: number;
  c9: number;
  c10: number;
  c11: number;
  c12: number;
  c13: number;
  c14: number;
  c15: number;
};

const columns: TableColumn<ExampleItem>[] = [
  {
    label: 'ID',
    field: 'id'
  }
];

for (let i = 1; i < 16; i++) {
  columns.push({
    field: `c${i}` as keyof ExampleItem,
    label: `Column ${i}`
  });
}

const data: ExampleItem[] = range(25).map((i) => {
  const item: Record<string, any> = { id: i };
  for (let i = 1; i < 16; i++) {
    item[`c${i}`] = randomInt(1, 10);
  }
  return item as ExampleItem;
});

export default {
  component: Table,
  decorators: [
    (Story) => (
      <div className="h-full w-full p-12">
        <Story />
      </div>
    )
  ]
} as Meta<typeof Table>;

export const Default: StoryObj<typeof Table<ExampleItem>> = {
  args: {
    columns,
    data
  }
};
