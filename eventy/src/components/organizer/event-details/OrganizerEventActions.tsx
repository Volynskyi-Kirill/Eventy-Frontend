'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Edit, Trash2, Share2, Eye, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { URLS } from '@/components/shared/Navigation/urls';
import { OrganizerEventDetails } from '@/lib/types/organizer-event-details.types';
import { ShareEventModal } from './ShareEventModal';
import { DeleteEventModal } from './DeleteEventModal';

interface OrganizerEventActionsProps {
  event: OrganizerEventDetails;
}

export function OrganizerEventActions({ event }: OrganizerEventActionsProps) {
  const t = useTranslations('OrganizerEventDetailsPage');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Проверяем, есть ли проданные билеты
  const hasSoldTickets = useMemo(() => {
    return event.statistics.soldTickets > 0;
  }, [event.statistics.soldTickets]);

  const handleDeleteEvent = () => {
    if (hasSoldTickets) {
      // Если есть проданные билеты, не открываем модалку
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const handleShareEvent = () => {
    setIsShareModalOpen(true);
  };

  const DeleteButton = () => {
    if (hasSoldTickets) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='w-full'>
                <Button
                  variant='outline'
                  className='w-full justify-start text-muted-foreground cursor-not-allowed opacity-50'
                  onClick={(e) => e.preventDefault()}
                  disabled={true}
                >
                  <AlertCircle className='mr-2 h-4 w-4' />
                  {t('deleteEvent')}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('deleteEventTooltip')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <Button
        variant='outline'
        className='w-full justify-start text-destructive hover:text-destructive'
        onClick={handleDeleteEvent}
      >
        <Trash2 className='mr-2 h-4 w-4' />
        {t('deleteEvent')}
      </Button>
    );
  };

  return (
    <>
      <Card>
        <CardContent className='p-4 space-y-3'>
          {/* Edit Event */}
          <Button variant='outline' className='w-full justify-start' asChild>
            <Link href={URLS.ORGANIZER.EVENT_EDIT(event.id)}>
              <Edit className='mr-2 h-4 w-4' />
              {t('editEvent')}
            </Link>
          </Button>

          {/* Delete Event */}
          <DeleteButton />

          {/* Share Event */}
          <Button
            variant='outline'
            className='w-full justify-start'
            onClick={handleShareEvent}
          >
            <Share2 className='mr-2 h-4 w-4' />
            {t('shareEvent')}
          </Button>

          {/* Preview Page */}
          <Button
            variant='default'
            className='w-full justify-start bg-primary hover:bg-primary/90'
            asChild
          >
            <Link href={URLS.CLIENT.EVENT(event.id)}>
              <Eye className='mr-2 h-4 w-4' />
              {t('previewPage')}
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Share Event Modal */}
      <ShareEventModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        eventId={event.id}
      />

      {/* Delete Event Modal */}
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        eventId={event.id}
        eventTitle={event.title}
      />
    </>
  );
}
