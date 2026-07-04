import { ContactDialogService } from '@features/contact/services/contact-dialog.service';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { TestBed } from '@angular/core/testing';
import { Dialog } from '@angular/cdk/dialog';

describe('ContactDialogService', () => {
  let dialogOpenSpy: jasmine.Spy;
  let service: ContactDialogService;

  beforeEach(() => {
    // Espiamos el servicio de diálogo del CDK para comprobar
    // cómo se abre el modal, sin renderizarlo realmente.
    dialogOpenSpy = jasmine.createSpy('open');

    TestBed.configureTestingModule({
      providers: [
        ContactDialogService,
        {
          provide: AnalyticsService,
          useValue: {
            trackEvent: jasmine.createSpy('trackEvent'),
          },
        },
        {
          provide: Dialog,
          useValue: {
            open: dialogOpenSpy,
          },
        },
      ],
    });

    service = TestBed.inject(ContactDialogService);
  });

  it('loads the contact dialog on demand with accessible focus configuration', async () => {
    // Ejecutamos el método público que usa el resto de la app.
    await service.open({ inquiryType: 'quote', source: 'test' });

    // La prueba se centra en validar configuración importante de accesibilidad
    // y de foco inicial al abrir el modal.
    expect(dialogOpenSpy).toHaveBeenCalled();
    expect(dialogOpenSpy.calls.mostRecent().args[1]).toEqual(
      jasmine.objectContaining({
        ariaLabelledBy: 'contact-dialog-title',
        autoFocus: 'first-tabbable',
      }),
    );
  });
});
