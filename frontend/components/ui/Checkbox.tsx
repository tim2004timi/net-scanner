import { InputHTMLAttributes, ReactNode, useId } from 'react';
import { twMerge } from 'tailwind-merge';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  className?: string;
}

function Checkbox({ children, className, ...props }: CheckboxProps) {
  const id = useId();
  const symbolId = useId();
  const maskId = useId();

  return (
    <label htmlFor={id} className={twMerge('flex items-center gap-2', className)}>
      <div className='surf-checkbox relative block size-5 cursor-pointer'>
        <input
          type='checkbox'
          className='checked:bg-primary checked:hover:bg-primary peer m-0 block size-5 appearance-none rounded-md border-none bg-transparent p-0 shadow-[inset_0_0_0_1px_#464646] outline-none transition-all duration-[175ms] ease-linear checked:shadow-[inset_0_0_0_1px_#464646] hover:bg-[#464646] hover:shadow-[inset_0_0_0_1px_#3F3F46] checked:hover:shadow-[inset_0_0_0_1px_#464646]'
          id={id}
          {...props}
        />
        <svg
          viewBox='0 0 21 18'
          className='text-primary absolute left-0 top-0.5 block size-5 peer-checked:[--stroke-dashoffset:0;]'
        >
          <symbol
            id={`tick-path-${symbolId}`}
            viewBox='0 0 21 18'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69'
              fill='none'
              strokeWidth='2.25'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </symbol>
          <defs>
            <mask id={`tick-mask-${maskId}`}>
              <use
                className='tick mask stroke-white transition-all duration-[250ms] [stroke-dasharray:20] [stroke-dashoffset:var(--stroke-dashoffset,20)]'
                href={`#tick-path-${symbolId}`}
              />
            </mask>
          </defs>
          <use
            className='tick transition-all duration-[250ms] [stroke-dasharray:20] [stroke-dashoffset:var(--stroke-dashoffset,20)]'
            href={`#tick-path-${symbolId}`}
            stroke='currentColor'
          />
          <path
            fill='white'
            mask={`url(#tick-mask-${maskId})`}
            d='M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z'
          />
        </svg>
      </div>
      {children}
    </label>
  );
}

export default Checkbox;
