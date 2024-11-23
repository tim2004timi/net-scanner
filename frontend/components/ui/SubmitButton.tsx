'use client';

import { useFormStatus } from 'react-dom';
import Button from './Button';

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type='submit' className='disabled:animate-pulse'>
      {text}
    </Button>
  );
}

export default SubmitButton;
