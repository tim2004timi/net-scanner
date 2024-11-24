import { Search } from '@/components/icons';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const statusOptions = [
  { label: 'Исправлено', value: 'done' },
  { label: 'Активен', value: 'failed' },
  { label: 'Не найден', value: 'continues' },
  { label: 'Не подтвержден', value: 'not' }
];
const dangerOptions = [
  { label: 'Критичный', value: 'done' },
  { label: 'Высокий', value: 'failed' },
  { label: 'Средний', value: 'continues' },
  { label: 'Низкий', value: 'not' },
  { label: 'Неизвестно', value: 'low' }
];

async function TopBar() {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Input title='Название' placeholder='Поиск' icon={<Search />} />
        <Select label='Статус' reset options={statusOptions} />
        <Select label='Уровень угрозы' reset options={dangerOptions} />
      </div>
    </div>
  );
}

export default TopBar;
