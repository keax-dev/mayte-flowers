import { ContactSubmissionPayload, FormSubmitResponse } from '../interfaces/contact.interface';
import { ContactSubmissionGateway } from '@features/contact/application/contact-submission.gateway';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONTACT_CONFIG } from '@core/config/app-config.token';
import { map, Observable } from 'rxjs';

@Injectable()
export class FormSubmitContactGateway implements ContactSubmissionGateway {
  private readonly config = inject(CONTACT_CONFIG);
  private readonly http = inject(HttpClient);

  submit(payload: ContactSubmissionPayload): Observable<void> {
    const formData = this.buildFormData(payload);

    return this.http
      .post<FormSubmitResponse>(`https://formsubmit.co/ajax/${this.config.contactEmail}`, formData)
      .pipe(map(() => void 0));
  }

  private buildFormData(payload: ContactSubmissionPayload): FormData {
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

    return formData;
  }
}
