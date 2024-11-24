import deleteAsset from '@/actions/deleteAsset';
import { RadioWaves, TripleDots } from '@/components/icons';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import DropDown from '@/components/ui/DropDown';
import Link from 'next/link';

const dropDownOptions = {
  default: [{ label: 'Обновить' }, { label: 'Повторить обнаружение' }],
  danger: [{ label: 'Удалить', onClick: deleteAsset }]
};

function TableItem({
  row
}: {
  row: {
    name: string;
    type: string;
    targets: string[];
    frequency: string;
    tg_alerts: boolean;
    id: number;
    status: string;
    created_at: string;
    updated_at: string;
    start_host_scan_at: string;
    end_host_scan_at: string;
    duration: string;
  };
}) {
  return (
    <div className='group grid grid-cols-5 items-center rounded-lg px-4 py-3 leading-5 text-muted transition-all hover:bg-[#303033]'>
      <div className='flex items-center gap-4'>
        <Checkbox />
        <Link href={`/resources/${row.id}`} className='text-white transition-all hover:underline'>
          {row.name}
        </Link>
      </div>
      <span>
        {new Date(row.updated_at).toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        })}
      </span>
      <span>{row.type}</span>
      <Badge type={row.status as 'В процессе' | 'Провалено' | 'Готово'} />
      <div className='flex items-center justify-end gap-2.5'>
        <Button
          colorScheme='secondary'
          className='flex items-center gap-2.5 px-3.5 py-1.5 text-sm leading-[16px] text-white opacity-0 group-hover:opacity-100'
          title='Опции'
        >
          <RadioWaves size={16} />
          <span>Сканировать</span>
        </Button>
        <DropDown
          row={row}
          id={row.id}
          trigger={
            <Button colorScheme='secondary' className='rounded border-0 px-1 py-1' title='Опции'>
              <TripleDots />
            </Button>
          }
          options={dropDownOptions.default}
          danger={dropDownOptions.danger}
        />
      </div>
    </div>
  );
}

export default TableItem;