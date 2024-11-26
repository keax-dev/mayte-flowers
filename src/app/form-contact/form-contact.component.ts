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

  constructor(private dialogref: MatDialogRef<FormContactComponent>,
    private fb: FormBuilder) { }

  close(): void {
    this.dialogref.close();
  }

}
