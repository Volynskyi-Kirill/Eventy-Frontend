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
  const [copied, setCopied] = useState(false);

  const eventUrl = `${window.location.origin}${URLS.CLIENT.EVENT(eventId)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
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
            <div className='flex space-x-2'>
              <Input
                id='event-url'
                value={eventUrl}
                readOnly
                className='flex-1'
              />
              <Button
                type='button'
                size='sm'
                onClick={handleCopy}
                className='px-3'
              >
                {copied ? (
                  <Check className='h-4 w-4 text-green-600' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>
          {copied && (
            <p className='text-sm text-green-600'>
              {t('shareEventModalCopiedMessage')}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
