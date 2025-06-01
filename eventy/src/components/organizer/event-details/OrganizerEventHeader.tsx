'use client';

import Image from 'next/image';
import { buildImageUrl } from '@/lib/utils/imageUrl';
import { OrganizerEventDetails } from '@/lib/types/organizer-event-details.types';

interface OrganizerEventHeaderProps {
  event: OrganizerEventDetails;
}

export function OrganizerEventHeader({ event }: OrganizerEventHeaderProps) {
  return (
    <div className='relative h-64 md:h-80 lg:h-96 w-full overflow-hidden'>
      {/* Cover Image */}
      <Image
        src={buildImageUrl(event.coverImg)}
        alt={`${event.title} cover`}
        fill
        className='object-cover'
        priority
      />

      {/* Dark overlay for better text readability */}
      <div className='absolute inset-0 bg-black bg-opacity-40' />

      {/* Logo positioned in the bottom right */}
      {event.logoImg && (
        <div className='absolute bottom-4 right-4 md:bottom-6 md:right-6'>
          <div className='bg-white rounded-lg p-2 shadow-lg'>
            <Image
              src={buildImageUrl(event.logoImg)}
              alt={`${event.title} logo`}
              width={80}
              height={40}
              className='object-contain'
            />
          </div>
        </div>
      )}
    </div>
  );
}
