'use client';

import useClickOutside from '@/hooks/useClickOutside';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import Button from './Button';

function Modal({
  isVisible,
  setIsVisible,
  children,
  label,
  subLabel,
  buttonLabel,
  action
}: {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  children: ReactNode;
  label: string;
  subLabel?: string;
  onSuccess: () => void;
  buttonLabel: string;
  action: (formData: FormData) => Promise<void>;
}) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);

  const close = useCallback(() => setIsVisible(false), [setIsVisible]);
  useClickOutside(modalRef, close);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        <>
          {isVisible && (
            <div className='absolute left-0 top-0 z-40 h-screen w-screen bg-black/50 backdrop-blur-md'>
              <form
                action={async (data) => {
                  await action(data);
                  setIsVisible(false);
                }}
                ref={modalRef}
                className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg border border-main-darker bg-zinc-900 px-4 py-3'
              >
                <button
                  title='Закрыть диалоговое окно'
                  onClick={() => setIsVisible(false)}
                  className='absolute right-3 top-3 text-xl transition-all hover:text-zinc-400'
                >
                  <IoClose />
                </button>
                <div className='flex flex-col gap-1'>
                  <span className='flex items-center text-lg font-bold leading-6'>{label}</span>
                  <span className='text-sm text-muted'>{subLabel}</span>
                </div>
                {children}
                <div className='flex items-center gap-4 self-end leading-5'>
                  <Button
                    onClick={() => setIsVisible(false)}
                    colorScheme='secondary'
                    className='px-4'
                  >
                    Отмена
                  </Button>
                  <Button type='submit' className='px-4'>
                    {buttonLabel}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </>,
        document.querySelector('body') as Element
      )
    : null;
}

export default Modal;
