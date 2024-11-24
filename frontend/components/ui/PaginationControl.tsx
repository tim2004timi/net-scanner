'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { usePagination } from '@/hooks/usePagination';
import { useCallback, useEffect } from 'react';

interface PageData {
  currentPage: number;
  totalPages: number;
}

const buttonStyles =
  'transition-all flex aspect-square h-8 cursor-pointer items-center justify-center bg-transparent p-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#464646]';

function PaginationControls({ className, pageData }: { className?: string; pageData: PageData }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? '1');
  const pageSize = Number('10');

  const getQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    params.delete('pageSize');

    return params.toString();
  }, [searchParams]);

  const pagination = usePagination({
    total: pageData.totalPages || 1,
    page: page
  });

  useEffect(() => {
    if (pageData.totalPages > 0 && pageData.totalPages < page) {
      router.replace(
        `${pathname}?page=${pageData.totalPages}&pageSize=${pageSize}${getQueryString() ? `&${getQueryString()}` : ''}`
      );
    }
  }, [getQueryString, page, pageData.totalPages, pageSize, pathname, router]);

  const goToPage = (pageNumber: number) => {
    router.push(
      `${pathname}?page=${pageNumber}&pageSize=${pageSize}${getQueryString() ? `&${getQueryString()}` : ''}`
    );
  };

  return (
    <div
      className={twMerge(
        'flex items-center rounded-md border border-main-darker text-muted',
        className
      )}
    >
      <button
        title='Предыдущая страница'
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
        type='button'
        className={twMerge(buttonStyles, 'rounded-l-')}
      >
        <FaChevronLeft />
      </button>
      {pagination.range.map((item, index) =>
        item !== 'dots' ? (
          <button
            key={item}
            type='button'
            className={twMerge(
              buttonStyles,
              'border-x border-main-darker',
              item === page && 'bg-primary text-white'
            )}
            onClick={() => goToPage(item)}
          >
            {item}
          </button>
        ) : (
          <span key={item + index} className='flex aspect-square h-8 items-center justify-center'>
            ...
          </span>
        )
      )}
      <button
        title='Следующая страница'
        disabled={page >= (pageData.totalPages || 1)}
        onClick={() => goToPage(page + 1)}
        type='button'
        className={twMerge(buttonStyles)}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default PaginationControls;
