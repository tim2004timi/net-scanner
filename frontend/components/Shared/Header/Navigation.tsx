'use client';

import { Dashboard, Resource, Scans } from '@/components/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const navButtons = [
  { name: 'Ресурсы', link: '/resources', icon: Resource },
  { name: 'Дешборд', link: '/dashboard', icon: Dashboard },
  { name: 'Сканы уязвимостей', link: '/scans', icon: Scans }
];

function Navigation() {
  const pathname = usePathname();

  return (
    <nav className='flex items-center gap-2 rounded-md border border-[#44403C] p-1.5'>
      {navButtons.map((button) => (
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
    </nav>
  );
}

export default Navigation;
