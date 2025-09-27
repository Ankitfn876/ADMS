import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AdminService } from '../../services/admin.service';
import { AuthJWTService } from '../../services/auth/auth-jwt.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogContent, MatDialogModule } from "@angular/material/dialog";
import { FloginNregisterService } from '../../services/front/flogin-nregister.service';

@Component({
  selector: 'app-updateprofile',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule,
    MatSelectModule, MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, MatIconModule, MatPaginatorModule,
    MatSortModule, MatTableModule, NgIf, MatDialogContent, MatDialogModule, NgFor],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {
  Registerform: any;
  TokenGKey: any = "";
  Decreptedtoken: any = "";
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'organizationName', 'fullName', 'mobile', 'emailID', 'country', 'city', 'address', 'pincode', 'employee_Count', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  VendorID: any;
  @ViewChild('editDialog') editDialogTemplate!: TemplateRef<any>;
  countries: any[] = [];
  Employees: any[] = [];
  editForm!: FormGroup;
  selectedRow: any;
  Token: any;

  constructor(private fb: FormBuilder, private URL: AdminService, private auth: AuthJWTService, private dialog: MatDialog, private URLF: FloginNregisterService) {
    this.TokenGKey = this.auth.getglobaltoken();
    this.Decreptedtoken = this.auth.decrypt(this.TokenGKey);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.VendorID = this.auth.getUserId();

    this.GetProfile();
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

    this.URLF.GetCountries(token).subscribe({
      next: (countriesData) => {
        this.countries = countriesData;
      },
      error: (err) => {
        console.error('Error fetching Employee:', err);
      }
    });
  }
  GetEmpCount(token: string) {
    this.URLF.GetEmployeeC(token).subscribe({
      next: (dataEmp) => {
        this.Employees = dataEmp;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  GetProfile() {
    this.URL.GetVendorprofileasyc(this.Decreptedtoken, parseInt(this.VendorID ?? '0')).subscribe({
      next: data => {
        this.dataSource.data = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  ngOnInit() {
    // this.Registerform = this.fb.group({
    //   DesignationName: [],
    //   IpAddress: [],
    //   VendorID: []
    // });

    this.editForm = this.fb.group({
      OrganizationName: [''],
      FullName: [''],
      Mobile: [''],
      EmailID: [''],
      CountryID: 0,
      City: [''],
      EmployeeCountID: 0,
      Pincode: 0,
      Address: [''],
      ID: 0,
      IPAddress:['']
    });

  }

  openEditDialog(element: any) {
    this.selectedRow = element;
    
    this.editForm.patchValue({ OrganizationName: element.organizationName });
    this.editForm.patchValue({ FullName: element.fullName });
    this.editForm.patchValue({ Mobile: element.mobile });
    this.editForm.patchValue({ EmailID: element.emailID });
    this.editForm.patchValue({ CountryID: element.countryID });
    this.editForm.patchValue({ City: element.city });
    this.editForm.patchValue({ Pincode: element.pincode });
    this.editForm.patchValue({ Address: element.address });
    this.editForm.patchValue({ EmployeeCountID: element.employeeCountID });
    this.editForm.patchValue({ ID: this.VendorID });
    this.dialog.open(this.editDialogTemplate);
  }


  updateProfile() {
    const Organization = this.editForm.value.Organization;
    const payload = this.editForm.value;
    if (!this.editForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Field should not be empty.'
      });
      return;
    }
    
    if (this.selectedRow) {
      this.selectedRow.designationName = Organization;
      this.selectedRow.VendorID = this.VendorID;
      if (Organization === '' || Organization === null) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Enter Organization name.'
        });
        return;
      }
      this.URL.Updatevendorprofile(this.Decreptedtoken, payload).subscribe({
        next: data => {
          if (data.status === "success") {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: data.message
            });
            this.GetProfile();
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
      // TODO: Call backend API here to persist changes
      this.dialog.closeAll(); // close modal
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
