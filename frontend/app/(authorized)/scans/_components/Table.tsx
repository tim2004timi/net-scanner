import Checkbox from '@/components/ui/Checkbox';
import { Fragment } from 'react';
import PaginationControls from '@/components/ui/PaginationControl';
import getHostScans from '@/api/getHostScans';
import TableItem from './TableItem';

const list = [
  {
    id: 1,
    scanId: '1hfl38fn',
    dangerLevel: 'Высокий',
    group: 'scanner',
    duration: '22 минуты',
    date: '12.08.2024',
    status: 'Готово'
  },
  {
    id: 2,
    scanId: '1hfl38fn',
    dangerLevel: 'Низкий',
    group: 'scanner',
    duration: '22 минуты',
    date: '12.08.2024',
    status: 'Провалено'
  },
  {
    id: 3,
    scanId: '1hfl38fn',
    dangerLevel: 'Критичный',
    group: 'scanner',
    duration: '22 минуты',
    date: '12.08.2024',
    status: 'В процессе'
  },
  {
    id: 4,
    scanId: '1hfl38fn',
    dangerLevel: 'Средний',
    group: 'scanner',
    duration: '22 минуты',
    date: '12.08.2024',
    status: 'В процессе'
  }
];

async function Table({ params }: { params: { [key: string]: string | string[] | undefined } }) {
  const page = (params['page'] as string) ?? '1';
  const pageSize = '10';
  // const scans = await getHostScans(id, { pageSize, page });

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
        {/* {scans.host_scans.length === 0 && (
          <div className='mt-4 w-full text-center text-xl font-bold'>Пока здесь ничего нет</div>
        )}
        {scans.host_scans &&
          scans.host_scans.map((row, index) => (
            <Fragment key={row.id}>
              <TableItem row={row} />
              {scans.host_scans.length - 1 !== index && (
                <div className='h-px w-full bg-main-darker' />
              )}
            </Fragment>
          ))} */}
        {list.length === 0 && (
          <div className='mt-4 w-full text-center text-xl font-bold'>Пока здесь ничего нет</div>
        )}
        {list.map((row, index) => (
          <Fragment key={row.id}>
            <TableItem row={row} />
            {list.length - 1 !== index && <div className='h-px w-full bg-main-darker' />}
          </Fragment>
        ))}
      </div>
      {/* <PaginationControls
        pageData={{ currentPage: scans.currentPage, totalPages: scans.totalPages }}
        className='self-end'
      /> */}
    </>
  );
}

export default Table;
