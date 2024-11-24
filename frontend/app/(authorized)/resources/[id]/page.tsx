import getHostScans from '@/api/getHostScans';
import Table from './_components/Table';
import TopBar from './_components/TopBar';

async function IndividualResource({
  searchParams,
  params
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { id: string };
}) {
  const page = (searchParams['page'] as string) ?? '1';
  const pageSize = '10';
  const scans = await getHostScans(params.id, { pageSize, page });

  return (
    <div className='flex flex-col gap-9'>
      <div className='flex items-center gap-9'>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>{scans.total_ips}</span>
          <span className='font-medium text-muted'>IP</span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>{scans.total_domains}</span>
          <span className='font-medium text-muted'>Доменов</span>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <TopBar id={Number(params.id)} />
        <Table id={params.id} params={searchParams} />
      </div>
    </div>
  );
}

export default IndividualResource;
