import { InputHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  wrapperClassName?: string;
}

function Input({ icon, wrapperClassName, ...props }: InputProps) {
  return (
    <div
      className={twMerge(
        'flex w-80 items-center rounded-md border border-main-darker px-3 py-2',
        wrapperClassName
      )}
    >
      <input
        type={props.type ?? 'text'}
        className={twMerge(
          'w-full bg-transparent leading-5 outline-none placeholder:text-muted',
          props.className
        )}
        {...props}
      />
      {icon}
    </div>
  );
}

export default Input;
