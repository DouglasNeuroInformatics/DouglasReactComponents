'use client';

import React from 'react';

import { Popover, Transition } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface FormFieldDescriptionProps {
  description?: string;
}

export const FormFieldDescription = ({ description }: FormFieldDescriptionProps) => {
  return description ? (
    <div className="flex items-center justify-center">
      <Popover>
        <Popover.Button className="flex items-center justify-center" tabIndex={-1}>
          <QuestionMarkCircleIcon className="text-slate-600 dark:text-slate-300" height={16} width={16} />
        </Popover.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute right-0 z-10 mt-2 max-w-xs rounded-lg border border-slate-300 bg-slate-100 p-2 text-sm text-slate-600 shadow-lg dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {description}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  ) : null;
};
