import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { AuthJWTService } from '../../services/auth/auth-jwt.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';
import { MatDateFormats } from '@angular/material/core';
@Component({
  selector: 'app-editemployee',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule, MatSelectModule, NgFor],
  templateUrl: './editemployee.component.html',
  styleUrl: './editemployee.component.css'
})
export class EditemployeeComponent {
  editForm: FormGroup;
  today: unknown;
  Decreptedtoken: any = "";
  genderList: any[] = [];
  maritalList: any[] = [];
  Desination: any[] = [];
  VendorID: any;
  constructor(private URL: AdminService, private auth: AuthJWTService, private dialogRef: MatDialogRef<EditemployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    let TokenGKey: any = "";
    TokenGKey = this.auth.getglobaltoken();
    this.Decreptedtoken = this.auth.decrypt(TokenGKey);
    this.VendorID = this.auth.getUserId();
    this.URL.GetGender(this.Decreptedtoken).subscribe(data => this.genderList = data);
    this.URL.GetMaritals(this.Decreptedtoken).subscribe(data => this.maritalList = data);
    this.URL.GetDesignationList(this.Decreptedtoken, this.VendorID).subscribe({
      next: data => {
        this.Desination = data;
      }
    })





    this.editForm = this.fb.group({
      id: [data.id],
      fName: [data.fName],
      emailID: [data.emailID],
      genderID: [data.genderID],
      maritalID: [data.maritalID],
      dob: [data.dob],
      joining_Date: ['', [Validators.required, this.noFutureDateValidator]],
      mobile: [data.mobile],
      address: [data.address],
      ipAddress: [''],
      salary: [data.salary],
      designationID: [data.designationID],
      User_ID: []
    });

    let ipa: string = "";

    this.auth.getIpAddress().subscribe({
      next: (ip: any) => {
        ipa = ip.ip;
        console.log('User IP:', ipa); // ← use or send IP from here
      },
      error: (err) => {
        console.error('Failed to get IP address:', err);
      }
    });
    this.editForm.patchValue({
      ipAddress: ipa
    })


  }


  ngOnInit(): void {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
    this.URL.GetEmployeeListByEmpID(this.Decreptedtoken, this.data.id).subscribe({
      next: (res) => {
        console.log(res);
        if (Array.isArray(res) && res.length > 0) {
          const emp = res[0];  // ✅ Get first employee object

          this.editForm.patchValue({
            id: emp.id,
            fName: emp.fName,
            emailID: emp.emailID,
            genderID: emp.genderID,
            maritalID: emp.maritalID,
            dob: emp.dob ? this.convertToDate(emp.dob) : '',
            joining_Date: emp.joining_Date ? this.convertToDate(emp.joining_Date) : '',
            mobile: emp.mobile,
            salary: emp.salary,
            designationID: emp.designationID,
            address: emp.address,
          });
        } else {
          console.warn('No employee data found.');
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
  }

  convertToDate(dateStr: string): Date | null {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = +parts[0];
      const month = +parts[1] - 1; // JavaScript months are 0-indexed
      const year = +parts[2];
      return new Date(year, month, day);
    }
    return null;
  }




  noFutureDateValidator(control: AbstractControl) {
    return new Date(control.value) > new Date() ? { futureDate: true } : null;
  }



  disableTyping(event: KeyboardEvent): void {
    event.preventDefault(); // Block typing
  }
  save(): void {
    const FName = this.editForm.get('fName')?.value;
    const emailID = this.editForm.get('emailID')?.value;
    const genderID = this.editForm.get('genderID')?.value;
    const maritalID = this.editForm.get('maritalID')?.value;
    const dob = this.editForm.get('dob')?.value;
    const mobile: string = this.editForm.get('mobile')?.value;

    if (FName === "" || FName === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Enter name.'
      })
      return
    }
    else if (emailID === "" || emailID === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Enter EmailID.'
      })
      return
    }
    else if (emailID?.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Invalid EmailID.'
      })
      return
    }
    else if (genderID === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Select gender.'
      })
      return
    }
    else if (maritalID === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Select marital.'
      })
      return
    }
    else if (dob === '' || dob === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Enter dob.'
      })
      return
    }

    else if (mobile === null) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Enter mobile number.'
      })
      return
    }
    else if (!/^\d{10}$/.test(mobile)) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Enter 10 digit mobile number. '
      })
      return
    }

    const UserID = this.auth.getUserId();
    this.editForm.patchValue({
      User_ID: UserID
    })

    console.log(this.editForm.get('ipAddress')?.value)
    const payload = this.editForm.value;

    this.URL.EditEmployeeByID(this.Decreptedtoken, payload).subscribe({
      next: data => {
        if (data.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: data.message
          })
          this.dialogRef.close(true);
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
    // this.dialogRef.close(this.editForm.value);
  }

  close(): void {
    this.dialogRef.close();
  }

  // ✅ Prevent paste
  preventPaste(event: ClipboardEvent): void {
    event.preventDefault();
  }

  // 👇 Only allow number keys (0-9)
  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
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

}
