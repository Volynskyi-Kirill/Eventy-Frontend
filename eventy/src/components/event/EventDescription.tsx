import { Event } from '@/lib/types/event.types';

type EventDescriptionProps = {
  event: Event;
  t: any; // Translation function
};

const EventDescription = ({ event, t }: EventDescriptionProps) => {
  const hasDescription =
    event.fullDescription && event.fullDescription.trim().length > 0;

  if (!hasDescription) {
    return null;
  }

  const descriptionParagraphs = event.fullDescription.split('\n');

  return (
    <div className='container px-4 md:px-6 mt-12 max-w-4xl mx-auto'>
      <div className='h-px bg-border w-full mb-6'></div>
      <h2 className='text-2xl font-bold mb-4 text-center'>
        {t('fullDescription')}
      </h2>
      <div className='prose max-w-none'>
        {descriptionParagraphs.map((paragraph, index) => (
          <p key={index} className='mb-4'>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default EventDescription;
