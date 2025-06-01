'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EventBooking } from '@/lib/types/organizer-event-details.types';

interface EventBookingsTableProps {
  bookings: EventBooking[];
  selectedDate?: string;
}

type SortField =
  | 'purchaseDate'
  | 'buyerName'
  | 'seatNumber'
  | 'price'
  | 'eventDate';
type SortDirection = 'asc' | 'desc';

export function EventBookingsTable({
  bookings,
  selectedDate,
}: EventBookingsTableProps) {
  const t = useTranslations('OrganizerEventDetailsPage');
  const [sortField, setSortField] = useState<SortField>('purchaseDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Handle date sorting
      if (sortField === 'purchaseDate' || sortField === 'eventDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Handle string sorting
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [bookings, sortField, sortDirection]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className='h-4 w-4' />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className='h-4 w-4' />
    ) : (
      <ArrowDown className='h-4 w-4' />
    );
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <Button
      variant='ghost'
      className='h-auto p-0 font-semibold hover:bg-transparent'
      onClick={() => handleSort(field)}
    >
      <div className='flex items-center gap-2'>
        {children}
        {getSortIcon(field)}
      </div>
    </Button>
  );

  if (bookings.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-muted-foreground'>
          {selectedDate ? t('noBookingsForDate') : t('noBookings')}
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h4 className='font-semibold'>
          {t('bookingsTable')} ({sortedBookings.length})
        </h4>
        {selectedDate && (
          <Badge variant='outline'>
            {t('filterByDate')}: {formatDate(selectedDate)}
          </Badge>
        )}
      </div>

      <div className='border rounded-lg overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <SortableHeader field='seatNumber'>
                  {t('seatNumber')}
                </SortableHeader>
              </TableHead>
              <TableHead>
                <SortableHeader field='buyerName'>
                  {t('buyerName')}
                </SortableHeader>
              </TableHead>
              <TableHead>{t('zone')}</TableHead>
              <TableHead>
                <SortableHeader field='price'>{t('price')}</SortableHeader>
              </TableHead>
              <TableHead>{t('paymentMethod')}</TableHead>
              {!selectedDate && (
                <TableHead>
                  <SortableHeader field='eventDate'>
                    {t('eventDate')}
                  </SortableHeader>
                </TableHead>
              )}
              <TableHead>
                <SortableHeader field='purchaseDate'>
                  {t('purchaseDate')}
                </SortableHeader>
              </TableHead>
              <TableHead>{t('contact')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className='font-medium'>
                  #{booking.seatNumber}
                </TableCell>
                <TableCell>
                  <div>
                    <div className='font-medium'>{booking.buyerName}</div>
                    <div className='text-sm text-muted-foreground'>
                      {booking.buyerEmail}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant='secondary'>{booking.zoneName}</Badge>
                </TableCell>
                <TableCell>
                  {booking.price} {booking.currency}
                </TableCell>
                <TableCell>
                  <Badge variant='outline'>{booking.paymentMethod}</Badge>
                </TableCell>
                {!selectedDate && (
                  <TableCell>
                    <div>
                      <div>{formatDate(booking.eventDate)}</div>
                      <div className='text-sm text-muted-foreground'>
                        {booking.eventTime}
                      </div>
                    </div>
                  </TableCell>
                )}
                <TableCell>{formatDateTime(booking.purchaseDate)}</TableCell>
                <TableCell>
                  {booking.contactName && (
                    <div className='text-sm'>
                      <div>{booking.contactName}</div>
                      {booking.contactEmail && (
                        <div className='text-muted-foreground'>
                          {booking.contactEmail}
                        </div>
                      )}
                      {booking.contactPhone && (
                        <div className='text-muted-foreground'>
                          {booking.contactPhone}
                        </div>
                      )}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
