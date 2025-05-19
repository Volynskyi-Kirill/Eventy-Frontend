'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { URLS } from './Navigation/urls';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthRequiredModal({ isOpen, onClose }: AuthRequiredModalProps) {
  const t = useTranslations('Auth');
  const router = useRouter();

  const handleLogin = () => {
    router.push(URLS.SHARED.LOGIN);
    onClose();
  };

  const handleRegister = () => {
    router.push(URLS.SHARED.REGISTER);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('authRequired.title')}</DialogTitle>
          <DialogDescription>{t('authRequired.description')}</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4 py-4'>
          <Button onClick={handleLogin} className='w-full'>
            {t('authRequired.login')}
          </Button>
          <Button onClick={handleRegister} variant='outline' className='w-full'>
            {t('authRequired.register')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
