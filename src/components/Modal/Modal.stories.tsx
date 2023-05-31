import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';

import { Modal } from './Modal';

type Story = StoryObj<typeof Modal>;

export default {
  component: Modal,
  args: {
    open: true,
    title: 'Terms and Conditions',
    onClose: () => alert('Close!')
  }
} as Meta<typeof Modal>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div className="mt-2">
          <p className="text-sm text-gray-500">Please indicate whether you accept our terms and conditions</p>
        </div>

        <div className="mt-4 flex">
          <Button className="mr-2" label="Accept" variant="primary" />
          <Button label="Decline" variant="secondary" />
        </div>
      </>
    )
  }
};
