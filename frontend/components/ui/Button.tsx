import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: 'primary' | 'secondary';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ colorScheme, ...props }, ref) => {
  return (
    <button
      type='button'
      ref={ref}
      {...props}
      className={twMerge(
        colorScheme === 'secondary'
          ? 'gap-3 rounded-md border border-main-darker px-3 py-2 transition-all hover:bg-[#464646]'
          : 'rounded-md bg-[#0369A1] px-3 py-2 transition-all hover:bg-[#0359A1]',
        props.className
      )}
    >
      {props.children}
    </button>
  );
});

export default Button;
