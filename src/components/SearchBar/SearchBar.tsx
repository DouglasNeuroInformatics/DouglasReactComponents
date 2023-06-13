'use client';

import React from 'react';

import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

import { withI18nProvider } from '../../utils/with-i18n-provider';

export type SearchBarProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'>;

export const SearchBar = withI18nProvider(function SearchBar({ className, placeholder, ...props }: SearchBarProps) {
  const { t } = useTranslation();
  return (
    <input
      className={clsx('block w-full rounded-lg border border-slate-300 text-sm p-3', className)}
      placeholder={placeholder ?? t('searchBar.placeholder')!}
      type="search"
      {...props}
    />
  );
});
