import React from 'react';

import { FaceSmileIcon } from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';

import { type Step, Stepper } from './Stepper';

type Story = StoryObj<typeof Stepper>;

export default { component: Stepper } as Meta<typeof Stepper>;

const steps: Step[] = [];
for (let i = 1; i < 4; i++) {
  steps.push({
    label: 'Step ' + i,
    icon: <FaceSmileIcon />,
    element: (
      <div>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem eligendi id sed expedita quia quod velit eaque
          neque saepe ullam voluptas facere, hic atque quibusdam in, quidem rerum voluptatum? Nesciunt.
        </span>
      </div>
    )
  });
}

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <div>
          <Story args={{ steps }} />
        </div>
      );
    }
  ]
};
