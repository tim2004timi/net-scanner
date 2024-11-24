'use client';

import { Reload, Search, Trash } from '@/components/icons';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import AddModal from './AddModal';
import refreshAssets from '@/actions/refreshAssets';
import { useEffect, useRef } from 'react';

const statusOptions = [
  { label: 'Завершено', value: 'done' },
  { label: 'Провалено', value: 'failed' },
  { label: 'В процессе', value: 'continues' }
];

function TopBar() {
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => ref.current?.click(), 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Input title='Название' placeholder='Поиск' icon={<Search />} />
        <Select label='Статус' reset options={statusOptions} />
        <Button title='Удалить' colorScheme='secondary'>
          <Trash size={20} />
        </Button>
        <Button
          ref={ref}
          onClick={async () => {
            await refreshAssets();
          }}
          title='Перезагрузить'
          colorScheme='secondary'
        >
          <Reload size={20} />
        </Button>
      </div>
      <AddModal />
    </div>
  );
}

export default TopBar;
