'use client';

import { Resource, Scans } from '@/components/icons';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const navButtons = [
  { name: 'Ресурсы', link: '/resources', icon: Resource },
  // { name: 'Дешборд', link: '/dashboard', icon: Dashboard },
  { name: 'Сканы уязвимостей', link: '/scans', icon: Scans }
];

function Navigation() {
  const pathname = usePathname();
  const isResourceDetailPage =
    (pathname.startsWith('/resources/') || pathname.startsWith('/scans/')) &&
    pathname.split('/').length === 3;
  const router = useRouter();

  return (
    <nav
      className={twMerge(
        'flex items-center gap-2 rounded-md border border-[#44403C] p-1.5',
        isResourceDetailPage && 'border-none p-0'
      )}
    >
      {!isResourceDetailPage &&
        navButtons.map((button) => (
          <Link
            key={button.link}
            href={button.link}
            className={twMerge(
              'flex items-center gap-2 rounded-md px-3.5 py-1.5 text-base leading-5',
              pathname === button.link && 'bg-[#464646]'
            )}
          >
            <button.icon size={18} />
            <span>{button.name}</span>
          </Link>
        ))}
      {isResourceDetailPage && (
        <Button
          className='flex items-center py-2.5'
          colorScheme='secondary'
          onClick={() => router.back()}
        >
          <IoArrowBackOutline className='text-xl' />
          <span>Назад</span>
        </Button>
      )}
    </nav>
  );
}

export default Navigation;
