import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@angular/cdk/dialog';
import { of, throwError } from 'rxjs';

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
      comment: 'Please send me a quote.',
      email: 'hello@example.com',
      website: ''
    });

    component.submit();
    fixture.detectChanges();

    expect(submitSpy).toHaveBeenCalledWith({
      email: 'hello@example.com',
      honeypot: '',
      message: 'Please send me a quote.'
    });
    expect(component.submissionState()).toBe('success');
    expect(component.feedback()).toContain('Thanks for reaching out');
  });

  it('shows error feedback when the submission fails', () => {
    submitSpy.and.returnValue(throwError(() => new Error('network')));
    component.contactForm.setValue({
      comment: 'Please send me a quote.',
      email: 'hello@example.com',
      website: ''
    });

    component.submit();
    fixture.detectChanges();

    expect(component.submissionState()).toBe('error');
    expect(component.feedback()).toContain('We could not send your message');
  });
});
