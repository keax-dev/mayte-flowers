import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormContactComponent } from '../form-contact/form-contact.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


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
