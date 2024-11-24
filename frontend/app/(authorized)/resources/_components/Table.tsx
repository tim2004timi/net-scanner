import getAssets from '@/api/getAssets';
import Checkbox from '@/components/ui/Checkbox';
import PaginationControls from '@/components/ui/PaginationControl';
import { Fragment } from 'react';
import TableItem from './TableItem';

async function Table({ params }: { params: { [key: string]: string | string[] | undefined } }) {
  const page = (params['page'] as string) ?? '1';
  const pageSize = '10';
  const assets = await getAssets({ pageSize, page });

  return (
    <>
      <div className='flex flex-col'>
        <div className='grid grid-cols-5 rounded-lg border border-main-darker bg-zinc-800 px-4 py-3 font-jetBrains-mono leading-5 text-muted'>
          <div className='flex items-center gap-4'>
            <Checkbox />
            Название
          </div>
          <span>Обновлено</span>
          <span>Тип ресурса</span>
          <span>Статус</span>
        </div>
        {assets.assets.length === 0 && (
          <div className='mt-4 w-full text-center text-xl font-bold'>Пока здесь ничего нет</div>
        )}
        {assets.assets &&
          assets.assets.map((row, index) => (
            <Fragment key={row.name}>
              <TableItem row={row} />
              {assets.assets.length - 1 !== index && <div className='h-px w-full bg-main-darker' />}
            </Fragment>
          ))}
      </div>
      <PaginationControls
        pageData={{ currentPage: assets.current_page, totalPages: assets.total_pages }}
        className='self-end'
      />
    </>
  );
}

export default Table;
