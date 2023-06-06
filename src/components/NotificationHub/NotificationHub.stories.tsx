import React from 'react';

import { Button } from '../Button';
import type { Meta, StoryObj } from '@storybook/react';

import { NotificationHub } from './NotificationHub';

import { useNotificationsStore } from '../../stores/notifications-store';

type Story = StoryObj<typeof NotificationHub>;

export default {
  component: NotificationHub,
  decorators: [
    (Story) => {
      const notifications = useNotificationsStore();
      return (
        <div className="border">
          <Story />
          <Button
            label="Add Notification"
            type="button"
            onClick={() => {
              notifications.addNotification({
                type: 'info',
                message: `Notification ${notifications.notifications.length}`
              });
            }}
          />
        </div>
      );
    }
  ]
} as Meta<typeof NotificationHub>;

export const Default: Story = {
  args: {
    timeout: 100000
  }
};
