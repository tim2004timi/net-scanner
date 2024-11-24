import Table from './_components/Table';
import TopBar from './_components/TopBar';

function Scans({ params }: { params: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className='flex flex-col gap-9'>
      <div className='flex items-center gap-9'>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>644</span>
          <span className='font-medium text-muted'>Открытые уязвимости</span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>30</span>
          <div className='flex items-center gap-1'>
            <div className='size-4 rounded-full bg-red-500' />
            <span className='font-medium text-muted'>Критичный</span>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>12</span>
          <div className='flex items-center gap-1'>
            <div className='size-4 rounded-full bg-amber-600' />
            <span className='font-medium text-muted'>Высокий</span>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>23</span>
          <div className='flex items-center gap-1'>
            <div className='size-4 rounded-full bg-blue-500' />
            <span className='font-medium text-muted'>Средний</span>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>1</span>
          <div className='flex items-center gap-1'>
            <div className='size-4 rounded-full bg-green-500' />
            <span className='font-medium text-muted'>Низкий</span>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-bold'>5</span>
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
