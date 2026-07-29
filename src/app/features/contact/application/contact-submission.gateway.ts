import { ContactSubmissionPayload } from '@features/contact/interfaces/contact.interface';
import { Observable } from 'rxjs';

export abstract class ContactSubmissionGateway {
  abstract submit(payload: ContactSubmissionPayload): Observable<void>;
}
