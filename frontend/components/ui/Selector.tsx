'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const variants = [
  { label: 'Один раз', value: 'Один раз' },
  { label: 'Ежедневно', value: 'Ежедневно' },
  { label: 'Еженедельно', value: 'Еженедельно' },
  { label: 'Ежемесячно', value: 'Ежемесячно' }
];

function Selector({ name, defaultValue }: { name?: string; defaultValue?: string }) {
  const [selected, setSelected] = useState(
    defaultValue
      ? (variants.find((item) => item.value === defaultValue) as (typeof variants)[number])
      : variants[0]
  );

  return (
    <div className='flex items-center gap-6 rounded-md border border-main-darker px-3 py-2'>
      <span className='text-muted'>Частота</span>
      <input
        type='text'
        required
        name={name}
        title={name}
        className='sr-only'
        value={selected.value || ''}
        onChange={() => null}
      />
      <ul className='flex items-center gap-2.5'>
        {variants.map((variant) => (
          <li key={variant.value}>
            <button
              type='button'
              onClick={() => setSelected(variant)}
              className={twMerge(
                'rounded-md px-2 py-1 text-sm leading-[18px] transition-all hover:bg-[#464646]',
                selected.value === variant.value && 'bg-[#464646]'
              )}
            >
              {variant.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Selector;
