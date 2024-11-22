import { InputHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

function Input({ icon, ...props }: InputProps) {
  return (
    <div className='border-main-darker flex w-80 items-center rounded-md border px-3 py-2'>
      <input
        type={props.type ?? 'text'}
        className={twMerge(
          'placeholder:text-muted w-full bg-transparent leading-5 outline-none',
          props.className
        )}
        {...props}
      />
      {icon}
    </div>
  );
}

export default Input;
