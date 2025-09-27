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
import Swal from 'sweetalert2';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-create-employee-user',
  imports: [MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule, MatTooltipModule, NgStyle],
  templateUrl: './create-employee-user.component.html',
  styleUrl: './create-employee-user.component.css'
})
export class CreateEmployeeUserComponent {
  employeesList: any[] = [];
  dataSource = new MatTableDataSource<any>();
  tokenG: any = "";
  VendorID: any;
  Decreptedtoken: any = null;
  displayedColumns: string[] = ['id', 'fName', 'emailID', 'genderName', 'marital_StatusName', 'dob', 'joining_Date', 'mobile', 'address', 'actions'];
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
        console.log(err);
      }
    })
  }

  createaccount(id: number, mobile: number): void {

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want employee create account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, create it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        let ipa: string = "";
        console.log(id);
        console.log(mobile);
        this.auth.getIpAddress().subscribe({
          next: (ip: any) => {
            ipa = ip.ip;
            console.log('User IP:', ipa); // ← use or send IP from here
          },
          error: (err) => {
            console.error('Failed to get IP address:', err);
          }
        });
        this.URL.CreateEUser(this.Decreptedtoken, id, this.VendorID, ipa, mobile).subscribe({
          next: data => {
            if (data.status === "Success") {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: data.message
              })
              this.URL.GetEmployeeListByVendorID(this.Decreptedtoken, parseInt(this.VendorID ?? '0')).subscribe({
                next: data => {
                  this.dataSource.data = data;
                },
                error: err => {
                  console.log(err);
                }
              })
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

}
