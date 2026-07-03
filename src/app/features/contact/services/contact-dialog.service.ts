import { Injectable, inject } from '@angular/core';
import { ContactDialogData } from '@features/contact/models/contact-dialog.models';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { Dialog } from '@angular/cdk/dialog';

@Injectable({ providedIn: 'root' })
export class ContactDialogService {
  private readonly analytics = inject(AnalyticsService);
  private readonly dialog = inject(Dialog);

  open(data: ContactDialogData = {}): Promise<void> {
    this.analytics.trackEvent('contact_dialog_opened', {
      flower_type: data.flowerType ?? '',
      inquiry_type: data.inquiryType ?? 'general',
      source: data.source ?? 'unknown',
    });

    return import('@features/contact/ui/contact-dialog/contact-dialog.component')
      .then(({ ContactDialogComponent }) => {
        this.dialog.open(ContactDialogComponent, {
          ariaLabelledBy: 'contact-dialog-title',
          autoFocus: 'first-tabbable',
          backdropClass: 'app-contact-dialog-backdrop',
          data,
          maxHeight: '90vh',
          minWidth: '320px',
          panelClass: 'app-contact-dialog-panel',
          width: 'min(92vw, 720px)',
        });
      })
      .catch(() => {
        this.analytics.trackEvent('contact_dialog_load_failed', {
          source: data.source ?? 'unknown',
        });
      });
  }
}
