import { Reload, Search, Trash } from '@/components/icons';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import AddModal from './AddModal';

const statusOptions = [
  { label: 'Завершено', value: 'done' },
  { label: 'Провалено', value: 'failed' },
  { label: 'В процессе', value: 'continues' }
];

function TopBar() {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Input title='Название' placeholder='Поиск' icon={<Search />} />
        <Select label='Статус' reset options={statusOptions} />
        <Button title='Удалить' colorScheme='secondary'>
          <Trash size={20} />
        </Button>
        <Button title='Перезагрузить' colorScheme='secondary'>
          <Reload size={20} />
        </Button>
      </div>
      <AddModal />
    </div>
  );
}

export default TopBar;
