import getVulnerabilityScans from '@/api/getVulnerabilityScans';
import Table from './_components/Table';
import TopBar from './_components/TopBar';

async function Scans({ params }: { params: { [key: string]: string | string[] | undefined } }) {
  const page = (params['page'] as string) ?? '1';
  const pageSize = '10';
  const scans = await getVulnerabilityScans({ pageSize, page });

  return (
    <div className='flex flex-col gap-9'>
      <div className='flex items-center gap-9'>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>{scans.total_cves}</span>
          <span className='font-medium text-muted'>Открытые уязвимости</span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>{scans.critical_cves}</span>
          <div className='flex items-center gap-1'>
            <div className='size-4 rounded-full bg-red-500' />
            <span className='font-medium text-muted'>Критичный</span>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>{scans.high_cves}</span>
          <div className='flex items-center gap-1'>
            <div className='size-4 rounded-full bg-amber-600' />
            <span className='font-medium text-muted'>Высокий</span>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>{scans.medium_cves}</span>
          <div className='flex items-center gap-1'>
            <div className='size-4 rounded-full bg-blue-500' />
            <span className='font-medium text-muted'>Средний</span>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>{scans.low_cves}</span>
          <div className='flex items-center gap-1'>
            <div className='size-4 rounded-full bg-green-500' />
            <span className='font-medium text-muted'>Низкий</span>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>{scans.unknown_cves}</span>
          <div className='flex items-center gap-1'>
            <div className='size-4 rounded-full bg-zinc-500' />
            <span className='font-medium text-muted'>Неизвестно</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <TopBar />
        <Table params={params} />
      </div>
    </div>
  );
}

export default Scans;
