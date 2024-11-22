import { Search } from '@/components/icons';
import Input from '@/components/ui/Input';

function TopBar() {
  return (
    <div className='flex items-center justify-between'>
      <Input title='Название' placeholder='Поиск' icon={<Search />} />
    </div>
  );
}

export default TopBar;
