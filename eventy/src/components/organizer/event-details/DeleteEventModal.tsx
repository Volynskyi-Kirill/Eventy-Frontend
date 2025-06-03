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

  const handleConfirmDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      await eventsService.deleteEvent(eventId);

      toast.success(t('eventDeletedSuccessfully'));
      onClose();

      // Редирект на список событий организатора
      router.push(URLS.ORGANIZER.EVENTS);
    } catch (error: any) {
      console.error('Error deleting event:', error);

      const errorMessage = error.response?.data?.message;
      if (errorMessage && errorMessage.includes('sold tickets')) {
        toast.error(t('cannotDeleteEventWithTickets'));
      } else {
        toast.error(t('errorDeletingEvent'));
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10'>
              <AlertTriangle className='h-5 w-5 text-destructive' />
            </div>
            <div>
              <DialogTitle className='text-left'>
                {t('deleteEventConfirmTitle')}
              </DialogTitle>
              <DialogDescription className='text-left mt-1'>
                &quot;{eventTitle}&quot;
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className='py-4'>
          <p className='text-sm text-muted-foreground'>
            {t('deleteEventConfirmDescription')}
          </p>
        </div>

        <DialogFooter className='gap-2'>
          <Button variant='outline' onClick={onClose} disabled={isDeleting}>
            {t('deleteEventCancelButton')}
          </Button>

          <Button
            variant='destructive'
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            className='gap-2'
          >
            {isDeleting ? (
              <>
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                {t('deleteEventConfirmButton')}
              </>
            ) : (
              <>
                <Trash2 className='h-4 w-4' />
                {t('deleteEventConfirmButton')}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
