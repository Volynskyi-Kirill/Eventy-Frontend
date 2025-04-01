import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserByEmail } from '@/lib/api/users.service';

interface SpeakersState {
  speakers: UserByEmail[];
  addSpeaker: (speaker: UserByEmail) => void;
  removeSpeaker: (speakerId: number) => void;
  getSpeakerById: (id: number) => UserByEmail | undefined;
  clearSpeakers: () => void;
}

export const useSpeakersStore = create(
  persist<SpeakersState>(
    (set, get) => ({
      speakers: [],

      addSpeaker: (speaker: UserByEmail) => {
        const { speakers } = get();
        const isSpeakerExists = speakers.some((s) => s.id === speaker.id);

        if (!isSpeakerExists) {
          set({ speakers: [...speakers, speaker] });
        }
      },

      removeSpeaker: (speakerId: number) => {
        const { speakers } = get();
        set({
          speakers: speakers.filter((speaker) => speaker.id !== speakerId),
        });
      },

      getSpeakerById: (id: number) => {
        const { speakers } = get();
        return speakers.find((speaker) => speaker.id === id);
      },

      clearSpeakers: () => {
        set({ speakers: [] });
      },
    }),
    {
      name: 'speakers-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
