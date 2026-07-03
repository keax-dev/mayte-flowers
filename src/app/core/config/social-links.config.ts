import { AppConfig } from '@core/config/app-config.model';

export interface SocialLinkConfig {
  readonly label: string;
  readonly href: string;
  readonly icon: 'instagram' | 'location' | 'phone' | 'whatsapp';
  readonly openInNewTab?: boolean;
}

export function createSocialLinks(config: AppConfig): readonly SocialLinkConfig[] {
  return [
    {
      label: 'Instagram',
      href: 'https://instagram.com/alxgardenec?igshid=OGQ5ZDc2ODk2ZA==',
      icon: 'instagram',
      openInNewTab: true,
    },
    {
      label: 'WhatsApp',
      href: config.whatsappUrl,
      icon: 'whatsapp',
      openInNewTab: true,
    },
    {
      label: 'Phone',
      href: config.phoneHref,
      icon: 'phone',
    },
    {
      label: 'Location',
      href: config.mapUrl,
      icon: 'location',
      openInNewTab: true,
    },
  ];
}
