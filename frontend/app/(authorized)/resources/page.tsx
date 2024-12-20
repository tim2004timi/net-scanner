import Table from './_components/Table';
import TopBar from './_components/TopBar';

function ResourcesPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className='flex flex-col gap-4'>
      <TopBar />
      <Table params={searchParams} />
    </div>
  );
}

export default ResourcesPage;
