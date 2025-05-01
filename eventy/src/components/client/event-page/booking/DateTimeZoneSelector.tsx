'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, TicketCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ticket } from '@/lib/api/tickets.service';
import { useTranslations } from 'next-intl';

type GroupedTicket = {
  dateId: number;
  dateStr: string;
  formattedDate: { day: string; month: string; year: string };
  time: string;
  zones: {
    zoneId: number;
    zoneName: string;
    price: number;
    currency: string;
    totalSeats: number;
    availableSeats: number;
    tickets: Ticket[];
  }[];
};

type DateTimeZoneSelectorProps = {
  groupedTickets: GroupedTicket[];
  onSelect: (
    dateInfo: {
      dateId: number;
      dateStr: string;
      formattedDate: string;
      time: string;
    },
    zoneInfo: {
      zoneId: number;
      zoneName: string;
      price: number;
      currency: string;
    },
    tickets: Ticket[]
  ) => void;
};

const DateTimeZoneSelector = ({
  groupedTickets,
  onSelect,
}: DateTimeZoneSelectorProps) => {
  const t = useTranslations('BookingPage');
  const [selectedDate, setSelectedDate] = useState<string | null>(
    groupedTickets.length > 0 ? groupedTickets[0].dateStr : null
  );
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedZone(null);
  };

  const handleZoneSelect = (
    dateId: number,
    dateStr: string,
    formattedDate: string,
    time: string,
    zone: GroupedTicket['zones'][0]
  ) => {
    setSelectedZone(zone.zoneId);

    onSelect(
      {
        dateId,
        dateStr,
        formattedDate: `${formattedDate.day}.${formattedDate.month}.${formattedDate.year}`,
        time,
      },
      {
        zoneId: zone.zoneId,
        zoneName: zone.zoneName,
        price: zone.price,
        currency: zone.currency,
      },
      zone.tickets
    );
  };

  if (groupedTickets.length === 0) {
    return (
      <div className='mt-6 p-6 border rounded-lg text-center'>
        <p className='text-muted-foreground'>{t('noTicketsAvailable')}</p>
      </div>
    );
  }

  const selectedDateData = groupedTickets.find(
    (date) => date.dateStr === selectedDate
  );

  return (
    <div className='mt-6'>
      <Tabs defaultValue='date' className='w-full'>
        <TabsList className='grid grid-cols-2'>
          <TabsTrigger value='date'>{t('dateTime')}</TabsTrigger>
          <TabsTrigger value='zone'>{t('zone')}</TabsTrigger>
        </TabsList>
        <TabsContent value='date'>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg flex items-center gap-2'>
                <Calendar className='h-5 w-5' />
                {t('selectDate')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                {groupedTickets.map((date) => {
                  const { formattedDate } = date;
                  const dateStr = `${formattedDate.day}.${formattedDate.month}.${formattedDate.year}`;

                  return (
                    <Button
                      key={date.dateStr}
                      variant={
                        selectedDate === date.dateStr ? 'default' : 'outline'
                      }
                      className='h-auto py-2 flex-col'
                      onClick={() => handleDateSelect(date.dateStr)}
                    >
                      <div className='flex flex-col'>
                        <span>{dateStr}</span>
                        <span className='text-xs mt-1'>{date.time}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='zone'>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg flex items-center gap-2'>
                <TicketCheck className='h-5 w-5' />
                {t('selectZone')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedDate ? (
                <p className='text-center text-muted-foreground'>
                  {t('selectDateFirst')}
                </p>
              ) : (
                <div className='space-y-4'>
                  {selectedDateData?.zones.map((zone) => (
                    <div
                      key={zone.zoneId}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedZone === zone.zoneId
                          ? 'border-primary bg-primary/5'
                          : ''
                      }`}
                      onClick={() =>
                        handleZoneSelect(
                          selectedDateData.dateId,
                          selectedDateData.dateStr,
                          selectedDateData.formattedDate,
                          selectedDateData.time,
                          zone
                        )
                      }
                    >
                      <div className='flex justify-between items-center'>
                        <div>
                          <h4 className='font-medium'>{zone.zoneName}</h4>
                          <div className='flex items-center gap-2 mt-1'>
                            <Badge variant='outline' className='text-xs'>
                              {zone.availableSeats}/{zone.totalSeats}{' '}
                              {t('seatsAvailable')}
                            </Badge>
                            <span className='text-sm font-medium'>
                              {zone.price} {zone.currency}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                            selectedZone === zone.zoneId
                              ? 'border-primary'
                              : 'border-muted'
                          }`}
                        >
                          {selectedZone === zone.zoneId && (
                            <div className='h-3 w-3 rounded-full bg-primary'></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DateTimeZoneSelector;
