import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@angular/cdk/dialog';
import { of, throwError } from 'rxjs';

import { AnalyticsService } from '@core/services/analytics.service';
import { ContactSubmissionService } from '@core/services/contact-submission.service';
import { ContactDialogComponent } from '@shared/ui/contact-dialog/contact-dialog.component';

describe('ContactDialogComponent', () => {
  let fixture: ComponentFixture<ContactDialogComponent>;
  let component: ContactDialogComponent;
  let submitSpy: jasmine.Spy;

  beforeEach(async () => {
    submitSpy = jasmine.createSpy('submit').and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      imports: [ContactDialogComponent],
      providers: [
        {
          provide: ContactSubmissionService,
          useValue: {
            submit: submitSpy
          }
        },
        {
          provide: AnalyticsService,
          useValue: {
            trackEvent: jasmine.createSpy('trackEvent')
          }
        },
        {
          provide: DialogRef,
          useValue: {
            close: jasmine.createSpy('close')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('keeps the submit button disabled while the form is invalid', () => {
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;

    expect(submitButton.disabled).toBeTrue();
  });

  it('submits valid form data and shows success feedback', () => {
    component.contactForm.setValue({
      boxType: 'Half box',
      comment: 'Please send me a quote.',
      companyName: 'Flower Buyer Inc.',
      country: 'United States',
      email: 'hello@example.com',
      flowerType: 'Explorer Rose',
      fullName: 'Jane Buyer',
      inquiryType: 'quote',
      neededBy: '2026-06-30',
      quantity: '10 boxes',
      website: ''
    });

    component.submit();
    fixture.detectChanges();

    expect(submitSpy).toHaveBeenCalledWith({
      boxType: 'Half box',
      companyName: 'Flower Buyer Inc.',
      country: 'United States',
      email: 'hello@example.com',
      flowerType: 'Explorer Rose',
      fullName: 'Jane Buyer',
      honeypot: '',
      inquiryType: 'quote',
      message: 'Please send me a quote.',
      neededBy: '2026-06-30',
      quantity: '10 boxes',
      source: 'website'
    });
    expect(component.submissionState()).toBe('success');
    expect(component.feedback()).toContain('Thanks for your request');
  });

  it('shows error feedback when the submission fails', () => {
    submitSpy.and.returnValue(throwError(() => new Error('network')));
    component.contactForm.setValue({
      boxType: 'Half box',
      comment: 'Please send me a quote.',
      companyName: 'Flower Buyer Inc.',
      country: 'United States',
      email: 'hello@example.com',
      flowerType: 'Explorer Rose',
      fullName: 'Jane Buyer',
      inquiryType: 'quote',
      neededBy: '2026-06-30',
      quantity: '10 boxes',
      website: ''
    });

    component.submit();
    fixture.detectChanges();

    expect(component.submissionState()).toBe('error');
    expect(component.feedback()).toContain('We could not send your message');
  });
});
