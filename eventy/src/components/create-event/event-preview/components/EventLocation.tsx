import { MapPin } from 'lucide-react';

interface LocationObject {
  name: string;
  [key: string]: any;
}

interface EventLocationProps {
  country?: string | LocationObject | null;
  state?: string | LocationObject | null;
  city?: string | LocationObject | null;
  street?: string;
  buildingNumber?: string;
}

export function EventLocation({
  country,
  state,
  city,
  street,
  buildingNumber,
}: EventLocationProps) {
  const countryName = getDisplayName(country);
  const stateName = getDisplayName(state);
  const cityName = getDisplayName(city);

  const locationParts = [
    countryName,
    stateName,
    cityName,
    street,
    buildingNumber,
  ];
  const location = locationParts.filter(Boolean).join(', ');

  if (!location) {
    return null;
  }

  return (
    <div className='flex items-center text-sm text-gray-500 mb-2'>
      <MapPin className='h-4 w-4 mr-1' />
      <span>{location}</span>
    </div>
  );
}

function getDisplayName(item?: string | LocationObject | null) {
  if (!item) return;

  const isLocationObject = typeof item === 'object';
  return isLocationObject ? item.name : item;
}
