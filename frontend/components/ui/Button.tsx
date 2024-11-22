import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: 'primary' | 'secondary';
}

function Button({ colorScheme, ...props }: ButtonProps) {
  return (
    <button
      type='button'
      {...props}
      className={twMerge(
        colorScheme === 'secondary'
          ? 'border-main-darker gap-3 rounded-md border px-3 py-2 transition-all hover:bg-[#464646]'
          : 'rounded-md bg-[#0369A1] px-3 py-2 transition-all hover:bg-[#0359A1]',
        props.className
      )}
    >
      {props.children}
    </button>
  );
}

export default Button;
