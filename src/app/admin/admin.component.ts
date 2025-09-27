import { Component } from '@angular/core';
import {  RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthJWTService } from '../services/auth/auth-jwt.service';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet,RouterLinkActive],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
isSidebarCollapsed = false;
username: any;

constructor(private router:Router,private auth:AuthJWTService){
  this.username=this.auth.getusername();
  const UserID=this.auth.getUserId();
}
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
Dashboard(){
   this.router.navigate(['/Admin/Dashboard']);
}
Updateprofile(){
   this.router.navigate(['/Admin/Updateprofile']);
}
  RegisterEmployee()
  {
 this.router.navigate(['/Admin/Registeremployee']);
  }
EditEmployee(){
  this.router.navigate(['/Admin/Edit']);
}

Attendancelist(){
  this.router.navigate(['/Admin/AttendanceList']);
}
CreateEmployeeUser(){
  this.router.navigate(['/Admin/CreateEmployeeUser']);
}
EmployeeList(){
  this.router.navigate(['/Admin/Employeelist']);
}
ListofEmployee(){
  this.router.navigate(['/Admin/listofemployee']);
}
DeleteEmployee(){
  this.router.navigate(['/Admin/DeleteEmployee']);
}
RegisterDesignation(){
  this.router.navigate(['/Admin/Registerdesignation']);
}
Registerradius(){
  this.router.navigate(['/Admin/Registerradius']);
}
Registerleavetype(){
  this.router.navigate(['/Admin/Leavetype']);
}
Approveorrejectleave(){
  this.router.navigate(['/Admin/Leave']);
}

Logout(){
  this.auth.clearSession();
  this.router.navigate(['/login']);
}
}
