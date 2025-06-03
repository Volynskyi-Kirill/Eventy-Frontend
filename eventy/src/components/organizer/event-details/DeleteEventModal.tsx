'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Trash2, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { eventsService } from '@/lib/api/events.service';
import { URLS } from '@/components/shared/Navigation/urls';

interface DeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
  eventTitle: string;
}

export function DeleteEventModal({
  isOpen,
  onClose,
  eventId,
  eventTitle,
}: DeleteEventModalProps) {
  const t = useTranslations('OrganizerEventDetailsPage');
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await eventsService.deleteEvent(eventId);
      toast.success(t('eventDeletedSuccessfully'));
      onClose();
      // Redirect to events page after successful deletion
      router.push(URLS.ORGANIZER.EVENTS);
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(t('errorDeletingEvent'));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-destructive'>
            <AlertTriangle className='h-5 w-5' />
            {t('deleteEventConfirmTitle')}
          </DialogTitle>
          <DialogDescription className='pt-2'>
            {t('deleteEventConfirmDescription')}
            <br />
            <span className='font-semibold mt-2 block'>"{eventTitle}"</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-col sm:flex-row gap-2'>
          <Button
            variant='outline'
            onClick={onClose}
            disabled={isDeleting}
            className='w-full sm:w-auto'
          >
            {t('deleteEventCancelButton')}
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isDeleting}
            className='w-full sm:w-auto'
          >
            {isDeleting ? (
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                <span>{t('deleting')}</span>
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <Trash2 className='h-4 w-4' />
                <span>{t('deleteEventConfirmButton')}</span>
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
