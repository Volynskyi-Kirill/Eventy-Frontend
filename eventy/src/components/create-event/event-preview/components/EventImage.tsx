import Image from 'next/image';

interface EventImageProps {
  mainImagePreview?: string;
  title?: string;
  t: any; // Translation function
}

export function EventImage({ mainImagePreview, title, t }: EventImageProps) {
  const hasImage = Boolean(mainImagePreview);
  const imageAlt = title || 'Event';

  return (
    <div className='relative h-64 w-full bg-gray-200'>
      {hasImage ? (
        <Image
          src={mainImagePreview || '/placeholder.svg'}
          alt={imageAlt}
          fill
          className='object-cover'
        />
      ) : (
        <div className='flex items-center justify-center h-full text-gray-500'>
          {t('mainPhotoLabel')}
        </div>
      )}
    </div>
  );
}
