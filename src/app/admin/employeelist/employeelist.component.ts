import { Component, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthJWTService } from '../../services/auth/auth-jwt.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { EditemployeeComponent } from '../editemployee/editemployee.component';
import Swal from 'sweetalert2';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-employeelist',
  imports: [MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule, MatTooltipModule, NgIf],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent {
  employeesList: any[] = [];
  dataSource = new MatTableDataSource<any>();
  tokenG: any = "";
  VendorID: string | null = null;
  Decreptedtoken: any = null;
  displayedColumns: string[] = ['id', 'fName', 'emailID', 'genderName', 'designationName', 'marital_StatusName', 'dob', 'joining_Date', 'mobile', 'salary', 'address', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private URL: AdminService, private auth: AuthJWTService, private dialog: MatDialog) { }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.tokenG = this.auth.getglobaltoken();
    this.Decreptedtoken = this.auth.decrypt(this.tokenG);
    this.VendorID = this.auth.getUserId();
    this.URL.GetEmployeeListByVendorID(this.Decreptedtoken, parseInt(this.VendorID ?? '0')).subscribe({
      next: data => {
        this.dataSource.data = data;
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

  editRow(emp: any): void {
    const dialogRef = this.dialog.open(EditemployeeComponent, {
      width: '600px',
      data: { id: emp.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.URL.GetEmployeeListByVendorID(this.Decreptedtoken, parseInt(this.VendorID ?? '0')).subscribe({
          next: data => {
            this.dataSource.data = data;
          },
          error: err => {
            console.log(err);
          }
        })
      }
    });
  }

  //  editRow(row: any): void {
  //   this.dialog.open(EditemployeeComponent, {
  //     data: { id: row.id }, // 👈 Pass dynamic ID here
  //     width: '600px',
  //     disableClose: true
  //   });


  // }

  deleteRow(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this employee record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {

      if (result.isConfirmed) {
        // ✅ Call API to delete
        this.URL.DeleteEmployeeByID(this.Decreptedtoken, id).subscribe({
          next: (res: any) => {
            console.log('Delete API response:', res);

            if (res?.status?.toLowerCase() === 'success') {
              // ✅ Show success message
              Swal.fire('Deleted!', 'Employee has been deleted.', 'success');

              // ✅ Refresh the employee list
              this.URL.GetEmployeeListByVendorID(this.Decreptedtoken, parseInt(this.VendorID ?? '0')).subscribe({
                next: (empList) => {
                  this.dataSource.data = empList;
                },
                error: (err) => {
                  console.error('Error fetching updated employee list:', err);
                }
              });
            } else {
              Swal.fire('Failed!', res?.message || 'Could not delete employee.', 'error');
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  exportToExcel(): void {
    const exportData = this.dataSource.filteredData.map(row => {
      const filteredRow: any = {};
      this.displayedColumns.forEach(col => {
        filteredRow[col] = row[col];
      });
      return filteredRow;
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    FileSaver.saveAs(blob, `Employee_List_${new Date().getTime()}.xlsx`);
  }

  preventPaste(event: ClipboardEvent): void {
    event.preventDefault();
  }
}
