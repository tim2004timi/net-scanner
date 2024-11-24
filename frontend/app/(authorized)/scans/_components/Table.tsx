import Checkbox from '@/components/ui/Checkbox';
import { Fragment } from 'react';
import PaginationControls from '@/components/ui/PaginationControl';
import TableItem from './TableItem';
import getVulnerabilityScans from '@/api/getVulnerabilityScans';

async function Table({ params }: { params: { [key: string]: string | string[] | undefined } }) {
  const page = (params['page'] as string) ?? '1';
  const pageSize = '10';
  const scans = await getVulnerabilityScans({ pageSize, page });

  return (
    <>
      <div className='flex flex-col'>
        <div className='grid grid-cols-6 rounded-lg border border-main-darker bg-zinc-800 px-4 py-3 font-jetBrains-mono leading-5 text-muted'>
          <div className='flex items-center gap-4'>
            <Checkbox />
            Скан ID
          </div>
          <span>Уровень угрозы</span>
          <span>Группа ресурсов</span>
          <span>Длительность</span>
          <span>Дата</span>
          <span>Статус</span>
        </div>
        {scans.vulnerability_scans.length === 0 && (
          <div className='mt-4 w-full text-center text-xl font-bold'>Пока здесь ничего нет</div>
        )}
        {scans.vulnerability_scans &&
          scans.vulnerability_scans.map((row, index) => (
            <Fragment key={row.id}>
              <TableItem row={row} />
              {scans.vulnerability_scans.length - 1 !== index && (
                <div className='h-px w-full bg-main-darker' />
              )}
            </Fragment>
          ))}
        {/* {list.length === 0 && (
          <div className='mt-4 w-full text-center text-xl font-bold'>Пока здесь ничего нет</div>
        )}
        {list.map((row, index) => (
          <Fragment key={row.id}>
            <TableItem row={row} />
            {list.length - 1 !== index && <div className='h-px w-full bg-main-darker' />}
          </Fragment>
        ))} */}
      </div>
      <PaginationControls
        pageData={{ currentPage: scans.current_page, totalPages: scans.total_pages }}
        className='self-end'
      />
    </>
  );
}

export default Table;
