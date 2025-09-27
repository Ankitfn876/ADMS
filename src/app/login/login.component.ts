import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FloginNregisterService } from '../services/front/flogin-nregister.service';
import { AuthJWTService } from '../services/auth/auth-jwt.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  submitted: any;
  loginForm: any;
  isLoading = false; // Loader flag
  constructor(private router: Router, private URL: FloginNregisterService, private fb: FormBuilder, private auth: AuthJWTService) { }
  gotoregister() {
    this.router.navigate(['/vregister']);
  }

  private emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  ngOnInit() {
    this.loginForm = this.fb.group({
      EmailID: [],
      Password: [],
      IPaddress: []
    })
  }

  forgetpassword(){
     this.router.navigate(['/forgetpassword']);
  }
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill in all fields correctly.'
      });
      return;
    }
    const email = this.loginForm.value.EmailID;
    const Pass = this.loginForm.value.Password;
    if (email == "") {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please enter your Email ID.',
      });
      return;
    }
    if (!this.emailPattern.test(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }
    if (Pass == "") {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please enter your Password. or Password length less than 5.',
      });
      return;
    }
    if (Pass.length <= 5) {
      Swal.fire({
        icon: 'warning',
        title: 'Password length',
        text: 'Password length should be greater than 5.',
      });
      return;
    }
    this.isLoading = true; // Show loader
    this.URL.LoginVendor(this.loginForm.value).subscribe({
      next: (data => {
      
        if (data.status === "success") {
          this.isLoading = false; // Hide loader
          this.auth.setUserId(data.id.toString(), data.username);

          this.router.navigate(['/Admin/Dashboard']);
        }
        else {
          this.isLoading = false; // Hide loader
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.message,
          });
          return;
        }
      }),
      error: (err => {
       this.isLoading = false; // Hide loader
        let errorMessage = 'Something went wrong.';

        if (err.error && err.error.message) {
          errorMessage = err.error.message; // Extract message from backend
        } else if (err.status === 0) {
          errorMessage = 'Server is unreachable.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
        return;
      })
    })

  }

}
