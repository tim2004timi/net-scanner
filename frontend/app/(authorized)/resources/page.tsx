import PaginationControls from '@/components/ui/PaginationControl';
import Table from './_components/Table';
import TopBar from './_components/TopBar';

function ResourcesPage() {
  return (
    <div className='flex flex-col gap-4'>
      <TopBar />
      <Table />
      <PaginationControls className='self-end' />
    </div>
  );
}

export default ResourcesPage;
