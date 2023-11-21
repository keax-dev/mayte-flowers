import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css']
})
export class FormContactComponent {

  formContact: FormGroup = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    Message: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, public dialogref: MatDialogRef<FormContactComponent>, private htt: HttpClient) { }

  close() {
    this.dialogref.close();
  }

}
