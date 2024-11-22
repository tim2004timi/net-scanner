import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function Login() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <main className='flex flex-col gap-4 rounded-lg border border-main-darker px-4 py-3'>
        <div className='flex flex-col gap-1'>
          <span className='flex items-center text-lg font-bold leading-6'>Вход</span>
          <span className='text-sm text-muted'>Введите свои данные для входа</span>
        </div>
        <Input placeholder='Логин' title='Логин' />
        <Input placeholder='Пароль' title='Пароль' />
        <span className='text-sm text-muted'>
          Нет аккаунта?{' '}
          <Link href='registration' className='underline transition-all hover:opacity-75'>
            Зарегистрируйтесь
          </Link>
        </span>
        <Button>Продолжить</Button>
      </main>
    </div>
  );
}
