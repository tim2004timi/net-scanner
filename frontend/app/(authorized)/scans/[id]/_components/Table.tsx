import { Fragment } from 'react';
import PaginationControls from '@/components/ui/PaginationControl';
import TableItem from './TableItem';
import getCves from '@/api/getCves';

async function Table({
  params,
  id
}: {
  params: { [key: string]: string | string[] | undefined };
  id: string;
}) {
  const page = (params['page'] as string) ?? '1';
  const pageSize = '10';
  const cves = await getCves(id, { pageSize, page });

  return (
    <>
      <div className='flex flex-col gap-2'>
        {cves.cves.length === 0 && (
          <div className='mt-4 w-full text-center text-xl font-bold'>Пока здесь ничего нет</div>
        )}
        {cves.cves &&
          cves.cves.map((row, index) => (
            <Fragment key={row.id}>
              <TableItem row={row} />
              {cves.cves.length - 1 !== index && <div className='h-px w-full bg-main-darker' />}
            </Fragment>
          ))}
      </div>
      <PaginationControls
        pageData={{ currentPage: cves.current_page, totalPages: cves.total_pages }}
        className='self-end'
      />
    </>
  );
}

export default Table;
