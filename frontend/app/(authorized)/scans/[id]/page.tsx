import Table from './_components/Table';
import TopBar from './_components/TopBar';

async function IndividualScan({
  searchParams,
  params
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { id: string };
}) {
  return (
    <div className='flex flex-col gap-4'>
      <TopBar />
      <Table id={params.id} params={searchParams} />
    </div>
  );
}

export default IndividualScan;
