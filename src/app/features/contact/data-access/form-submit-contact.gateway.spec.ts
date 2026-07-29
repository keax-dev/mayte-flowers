import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FormSubmitContactGateway } from '@features/contact/data-access/form-submit-contact.gateway';
import { provideHttpClient } from '@angular/common/http';
import { TEST_APP_CONFIG } from '@app/testing/test-app-config';
import { APP_CONFIG } from '@core/config/app-config.token';
import { TestBed } from '@angular/core/testing';

describe('FormSubmitContactGateway', () => {
  let gateway: FormSubmitContactGateway;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormSubmitContactGateway,
        { provide: APP_CONFIG, useValue: TEST_APP_CONFIG },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    gateway = TestBed.inject(FormSubmitContactGateway);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('maps the application payload to the FormSubmit transport contract', () => {
    gateway
      .submit({
        companyName: 'Flower Buyer Inc.',
        email: ' hello@example.com ',
        message: ' I need a quote. ',
        source: 'product_page',
      })
      .subscribe();

    const request = httpMock.expectOne('https://formsubmit.co/ajax/sales@alxgarden.com');
    const body = request.request.body as FormData;

    expect(request.request.method).toBe('POST');
    expect(body.get('company_name')).toBe('Flower Buyer Inc.');
    expect(body.get('email')).toBe('hello@example.com');
    expect(body.get('message')).toBe('I need a quote.');
    expect(body.get('source')).toBe('product_page');

    request.flush({ success: 'true' });
  });
});
