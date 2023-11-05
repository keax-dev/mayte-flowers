import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormContactComponent } from '../form-contact/form-contact.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  op: boolean = true;

  constructor(public dialog: MatDialog) { }

  openFormContact() {
    const dialogRef = this.dialog.open(FormContactComponent, {
      height: "auto",
      maxHeight: '90vh',
      minWidth: '300px',
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {

        }
      }
    );
  }

}
