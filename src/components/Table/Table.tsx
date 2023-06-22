import React, { useLayoutEffect, useRef, useState } from 'react';

import { toBasicISOString } from '@douglasneuroinformatics/utils';

/** Coerces the value in a cell to a string for consistant display purposes */
function defaultFormatter(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return value.toFixed(2).toString();
  } else if (typeof value === 'undefined') {
    return 'NA';
  }
  if (value instanceof Date) {
    return toBasicISOString(value);
  }
  return JSON.stringify(value);
}

export type TableEntry = Record<string, unknown>;

export type FieldFactory = (entry: TableEntry) => string;

export interface TableColumn<T extends TableEntry> {
  /** The label to be displayed on the header */
  label: string;

  /** How to determine the values for column */
  field: keyof T | FieldFactory;

  /** Override the default formatter for this field */
  formatter?: (value: any) => string;
}

export interface TableProps<T extends TableEntry> {
  columns: TableColumn<T>[];
  data: T[];
  onEntryClick?: (entry: T) => void;
}

export const Table = <T extends TableEntry>({ columns, data, onEntryClick }: TableProps<T>) => {
  // const [ref, { width, height }] = useElementSize();
  const ref = useRef<HTMLDivElement>(null);
  const [columnWidth, setColumnWidth] = useState<number>();
  const [rowHeight] = useState(100);

  useLayoutEffect(() => {
    if (ref.current) {
      setColumnWidth(ref.current?.offsetWidth / 4);
    }
  }, []);

  return (
    <div
      className="h-full w-full border-separate overflow-scroll rounded-sm shadow-sm ring-1 ring-black ring-opacity-5"
      ref={ref}
    >
      <div className="sticky top-0 flex w-fit border-b border-slate-300 dark:border-0 bg-slate-50 dark:bg-slate-800">
        {columns.map((column) => (
          <div
            className="flex-shrink-0 p-4 text-sm font-semibold text-slate-900 dark:text-slate-100"
            key={column.label}
            style={{ width: columnWidth }}
          >
            {column.label}
          </div>
        ))}
      </div>
      <div className="w-fit min-w-full divide-y divide-solid divide-slate-200 bg-white dark:divide-slate-600 dark:bg-slate-700">
        {data.map((entry, i) => (
          <div className="flex" key={i} onClick={() => onEntryClick && onEntryClick(entry)}>
            {columns.map(({ field, formatter }, i) => {
              const value = typeof field === 'function' ? field(entry) : entry[field];
              const formattedValue = formatter ? formatter(value) : defaultFormatter(value);
              return (
                <div
                  className="flex-shrink-0 whitespace-nowrap p-4 text-sm text-slate-600 dark:text-slate-300"
                  key={i}
                  style={{ width: columnWidth }}
                >
                  {formattedValue}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
