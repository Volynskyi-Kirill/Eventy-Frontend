import { getSocialMediaIcon } from '@/lib/utils/socialMediaIcons';

type SocialMedia = {
  id: number;
  platform: string;
  link: string;
};

type SocialMediaLinksProps = {
  socialMedia: SocialMedia[];
};

const SocialMediaLinks = ({ socialMedia }: SocialMediaLinksProps) => {
  return (
    <div className='flex items-center justify-center gap-3 mt-5'>
      {socialMedia.map((social) => {
        const IconComponent = getSocialMediaIcon(social.platform);

        return (
          <a
            key={social.id}
            href={social.link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground hover:text-primary transition-colors'
            aria-label={social.platform}
          >
            <IconComponent className='h-5 w-5' />
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaLinks;
