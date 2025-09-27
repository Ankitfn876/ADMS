import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FloginNregisterService } from '../services/front/flogin-nregister.service';
import Swal from 'sweetalert2';
import { ValidateVendorRequest } from '../interface/front/register-response';
@Component({
  selector: 'app-forgetpassword',
  imports: [MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,NgIf],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
forgotForm: FormGroup | any;
  showPasswordFields = false;
  
  constructor(private fb: FormBuilder,private URL:FloginNregisterService) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  // Triggered when email & mobile are valid
 verifyUser(): void {
  const emailControl = this.forgotForm.get('email');
  const mobileControl = this.forgotForm.get('mobile');

  // Validate form controls
  if (!emailControl?.valid || !mobileControl?.valid) {
    Swal.fire({
      icon: 'warning',
      title: 'Validation Error',
      text: 'Please enter a valid Email and Mobile Number.'
    });
    return;
  }

  const emailId = emailControl.value;
  const mobile = mobileControl.value;

  const payload: ValidateVendorRequest = {
    EmailID: emailControl.value,
    Mobilenumber: mobileControl.value
  };

  this.URL.ValidateVendorforresetPassword(payload).subscribe({
    next: (res: any) => {
      if (res.status === 'success') {
        this.showPasswordFields = true;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: res.message || 'Validation failed.'
        });
      }
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: err?.message || 'An error occurred while validating.'
      });
    }
  });
}


  resetPassword() {
    // if (this.forgotForm.valid && this.forgotForm.value.password === this.forgotForm.value.confirmPassword) {
    //   // Call API here
    //   alert('Password reset successful!');
    // } else {
    //   alert('Passwords do not match!');
    // }
  }
}
