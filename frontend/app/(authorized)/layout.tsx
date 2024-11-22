import Header from '@/components/Shared/Header';
import { ReactNode } from 'react';

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col gap-9 p-6'>
      <Header />
      {children}
    </div>
  );
}

export default AuthLayout;
