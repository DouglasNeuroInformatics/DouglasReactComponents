'use client';

import React from 'react';

import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

import { type NotificationInterface } from '../../stores/notifications-store';

export interface NotificationIconProps {
  type: NotificationInterface['type'];
}

export const NotificationIcon = ({ type }: NotificationIconProps) => {
  switch (type) {
    case 'info':
      return <InformationCircleIcon aria-hidden="true" className="h-6 w-6 text-blue-500" />;
    case 'success':
      return <CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-500" />;
    case 'warning':
      return <ExclamationCircleIcon aria-hidden="true" className="h-6 w-6 text-yellow-500" />;
    case 'error':
      return <XCircleIcon aria-hidden="true" className="h-6 w-6 text-red-500" />;
  }
};
