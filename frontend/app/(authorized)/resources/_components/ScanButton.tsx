'use client';
import addVulnerabilityScan from '@/actions/addVulnarabilityScan';
import { RadioWaves } from '@/components/icons';
import Button from '@/components/ui/Button';

function ScanButton({ id }: { id: number }) {
  return (
    <Button
      colorScheme='secondary'
      className='flex items-center gap-2.5 px-3.5 py-1.5 text-sm leading-[16px] text-white opacity-0 group-hover:opacity-100'
      title='Опции'
      onClick={async () => {
        await addVulnerabilityScan(id);
      }}
    >
      <RadioWaves size={16} />
      <span>Сканировать</span>
    </Button>
  );
}

export default ScanButton;
