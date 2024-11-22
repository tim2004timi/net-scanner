import { RadioWaves, TripleDots } from '@/components/icons';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import DropDown from '@/components/ui/DropDown';
import { Fragment } from 'react';

const data = [
  { name: 'Pipka1234', updated: '12.12.2023', type: 'Внутренний', status: 'Готово' },
  { name: 'Pipok1234', updated: '12.12.2023', type: 'Внешний', status: 'В процессе' }
];

const dropDownOptions = {
  default: [{ label: 'Обновить' }, { label: 'Повторить обнаружение' }],
  danger: [{ label: 'Удалить' }]
};

function Table() {
  return (
    <div className='flex flex-col'>
      <div className='text-muted font-jetBrains-mono border-main-darker grid grid-cols-5 rounded-lg border bg-zinc-800 px-4 py-3 leading-5'>
        <div className='flex items-center gap-4'>
          <Checkbox />
          Название
        </div>
        <span>Обновлено</span>
        <span>Тип ресурса</span>
        <span>Статус</span>
      </div>
      {data.map((row, index) => (
        <Fragment key={row.name}>
          <div className='text-muted group grid grid-cols-5 items-center rounded-lg px-4 py-3 leading-5 transition-all hover:bg-[#303033]'>
            <div className='flex items-center gap-4'>
              <Checkbox />
              {row.name}
            </div>
            <span>{row.updated}</span>
            <span>{row.type}</span>
            <span>{row.status}</span>
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
                trigger={
                  <Button
                    colorScheme='secondary'
                    className='rounded border-0 px-1 py-1'
                    title='Опции'
                  >
                    <TripleDots />
                  </Button>
                }
                options={dropDownOptions.default}
                danger={dropDownOptions.danger}
              />
            </div>
          </div>
          {data.length - 1 !== index && <div className='bg-main-darker h-px w-full' />}
        </Fragment>
      ))}
    </div>
  );
}

export default Table;
