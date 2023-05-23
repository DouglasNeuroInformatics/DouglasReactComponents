import React from 'react';

export const Spinner = () => (
  <div className="flex h-full w-full items-center justify-center">
    <span
      className="animate-spinner text-slate-900"
      style={{
        fontSize: '45px',
        textIndent: '-9999em',
        overflow: 'hidden',
        width: '1em',
        height: '1em',
        borderRadius: '50%',
        position: 'relative',
        transform: 'translateZ(0)'
      }}
    ></span>
  </div>
);
