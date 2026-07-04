import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactDialogService } from '@features/contact';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { TEST_APP_CONFIG } from '@app/testing/test-app-config';
import { provideRouter } from '@angular/router';
import { SeoService } from '@core/seo/seo.service';
import { APP_CONFIG } from '@core/config/app-config.token';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let contactDialogOpenSpy: jasmine.Spy;
  let analyticsInitializeSpy: jasmine.Spy;
  let seoInitializeSpy: jasmine.Spy;

  beforeEach(async () => {
    // Creamos dobles de prueba para verificar interacciones
    // sin depender de servicios reales.
    contactDialogOpenSpy = jasmine.createSpy('open').and.resolveTo();
    analyticsInitializeSpy = jasmine.createSpy('initialize');
    seoInitializeSpy = jasmine.createSpy('initialize');

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: APP_CONFIG, useValue: TEST_APP_CONFIG },
        {
          provide: ContactDialogService,
          useValue: {
            open: contactDialogOpenSpy,
          },
        },
        {
          provide: AnalyticsService,
          useValue: {
            initialize: analyticsInitializeSpy,
          },
        },
        {
          provide: SeoService,
          useValue: {
            initialize: seoInitializeSpy,
          },
        },
      ],
    }).compileComponents();

    // Al crear el componente y ejecutar detectChanges,
    // también disparamos su inicialización.
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('initializes analytics and seo on construction', () => {
    // Valida el "cableado" del componente con servicios globales de la app.
    expect(analyticsInitializeSpy).toHaveBeenCalled();
    expect(seoInitializeSpy).toHaveBeenCalled();
  });

  it('opens the general contact dialog from the navbar action', () => {
    // Buscamos el botón real renderizado en la vista y simulamos el click del usuario.
    const contactButton = fixture.nativeElement.querySelector(
      'button.btn.btn-success',
    ) as HTMLButtonElement;

    contactButton.click();

    // Si esto pasa, el AppComponent está delegando correctamente
    // la apertura del modal al servicio de contacto.
    expect(contactDialogOpenSpy).toHaveBeenCalledWith({
      inquiryType: 'general',
      source: 'navbar',
    });
  });
});
