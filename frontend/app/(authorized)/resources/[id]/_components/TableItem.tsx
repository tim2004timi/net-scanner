import deleteAsset from '@/actions/deleteAsset';
import Checkbox from '@/components/ui/Checkbox';
import Popover from '@/components/ui/Popover';

function TableItem({
  row
}: {
  row: {
    domain: string;
    ips: string[];
    ports: number[];
    id: number;
  };
}) {
  return (
    <div className='group grid grid-cols-3 items-center rounded-lg px-4 py-3 leading-5 text-muted transition-all hover:bg-[#303033]'>
      <div className='flex items-center gap-4'>
        <Checkbox />
        <span className='text-white'>{row.domain}</span>
      </div>
      <div className='flex items-center gap-2 font-jetBrains-mono'>
        <span className='flex w-fit items-center rounded-md bg-zinc-800 px-1.5 py-1 text-white'>
          {row.ips[0]}
        </span>
        {row.ips.length >= 2 && (
          <Popover
            content={row.ips.slice(1).map((ip, index) => (
              <>
                <span key={ip + index}>{ip}</span>
                <br />
              </>
            ))}
          >
            <div className='flex aspect-square h-7 items-center justify-center rounded-full bg-zinc-800 text-sm'>
              +{row.ips.slice(1).length}
            </div>
          </Popover>
        )}
      </div>
      <div className='flex items-center gap-2 font-jetBrains-mono'>
        <span className='flex w-fit items-center rounded-md bg-zinc-800 px-1.5 py-1 font-jetBrains-mono text-white'>
          {row.ports[0]}
        </span>
        {row.ports.length >= 2 && (
          <Popover
            content={row.ports.slice(1).map((port, index) => (
              <>
                <span key={port + index}>{port}</span>
                <br />
              </>
            ))}
          >
            <div className='flex aspect-square h-7 items-center justify-center rounded-full bg-zinc-800 text-sm'>
              +{row.ports.slice(1).length}
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
}

export default TableItem;
