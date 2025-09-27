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
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listofemployee',
  imports: [MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule, NgIf],
  templateUrl: './listofemployee.component.html',
  styleUrl: './listofemployee.component.css'
})
export class ListofemployeeComponent {
  employeesList: any[] = [];
  dataSource = new MatTableDataSource<any>();
  tokenG: any = "";
  VendorID: string | null = null;
  Decreptedtoken: string | null = null;
  displayedColumns: string[] = ['id', 'fName', 'emailID', 'genderName', 'designationName', 'marital_StatusName', 'dob', 'joining_Date', 'mobile', 'salary', 'address'];
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
