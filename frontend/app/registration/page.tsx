'use client';
import { registration } from '@/actions/registration';
import Input from '@/components/ui/Input';
import SubmitButton from '@/components/ui/SubmitButton';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { twMerge } from 'tailwind-merge';

export default function Registration() {
  const [state, formAction] = useFormState(registration, { url: '', message: '' });

  return (
    <div className='flex h-screen items-center justify-center'>
      <form
        action={formAction}
        className={twMerge(
          'flex flex-col gap-4 rounded-lg border border-main-darker px-4 py-3',
          state.url && 'hidden'
        )}
      >
        <div className='flex flex-col gap-1'>
          <span className='flex items-center text-lg font-bold leading-6'>Регистрация</span>
          <span className='text-sm text-muted'>Введите необходимые данные для регистрации</span>
        </div>
        <Input
          placeholder='Логин'
          required
          name='username'
          wrapperClassName='w-full'
          title='Логин'
        />
        <Input
          placeholder='Пароль'
          required
          name='password'
          wrapperClassName='w-full'
          title='Пароль'
          type='password'
        />
        <Input
          placeholder='Подтвердите пароль'
          wrapperClassName='w-full'
          required
          title='Подтверждение пароля'
          name='passwordSubmit'
          type='password'
        />
        {state.message && <p className='text-red-500'>{state.message}</p>}
        <SubmitButton text='Регистрация' />
      </form>
      <div
        className={twMerge(
          'flex flex-col gap-4 rounded-lg border border-main-darker px-4 py-3',
          !state.url && 'hidden'
        )}
      >
        <div className='flex flex-col gap-1'>
          <span className='flex items-center text-lg font-bold leading-6'>Активация</span>
          <span className='text-sm text-muted'>Активируйте ваш аккаунт</span>
        </div>
        <span className='text-sm leading-4 text-muted'>
          Перейдите для активации -{' '}
          <Link
            target='_blank'
            rel='noopener noreferrer'
            href={`https://${state.url}`}
            className='underline transition-all hover:opacity-75'
          >
            @ScannerBoxBot
          </Link>
        </span>
        <span className='text-sm leading-4 text-muted'>
          После активации аккаунта вы можете -{' '}
          <Link href='/' className='underline transition-all hover:opacity-75'>
            Войти в систему
          </Link>
        </span>
      </div>
    </div>
  );
}
