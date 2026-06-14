export interface SocialLink {
  label: string;
  href: string;
  icon: 'instagram' | 'location' | 'phone' | 'whatsapp';
  openInNewTab?: boolean;
}

export const COMPANY_INFO = {
  contactEmail: 'sales@alxgarden.com',
  defaultDescription:
    'ALX Garden produces and markets premium flowers including roses, gypsophila, hypericum and sunflowers.',
  logo: '/assets/logo.jpg',
  mapUrl:
    'https://www.google.com/maps/dir//MAYTE+FLOWERS/data=!4m8!4m7!1m0!1m5!1m1!1s0x91d5f5080a969315:0xfbb8e0c97453307d!2m2!1d-78.28539169999999!2d-0.0454457',
  name: 'ALX Garden',
  openingHours: 'Opening at 8:00 AM',
  phoneDisplay: '+1 470-673-4786',
  phoneHref: 'tel:+14706734786',
  tagline: 'Producers and marketers of different varieties of flowers',
  whatsappUrl: 'https://api.whatsapp.com/send?phone=14706734786'
} as const;

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/alxgardenec?igshid=OGQ5ZDc2ODk2ZA==',
    icon: 'instagram',
    openInNewTab: true
  },
  {
    label: 'WhatsApp',
    href: COMPANY_INFO.whatsappUrl,
    icon: 'whatsapp',
    openInNewTab: true
  },
  {
    label: 'Phone',
    href: COMPANY_INFO.phoneHref,
    icon: 'phone'
  },
  {
    label: 'Location',
    href: COMPANY_INFO.mapUrl,
    icon: 'location',
    openInNewTab: true
  }
];
