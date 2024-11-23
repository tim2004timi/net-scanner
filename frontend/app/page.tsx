'use client';
import { loginFirstStep } from '@/actions/loginFirstStep';
import { loginSecondStep } from '@/actions/loginSecondState';
import Input from '@/components/ui/Input';
import SubmitButton from '@/components/ui/SubmitButton';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { twMerge } from 'tailwind-merge';

export default function Login() {
  const [state, formAction] = useFormState(loginFirstStep, { done: '', message: '', login: '' });
  const [loginState, loginAction] = useFormState(loginSecondStep, { message: '' });

  return (
    <div className='flex h-screen items-center justify-center'>
      <form
        action={formAction}
        className={twMerge(
          'flex flex-col gap-4 rounded-lg border border-main-darker px-4 py-3',
          state.done && 'hidden'
        )}
      >
        <div className='flex flex-col gap-1'>
          <span className='flex items-center text-lg font-bold leading-6'>Вход</span>
          <span className='text-sm text-muted'>Введите свои данные для входа</span>
        </div>
        <Input placeholder='Логин' required title='Логин' name='username' />
        <Input placeholder='Пароль' required title='Пароль' name='password' />
        <span className='text-sm text-muted'>
          Нет аккаунта?{' '}
          <Link href='registration' className='underline transition-all hover:opacity-75'>
            Зарегистрируйтесь
          </Link>
        </span>
        {state.message && <p className='text-red-500'>{state.message}</p>}
        <SubmitButton text='Продолжить' />
      </form>
      <form
        action={loginAction}
        className={twMerge(
          'flex flex-col gap-4 rounded-lg border border-main-darker px-4 py-3',
          !state.done && 'hidden'
        )}
      >
        <div className='flex flex-col gap-1'>
          <span className='flex items-center text-lg font-bold leading-6'>Вход</span>
          <span className='text-sm text-muted'>Войдите в аккаунт</span>
        </div>
        <Input placeholder='Код' required title='Код' name='code' />
        <Input
          defaultValue={state.login}
          title='Имя пользователя'
          type='hidden'
          name='username'
          wrapperClassName='sr-only border-0'
        />
        <span className='text-sm leading-4 text-muted'>
          Бот для активации -{' '}
          <Link
            target='_blank'
            rel='noopener noreferrer'
            href='https://t.me/ScannerBoxBot'
            className='underline transition-all hover:opacity-75'
          >
            @ScannerBoxBot
          </Link>
        </span>
        {loginState?.message && <p className='text-red-500'>{loginState.message}</p>}
        <SubmitButton text='Войти' />
      </form>
    </div>
  );
}
