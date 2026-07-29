import { ContactSubmissionGateway } from '@features/contact/application/contact-submission.gateway';
import { ContactSubmissionService } from '@features/contact/services/contact-submission.service';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('ContactSubmissionService', () => {
  let gateway: jasmine.SpyObj<ContactSubmissionGateway>;
  let service: ContactSubmissionService;

  beforeEach(() => {
    gateway = jasmine.createSpyObj<ContactSubmissionGateway>('ContactSubmissionGateway', [
      'submit',
    ]);
    gateway.submit.and.returnValue(of(void 0));

    TestBed.configureTestingModule({
      providers: [
        ContactSubmissionService,
        { provide: ContactSubmissionGateway, useValue: gateway },
      ],
    });

    service = TestBed.inject(ContactSubmissionService);
  });

  it('delegates valid requests to the configured submission gateway', () => {
    const payload = {
      email: 'hello@example.com',
      message: 'I need a quote.',
    };

    service.submit(payload).subscribe();

    expect(gateway.submit).toHaveBeenCalledOnceWith(payload);
  });

  it('short-circuits spam submissions when honeypot is filled', () => {
    service
      .submit({
        email: 'bot@example.com',
        honeypot: 'https://spam.example.com',
        message: 'spam',
      })
      .subscribe();

    expect(gateway.submit).not.toHaveBeenCalled();
  });
});
