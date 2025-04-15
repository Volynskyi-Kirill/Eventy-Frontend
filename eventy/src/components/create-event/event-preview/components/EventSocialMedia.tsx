import { getSocialMediaIcon } from '@/lib/utils/socialMediaIcons';

interface SocialMediaLink {
  platform: string;
  link?: string;
}

interface EventSocialMediaProps {
  socialMedia?: SocialMediaLink[];
  t: any;
}

export function EventSocialMedia({ socialMedia, t }: EventSocialMediaProps) {
  const hasValidSocialMedia =
    socialMedia &&
    socialMedia.length > 0 &&
    socialMedia.some((socialMediaItem) => socialMediaItem.link);

  if (!hasValidSocialMedia) {
    return null;
  }

  const socialMediaWithLink = socialMedia?.filter(
    (socialMediaItem) => socialMediaItem.link
  );

  return (
    <div className='mt-4'>
      <div className='text-lg font-semibold'>{t('socialMediaLabel')}</div>
      <div className='flex flex-wrap gap-4 mt-2'>
        {socialMediaWithLink.map((socialMediaItem, index) => {
          const IconComponent = getSocialMediaIcon(socialMediaItem.platform);
          return (
            <div key={index} className='w-full'>
              <a
                href={socialMediaItem.link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline flex items-center gap-2 text-md'
              >
                <IconComponent className='h-4 w-4' />
                {socialMediaItem.platform}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
