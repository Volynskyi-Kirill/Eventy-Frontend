import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { buildImageUrl } from '@/lib/utils/imageUrl';
import { usersService } from '@/lib/api/users.service';

export function AvatarUpload() {
  const { user, fetchUser } = useAuthStore();
  const t = useTranslations('AvatarUpload');

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await usersService.uploadAvatar(file);
      await fetchUser();
      toast.success(t('uploadSuccess'));
    } catch (error) {
      toast.error(t('uploadError'));
      console.error('Avatar upload error:', error);
    }
  };

  //TODO user может не быть и из-за этого вместо аватара будет отображаться AvatarFallback?

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center h-screen space-y-4'>
        <p className='text-lg'>{t('notLoggedIn')}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center space-y-4'>
      <Avatar className='h-32 w-32'>
        <AvatarImage src={buildImageUrl(user.avatarUrl)} alt={user.userName} />
        <AvatarFallback>
          {user.userName?.[0]}
          {user.userSurname?.[0]}
        </AvatarFallback>
      </Avatar>
      <Button variant='outline' className='relative' asChild>
        <label>
          {t('loadPhoto')}
          <input
            type='file'
            className='absolute inset-0 w-full opacity-0 cursor-pointer'
            accept='image/*'
            onChange={handleAvatarUpload}
          />
        </label>
      </Button>
    </div>
  );
}
