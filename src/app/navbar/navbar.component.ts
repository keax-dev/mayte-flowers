import { FormContactComponent } from '../form-contact/form-contact.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  op: boolean = true;

  constructor(private dialog: MatDialog) { }

  openFormContact(): void {
    this.dialog.open(FormContactComponent, {
      height: "auto", maxHeight: '90vh', minWidth: '300px', width: '30%'
    });
  }

}
