interface EventZone {
  name: string;
  price: number;
  currency: string;
  seatCount: number;
}

interface EventPricingProps {
  eventZones?: EventZone[];
  t: any;
}

export function EventPricing({ eventZones, t }: EventPricingProps) {
  const hasEventZones = eventZones && eventZones.length > 0;

  return (
    <div className='mt-4'>
      <div className='text-lg font-semibold'>{t('priceLabel')}</div>
      {hasEventZones ? (
        <ul className='list-disc pl-4'>
          {eventZones!.map((zone, idx) => (
            <li key={idx} className='text-md'>
              {zone.name}: {renderPrice(zone.price, zone.currency, t)} (
              {zone.seatCount} {t('seatsLabel')})
            </li>
          ))}
        </ul>
      ) : (
        <div className='text-md'>{t('freeLabel')}</div>
      )}
    </div>
  );
}

function renderPrice(price: number, currency: string, t: any) {
  const isFree = Number(price) === 0;
  return isFree ? t('freeLabel') : `${price} ${currency}`;
}
