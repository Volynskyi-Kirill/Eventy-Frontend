import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SORT_OPTIONS } from './constants';
import { EventSortProps } from './types';

export function EventSort({ onSortChange }: EventSortProps) {
  const t = useTranslations('EventsPage');

  return (
    <div className='flex items-center'>
      <span className='mr-2'>{t('sortBy')}</span>
      <Select defaultValue={SORT_OPTIONS.NEWEST} onValueChange={onSortChange}>
        <SelectTrigger className='w-[140px]'>
          <SelectValue placeholder={t('sortBy')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={SORT_OPTIONS.NEWEST}>{t('newest')}</SelectItem>
          <SelectItem value={SORT_OPTIONS.OLDEST}>{t('oldest')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
