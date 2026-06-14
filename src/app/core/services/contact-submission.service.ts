import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { COMPANY_INFO } from '@core/data/company.data';

export interface ContactSubmissionPayload {
  email: string;
  honeypot?: string;
  message: string;
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
    formData.append('email', payload.email.trim());
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
