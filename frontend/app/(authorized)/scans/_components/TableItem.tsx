import Badge from '@/components/ui/Badge';
import Checkbox from '@/components/ui/Checkbox';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const dangerLevels = {
  'Критичный': 'bg-red-500',
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
    scanId: string;
    dangerLevel: string;
    group: string;
    duration: string;
    date: string;
    status: string;
  };
}) {
  return (
    <div className='group grid grid-cols-6 items-center rounded-lg px-4 py-3 leading-5 text-muted transition-all hover:bg-[#303033]'>
      <div className='flex items-center gap-4'>
        <Checkbox />
        <Link href={`/scans/${row.id}`} className='text-white transition-all hover:underline'>
          {row.scanId}
        </Link>
      </div>
      <span className='flex items-center gap-1'>
        {/*
// @ts-ignore */}
        <div className={twMerge('size-3 rounded-full', dangerLevels[row.dangerLevel])} />
        <span>{row.dangerLevel}</span>
      </span>
      <span>{row.group}</span>
      <span>{row.duration}</span>
      <span>{row.date}</span>
      <Badge type={row.status as 'В процессе' | 'Провалено' | 'Готово'} />
    </div>
  );
}

export default TableItem;
