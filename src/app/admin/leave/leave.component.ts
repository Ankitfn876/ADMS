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
import { Console } from 'node:console';


@Component({
  selector: 'app-leave',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule,
    MatSelectModule, MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, MatIconModule, MatPaginatorModule,
    MatSortModule, MatTableModule, NgIf, MatDialogModule, NgFor],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css'
})
export class LeaveComponent {
  Registerform: any;
  TokenGKey: any = "";
  Decreptedtoken: any = "";
  dataSource = new MatTableDataSource<any>();
  dataSourcep = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'employeeName', 'leaveTypeName', 'fromDate', 'toDate', 'leaveStatus', 'reason', 'actions'];
  displayedapColumns: string[] = ['id', 'EmployeeName', 'LeaveTypeName', 'FromDate', 'ToDate', 'LeaveStatus', 'Reason'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  VendorID: any;
  Leavestatuslist: any[] = [];
  @ViewChild('editDialog') editDialogTemplate!: TemplateRef<any>;

  editForm!: FormGroup;
  selectedRow: any;
  constructor(private fb: FormBuilder, private URL: AdminService, private auth: AuthJWTService, private dialog: MatDialog) {
    this.TokenGKey = this.auth.getglobaltoken();
    this.Decreptedtoken = this.auth.decrypt(this.TokenGKey);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.VendorID = this.auth.getUserId();
    this.GetPendingleave();
    this.GetLeavestatuslist();
    this.Getapproverejectleave();
  }
  GetLeavestatuslist() {
    this.URL.LeaveStatus(this.Decreptedtoken).subscribe({
      next: response => {
        this.Leavestatuslist = response.message;
      }
    })
  }
  GetPendingleave() {
    this.URL.GetPendingleavelistbyvendorID(this.Decreptedtoken, this.VendorID).subscribe({
      next: response => {
        this.dataSource.data = response.message
      }
    })
  }
  Getapproverejectleave() {
    this.URL.GetapproveorrejectleavelistbyvendorID(this.Decreptedtoken, this.VendorID).subscribe({
      next: response => {
        this.dataSourcep.data = response.message
      }
    })
  }

  onLeaveStatusChange(statusId: number, element: any) {
    const action = statusId === 20 ? 'approve' : 'reject';
    
    Swal.fire({
      title: `Are you sure you want to ${action} this leave?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        // Call your API with element.id and statusId
        this.URL.Updateleavestatusapproveorreject(this.Decreptedtoken, element.id, statusId).subscribe({
          next: (res) => {
            debugger
            if (res.status === "success") {
              Swal.fire('Success', `Leave ${action}d successfully`, 'success');
              this.GetPendingleave();
            }
            else {
              Swal.fire('error', res.message, 'error');
            }
          },
          error: () => {
            Swal.fire('Error', 'Failed to update leave status.', 'error');
          }
        });
      }
    });
  }

  // ✅ Open modal and populate form
  openEditDialog(element: any) {
    this.selectedRow = element;

    this.editForm.patchValue({ Leavename: element.leavename });
    this.dialog.open(this.editDialogTemplate);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
