import { ContactFormFactory } from '@features/contact/application/contact-form.factory';
import { TestBed } from '@angular/core/testing';

describe('ContactFormFactory', () => {
  let factory: ContactFormFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    factory = TestBed.inject(ContactFormFactory);
  });

  it('creates a prefilled form and maps it to the application payload', () => {
    const form = factory.create({
      country: 'Ecuador',
      flowerType: 'Explorer Rose',
      inquiryType: 'quote',
      message: 'Please confirm availability.',
      source: 'product_page',
    });

    form.patchValue({
      email: 'buyer@example.com',
      fullName: 'Jane Buyer',
    });

    expect(form.controls.flowerType.hasError('required')).toBeFalse();
    expect(factory.toSubmissionPayload(form, 'product_page')).toEqual(
      jasmine.objectContaining({
        country: 'Ecuador',
        email: 'buyer@example.com',
        flowerType: 'Explorer Rose',
        fullName: 'Jane Buyer',
        inquiryType: 'quote',
        message: 'Please confirm availability.',
        source: 'product_page',
      }),
    );
  });

  it('changes only the conditional flower requirement', () => {
    const form = factory.create(null);

    factory.syncFlowerTypeRequirement(form, 'quote');
    expect(form.controls.flowerType.hasError('required')).toBeTrue();

    form.controls.flowerType.setValue('x'.repeat(121));
    factory.syncFlowerTypeRequirement(form, 'general');

    expect(form.controls.flowerType.hasError('required')).toBeFalse();
    expect(form.controls.flowerType.hasError('maxlength')).toBeTrue();
  });
});
