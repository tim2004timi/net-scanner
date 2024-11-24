import Badge from '@/components/ui/Badge';
import Checkbox from '@/components/ui/Checkbox';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const dangerLevels = {
  'Критический': 'bg-red-500',
  'Высокий': 'bg-amber-600',
  'Средний': 'bg-blue-500',
  'Низкий': 'bg-green-500',
  'Неизвестно': 'bg-zinc-500'
};

function TableItem({
  row
}: {
  row: {
    id: number;
    asset_name: string;
    status: string;
    created_at: string;
    start_host_scan_at: string;
    end_host_scan_at: string;
    duration: string;
    threat_level: string;
  };
}) {
  return (
    <div className='group grid grid-cols-6 items-center rounded-lg px-4 py-3 leading-5 text-muted transition-all hover:bg-[#303033]'>
      <div className='flex items-center gap-4'>
        <Checkbox />
        <Link href={`/scans/${row.id}`} className='text-white transition-all hover:underline'>
          {row.id}
        </Link>
      </div>
      <span className='flex items-center gap-1'>
        <div
          className={twMerge(
            'size-3 rounded-full',
            /*
    // @ts-expect-error bullshit */
            row.status !== 'Готово' ? 'bg-zinc-500' : dangerLevels[row.threat_level]
          )}
        />
        <span>{row.status !== 'Готово' ? 'Неизвестно' : row.threat_level}</span>
      </span>
      <span>{row.asset_name}</span>
      <span>{row.duration}</span>
      <span>
        {new Date(row.created_at).toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        })}
      </span>
      <Badge type={row.status as 'В процессе' | 'Провалено' | 'Готово'} />
    </div>
  );
}

export default TableItem;
