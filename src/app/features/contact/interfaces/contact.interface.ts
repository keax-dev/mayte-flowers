export interface ContactSubmissionPayload {
  companyName?: string;
  country?: string;
  email: string;
  honeypot?: string;
  inquiryType?: string;
  neededBy?: string;
  flowerType?: string;
  fullName?: string;
  message: string;
  quantity?: string;
  boxType?: string;
  source?: string;
}

export interface FormSubmitResponse {
  message?: string;
  success?: string;
}
