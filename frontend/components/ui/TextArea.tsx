import { ReactNode, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: ReactNode;
  wrapperClassName?: string;
}

function TextArea({ icon, wrapperClassName, ...props }: TextAreaProps) {
  return (
    <div
      className={twMerge(
        'flex w-80 items-center rounded-md border border-main-darker px-3 py-2',
        wrapperClassName
      )}
    >
      <textarea
        className={twMerge(
          'w-full resize-none bg-transparent leading-5 outline-none placeholder:text-muted',
          props.className
        )}
        rows={6}
        {...props}
      />
      {icon}
    </div>
  );
}

export default TextArea;
