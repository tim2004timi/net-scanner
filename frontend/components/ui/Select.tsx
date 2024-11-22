'use client';
import { useState } from 'react';
import { ChevronDown } from '../icons';
import { twMerge } from 'tailwind-merge';

function Select({
  label,
  options,
  reset
}: {
  label: string;
  options: { label: string; value: string }[];
  reset?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState<null | { label: string; value: string }>(null);

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='text-muted border-main-darker flex items-center gap-3 rounded-md border px-3 py-2 leading-5 transition-all hover:bg-[#464646]'
      >
        <span>{currentValue?.label ?? label}</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <ul className='border-main-darker absolute left-0 flex translate-y-2 flex-col gap-1 rounded-md border bg-zinc-900 p-1'>
          {reset && currentValue !== null && (
            <li>
              <button
                onClick={() => {
                  setCurrentValue(null);
                  setIsOpen(false);
                }}
                className={twMerge(
                  'w-full whitespace-nowrap rounded px-2 py-1.5 text-left leading-5 transition-all hover:bg-[#464646]'
                )}
              >
                Сбросить
              </button>
            </li>
          )}
          {options.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => {
                  setCurrentValue(option);
                  setIsOpen(false);
                }}
                className={twMerge(
                  'w-full whitespace-nowrap rounded px-2 py-1.5 text-left leading-5 transition-all hover:bg-[#464646]',
                  currentValue?.value === option.value && 'bg-[#0369A1]'
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
