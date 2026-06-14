import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { ContactDialogComponent } from '@shared/ui/contact-dialog/contact-dialog.component';

@Injectable({ providedIn: 'root' })
export class ContactDialogService {
  private readonly dialog = inject(Dialog);

  open(): void {
    this.dialog.open(ContactDialogComponent, {
      autoFocus: false,
      backdropClass: 'app-contact-dialog-backdrop',
      maxHeight: '90vh',
      minWidth: '300px',
      panelClass: 'app-contact-dialog-panel',
      width: 'min(90vw, 480px)'
    });
  }
}
