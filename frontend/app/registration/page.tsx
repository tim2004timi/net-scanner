import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function Registration() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <main className='flex flex-col gap-4 rounded-lg border border-main-darker px-4 py-3'>
        <div className='flex flex-col gap-1'>
          <span className='flex items-center text-lg font-bold leading-6'>Регистрация</span>
          <span className='text-sm text-muted'>Введите необходимые данные для регистрации</span>
        </div>
        <span className='text-sm leading-4 text-muted'>
          Бот для авторизации -{' '}
          <Link
            target='_blank'
            rel='noopener noreferrer'
            href='https://t.me/ScannerBoxBot'
            className='underline transition-all hover:opacity-75'
          >
            @ScannerBoxBot
          </Link>
        </span>
        <Input placeholder='Логин' wrapperClassName='w-full' title='Логин' />
        <Input placeholder='Пароль' wrapperClassName='w-full' title='Пароль' />
        <Input
          placeholder='Подтвердите пароль'
          wrapperClassName='w-full'
          title='Подтверждение пароля'
        />
        <Button>Регистрация</Button>
      </main>
    </div>
  );
}
