export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: 'instagram' | 'location' | 'phone' | 'whatsapp';
  readonly openInNewTab?: boolean;
}
