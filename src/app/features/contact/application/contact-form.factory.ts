import { ContactSubmissionPayload } from '@features/contact/interfaces/contact.interface';
import {
  ContactDialogData,
  ContactInquiryType,
} from '@features/contact/models/contact-dialog.models';
import { Injectable, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

const MESSAGE_MAX_LENGTH = 2000;
const EMAIL_MAX_LENGTH = 254;
const TEXT_MAX_LENGTH = 120;

export interface ContactFormControls {
  boxType: FormControl<string>;
  comment: FormControl<string>;
  companyName: FormControl<string>;
  country: FormControl<string>;
  email: FormControl<string>;
  flowerType: FormControl<string>;
  fullName: FormControl<string>;
  inquiryType: FormControl<ContactInquiryType>;
  neededBy: FormControl<string>;
  quantity: FormControl<string>;
  website: FormControl<string>;
}

export type ContactForm = FormGroup<ContactFormControls>;

@Injectable({ providedIn: 'root' })
export class ContactFormFactory {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  create(data: ContactDialogData | null): ContactForm {
    const form = this.formBuilder.group({
      boxType: ['', Validators.maxLength(TEXT_MAX_LENGTH)],
      comment: [
        data?.message ??
          'Hello ALX Garden, I would like to receive more information about your flowers.',
        [Validators.required, Validators.maxLength(MESSAGE_MAX_LENGTH)],
      ],
      companyName: ['', Validators.maxLength(TEXT_MAX_LENGTH)],
      country: [data?.country ?? '', Validators.maxLength(TEXT_MAX_LENGTH)],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(EMAIL_MAX_LENGTH)],
      ],
      flowerType: [data?.flowerType ?? '', Validators.maxLength(TEXT_MAX_LENGTH)],
      fullName: ['', [Validators.required, Validators.maxLength(TEXT_MAX_LENGTH)]],
      inquiryType: this.formBuilder.control<ContactInquiryType>(data?.inquiryType ?? 'general'),
      neededBy: [''],
      quantity: ['', Validators.maxLength(TEXT_MAX_LENGTH)],
      website: [''],
    });

    this.syncFlowerTypeRequirement(form, form.controls.inquiryType.value);
    return form;
  }

  syncFlowerTypeRequirement(form: ContactForm, inquiryType: ContactInquiryType): void {
    if (inquiryType === 'general') {
      form.controls.flowerType.removeValidators(Validators.required);
    } else {
      form.controls.flowerType.addValidators(Validators.required);
    }

    form.controls.flowerType.updateValueAndValidity({ emitEvent: false });
  }

  toSubmissionPayload(form: ContactForm, source = 'website'): ContactSubmissionPayload {
    const value = form.getRawValue();

    return {
      boxType: value.boxType,
      companyName: value.companyName,
      country: value.country,
      email: value.email,
      flowerType: value.flowerType,
      fullName: value.fullName,
      honeypot: value.website,
      inquiryType: value.inquiryType,
      message: value.comment,
      neededBy: value.neededBy,
      quantity: value.quantity,
      source,
    };
  }

  reset(form: ContactForm, data: ContactDialogData | null): void {
    form.reset({
      boxType: '',
      comment: '',
      companyName: '',
      country: '',
      email: '',
      flowerType: data?.flowerType ?? '',
      fullName: '',
      inquiryType: data?.inquiryType ?? 'general',
      neededBy: '',
      quantity: '',
      website: '',
    });
  }
}
