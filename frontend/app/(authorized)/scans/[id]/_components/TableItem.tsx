import { twMerge } from 'tailwind-merge';
import { IoSparkles } from 'react-icons/io5';

const dangerLevels = {
  'Критичный': 'bg-red-500',
  'Высокий': 'bg-amber-600',
  'Средний': 'bg-blue-500',
  'Низкий': 'bg-green-600',
  'Неизвестно': 'bg-zinc-500'
};
const statuses = {
  'Активен': 'bg-red-500',
  'Исправлен': 'bg-green-600',
  'Не найден': 'bg-zinc-500',
  'Не подтвержден': 'bg-zinc-500'
};

function TableItem({
  row
}: {
  row: {
    id: number;
    level: string;
    cve: string;
    exploit: boolean;
    status: string;
    title: string;
    description: string;
    smth: string;
  };
}) {
  return (
    <div className='group relative grid grid-cols-7 items-center overflow-hidden rounded-lg px-4 py-3 leading-5 text-muted transition-all hover:bg-[#303033]'>
      <div
        className={twMerge(
          'absolute bottom-0 left-0 size-20 rounded-full blur-2xl',
          dangerLevels[row.level as keyof typeof dangerLevels]
        )}
      />
      <div className='flex items-center self-start'>
        <span
          className={twMerge(
            'flex w-fit items-center rounded-md px-3 py-1 text-base font-normal text-white shadow-md',
            dangerLevels[row.level as keyof typeof dangerLevels]
          )}
        >
          {row.level}
        </span>
      </div>
      <div className='self-start'>
        <div className='flex w-fit flex-col items-center gap-2'>
          <span className='flex w-fit items-center justify-center rounded-md border border-main-darker bg-zinc-800 px-3 py-1 font-jetBrains-mono'>
            {row.cve}
          </span>
          <span className='text-sm text-muted'>
            {row.exploit ? 'Найден эксплоит' : 'Нет эксплойта'}
          </span>
        </div>
      </div>
      <div className='col-span-3 flex flex-col gap-1'>
        <span className='text-lg font-semibold text-white'>{row.title}</span>
        <span
          className={twMerge(
            'flex w-fit items-center rounded-md px-2 py-0.5 text-sm font-normal text-white',
            statuses[row.status as keyof typeof statuses]
          )}
        >
          {row.status}
        </span>
        <span className='text-sm text-muted'>
          {row.description.substring(0, 200)}
          {row.description.length > 200 && '... '}
          <button className='text-white'>Подробнее</button>
        </span>
      </div>
      <div className='flex justify-center self-start'>
        <span className='flex w-fit items-center rounded-md bg-zinc-800 px-1.5 py-1 font-jetBrains-mono text-white'>
          {row.smth}
        </span>
      </div>
      <div className='flex justify-end self-start'>
        <button className='flex w-fit items-center gap-2 rounded-md border border-purple-500 px-3 py-1 text-white transition-all hover:border-zinc-800 hover:bg-zinc-800'>
          <IoSparkles className='text-sm text-pink-400' />
          <span className='font-jetBrains-mono'>AI</span>
        </button>
      </div>
    </div>
  );
}

export default TableItem;
