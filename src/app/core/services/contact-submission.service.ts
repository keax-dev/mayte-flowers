import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { COMPANY_INFO } from '@core/data/company.data';

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

interface FormSubmitResponse {
  message?: string;
  success?: string;
}

@Injectable({ providedIn: 'root' })
export class ContactSubmissionService {
  private readonly http = inject(HttpClient);

  submit(payload: ContactSubmissionPayload): Observable<void> {
    if (payload.honeypot?.trim()) {
      return of(void 0);
    }

    const formData = new FormData();
    formData.append('full_name', payload.fullName?.trim() ?? '');
    formData.append('company_name', payload.companyName?.trim() ?? '');
    formData.append('email', payload.email.trim());
    formData.append('inquiry_type', payload.inquiryType?.trim() ?? 'general');
    formData.append('flower_type', payload.flowerType?.trim() ?? '');
    formData.append('quantity', payload.quantity?.trim() ?? '');
    formData.append('destination_country', payload.country?.trim() ?? '');
    formData.append('needed_by', payload.neededBy?.trim() ?? '');
    formData.append('packing_or_box_type', payload.boxType?.trim() ?? '');
    formData.append('source', payload.source?.trim() ?? 'website');
    formData.append('message', payload.message.trim());
    formData.append('_subject', 'New ALX Garden contact request');
    formData.append('_template', 'table');
    formData.append('_honey', payload.honeypot?.trim() ?? '');

    return this.http
      .post<FormSubmitResponse>(
        `https://formsubmit.co/ajax/${COMPANY_INFO.contactEmail}`,
        formData
      )
      .pipe(map(() => void 0));
  }
}
