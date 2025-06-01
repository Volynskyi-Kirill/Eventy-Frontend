'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Copy, Check, Share2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { URLS } from '@/components/shared/Navigation/urls';

interface ShareEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
}

export function ShareEventModal({
  isOpen,
  onClose,
  eventId,
}: ShareEventModalProps) {
  const t = useTranslations('OrganizerEventDetailsPage');
  const [isCopied, setIsCopied] = useState(false);

  // Формируем полную ссылку на событие
  const eventUrl = `${window.location.origin}${URLS.CLIENT.EVENT(eventId)}`;

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setIsCopied(true);
      // Сбрасываем состояние через 2 секунды
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = eventUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Share2 className='h-5 w-5' />
            {t('shareEventModalTitle')}
          </DialogTitle>
          <DialogDescription>
            {t('shareEventModalDescription')}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='event-url'>{t('shareEventModalUrlLabel')}</Label>
            <div className='flex gap-2'>
              <Input
                id='event-url'
                value={eventUrl}
                readOnly
                className='flex-1'
              />
              <Button
                type='button'
                size='sm'
                className='px-3'
                onClick={handleCopyToClipboard}
              >
                {isCopied ? (
                  <Check className='h-4 w-4' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>

          {isCopied && (
            <p className='text-sm text-green-600 font-medium'>
              {t('shareEventModalCopiedMessage')}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
