'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Edit, Trash2, Share2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { URLS } from '@/components/shared/Navigation/urls';
import { OrganizerEventDetails } from '@/lib/types/organizer-event-details.types';
import { ShareEventModal } from './ShareEventModal';

interface OrganizerEventActionsProps {
  event: OrganizerEventDetails;
}

export function OrganizerEventActions({ event }: OrganizerEventActionsProps) {
  const t = useTranslations('OrganizerEventDetailsPage');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleDeleteEvent = () => {
    // TODO: Implement delete functionality
    console.log('Delete event:', event.id);
  };

  const handleShareEvent = () => {
    setIsShareModalOpen(true);
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
          <Button
            variant='outline'
            className='w-full justify-start text-destructive hover:text-destructive'
            onClick={handleDeleteEvent}
          >
            <Trash2 className='mr-2 h-4 w-4' />
            {t('deleteEvent')}
          </Button>

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
    </>
  );
}
