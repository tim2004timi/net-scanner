'use client';
import { Search, Trash } from '@/components/icons';
import Button from '@/components/ui/Button';
import { TbRocket } from 'react-icons/tb';
import Input from '@/components/ui/Input';
import addVulnerabilityScan from '@/actions/addVulnarabilityScan';

function TopBar({ id }: { id: number }) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Input title='Название' placeholder='Поиск' icon={<Search />} />
        <Button title='Удалить' colorScheme='secondary'>
          <Trash size={20} />
        </Button>
      </div>
      <Button
        onClick={async () => {
          await addVulnerabilityScan(id);
        }}
        className='flex items-center gap-3 px-4 py-2 leading-5'
      >
        <span>Запустить сканирование на уязвимости</span>
        <TbRocket className='text-xl' />
      </Button>
    </div>
  );
}

export default TopBar;
