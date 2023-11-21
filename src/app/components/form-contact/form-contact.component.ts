import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

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

  sendForm() {
    if (this.formContact.valid) {
      const formData = new FormData();
      const { value } = this.formContact;
      for (const key in value) {
        formData.append(key, value[key]);
      }
      this.htt.post('https://formsubmit.co/jimenezkev1040@gmail.com', formData).subscribe({
        next: result => {
          Swal.fire({ icon: "success", title: "Your message has been sent!", showConfirmButton: false, timer: 1500 });
          setTimeout(() => this.close(), 1000);
        },
        error: e => {
          Swal.fire({ position: 'center', icon: 'error', title: 'An error has occurred!', text: 'Please try again later', confirmButtonColor: 'rgb(220,53,69)' });
          setTimeout(() => this.close(), 1000);
        }
      });
    }
  }

}
