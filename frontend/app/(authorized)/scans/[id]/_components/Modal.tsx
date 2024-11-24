'use client';

import Button from '@/components/ui/Button';
import useClickOutside from '@/hooks/useClickOutside';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoArrowBackOutline, IoSparkles } from 'react-icons/io5';
import { FaCopy } from 'react-icons/fa6';
import TextArea from '@/components/ui/TextArea';

function Modal({ data }: { data: { name: string } }) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();

  const close = useCallback(() => setIsVisible(false), [setIsVisible]);
  useClickOutside(modalRef, close);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        <>
          <button className='flex w-fit items-center gap-2 rounded-md border border-purple-500 px-3 py-1 text-white transition-all hover:border-zinc-800 hover:bg-zinc-800'>
            <IoSparkles className='text-sm text-pink-400' />
            <span className='font-jetBrains-mono'>AI</span>
          </button>
          {isVisible && (
            <div className='absolute left-0 top-0 z-40 h-screen w-screen bg-black/50 backdrop-blur-md'>
              <div
                ref={modalRef}
                className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg border border-main-darker bg-zinc-900 px-4 py-3'
              >
                <div className='flex items-start justify-between gap-1'>
                  <Button
                    className='flex items-center py-2.5'
                    colorScheme='secondary'
                    onClick={() => router.back()}
                  >
                    <IoArrowBackOutline className='text-xl' />
                    <span>Назад</span>
                  </Button>
                  <span className='flex items-center rounded bg-zinc-800 px-2 py-1 font-jetBrains-mono text-xl leading-6'>
                    {data.name}
                  </span>
                  <Button
                    onClick={async () => {
                      await navigator.clipboard.writeText('jlhasdkjashd');
                    }}
                  >
                    <FaCopy className='text-lg' />
                  </Button>
                </div>
                <TextArea
                  rows={20}
                  className='overflow-y-scroll'
                  readOnly
                  defaultValue='asdljfh lsdkhf sldkfhj'
                />
              </div>
            </div>
          )}
        </>,
        document.querySelector('body') as Element
      )
    : null;
}

export default Modal;
