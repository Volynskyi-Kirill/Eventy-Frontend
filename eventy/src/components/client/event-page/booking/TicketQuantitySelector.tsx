'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Ticket } from 'lucide-react';

type TicketQuantitySelectorProps = {
  maxTickets: number;
  ticketCount: number;
  onChange: (count: number) => void;
  translations: {
    tickets: string;
    ticketCount: string;
  };
};

const TicketQuantitySelector = ({
  maxTickets,
  ticketCount,
  onChange,
  translations,
}: TicketQuantitySelectorProps) => {
  const increment = () => {
    if (ticketCount < maxTickets) {
      onChange(ticketCount + 1);
    }
  };

  const decrement = () => {
    if (ticketCount > 1) {
      onChange(ticketCount - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg flex items-center gap-2'>
          <Ticket className='h-5 w-5' />
          {translations.tickets}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between'>
          <span>{translations.ticketCount}</span>
          <div className='flex items-center'>
            <Button
              variant='outline'
              size='icon'
              className='h-8 w-8 rounded-full'
              onClick={decrement}
              disabled={ticketCount <= 1}
            >
              <Minus className='h-4 w-4' />
              <span className='sr-only'>Decrease</span>
            </Button>
            <span className='w-12 text-center text-lg font-medium'>
              {ticketCount}
            </span>
            <Button
              variant='outline'
              size='icon'
              className='h-8 w-8 rounded-full'
              onClick={increment}
              disabled={ticketCount >= maxTickets}
            >
              <Plus className='h-4 w-4' />
              <span className='sr-only'>Increase</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketQuantitySelector;
