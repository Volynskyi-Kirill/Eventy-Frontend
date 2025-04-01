import { useSpeakersStore } from '@/store/speakersStore';

interface EventSpeakersProps {
  speakerIds?: number[];
  t: any;
}

export function EventSpeakers({ speakerIds, t }: EventSpeakersProps) {
  const { speakers } = useSpeakersStore();
  const hasSpeakers = speakerIds && speakerIds.length > 0;

  if (!hasSpeakers) {
    return null;
  }

  const speakerNames = speakerIds
    .map((id: number) => {
      const speaker = speakers.find((s) => s.id === id);
      return speaker ? `${speaker.userName} ${speaker.userSurname}` : id;
    })
    .join(', ');

  return (
    <div className='mb-2 text-sm text-gray-500'>
      {t('speakersLabel')}: {speakerNames}
    </div>
  );
}
