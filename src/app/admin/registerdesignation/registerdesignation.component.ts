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
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogContent, MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'app-registerdesignation',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule,
    MatSelectModule, MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, MatIconModule, MatPaginatorModule,
    MatSortModule, MatTableModule, NgIf, MatDialogContent, MatDialogModule],
  templateUrl: './registerdesignation.component.html',
  styleUrl: './registerdesignation.component.css'
})
export class RegisterdesignationComponent {

  Registerform: any;
  TokenGKey: any = "";
  Decreptedtoken: any = "";
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'designationName', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  VendorID: any;
  @ViewChild('editDialog') editDialogTemplate!: TemplateRef<any>;

  editForm!: FormGroup;
  selectedRow: any;

  constructor(private fb: FormBuilder, private URL: AdminService, private auth: AuthJWTService, private dialog: MatDialog) {
    this.TokenGKey = this.auth.getglobaltoken();
    this.Decreptedtoken = this.auth.decrypt(this.TokenGKey);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.VendorID = this.auth.getUserId();
    this.GetDesignation();
    // this.Registerform = this.fb.group({
    //   DesignatioName: [],
    //   IPAddress: [],
    //   User_ID: []
    // })
    this.URL.GetEmployeeListByVendorID(this.Decreptedtoken, parseInt(this.VendorID ?? '0')).subscribe({
      next: data => {
        this.dataSource.data = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  ngOnInit() {
    this.Registerform = this.fb.group({
      DesignationName: [],
      IpAddress: [],
      VendorID: []
    });

    this.editForm = this.fb.group({
      designationName: ['']
    });

  }
  GetDesignation() {
    this.URL.GetDesignationList(this.Decreptedtoken, parseInt(this.VendorID ?? '0')).subscribe({
      next: data => {
        this.dataSource.data = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  onSubmit() {
    const UserID = this.auth.getUserId();
    const DesignatioName = this.Registerform.get('DesignationName').value;
    this.Registerform.patchValue({
      VendorID: UserID
    })
    this.auth.getIpAddress().subscribe({
      next: ip => {
        const ipAddress = ip.ip;
        // ✅ Patch TokenKey and IPAddress
        this.Registerform.patchValue({
          IpAddress: ipAddress
        });

      }
    })
    if (DesignatioName === null) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Enter Desingation.',
        timer: 4000
      })
      return
    }
    const payload = this.Registerform.value;

    this.URL.RegisterDesignation(this.Decreptedtoken, payload).subscribe({
      next: data => {

        if (data.status === "success") {
          Swal.fire({
            icon: 'success',
            title: 'success',
            text: data.message
          });
          this.GetDesignation();
          this.Registerform.controls['DesignationName'].setValue('');

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

  // ✅ Open modal and populate form
  openEditDialog(element: any) {
    this.selectedRow = element;

    this.editForm.patchValue({ designationName: element.designationName });
    this.dialog.open(this.editDialogTemplate);
  }


  updateDesignation() {
    const updatedName = this.editForm.value.designationName;
    if (this.selectedRow) {
      this.selectedRow.designationName = updatedName;
      this.selectedRow.VendorID = this.VendorID;
      if(updatedName==='' || updatedName===null){
        Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Enter designation name.'
            }); 
            return;
      }
      this.URL.EditDesignation(this.Decreptedtoken, updatedName, this.VendorID, this.selectedRow.id).subscribe({
        next: data => {
          if (data.status === "success") {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: data.message
            });
            this.GetDesignation();
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

  // ✅ Prevent paste
  preventPaste(event: ClipboardEvent): void {
    event.preventDefault();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
