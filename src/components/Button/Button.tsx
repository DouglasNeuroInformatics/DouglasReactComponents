'use client';

import React, { ForwardedRef } from 'react';

import { clsx } from 'clsx';

export interface ButtonProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  disabled?: boolean;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = React.forwardRef(function Button(
  { disabled, className, icon, label, iconPosition = 'left', size = 'md', variant = 'primary', ...props }: ButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      className={clsx(
        'flex items-center justify-center rounded-md font-medium shadow-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-70',
        {
          'px-4 py-2 text-sm': size === 'sm',
          'text-md px-6 py-2': size === 'md',
          'px-8 py-3 text-lg': size === 'lg',
          ' bg-slate-800 text-slate-100 hover:bg-slate-700 dark:bg-sky-700 dark:hover:bg-sky-600':
            variant === 'primary',
          'border bg-inherit': variant === 'secondary',
          'bg-red-600 text-white hover:bg-opacity-90': variant === 'danger'
        },
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {iconPosition === 'left' && icon && <div className="mr-2">{icon}</div>}
      {label}
      {iconPosition === 'right' && icon && <div className="ml-2">{icon}</div>}
    </button>
  );
});
