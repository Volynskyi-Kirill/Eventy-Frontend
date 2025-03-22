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
import { speakers } from '@/data/speakers';

export function EventSpeakers() {
  const { watch, setValue } = useFormContext<CreateEventFormData>();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSpeaker = async () => {
    if (!email) {
      toast.error('Please enter an email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const user = await usersService.getUserByEmail(email);
      const currentSpeakers = watch('speakerIds') || [];

      const isSpeakerAlreadyAdded = currentSpeakers.includes(user.id);
      if (isSpeakerAlreadyAdded) {
        toast.error('This speaker is already added');
        return;
      }

      const isSpeakerAlreadyInLocalStorage = speakers.find(
        (speaker) => speaker.id === user.id
      );
      if (!isSpeakerAlreadyInLocalStorage) {
        speakers.push(user);
      }

      setValue('speakerIds', [...currentSpeakers, user.id], {
        shouldValidate: true,
      });
      setEmail('');
      toast.success('Speaker added successfully');
    } catch {
      toast.error('User not found');
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
      <Label>Speakers</Label>
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
          placeholder='Enter speaker email'
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
          {isLoading ? 'Adding...' : 'Add speaker'}
        </Button>
      </div>
    </div>
  );
}
