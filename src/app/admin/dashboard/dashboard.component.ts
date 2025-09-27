import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AuthJWTService } from '../../services/auth/auth-jwt.service';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  username: string | null = "";
  EmployeeCount: number = 0;
  TokenGKey: any = "";
  Decreptedtoken: any = "";
  VendorID: any;
  EmployeeTotalCount: number = 0;
  MarkedattendaceCount: number = 0;
  PendingLeaveCount: number = 0;
  constructor(private auth: AuthJWTService, private URL: AdminService, private router: Router,) {

  }
  ngOnInit() {
    this.username = this.auth.getusername();
    this.TokenGKey = this.auth.getglobaltoken();
    this.Decreptedtoken = this.auth.decrypt(this.TokenGKey);
    this.VendorID = this.auth.getUserId();
    this.GetEmployeeCount();
    this.GetAttendanceCount();
    this.LeavePendingCount();
  }
  GetEmployeeCount() {
    debugger
    this.URL.GetEmployeeCountasyc(this.Decreptedtoken, this.VendorID).subscribe({
      next: response => {
        this.EmployeeCount = response.message[0].empCount
      }
    })
  }

  GetAttendanceCount() {
    this.URL.GetMarkedattendaceCountasyc(this.Decreptedtoken, this.VendorID).subscribe({
      next: response => {
        this.EmployeeTotalCount = response.message[0].employeeCount
        this.MarkedattendaceCount = response.message[0].markedattendaceCount

      }
    })
  }
  LeavePendingCount() {
    this.URL.GetpendingLeaveCountasyc(this.Decreptedtoken, this.VendorID).subscribe({
      next: response => {
        this.PendingLeaveCount = response.message[0].leaveCount
      }
    })
  }

  ListofEmployee() {
    this.router.navigate(['/Admin/listofemployee']);
  }

}
