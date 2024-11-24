import Checkbox from '@/components/ui/Checkbox';
import { Fragment } from 'react';
import PaginationControls from '@/components/ui/PaginationControl';
import TableItem from './TableItem';
import getHostScans from '@/api/getHostScans';

const list = [
  { id: 1, domain: 'super-suck.com', ips: ['122.08.2.224', '122.08.2.224'], ports: [8080, 7070] },
  { id: 1, domain: 'super-suck.com', ips: ['122.08.2.224'], ports: [8080] },
  {
    id: 1,
    domain: 'super-suck.com',
    ips: ['122.08.2.224', '122.08.2.224'],
    ports: [8080, 7070, 3000]
  },
  {
    id: 1,
    domain: 'super-suck.com',
    ips: ['122.08.2.224', '122.08.2.224', '122.08.2.224'],
    ports: [8080]
  }
];

async function Table({
  params,
  id
}: {
  params: { [key: string]: string | string[] | undefined };
  id: string;
}) {
  const page = (params['page'] as string) ?? '1';
  const pageSize = '10';
  const scans = await getHostScans(id, { pageSize, page });

  return (
    <>
      <div className='flex flex-col'>
        <div className='grid grid-cols-3 rounded-lg border border-main-darker bg-zinc-800 px-4 py-3 font-jetBrains-mono leading-5 text-muted'>
          <div className='flex items-center gap-4'>
            <Checkbox />
            FQDN
          </div>
          <span>IP</span>
          <span>Открытые порты</span>
        </div>
        {scans.host_scans.length === 0 && (
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
        pageData={{ currentPage: scans.currentPage, totalPages: scans.totalPages }}
        className='self-end'
      />
    </>
  );
}

export default Table;
