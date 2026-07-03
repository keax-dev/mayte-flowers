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

export const TRUST_HIGHLIGHTS: readonly TrustHighlight[] = [
  {
    label: 'Direct contact',
    value: '1:1',
    description:
      'You speak directly with our team to review varieties, quote details and packing needs.',
  },
  {
    label: 'Flower portfolio',
    value: '4 lines',
    description:
      'Roses, gypsophila, hypericum and sunflowers in a catalogue built for commercial buyers.',
  },
  {
    label: 'Quote workflow',
    value: 'Fast',
    description:
      'WhatsApp and the quote form are ready for current availability, order windows and destination details.',
  },
  {
    label: 'Packing support',
    value: 'Flexible',
    description:
      'We can confirm stem lengths, box preferences and mixed-order requirements during the quote process.',
  },
];

export const BUYER_PROMISES: readonly BuyerPromise[] = [
  {
    title: 'Fresh-cut planning',
    description:
      'Tell us what varieties and stem lengths you need, and we will help you shape a practical quote request.',
  },
  {
    title: 'Post-harvest focus',
    description:
      'The catalogue is organized around vase life, presentation and commercial specs that matter to buyers.',
  },
  {
    title: 'Export-ready conversations',
    description:
      'Country, delivery window and packing preferences are captured from the first contact so follow-up is faster.',
  },
];

export const BUYER_CHECKLIST: readonly BuyerChecklistItem[] = [
  {
    title: 'Variety and color',
    description: 'Tell us the flower type or exact variety you want to quote.',
  },
  {
    title: 'Quantity and box preference',
    description: 'Share approximate volume, mixed box needs or preferred packing format.',
  },
  {
    title: 'Destination country',
    description: 'This helps us understand your logistics context from the start.',
  },
  {
    title: 'Needed date',
    description: 'Let us know the target delivery or event window for your order.',
  },
];
