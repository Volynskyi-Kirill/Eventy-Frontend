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
    title: 'EVENT TITLE 1',
    description:
      'Онлайн-ідеатон з розвитку healthtech стартапів — "Generation H: Ideathon" від SET University',
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
  {
    title: 'EVENT TITLE 2',
    description: 'Другий захоплюючий івент для розробників та дизайнерів',
    tags: ['#Tech', '#Design'],
    price: 300,
    currency: 'UAH',
    numberOfSeats: 150,
    date: '2024-11-15',
    time: '14:00',
    country: 'Ukraine',
    city: 'Kyiv',
    backgroundImage: '/home-page/background-event.png',
  },
  {
    title: 'EVENT TITLE 3',
    description: 'Третій інноваційний воркшоп з машинного навчання',
    tags: ['#AI', '#MachineLearning'],
    price: 400,
    currency: 'UAH',
    numberOfSeats: 80,
    date: '2024-12-05',
    time: '09:30',
    country: 'Ukraine',
    city: 'Lviv',
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
