'use client';

import React from 'react';

import { range } from '@douglasneuroinformatics/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const CALENDAR_ANIMATION_DURATION = 0.2; // seconds

export type CalendarProps = {
  year: number;
  month: number;
  onSelection: (date: Date) => void;
};

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(function Calendar(props, ref) {
  const { t } = useTranslation();

  const firstDay = new Date(props.year, props.month).getDay();
  const lastDay = new Date(props.year, props.month + 1, 0).getDate();
  const days = range(1, lastDay + 1);

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        initial={{ opacity: 0, x: 20 }}
        key={`${props.year}-${props.month}`}
        transition={{ duration: CALENDAR_ANIMATION_DURATION }}
      >
        <div className="grid w-72 grid-cols-7 gap-3" ref={ref}>
          {range(7).map((i) => (
            <div className="flex items-center justify-center" key={i}>
              {(t(`datetime.days.${i as 0}`) as string).charAt(0).toUpperCase()}
            </div>
          ))}
          <div style={{ gridColumn: `span ${firstDay} / span ${firstDay}` }} />
          {days.map((day) => (
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm hover:bg-slate-200"
              key={day}
              tabIndex={-1}
              type="button"
              onClick={() => props.onSelection(new Date(props.year, props.month, day))}
            >
              {day}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
});
