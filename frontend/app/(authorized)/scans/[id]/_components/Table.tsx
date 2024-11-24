import { Fragment } from 'react';
import PaginationControls from '@/components/ui/PaginationControl';
import TableItem from './TableItem';
import getHostScans from '@/api/getHostScans';

const list = [
  {
    id: 1,
    level: 'Средний',
    cve: 'CVE-2024-9474',
    exploit: true,
    status: 'Исправлен',
    title: 'PAN-OS Management Web Interface - Command Injection',
    description:
      'A privilege escalation vulnerability in Palo Alto Networks PAN-OS software allows a PAN-OS administrator with access to the management web interface to perform actions on the firewall with root privileges. Cloud...',
    smth: '122.08.2.224'
  },
  {
    id: 2,
    level: 'Критичный',
    cve: 'CVE-2024-9474',
    exploit: false,
    status: 'Активен',
    title: 'PAN-OS Management Web Interface - Command Injection',
    description:
      'A privilege escalation vulnerability in Palo Alto Networks PAN-OS software allows a PAN-OS administrator with access to the management web interface to perform actions on the firewall with root privileges. Cloud...',
    smth: '122.08.2.224'
  },
  {
    id: 3,
    level: 'Низкий',
    cve: 'CVE-2024-9474',
    exploit: false,
    status: 'Не подтвержден',
    title: 'PAN-OS Management Web Interface - Command Injection',
    description:
      'A privilege escalation vulnerability in Palo Alto Networks PAN-OS software allows a PAN-OS administrator with access to the management web interface to perform actions on the firewall with root privileges. Cloud...',
    smth: '122.08.2.224'
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
  // const scans = await getHostScans(id, { pageSize, page });

  return (
    <>
      <div className='flex flex-col gap-2'>
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
            {/* {list.length - 1 !== index && <div className='h-px w-full bg-main-darker' />} */}
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
