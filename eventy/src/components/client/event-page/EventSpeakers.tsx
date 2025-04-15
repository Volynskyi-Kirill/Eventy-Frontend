import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buildImageUrl } from '@/lib/utils/imageUrl';
import { Event } from '@/lib/types/event.types';

type EventSpeakersProps = {
  event: Event;
  t: any; // Translation function
};

const EventSpeakers = ({ event, t }: EventSpeakersProps) => {
  const hasSpeakers = event.speakers.length > 0;

  if (!hasSpeakers) {
    return null;
  }

  return (
    <div className='container px-4 md:px-6 mt-12 max-w-4xl mx-auto'>
      <div className='h-px bg-border w-full mb-6'></div>
      <h2 className='text-2xl font-bold mb-6 text-center'>{t('speakers')}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {event.speakers.map((speaker) => {
          const speakerInitials = `${speaker.userName?.[0] || ''}${
            speaker.userSurname?.[0] || ''
          }`;

          return (
            <div
              key={speaker.id}
              className='flex flex-col items-center text-center'
            >
              <Avatar className='h-24 w-24 mb-3'>
                <AvatarImage
                  src={buildImageUrl(speaker.avatarUrl)}
                  alt={`${speaker.userName} ${speaker.userSurname}`}
                />
                <AvatarFallback>{speakerInitials}</AvatarFallback>
              </Avatar>
              <h3 className='text-lg font-semibold'>{speaker.userName}</h3>
              <p className='text-muted-foreground'>{speaker.userSurname}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventSpeakers;
