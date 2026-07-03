import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/operators';

import { COMPANY_INFO } from '@core/data/company.data';
import { AnalyticsService } from '@core/services/analytics.service';
import { ContactSubmissionService } from '@core/services/contact-submission.service';
import { ContactDialogData } from '@shared/ui/contact-dialog/contact-dialog.models';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-dialog.component.html',
  host: { class: 'd-block w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDialogComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly dialogData = inject<ContactDialogData | null>(DIALOG_DATA, {
    optional: true
  });
  private readonly dialogRef = inject<DialogRef<unknown, ContactDialogComponent>>(DialogRef);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly contactSubmission = inject(ContactSubmissionService);

  readonly company = COMPANY_INFO;
  readonly feedback = signal('');
  readonly isSubmitting = signal(false);
  readonly quotePromise = COMPANY_INFO.quoteResponsePromise;
  readonly submissionState = signal<'error' | 'idle' | 'success'>('idle');
  readonly inquiryOptions = [
    { value: 'quote', label: 'Quote request' },
    { value: 'availability', label: 'Availability check' },
    { value: 'general', label: 'General contact' }
  ] as const;
  readonly contactForm = this.formBuilder.group({
    boxType: [''],
    comment: ['', Validators.required],
    companyName: [''],
    country: [''],
    email: ['', [Validators.required, Validators.email]],
    flowerType: [this.dialogData?.flowerType ?? ''],
    fullName: ['', Validators.required],
    inquiryType: [this.dialogData?.inquiryType ?? 'general'],
    neededBy: [''],
    quantity: [''],
    website: ['']
  });
  readonly dialogTitle = computed(() =>
    this.contactForm.controls.inquiryType.value === 'general' ? 'CONTACT US' : 'REQUEST A QUOTE'
  );

  constructor() {
    this.contactForm.patchValue({
      comment:
        this.dialogData?.message ??
        'Hello ALX Garden, I would like to receive more information about your flowers.',
      country: this.dialogData?.country ?? ''
    });

    this.syncFlowerTypeValidator(this.contactForm.controls.inquiryType.value);

    this.contactForm.controls.inquiryType.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((inquiryType) => this.syncFlowerTypeValidator(inquiryType));
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.contactForm.invalid || this.isSubmitting()) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.feedback.set('');
    this.isSubmitting.set(true);
    this.submissionState.set('idle');

    const {
      boxType,
      comment,
      companyName,
      country,
      email,
      flowerType,
      fullName,
      inquiryType,
      neededBy,
      quantity,
      website
    } = this.contactForm.getRawValue();

    this.contactSubmission
      .submit({
        boxType,
        companyName,
        country,
        email,
        flowerType,
        fullName,
        honeypot: website,
        inquiryType,
        message: comment,
        neededBy,
        quantity,
        source: this.dialogData?.source ?? 'website'
      })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.contactForm.reset({
            boxType: '',
            comment: '',
            companyName: '',
            country: '',
            email: '',
            flowerType: this.dialogData?.flowerType ?? '',
            fullName: '',
            inquiryType: this.dialogData?.inquiryType ?? 'general',
            neededBy: '',
            quantity: '',
            website: ''
          });
          this.feedback.set(
            'Thanks for your request. We will review your details and get back to you shortly.'
          );
          this.submissionState.set('success');
          this.analytics.trackEvent('lead_submitted', {
            flower_type: flowerType,
            inquiry_type: inquiryType,
            source: this.dialogData?.source ?? 'website'
          });
        },
        error: () => {
          this.feedback.set(
            'We could not send your message right now. Please try again in a moment or contact us by phone.'
          );
          this.submissionState.set('error');
          this.analytics.trackEvent('lead_submit_failed', {
            inquiry_type: inquiryType,
            source: this.dialogData?.source ?? 'website'
          });
        }
      });
  }

  private syncFlowerTypeValidator(inquiryType: string | null): void {
    if (inquiryType === 'general') {
      this.contactForm.controls.flowerType.clearValidators();
    } else {
      this.contactForm.controls.flowerType.setValidators([Validators.required]);
    }

    this.contactForm.controls.flowerType.updateValueAndValidity({ emitEvent: false });
  }
}
