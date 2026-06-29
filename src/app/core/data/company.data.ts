export interface SocialLink {
  label: string;
  href: string;
  icon: 'instagram' | 'location' | 'phone' | 'whatsapp';
  openInNewTab?: boolean;
}

export interface TrustHighlight {
  description: string;
  label: string;
  value: string;
}

export interface BuyerPromise {
  description: string;
  title: string;
}

export interface BuyerChecklistItem {
  description: string;
  title: string;
}

export const COMPANY_INFO = {
  contactEmail: 'sales@alxgarden.com',
  defaultDescription:
    'ALX Garden produces and markets premium flowers including roses, gypsophila, hypericum and sunflowers.',
  defaultOgImage: '/assets/carrousel-1.jpg',
  gaMeasurementId: '',
  logo: '/assets/logo.jpg',
  mapUrl:
    'https://www.google.com/maps/dir//MAYTE+FLOWERS/data=!4m8!4m7!1m0!1m5!1m1!1s0x91d5f5080a969315:0xfbb8e0c97453307d!2m2!1d-78.28539169999999!2d-0.0454457',
  name: 'ALX Garden',
  openingHours: 'Opening at 8:00 AM',
  phoneDisplay: '+1 470-673-4786',
  phoneHref: 'tel:+14706734786',
  quoteResponsePromise:
    'Share the variety, quantity, destination and required date. We will follow up with availability and packing options.',
  salesFocus:
    'Fresh-cut flower supply for wholesalers, importers, florists and event-focused buyers.',
  siteUrl: 'https://alxgarden.com',
  tagline: 'Producers and marketers of different varieties of flowers',
  whatsappUrl: 'https://api.whatsapp.com/send?phone=14706734786'
} as const;

export const TRUST_HIGHLIGHTS: readonly TrustHighlight[] = [
  {
    label: 'Direct contact',
    value: '1:1',
    description:
      'You speak directly with our team to review varieties, quote details and packing needs.'
  },
  {
    label: 'Flower portfolio',
    value: '4 lines',
    description:
      'Roses, gypsophila, hypericum and sunflowers in a catalogue built for commercial buyers.'
  },
  {
    label: 'Quote workflow',
    value: 'Fast',
    description:
      'WhatsApp and the quote form are ready for current availability, order windows and destination details.'
  },
  {
    label: 'Packing support',
    value: 'Flexible',
    description:
      'We can confirm stem lengths, box preferences and mixed-order requirements during the quote process.'
  }
] as const;

export const BUYER_PROMISES: readonly BuyerPromise[] = [
  {
    title: 'Fresh-cut planning',
    description:
      'Tell us what varieties and stem lengths you need, and we will help you shape a practical quote request.'
  },
  {
    title: 'Post-harvest focus',
    description:
      'The catalogue is organized around vase life, presentation and commercial specs that matter to buyers.'
  },
  {
    title: 'Export-ready conversations',
    description:
      'Country, delivery window and packing preferences are captured from the first contact so follow-up is faster.'
  }
] as const;

export const BUYER_CHECKLIST: readonly BuyerChecklistItem[] = [
  {
    title: 'Variety and color',
    description: 'Tell us the flower type or exact variety you want to quote.'
  },
  {
    title: 'Quantity and box preference',
    description: 'Share approximate volume, mixed box needs or preferred packing format.'
  },
  {
    title: 'Destination country',
    description: 'This helps us understand your logistics context from the start.'
  },
  {
    title: 'Needed date',
    description: 'Let us know the target delivery or event window for your order.'
  }
] as const;

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

export function buildAbsoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${COMPANY_INFO.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildWhatsappUrl(message: string): string {
  return `${COMPANY_INFO.whatsappUrl}&text=${encodeURIComponent(message)}`;
}
