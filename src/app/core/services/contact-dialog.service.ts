import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { AnalyticsService } from '@core/services/analytics.service';
import { ContactDialogComponent } from '@shared/ui/contact-dialog/contact-dialog.component';
import { ContactDialogData } from '@shared/ui/contact-dialog/contact-dialog.models';

@Injectable({ providedIn: 'root' })
export class ContactDialogService {
  private readonly analytics = inject(AnalyticsService);
  private readonly dialog = inject(Dialog);

  open(data: ContactDialogData = {}): void {
    this.analytics.trackEvent('contact_dialog_opened', {
      flower_type: data.flowerType ?? '',
      inquiry_type: data.inquiryType ?? 'general',
      source: data.source ?? 'unknown'
    });

    this.dialog.open(ContactDialogComponent, {
      autoFocus: false,
      backdropClass: 'app-contact-dialog-backdrop',
      data,
      maxHeight: '90vh',
      minWidth: '320px',
      panelClass: 'app-contact-dialog-panel',
      width: 'min(92vw, 720px)'
    });
  }
}
