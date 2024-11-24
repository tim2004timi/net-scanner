'use client';
import refreshVulnerabilityScans from '@/actions/refreshVulnerabilityScans';
import { Plus, Reload, Search } from '@/components/icons';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useEffect, useRef } from 'react';

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
        <Button
          ref={ref}
          onClick={async () => {
            await refreshVulnerabilityScans();
          }}
          title='Перезагрузить'
          colorScheme='secondary'
        >
          <Reload size={20} />
        </Button>
      </div>
      <Button className='flex items-center gap-3 px-4 py-2 leading-5'>
        <Plus size={20} />
      </Button>
    </div>
  );
}

export default TopBar;
