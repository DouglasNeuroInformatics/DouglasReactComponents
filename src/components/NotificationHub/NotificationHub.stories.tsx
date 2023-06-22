import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { useNotificationsStore } from '../../stores/notifications-store';
import { Button } from '../Button';

import { NotificationHub } from './NotificationHub';


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
