import { ContactSubmissionPayload } from '../interfaces/contact.interface';
import { ContactSubmissionGateway } from '@features/contact/application/contact-submission.gateway';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class ContactSubmissionService {
  private readonly gateway = inject(ContactSubmissionGateway);

  submit(payload: ContactSubmissionPayload): Observable<void> {
    if (payload.honeypot?.trim()) {
      return of(void 0);
    }

    return this.gateway.submit(payload);
  }
}
