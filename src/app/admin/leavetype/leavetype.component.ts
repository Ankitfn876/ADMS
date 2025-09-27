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
  selector: 'app-leavetype',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule,
    MatSelectModule, MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, MatIconModule, MatPaginatorModule,
    MatSortModule, MatTableModule, NgIf, MatDialogContent, MatDialogModule],
  templateUrl: './leavetype.component.html',
  styleUrl: './leavetype.component.css'
})
export class LeavetypeComponent {
  Registerform: any;
  TokenGKey: any = "";
  Decreptedtoken: any = "";
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'leavetype', 'actions'];
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
    this.GetLeavetype();
  }

  GetLeavetype() {
    this.URL.GetLeavetypeasyc(this.Decreptedtoken, this.VendorID).subscribe({
      next: response => {
        this.dataSource.data = response;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  ngOnInit() {
    this.Registerform = this.fb.group({
      VendorID: [],
      Leavename: [],
      IpAddress: []
    });

    this.editForm = this.fb.group({
      Leavename: [''],
      ID: 0
    });

  }


  onSubmit() {
    const UserID = this.auth.getUserId();
    const Leavename = this.Registerform.get('Leavename').value;
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
    if (Leavename === null) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Enter Leave type.',
        timer: 4000
      })
      return
    }
    const payload = this.Registerform.value;

    this.URL.RegisterLeaveTypeasyc(this.Decreptedtoken, payload).subscribe({
      next: data => {

        if (data.status === "success") {
          Swal.fire({
            icon: 'success',
            title: 'success',
            text: data.message
          });
          this.GetLeavetype();
          this.Registerform.controls['Leavename'].setValue('');

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

    this.editForm.patchValue({ Leavename: element.leavename });
    this.dialog.open(this.editDialogTemplate);
  }

  updateLeavetype() {
    const Leavename = this.editForm.value.Leavename;
    if (this.selectedRow) {
      this.selectedRow.Leavename = Leavename;
      this.selectedRow.VendorID = this.VendorID;
      if (Leavename === '' || Leavename === null) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Enter leave type.'
        });
        return;
      }
      this.editForm.patchValue({ ID: this.selectedRow.id });

      const payload = this.editForm.value;

      this.URL.UpdateLeaveTypeasyc(this.Decreptedtoken, payload).subscribe({
        next: data => {
          if (data.status === "success") {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: data.message
            });
            this.GetLeavetype();
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


  deleteRow(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this leave type record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {

      if (result.isConfirmed) {
        
        // ✅ Call API to delete
        this.URL.DeleteLeavebyIDasyc(this.Decreptedtoken, id).subscribe({
          next: (res: any) => {
            console.log('Delete API response:', res);

            if (res?.status?.toLowerCase() === 'success') {
              // ✅ Show success message
              Swal.fire('Deleted!', 'Leave type has been deleted.', 'success');

              this.GetLeavetype();

            } else {
              Swal.fire('Failed!', res?.message || 'Could not delete employee.', 'error');
               this.GetLeavetype();
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
    });
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
