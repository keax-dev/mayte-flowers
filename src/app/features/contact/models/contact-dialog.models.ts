export type ContactInquiryType = 'availability' | 'general' | 'quote';

export interface ContactDialogData {
  country?: string;
  flowerType?: string;
  inquiryType?: ContactInquiryType;
  message?: string;
  source?: string;
}
