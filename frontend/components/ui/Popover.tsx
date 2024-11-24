'use client';
import { ReactNode, useState } from 'react';

function Popover({ children, content }: { children: ReactNode; content: ReactNode }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <div className='anima animate-slide-in absolute right-0 top-0 z-20 translate-y-7 rounded-lg border border-main-darker bg-zinc-900 px-2 py-1 text-sm font-normal text-zinc-300 shadow-lg shadow-zinc-950'>
          {content}
        </div>
      )}
      {children}
    </div>
  );
}

export default Popover;
