import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { URLS } from '@/components/Navigation/urls';

interface EventActionsProps {
  isSubmitting: boolean;
  t: any;
}

export function EventActions({ isSubmitting, t }: EventActionsProps) {
  const router = useRouter();

  const handleCancel = () => {
    // router.push(URLS.ORGANIZER.EVENTS);
  };

  return (
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
    </div>
  );
}
