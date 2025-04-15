import { Event } from '@/lib/types/event.types';

type EventLocationProps = {
  event: Event;
  fullAddress: string;
  t: any; // Translation function
};

const GOOGLE_MAPS_API_KEY = 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'; // TODO: Move to environment variable and get my own key

const EventLocation = ({ event, fullAddress, t }: EventLocationProps) => {
  const hasAddress = fullAddress && fullAddress.trim().length > 0;

  if (!hasAddress) {
    return null;
  }

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
    fullAddress
  )}`;

  return (
    <>
      <div className='container px-4 md:px-6 mt-12 max-w-4xl mx-auto'>
        <div className='h-px bg-border w-full mb-6'></div>
        <h2 className='text-2xl font-bold mb-4 text-center'>{t('address')}</h2>
      </div>

      <div
        id='map-location'
        className='container px-4 md:px-6 mt-4 mb-12 max-w-4xl mx-auto'
      >
        <div className='w-full h-[300px] relative rounded-lg overflow-hidden bg-muted'>
          <iframe
            title={t('eventLocation')}
            width='100%'
            height='100%'
            frameBorder='0'
            style={{ border: 0 }}
            src={mapUrl}
            allowFullScreen
            className='absolute inset-0'
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default EventLocation;
