import { Plus, Search } from '@/components/icons';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

function TopBar() {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Input title='Название' placeholder='Поиск' icon={<Search />} />
      </div>
      <Button className='flex items-center gap-3 px-4 py-2 leading-5'>
        <Plus size={20} />
      </Button>
    </div>
  );
}

export default TopBar;
