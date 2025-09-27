import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FloginNregisterService } from '../services/front/flogin-nregister.service';
import { AuthJWTService } from '../services/auth/auth-jwt.service';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Register } from '../interface/front/register';

import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-vregister',
  imports: [NgFor, FormsModule, NgSelectModule, NgIf, ReactiveFormsModule, MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule, MatSelectModule, MatTooltipModule],
  templateUrl: './vregister.component.html',
  styleUrl: './vregister.component.css'
})
export class VregisterComponent {
  Token: any = "";
  countries: any[] = [];
  Employees: any[] = [];
  SelectEmployee: any;
  selectedCountry: any;
  registerForm!: FormGroup;
  submitted = false;
  mobileExists: boolean | null = null;
  mobilelength: boolean | null = null;
  EmailValidate: boolean | null = null;
  emailInvalid: boolean | undefined = false;
  Decreptedtoken: any = null;
  //VRegister:Register|undefined;
  constructor(private router: Router, private URL: FloginNregisterService, private auth: AuthJWTService, private fb: FormBuilder) {

    this.auth.GetTokenKey().subscribe({

      next: (data) => {

        this.Token = data.headers.get('X-Auth-Token');
        this.GetCountrieslist(this.Token);
        this.GetEmpCount(this.Token);
      },
      error: (err) => {
        console.error('Error fetching countries:', err);
      }
    })



  }
  GetCountrieslist(token: string) {

    this.URL.GetCountries(token).subscribe({
      next: (countriesData) => {
        this.countries = countriesData;
      },
      error: (err) => {
        console.error('Error fetching Employee:', err);
      }
    });
  }
  GetEmpCount(token: string) {
    this.URL.GetEmployeeC(token).subscribe({
      next: (dataEmp) => {
        this.Employees = dataEmp;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  checkMobileExists(): void {
    const mobile = this.registerForm.get('Mobile')?.value;
    if (mobile.length != 10) {
      this.mobilelength = false;
      return;
    }
    else {
      this.mobilelength = true;
      this.URL.ValidateVendorMobile(this.Token, mobile).subscribe({
        next: (exists) => {
          if (exists.status === 'exist') {
            this.mobileExists = true;
            return;
          }
          else if (exists.status === 'success') {
            this.mobileExists = false;

          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
  CheckEmailID(): void {

    const EmailID = this.registerForm.get('EmailID')?.value;
    this.URL.ValidateVendorEmailID(this.Token, EmailID).subscribe({
      next: (data => {

        if (data.status === 'exist') {
          this.EmailValidate = true;
          return;
        }
        else if (data.status === 'success') {
          this.EmailValidate = false;
          return;
        }
      }),
      error: (err => {
        console.log(err);
      })
    })
  }




  ngOnInit(): void {
    this.registerForm = this.fb.group({
      OrganizationName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      FullName: ['', Validators.required],
      Mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      EmailID: ['', [Validators.required, Validators.email]],
      CountryID: [0, Validators.required],
      Address: ['', Validators.required],
      City: ['', Validators.required],
      Pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      EmployeeCountID: [0, Validators.required],
      IPAddress: [],
      TokenKey: []
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop submission if the form is invalid
    if (this.registerForm.invalid) {
      console.log('Form submitted: invalid ', this.registerForm.value);
      return;
    }

    // 👇 Wait for Token and IP before submitting
    this.auth.getIpAddress().subscribe({
      next: (ip) => {
        const ipAddress = ip.ip;
        const token = this.Token;

        // ✅ Patch TokenKey and IPAddress
        this.registerForm.patchValue({
          TokenKey: token,
          IPAddress: ipAddress
        });

        const payload = this.registerForm.value;

        console.log('Form submitted:', payload);  // confirm correct values here

        this.URL.RegisterUser(payload).subscribe({
          next: (res) => {

            if (res.status === 'success') {
              Swal.fire({
                icon: 'success',
                title: res.status,
                text: res.message,
                confirmButtonColor: '#3085d6',
              });
              this.router.navigate(['/login']);
              // ✅ Reset the form after success
              this.registerForm.reset();
              this.submitted = false;
              this.mobileExists = null;
              this.mobilelength = null;
              this.EmailValidate = null;
              this.selectedCountry = 0;
              this.SelectEmployee = 0;
            }
            else {
              Swal.fire({
                icon: 'error',
                title: res.status || 'Error',
                text: res.message,
              });
            }

          },
          error: (err) => {
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
          }
        });
      },
      error: (err) => {
        console.error('Error fetching IP:', err);
        Swal.fire({
          icon: 'error',
          title: 'IP Error',
          text: 'Unable to fetch IP address.',
        });
      }
    });
  }



  // 👇 Only allow number keys (0-9)
  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  validateEmailOnKeyup(): void {
    const emailCtrl = this.registerForm.get('EmailID');
    this.emailInvalid = emailCtrl?.invalid && emailCtrl?.value?.length > 0;
  }
  // ✅ Prevent paste
  preventPaste(event: ClipboardEvent): void {
    event.preventDefault();
  }

  // ✅ Prevent copy
  preventCopy(event: ClipboardEvent): void {
    event.preventDefault();
  }

  // ✅ Prevent cut
  preventCut(event: ClipboardEvent): void {
    event.preventDefault();
  }
  gotologin() {
    this.router.navigate(['/login']);
  }

}
