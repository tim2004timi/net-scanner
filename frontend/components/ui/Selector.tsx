'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const variants = [
  { label: 'Один раз', value: 'one' },
  { label: 'Ежедневно', value: 'daily' },
  { label: 'Еженедельно', value: 'weekly' },
  { label: 'Ежемесячно', value: 'yearly' }
];

function Selector() {
  const [selected, setSelected] = useState(variants[0]);

  return (
    <div className='flex items-center gap-6 rounded-md border border-main-darker px-3 py-2'>
      <span className='text-muted'>Частота</span>
      <ul className='flex items-center gap-2.5'>
        {variants.map((variant) => (
          <li key={variant.value}>
            <button
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
