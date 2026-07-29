import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ContactSubmissionService } from '@app/features/contact/services/contact-submission.service';
import { ContactFormFactory } from '@features/contact/application/contact-form.factory';
import { ContactSubmissionGateway } from '@features/contact/application/contact-submission.gateway';
import { FormSubmitContactGateway } from '@features/contact/data-access/form-submit-contact.gateway';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { CONTACT_CONFIG } from '@core/config/app-config.token';
import { finalize } from 'rxjs/operators';
import { ContactDialogData } from '@features/contact/models/contact-dialog.models';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-dialog.component.html',
  host: { class: 'd-block w-100' },
  providers: [
    ContactSubmissionService,
    { provide: ContactSubmissionGateway, useClass: FormSubmitContactGateway },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDialogComponent {
  private readonly dialogData = inject<ContactDialogData | null>(DIALOG_DATA, {
    optional: true,
  });
  private readonly contactSubmission = inject(ContactSubmissionService);
  private readonly contactFormFactory = inject(ContactFormFactory);
  private readonly analytics = inject(AnalyticsService);
  private readonly dialogRef = inject<DialogRef<unknown, ContactDialogComponent>>(DialogRef);
  private readonly config = inject(CONTACT_CONFIG);

  readonly submissionState = signal<'error' | 'idle' | 'success'>('idle');
  readonly isSubmitting = signal(false);
  readonly feedback = signal('');

  readonly quotePromise = this.config.quoteResponsePromise;
  readonly inquiryOptions = [
    { value: 'quote', label: 'Quote request' },
    { value: 'availability', label: 'Availability check' },
    { value: 'general', label: 'General contact' },
  ] as const;

  readonly contactForm = this.contactFormFactory.create(this.dialogData);

  readonly inquiryType = toSignal(this.contactForm.controls.inquiryType.valueChanges, {
    initialValue: this.contactForm.controls.inquiryType.value,
  });

  readonly dialogTitle = computed(() =>
    this.inquiryType() === 'general' ? 'CONTACT US' : 'REQUEST A QUOTE',
  );

  constructor() {
    this.contactForm.controls.inquiryType.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((inquiryType) =>
        this.contactFormFactory.syncFlowerTypeRequirement(this.contactForm, inquiryType),
      );
  }

  submit(): void {
    if (this.contactForm.invalid || this.isSubmitting()) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.feedback.set('');
    this.isSubmitting.set(true);
    this.submissionState.set('idle');

    const payload = this.contactFormFactory.toSubmissionPayload(
      this.contactForm,
      this.dialogData?.source,
    );

    this.contactSubmission
      .submit(payload)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.contactFormFactory.reset(this.contactForm, this.dialogData);
          this.feedback.set(
            'Thanks for your request. We will review your details and get back to you shortly.',
          );
          this.submissionState.set('success');
          this.analytics.trackEvent('lead_submitted', {
            flower_type: payload.flowerType,
            inquiry_type: payload.inquiryType,
            source: this.dialogData?.source ?? 'website',
          });
        },
        error: () => {
          this.feedback.set(
            'We could not send your message right now. Please try again in a moment or contact us by phone.',
          );
          this.submissionState.set('error');
          this.analytics.trackEvent('lead_submit_failed', {
            inquiry_type: payload.inquiryType,
            source: this.dialogData?.source ?? 'website',
          });
        },
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}
