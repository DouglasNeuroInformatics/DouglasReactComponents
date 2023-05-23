import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { LineGraph } from './LineGraph';

type GraphData = ReadonlyArray<{
  time: number;
  m1: number;
  sd1: number;
  m2: number;
  sd2: number;
}>;

type Story = StoryObj<typeof LineGraph<GraphData>>;

export default {
  component: LineGraph,
  decorators: [
    (Story) => (
      <div className="container flex justify-center">
        <div style={{ width: 600 }}>
          <Story />
        </div>
      </div>
    )
  ]
} as Meta<typeof LineGraph>;

export const Default: Story = {
  args: {
    data: [
      {
        time: new Date(2000, 0, 1).getTime(),
        m1: 1000,
        sd1: 100,
        m2: 550,
        sd2: 100
      },
      {
        time: new Date(2000, 1, 1).getTime(),
        m1: 1500,
        sd1: 100,
        m2: 600,
        sd2: 100
      },
      {
        time: new Date(2000, 2, 1).getTime(),
        m1: 1200,
        sd1: 100,
        m2: 500,
        sd2: 100
      },
      {
        time: new Date(2000, 3, 1).getTime(),
        m1: 1800,
        sd1: 100,
        m2: 450,
        sd2: 100
      }
    ],
    lines: [
      {
        name: 'Mean 1',
        val: 'm1',
        err: 'sd1'
      },
      {
        name: 'Mean 2',
        val: 'm2',
        err: 'sd2'
      }
    ],
    xAxis: {
      key: 'time',
      label: 'Month'
    }
  }
};
