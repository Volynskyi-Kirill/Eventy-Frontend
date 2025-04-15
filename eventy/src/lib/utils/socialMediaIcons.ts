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

export const PLATFORM_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  telegram: MessageCircle,
  tiktok: Music,
  default: ExternalLink,
};

export type SocialMediaIconType = typeof Facebook;

export function getSocialMediaIcon(platform: string): SocialMediaIconType {
  const normalizedPlatform = platform.toLowerCase();
  return (
    PLATFORM_ICONS[normalizedPlatform as keyof typeof PLATFORM_ICONS] ||
    PLATFORM_ICONS.default
  );
}
