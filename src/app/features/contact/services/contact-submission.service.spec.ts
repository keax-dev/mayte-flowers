import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ContactSubmissionService } from '@app/features/contact/services/contact-submission.service';
import { provideHttpClient } from '@angular/common/http';
import { TEST_APP_CONFIG } from '@app/testing/test-app-config';
import { APP_CONFIG } from '@core/config/app-config.token';
import { TestBed } from '@angular/core/testing';

describe('ContactSubmissionService', () => {
  let httpMock: HttpTestingController;
  let service: ContactSubmissionService;

  beforeEach(() => {
    // Se configura el servicio real con el backend HTTP de testing,
    // para inspeccionar peticiones sin salir a la red.
    TestBed.configureTestingModule({
      providers: [
        ContactSubmissionService,
        { provide: APP_CONFIG, useValue: TEST_APP_CONFIG },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ContactSubmissionService);
  });

  afterEach(() => {
    // Garantiza que cada prueba consume exactamente las requests esperadas.
    httpMock.verify();
  });

  it('posts contact requests to FormSubmit AJAX endpoint', () => {
    // Ejecutamos el flujo público del servicio tal como lo haría el componente.
    service
      .submit({
        email: 'hello@example.com',
        message: 'I need a quote.',
      })
      .subscribe();

    // Interceptamos la request para validar destino, método y datos enviados.
    const request = httpMock.expectOne('https://formsubmit.co/ajax/sales@alxgarden.com');
    expect(request.request.method).toBe('POST');
    expect(request.request.body instanceof FormData).toBeTrue();
    expect((request.request.body as FormData).get('email')).toBe('hello@example.com');
    expect((request.request.body as FormData).get('message')).toBe('I need a quote.');

    // Respondemos manualmente para cerrar el flujo observable.
    request.flush({ success: 'true' });
  });

  it('short-circuits spam submissions when honeypot is filled', () => {
    // Si el honeypot viene lleno, asumimos bot/spam y el servicio
    // debe cortar el flujo sin hacer ninguna petición externa.
    service
      .submit({
        email: 'bot@example.com',
        honeypot: 'https://spam.example.com',
        message: 'spam',
      })
      .subscribe();

    httpMock.expectNone('https://formsubmit.co/ajax/sales@alxgarden.com');

    // Este expect solo deja explícito que la prueba llegó al final sin requests.
    expect(true).toBeTrue();
  });
});
