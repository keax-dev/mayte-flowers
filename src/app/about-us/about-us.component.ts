import { FormContactComponent } from '../form-contact/form-contact.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {


  constructor(public dialog: MatDialog) { }

  openFormContact(): void {
    this.dialog.open(FormContactComponent, {
      height: "auto", maxHeight: '90vh', minWidth: '300px', width: '30%'
    });
  }

}
