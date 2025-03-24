import { CreateEventFormData } from './createEventSchema';

export const createEventDefaultValues: CreateEventFormData = {
  title: '',
  categoryIds: [],
  dates: [{ date: '' }],
  country: null as any,
  state: null as any,
  city: null as any,
  street: '',
  buildingNumber: '',
  speakerIds: [],
  shortDescription: '',
  fullDescription: '',
  eventZones: [{ name: 'Zone - 1', price: 0, currency: 'USD', seatCount: 100 }],
  socialMedia: [],
  coverImg: '',
  logoImg: '',
  mainImg: '',
};

export const createEventDevDefaultValues: CreateEventFormData = {
  title: 'Tech Future Conference 2025',
  categoryIds: [3, 4],
  dates: [{ date: '2025-03-24T15:41' }, { date: '2025-03-28T15:41' }],
  country: {
    id: 156,
    name: 'Netherlands',
  },
  state: {
    id: 2611,
    name: 'Gelderland',
  },
  street: 'Zandlaan',
  buildingNumber: '27',
  city: {
    id: 77625,
    name: 'Ede',
  },
  speakerIds: [8, 5],
  shortDescription: 'Международная конференция о будущем технологий',
  fullDescription:
    'Tech Future Conference 2025 объединяет лидеров индустрии, стартаперов и ученых, чтобы обсудить ключевые тренды и инновации в области ИИ, квантовых технологий и устойчивого развития.',
  eventZones: [
    {
      name: 'Main Hall',
      price: 0,
      currency: 'EUR',
      seatCount: 100,
    },
    {
      name: 'VIP Lounge',
      price: 300,
      currency: 'EUR',
      seatCount: 50,
    },
  ],
  socialMedia: [
    {
      platform: 'LinkedIn',
      link: 'https://instagram.com/',
    },
    {
      platform: 'LinkedIn',
      link: 'https://linkedin.com/',
    },
  ],
  coverImg: '/uploads/8-Kyrylo/0fb624eb-fbe5-453f-b6e6-afce6518b541.webp',
  logoImg: '',
  mainImg: '/uploads/8-Kyrylo/2feb7c9f-04e0-46e6-a62f-f97ea6ffbd91.webp',
};
