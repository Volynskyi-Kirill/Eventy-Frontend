import { EventHero } from '@/components/home-page/event-hero';

export type Event = {
  title: string;
  description: string;
  tags: string[];
  price: number;
  currency: string; //enum?
  numberOfSeats: number;
  date: string;
  time: string;
  country: string;
  city: string;
  backgroundImage: string;
};

const EVENTS: Event[] = [
  {
    title: 'EVENT TITLE',
    description:
      'Онлайн-ідеатон з розвитку healthtech стартапів — “Generation H: Ideathon” від SET University',
    tags: ['#Badges', '#Badges-2'],
    price: 250,
    currency: 'UAH',
    numberOfSeats: 100,
    date: '2024-10-22',
    time: '10:10',
    country: 'Ukraine',
    city: 'Dnipro',
    backgroundImage: '/home-page/background-event.png',
  },
];

export default function HomePage() {
  return (
    <main>
      <EventHero events={EVENTS} />
    </main>
  );
}
