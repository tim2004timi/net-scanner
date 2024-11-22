'use client';
import { ReactNode, useState } from 'react';

function DropDown({
  trigger,
  options,
  danger
}: {
  trigger: ReactNode;
  options: { label: string; onClick?: () => void }[];
  danger?: { label: string; onClick?: () => void }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <div onClick={() => setIsOpen((prev) => !prev)}>{trigger}</div>
      {isOpen && (
        <ul className='border-main-darker absolute right-0 z-10 flex translate-y-2 flex-col gap-1 rounded-md border bg-zinc-900 p-1 text-white'>
          {options.map((option) => (
            <li key={option.label}>
              <button
                onClick={() => {
                  if (option.onClick) {
                    option.onClick();
                  }
                  setIsOpen(false);
                }}
                className='w-full whitespace-nowrap rounded px-2 py-1.5 text-left leading-5 transition-all hover:bg-[#464646]'
              >
                {option.label}
              </button>
            </li>
          ))}
          {danger && <li className='bg-main-darker h-px w-full' />}
          {danger &&
            danger.map((option) => (
              <li key={option.label}>
                <button
                  onClick={() => {
                    if (option.onClick) {
                      option.onClick();
                    }
                    setIsOpen(false);
                  }}
                  className='w-full whitespace-nowrap rounded px-2 py-1.5 text-left leading-5 text-red-500 transition-all hover:bg-[#464646]'
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

export default DropDown;
