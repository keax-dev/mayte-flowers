import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ContactSubmissionService } from '@app/features/contact/services/contact-submission.service';
import { TestBed } from '@angular/core/testing';

describe('ContactSubmissionService', () => {
  let httpMock: HttpTestingController;
  let service: ContactSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactSubmissionService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ContactSubmissionService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('posts contact requests to FormSubmit AJAX endpoint', () => {
    service
      .submit({
        email: 'hello@example.com',
        message: 'I need a quote.',
      })
      .subscribe();

    const request = httpMock.expectOne('https://formsubmit.co/ajax/sales@alxgarden.com');
    expect(request.request.method).toBe('POST');
    expect(request.request.body instanceof FormData).toBeTrue();
    expect((request.request.body as FormData).get('email')).toBe('hello@example.com');
    expect((request.request.body as FormData).get('message')).toBe('I need a quote.');
    request.flush({ success: 'true' });
  });

  it('short-circuits spam submissions when honeypot is filled', () => {
    service
      .submit({
        email: 'bot@example.com',
        honeypot: 'https://spam.example.com',
        message: 'spam',
      })
      .subscribe();

    httpMock.expectNone('https://formsubmit.co/ajax/sales@alxgarden.com');
    expect(true).toBeTrue();
  });
});
