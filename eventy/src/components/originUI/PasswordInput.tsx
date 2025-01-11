'use client';

import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useId, useState } from 'react';

interface PasswordInputProps {
  placeholder?: string;
  className?: string;
}

export default function PasswordInput({
  placeholder = 'Password',
  className = '',
}: PasswordInputProps) {
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className='relative'>
      <Input
        id={id}
        className={`h-12 border-0 bg-white/5 pr-10 text-white placeholder:text-muted-foreground ${className}`}
        placeholder={placeholder}
        type={isVisible ? 'text' : 'password'}
        required
      />
      <button
        type='button'
        onClick={toggleVisibility}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
        className='absolute top-1/2 right-2 -translate-y-1/2 
                   flex h-8 w-8 items-center justify-center
                   text-muted-foreground transition-colors 
                   hover:text-white'
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
