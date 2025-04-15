import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ExternalLink,
  MessageCircle,
  Music,
} from 'lucide-react';

type SocialMedia = {
  id: number;
  platform: string;
  link: string;
};

type SocialMediaLinksProps = {
  socialMedia: SocialMedia[];
};

const PLATFORM_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  telegram: MessageCircle,
  tiktok: Music,
  default: ExternalLink,
};

const SocialMediaLinks = ({ socialMedia }: SocialMediaLinksProps) => {
  return (
    <div className='flex items-center justify-center gap-3 mt-5'>
      {socialMedia.map((social) => {
        const platform = social.platform.toLowerCase();
        const IconComponent =
          PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS] ||
          PLATFORM_ICONS.default;

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
