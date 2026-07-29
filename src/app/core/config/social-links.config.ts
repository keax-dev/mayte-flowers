import { AppConfig } from '@core/config/app-config.model';
import { SocialLink } from '@shared/ui/social-links/social-link.model';

type SocialLinksConfig = Pick<AppConfig, 'mapUrl' | 'phoneHref' | 'whatsappUrl'>;

export function createSocialLinks(config: SocialLinksConfig): readonly SocialLink[] {
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
