'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { usersService } from '@/lib/api/users.service';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { useTranslations } from 'next-intl';
import { useSpeakersStore } from '@/store/speakersStore';

export function EventSpeakers() {
  const { watch, setValue } = useFormContext<CreateEventFormData>();
  const { speakers, addSpeaker } = useSpeakersStore();
  const t = useTranslations('EventSpeakers');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSpeaker = async () => {
    if (!email) {
      toast.error(t('noEmail'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t('invalidEmail'));
      return;
    }

    setIsLoading(true);
    try {
      const user = await usersService.getUserByEmail(email);
      const currentSpeakers = watch('speakerIds') || [];

      const isSpeakerAlreadyAdded = currentSpeakers.includes(user.id);
      if (isSpeakerAlreadyAdded) {
        toast.error(t('alreadyAdded'));
        return;
      }

      addSpeaker(user);

      setValue('speakerIds', [...currentSpeakers, user.id], {
        shouldValidate: true,
      });
      setEmail('');
      toast.success(t('success'));
    } catch {
      toast.error(t('notFound'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSpeaker = (speakerId: number) => {
    const currentSpeakers = watch('speakerIds') || [];
    const updatedSpeakers = currentSpeakers.filter((id) => id !== speakerId);
    setValue('speakerIds', updatedSpeakers, { shouldValidate: true });
  };

  const speakerIds = watch('speakerIds') || [];

  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-1'>
        <Label>{t('label')}</Label>
        <InfoTooltip text={t('infoTooltip')} />
      </div>
      <div className='flex flex-wrap gap-2 mb-2'>
        {speakerIds.map((speakerId) => {
          const speaker = speakers.find((speaker) => speaker.id === speakerId);
          return speaker ? (
            <Badge
              key={speakerId}
              className='bg-emerald-500 hover:bg-emerald-600'
            >
              {speaker.userName} {speaker.userSurname}
              <button
                type='button'
                className='ml-1'
                onClick={() => handleRemoveSpeaker(speakerId)}
              >
                <X className='h-3 w-3' />
              </button>
            </Badge>
          ) : null;
        })}
      </div>
      <div className='flex items-center gap-2'>
        <Input
          type='email'
          placeholder={t('emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='flex-1'
        />
        <Button
          type='button'
          onClick={handleAddSpeaker}
          disabled={isLoading}
          className='bg-emerald-500 text-white hover:bg-emerald-600'
        >
          {isLoading ? t('adding') : t('addSpeaker')}
        </Button>
      </div>
    </div>
  );
}
