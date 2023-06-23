'use client';

import React from 'react';

import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { withI18nProvider } from '../../utils/with-i18n-provider';

export type SearchBarProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'type'> & {
  size: 'xs' | 'sm' | 'md' | 'lg';
};

export const SearchBar = withI18nProvider(function SearchBar({
  className,
  placeholder,
  size,
  ...props
}: SearchBarProps) {
  const { t } = useTranslation();
  return (
    <input
      className={twMerge(
        'dark:highlight-white/5 w-full items-center rounded-md border border-slate-200 text-left text-sm text-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700',
        size === 'xs' && 'p-1.5',
        size === 'sm' && 'p-2',
        size === 'md' && 'p-3',
        size === 'lg' && 'p-4',
        className
      )}
      placeholder={placeholder ?? t('searchBar.placeholder')!}
      type="search"
      {...props}
    />
  );
});
