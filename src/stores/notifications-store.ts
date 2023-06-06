'use client';

import { create } from 'zustand';

export interface NotificationInterface {
  id: number;
  type: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  message?: string;
  variant?: 'critical' | 'standard';
}

export interface NotificationsStore {
  notifications: NotificationInterface[];
  addNotification: (notification: Omit<NotificationInterface, 'id'>) => void;
  dismissNotification: (id: number) => void;
}

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, { id: Date.now(), ...notification }]
    })),
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id)
    }))
}));
