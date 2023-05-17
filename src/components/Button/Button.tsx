import React, { ForwardedRef } from 'react';

import { clsx } from 'clsx';

export interface ButtonProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  label: string;
  variant?: 'dark' | 'light' | 'red';
}

export const Button = React.forwardRef(function Button(
  { className, icon, label, iconPosition = 'left', variant = 'dark', ...props }: ButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      className={clsx(className, 'btn text-md py-2 px-6', {
        'btn-dark': variant === 'dark',
        'btn-light': variant === 'light',
        'btn-red': variant === 'red'
      })}
      ref={ref}
      {...props}
    >
      {iconPosition === 'left' && icon && <div className="mr-2">{icon}</div>}
      {label}
      {iconPosition === 'right' && icon && <div className="ml-2">{icon}</div>}
    </button>
  );
});
