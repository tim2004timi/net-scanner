import { twMerge } from 'tailwind-merge';
import { IoSparkles } from 'react-icons/io5';
import AiModal from './AiModal';

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
  'Не подтвержден': 'bg-zinc-500',
  'Получен': 'bg-blue-500'
};

function TableItem({
  row
}: {
  row: {
    name: string;
    severity: number;
    title: string;
    exploit: boolean;
    status: string;
    description: string;
    ip: string;
    service: string;
    port: number;
    ai_answer: string;
    id: number;
  };
}) {
  let type: string;
  if (row.severity === 0) {
    type = 'Неизвестно';
  } else if (row.severity > 0 && row.severity < 4) {
    type = 'Низкий';
  } else if (row.severity >= 4 && row.severity < 7) {
    type = 'Средний';
  } else if (row.severity >= 7 && row.severity < 9) {
    type = 'Высокий';
  } else if (row.severity >= 9 && row.severity <= 10) {
    type = 'Критичный';
  } else {
    type = '';
  }

  return (
    <div className='group relative grid grid-cols-7 items-center overflow-hidden rounded-lg px-4 py-3 leading-5 text-muted transition-all hover:bg-[#303033]'>
      <div
        className={twMerge(
          'absolute bottom-0 left-0 size-20 rounded-full blur-2xl',
          dangerLevels[type as keyof typeof dangerLevels]
        )}
      />
      <div className='flex items-center self-start'>
        <span
          className={twMerge(
            'flex w-fit items-center rounded-md px-3 py-1 text-base font-normal text-white shadow-md',
            dangerLevels[type as keyof typeof dangerLevels]
          )}
        >
          {type}
        </span>
      </div>
      <div className='self-start'>
        <div className='flex w-fit flex-col items-center gap-2'>
          <span className='flex w-fit items-center justify-center rounded-md border border-main-darker bg-zinc-800 px-3 py-1 font-jetBrains-mono'>
            {row.name}
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
          {row.ip}
        </span>
      </div>
      <div className='flex justify-end self-start'>
        <button className='flex w-fit items-center gap-2 rounded-md border border-purple-500 px-3 py-1 text-white transition-all hover:border-zinc-800 hover:bg-zinc-800'>
          <IoSparkles className='text-sm text-pink-400' />
          <span className='font-jetBrains-mono'>AI</span>
        </button>
        <AiModal data={{ name: row.name }} />
      </div>
    </div>
  );
}

export default TableItem;
