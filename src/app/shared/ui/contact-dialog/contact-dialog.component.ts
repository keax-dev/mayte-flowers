import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { signal } from '@angular/core';

import { COMPANY_INFO } from '@core/data/company.data';
import { ContactSubmissionService } from '@core/services/contact-submission.service';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDialogComponent {
  private readonly dialogRef = inject<DialogRef<unknown, ContactDialogComponent>>(DialogRef);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly contactSubmission = inject(ContactSubmissionService);

  readonly company = COMPANY_INFO;
  readonly feedback = signal('');
  readonly isSubmitting = signal(false);
  readonly submissionState = signal<'error' | 'idle' | 'success'>('idle');
  readonly contactForm = this.formBuilder.group({
    comment: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    website: ['']
  });

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

    const { comment, email, website } = this.contactForm.getRawValue();

    this.contactSubmission
      .submit({ email, honeypot: website, message: comment })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.contactForm.reset({ comment: '', email: '', website: '' });
          this.feedback.set('Thanks for reaching out. We will get back to you soon.');
          this.submissionState.set('success');
        },
        error: () => {
          this.feedback.set(
            'We could not send your message right now. Please try again in a moment or contact us by phone.'
          );
          this.submissionState.set('error');
        }
      });
  }
}
