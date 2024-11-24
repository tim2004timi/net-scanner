'use client';
import { ReactNode, useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import TextArea from './TextArea';
import Selector from './Selector';
import Checkbox from './Checkbox';
import updateAsset from '@/actions/updateAsset';

function DropDown({
  trigger,
  options,
  danger,
  id,
  row
}: {
  trigger: ReactNode;
  options: { label: string; onClick?: (id: string | number) => void }[];
  danger?: { label: string; onClick?: (id: string | number) => void }[];
  id: string | number;
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
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='relative'>
      <div onClick={() => setIsOpen((prev) => !prev)}>{trigger}</div>
      {isOpen && (
        <ul className='absolute right-0 z-10 flex translate-y-2 flex-col gap-1 rounded-md border border-main-darker bg-zinc-900 p-1 text-white'>
          {options.map((option) => (
            <li key={option.label}>
              <button
                onClick={async () => {
                  if (option.onClick) {
                    await option.onClick(id);
                  }
                  if (option.label === 'Обновить') {
                    setIsVisible(true);
                  }
                  setIsOpen(false);
                }}
                className='w-full whitespace-nowrap rounded px-2 py-1.5 text-left leading-5 transition-all hover:bg-[#464646]'
              >
                {option.label}
              </button>
            </li>
          ))}
          {danger && <li className='h-px w-full bg-main-darker' />}
          {danger &&
            danger.map((option) => (
              <li key={option.label}>
                <button
                  onClick={async () => {
                    if (option.onClick) {
                      await option.onClick(id);
                    }
                    setIsOpen(false);
                  }}
                  className='w-full whitespace-nowrap rounded px-2 py-1.5 text-left leading-5 text-red-500 transition-all hover:bg-[#464646]'
                >
                  {option.label}
                </button>
              </li>
            ))}
        </ul>
      )}
      <Modal
        action={updateAsset}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        label='Измените адрес'
        subLabel='Измените домены, IP или CDR для повторного сканирования'
        onSuccess={() => setIsVisible(false)}
        buttonLabel='Повторить обнаружение'
      >
        <div className='flex w-full flex-col gap-4'>
          <Input
            wrapperClassName='w-full'
            name='groupName'
            title='Название группы'
            placeholder='Название группы'
            defaultValue={row.name}
          />
          <input type='hidden' name='id' defaultValue={row.id} />
          <TextArea
            wrapperClassName='w-full'
            title='Список элементов для сканирования'
            name='resourceList'
            defaultValue={row.targets}
            placeholder={`Введите список доменов или диапазон IP адресов ${'\n\n'}scannerbox.ru${'\n'}192.168.1.1${'\n'}192.168.2.0/24 `}
          />
          <Selector name='times' />
          <Checkbox name='tgAlerts' className='gap-3'>
            <span className='leading-5'>Уведомить в телеграм</span>
          </Checkbox>
        </div>
      </Modal>
    </div>
  );
}

export default DropDown;
