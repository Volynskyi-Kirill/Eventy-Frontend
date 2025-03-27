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
    socialMedia && socialMedia.length > 0 && socialMedia.some((sm) => sm.link);

  if (!hasValidSocialMedia) {
    return null;
  }

  return (
    <div className='mt-4'>
      <div className='text-lg font-semibold'>{t('socialMediaLabel')}</div>
      <ul className='list-disc pl-4'>
        {socialMedia!.map((sm, idx) =>
          sm.link ? (
            <li key={idx} className='text-md'>
              <a
                href={sm.link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'
              >
                {sm.platform}
              </a>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
