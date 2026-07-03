import { Dialog } from '@angular/cdk/dialog';
import { TestBed } from '@angular/core/testing';

import { AnalyticsService } from '@core/analytics/analytics.service';
import { ContactDialogService } from '@features/contact/services/contact-dialog.service';

describe('ContactDialogService', () => {
  let dialogOpenSpy: jasmine.Spy;
  let service: ContactDialogService;

  beforeEach(() => {
    dialogOpenSpy = jasmine.createSpy('open');

    TestBed.configureTestingModule({
      providers: [
        ContactDialogService,
        {
          provide: AnalyticsService,
          useValue: {
            trackEvent: jasmine.createSpy('trackEvent')
          }
        },
        {
          provide: Dialog,
          useValue: {
            open: dialogOpenSpy
          }
        }
      ]
    });

    service = TestBed.inject(ContactDialogService);
  });

  it('loads the contact dialog on demand with accessible focus configuration', async () => {
    await service.open({ inquiryType: 'quote', source: 'test' });

    expect(dialogOpenSpy).toHaveBeenCalled();
    expect(dialogOpenSpy.calls.mostRecent().args[1]).toEqual(
      jasmine.objectContaining({
        ariaLabelledBy: 'contact-dialog-title',
        autoFocus: 'first-tabbable'
      })
    );
  });
});
