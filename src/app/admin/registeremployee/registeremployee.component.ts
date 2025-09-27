import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { AuthJWTService } from '../../services/auth/auth-jwt.service';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { MatDatepicker } from "@angular/material/datepicker";

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-registeremployee',
  imports: [FormsModule, ReactiveFormsModule, NgFor, MatInputModule,
    MatSelectModule, MatDatepicker, MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, MatIconModule],
  templateUrl: './registeremployee.component.html',
  styleUrl: './registeremployee.component.css'
})
export class RegisteremployeeComponent {
  Registerform: any;
  Gender: any[] = [];
  Marital: any[] = [];
  Desination: any[] = [];
  TokenGKey: any = "";
  Decreptedtoken: any = "";
  emailInvalid: boolean | undefined = false;
  submitted = false;
  today: string;
  VendorID: any;
  //imagePreview: string | ArrayBuffer | null = null;
  constructor(private fb: FormBuilder, private URL: AdminService, private auth: AuthJWTService) {
    this.TokenGKey = this.auth.getglobaltoken();
    this.Decreptedtoken = this.auth.decrypt(this.TokenGKey);
    this.VendorID = this.auth.getUserId();
    const now = new Date();
    this.today = now.toISOString().split('T')[0];

    this.URL.GetGender(this.Decreptedtoken).subscribe({
      next: (data => {
        this.Gender = data;
      })
    })

    this.URL.GetMaritals(this.Decreptedtoken).subscribe({
      next: (Mdata => {
        this.Marital = Mdata;
      })
    })

    this.URL.GetDesignationList(this.Decreptedtoken, this.VendorID).subscribe({
      next: data => {
        this.Desination = data;
      }
    })
  }
  ngOnInit() {
    this.Registerform = this.fb.group({
      FName: [],
      GenderID: [0],
      MaritalID: [0],
      DesignationID: [0],
      Dob: [],
      EmailID: [],
      Mobile: [],
      Salary: [],
      Address: [],
      IPAddress: [],
      User_ID: [],
      ProfileImage: [null]
    })
  }
  onSubmit() {
    this.submitted = true;
    const FName = this.Registerform.get('FName').value;
    const GenderID = this.Registerform.get('GenderID').value;
    const MaritalID = this.Registerform.get('MaritalID').value;
    const Dob = this.Registerform.get('Dob').value;
    const EmailID = this.Registerform.get('EmailID').value;
    const Mobile = this.Registerform.get('Mobile').value;
    const Address = this.Registerform.get('Address').value;
    const IPAddress = this.Registerform.get('IPAddress').value;
    const UserID = this.auth.getUserId();
    this.Registerform.patchValue({
      User_ID: UserID
    })
    this.auth.getIpAddress().subscribe({
      next: ip => {
        const ipAddress = ip.ip;
        // ✅ Patch TokenKey and IPAddress
        this.Registerform.patchValue({
          IPAddress: ipAddress
        });

      }
    })
    if (FName === null) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Enter First name.',
        timer: 4000
      })
      return
    }

    else if (GenderID === 0) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Select Gender.',
        timer: 4000
      })
      return
    }
    else if (MaritalID === 0) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Select Marital status.',
        timer: 4000
      })
      return
    }
    else if (Dob === null) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Enter date of birth.',
        timer: 4000
      })
      return
    }
    else if (EmailID === null) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Enter email ID.',
        timer: 4000
      })
      return
    }
    else if (Mobile === null) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Enter mobile number.',
        timer: 4000
      })
      return
    }
    else if (Address === null) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Enter address.',
        timer: 4000
      })
      return
    }

    if (FName != null && GenderID != "0" && MaritalID != "0" && Dob != null && EmailID != null && Mobile != null && Address != null) {
      const payload = this.Registerform.value;
      this.URL.RegisterEmployee(this.Decreptedtoken, payload).subscribe({
        next: data => {

          if (data.status === "success") {
            Swal.fire({
              icon: 'success',
              title: 'success',
              text: data.message
            })
            this.Registerform.controls['FName'].setValue('');
            this.Registerform.controls['GenderID'].setValue(0);
            this.Registerform.controls['MaritalID'].setValue(0);
            this.Registerform.controls['Dob'].setValue('');
            this.Registerform.controls['EmailID'].setValue('');
            this.Registerform.controls['Mobile'].setValue('');
            this.Registerform.controls['Address'].setValue('');
            this.Registerform.controls['Salary'].setValue('');
            this.Registerform.control['DesignationID'].setValue(0);
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.message
            })
          }
        },
        error: err => {
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
      })
    }
  }
  BlurEmailID() {
    const EmailID = this.Registerform.get('EmailID').value;

    this.URL.ValidateEmailID(this.Decreptedtoken, EmailID, this.VendorID).subscribe({
      next: data => {
        if (data.status === "exist") {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "EmailID id already exists."
          })
          this.Registerform.controls['EmailID'].setValue('');
          return;
        }

      },
      error: err => {
        Swal.fire({
          icon: "error",
          title: "error",
          text: err.message
        })
      }
    })
  }

  BlurMobile() {
    const Mobile = this.Registerform.get('Mobile').value;

    if (Mobile != null && Mobile.length === 10) {
      this.URL.ValidateMobilenumber(this.Decreptedtoken, Mobile,this.VendorID).subscribe({
        next: data => {
          if (data.status === "exist") {
            Swal.fire({
              icon: 'warning',
              title: 'warning',
              text: 'Mobile number already exist.'
            })
            this.Registerform.controls['Mobile'].setValue('');


            return
          }
        },
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: err.message
          })
          return
        }
      })
    }


  }
  //  Image Upload code commented
  // onImageSelected(event: any): void {
  //   const file: File = event.target.files[0];

  //  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  //  if (!allowedTypes.includes(file.type)) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Invalid File Type',
  //       text: 'Only image files (JPG, PNG, WEBP) are allowed.',
  //     });
  //     event.target.value = ''; // clear file input
  //     return;
  //   }
  //   if (file) {
  //    const maxSizeKB = 500;
  //   const fileSizeKB = file.size / 1024;
  //   if (fileSizeKB > maxSizeKB) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'File Too Large',
  //       text: 'Image must be less than 500 KB.',
  //     });
  //     event.target.value = '';
  //     return;
  //   }

  //     this.Registerform.patchValue({ ProfileImage: file });
  //     this.Registerform.get('ProfileImage')?.updateValueAndValidity();

  //     // For preview
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreview = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

 disableTyping(event: KeyboardEvent): void {
    event.preventDefault(); // Block typing
  }
  allowEnglishNumbersSpecialCharsAndSpace(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
    const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._\- ]$/; // includes space at the end

    if (allowedKeys.includes(event.key)) {
      return; // Allow navigation and control keys
    }

    if (!regex.test(event.key)) {
      event.preventDefault(); // Block everything else
    }
  }

  // 👇 Only allow number keys (0-9)
  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  validateEmailOnKeyup(): void {
    const emailCtrl = this.Registerform.get('EmailID');
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
}
