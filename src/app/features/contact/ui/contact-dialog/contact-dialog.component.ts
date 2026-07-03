import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ContactSubmissionService } from '@app/features/contact/services/contact-submission.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { APP_CONFIG } from '@core/config/app-config.token';
import { finalize } from 'rxjs/operators';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ContactDialogData,
  ContactInquiryType,
} from '@features/contact/models/contact-dialog.models';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-dialog.component.html',
  host: { class: 'd-block w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDialogComponent {
  private readonly dialogData = inject<ContactDialogData | null>(DIALOG_DATA, {
    optional: true,
  });
  private readonly contactSubmission = inject(ContactSubmissionService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly analytics = inject(AnalyticsService);
  private readonly dialogRef =
    inject<DialogRef<unknown, ContactDialogComponent>>(DialogRef);
  private readonly config = inject(APP_CONFIG);

  private static readonly MESSAGE_MAX_LENGTH = 2000;
  private static readonly EMAIL_MAX_LENGTH = 254;
  private static readonly TEXT_MAX_LENGTH = 120;

  readonly submissionState = signal<'error' | 'idle' | 'success'>('idle');
  readonly isSubmitting = signal(false);
  readonly feedback = signal('');

  readonly quotePromise = this.config.quoteResponsePromise;
  readonly company = this.config;

  readonly inquiryOptions = [
    { value: 'quote', label: 'Quote request' },
    { value: 'availability', label: 'Availability check' },
    { value: 'general', label: 'General contact' },
  ] as const;

  readonly contactForm = this.formBuilder.group({
    boxType: ['', Validators.maxLength(ContactDialogComponent.TEXT_MAX_LENGTH)],
    comment: [
      '',
      [
        Validators.required,
        Validators.maxLength(ContactDialogComponent.MESSAGE_MAX_LENGTH),
      ],
    ],
    companyName: [
      '',
      Validators.maxLength(ContactDialogComponent.TEXT_MAX_LENGTH),
    ],
    country: ['', Validators.maxLength(ContactDialogComponent.TEXT_MAX_LENGTH)],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(ContactDialogComponent.EMAIL_MAX_LENGTH),
      ],
    ],
    flowerType: [
      this.dialogData?.flowerType ?? '',
      Validators.maxLength(ContactDialogComponent.TEXT_MAX_LENGTH),
    ],
    fullName: [
      '',
      [
        Validators.required,
        Validators.maxLength(ContactDialogComponent.TEXT_MAX_LENGTH),
      ],
    ],
    inquiryType: [this.dialogData?.inquiryType ?? 'general'],
    neededBy: [''],
    quantity: [
      '',
      Validators.maxLength(ContactDialogComponent.TEXT_MAX_LENGTH),
    ],
    website: [''],
  });

  readonly inquiryType = toSignal(
    this.contactForm.controls.inquiryType.valueChanges,
    {
      initialValue: this.contactForm.controls.inquiryType.value,
    },
  );

  readonly dialogTitle = computed(() =>
    this.inquiryType() === 'general' ? 'CONTACT US' : 'REQUEST A QUOTE',
  );

  constructor() {
    this.contactForm.patchValue({
      comment:
        this.dialogData?.message ??
        'Hello ALX Garden, I would like to receive more information about your flowers.',
      country: this.dialogData?.country ?? '',
    });

    this.syncFlowerTypeValidator(this.contactForm.controls.inquiryType.value);

    this.contactForm.controls.inquiryType.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((inquiryType) => this.syncFlowerTypeValidator(inquiryType));
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
      website,
    } = this.contactForm.getRawValue();

    const payload = {
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
      source: this.dialogData?.source ?? 'website',
    };

    this.contactSubmission
      .submit(payload)
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
            website: '',
          });
          this.feedback.set(
            'Thanks for your request. We will review your details and get back to you shortly.',
          );
          this.submissionState.set('success');
          this.analytics.trackEvent('lead_submitted', {
            flower_type: flowerType,
            inquiry_type: inquiryType,
            source: this.dialogData?.source ?? 'website',
          });
        },
        error: () => {
          this.feedback.set(
            'We could not send your message right now. Please try again in a moment or contact us by phone.',
          );
          this.submissionState.set('error');
          this.analytics.trackEvent('lead_submit_failed', {
            inquiry_type: inquiryType,
            source: this.dialogData?.source ?? 'website',
          });
        },
      });
  }

  syncFlowerTypeValidator(inquiryType: ContactInquiryType): void {
    if (inquiryType === 'general') {
      this.contactForm.controls.flowerType.removeValidators(
        Validators.required,
      );
    } else {
      this.contactForm.controls.flowerType.addValidators(Validators.required);
    }

    this.contactForm.controls.flowerType.updateValueAndValidity({
      emitEvent: false,
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
