import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactSubmissionService } from '@app/features/contact/services/contact-submission.service';
import { ContactDialogComponent } from '@features/contact/ui/contact-dialog/contact-dialog.component';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { of, throwError } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';

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
            submit: submitSpy,
          },
        },
        {
          provide: AnalyticsService,
          useValue: {
            trackEvent: jasmine.createSpy('trackEvent'),
          },
        },
        {
          provide: DialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('keeps the submit button disabled while the form is invalid', () => {
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toBeTrue();
  });

  it('updates the dialog title when the inquiry type changes', () => {
    expect(component.dialogTitle()).toBe('CONTACT US');

    component.contactForm.controls.inquiryType.setValue('quote');
    fixture.detectChanges();

    expect(component.dialogTitle()).toBe('REQUEST A QUOTE');
  });

  it('preserves length validation when the inquiry type changes', () => {
    const flowerType = component.contactForm.controls.flowerType;
    flowerType.setValue('x'.repeat(121));

    component.contactForm.controls.inquiryType.setValue('quote');
    expect(flowerType.hasError('maxlength')).toBeTrue();

    flowerType.setValue('');
    expect(flowerType.hasError('required')).toBeTrue();

    component.contactForm.controls.inquiryType.setValue('general');
    expect(flowerType.hasError('required')).toBeFalse();
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
      website: '',
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
      source: 'website',
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
      website: '',
    });

    component.submit();
    fixture.detectChanges();

    expect(component.submissionState()).toBe('error');
    expect(component.feedback()).toContain('We could not send your message');
  });
});
