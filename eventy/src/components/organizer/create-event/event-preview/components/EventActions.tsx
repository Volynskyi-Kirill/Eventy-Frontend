import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
// import { URLS } from '@/components/Navigation/urls';
import { STORAGE_KEYS } from '@/lib/constants';
import { useSpeakersStore } from '@/store/speakersStore';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EventActionsProps {
  isSubmitting: boolean;
  t: any;
  onClearForm: () => void;
}

export function EventActions({
  isSubmitting,
  t,
  onClearForm,
}: EventActionsProps) {
  // const router = useRouter();
  const { clearSpeakers } = useSpeakersStore();
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleCancel = () => {
    // router.push(URLS.ORGANIZER.EVENTS);
  };

  const openClearDialog = () => {
    setShowClearDialog(true);
  };

  const handleClearForm = () => {
    localStorage.removeItem(STORAGE_KEYS.EVENT_FORM_DATA);
    clearSpeakers();
    onClearForm();
    setShowClearDialog(false);
  };

  return (
    <>
      <div className='mt-4 space-y-2'>
        <Button
          type='submit'
          className='w-full bg-emerald-500 hover:bg-emerald-600'
          disabled={isSubmitting}
        >
          {isSubmitting ? t('creating') : t('saveButton')}
        </Button>
        <Button
          type='button'
          variant='outline'
          className='w-full'
          onClick={handleCancel}
        >
          {t('cancelButton')}
        </Button>
        <Button
          type='button'
          variant='outline'
          className='w-full'
          onClick={openClearDialog}
        >
          {t('clearButton')}
        </Button>
      </div>

      {/* Clear form confirmation dialog */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('clearConfirmTitle')}</DialogTitle>
            <DialogDescription>
              {t('clearConfirmDescription')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex justify-between sm:justify-between'>
            <Button variant='outline' onClick={() => setShowClearDialog(false)}>
              {t('clearConfirmNo')}
            </Button>
            <Button variant='destructive' onClick={handleClearForm}>
              {t('clearConfirmYes')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
