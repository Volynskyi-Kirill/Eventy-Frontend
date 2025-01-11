'use client';

import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useId, useState } from 'react';

export default function PasswordInput({
  placeholder = 'Password',
  className = '',
}: {
  placeholder?: string;
  className?: string;
}) {
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className='relative space-y-2'>
      <Input
        id={id}
        className={`h-12 border-0 bg-white/5 pr-10 text-white placeholder:text-muted-foreground ${className}`}
        placeholder={placeholder}
        type={isVisible ? 'text' : 'password'}
        required
      />
      <button
        className='absolute inset-y-0 right-0 flex h-12 w-12 items-center justify-center text-muted-foreground transition-colors hover:text-white'
        type='button'
        onClick={toggleVisibility}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
      >
        {isVisible ? (
          <EyeOff size={16} strokeWidth={2} aria-hidden='true' />
        ) : (
          <Eye size={16} strokeWidth={2} aria-hidden='true' />
        )}
      </button>
    </div>
  );
}
