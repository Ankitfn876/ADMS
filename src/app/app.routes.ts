import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VregisterComponent } from './vregister/vregister.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RegisteremployeeComponent } from './admin/registeremployee/registeremployee.component';
import { EditemployeeComponent } from './admin/editemployee/editemployee.component';
import { AttendanceListComponent } from './admin/attendance-list/attendance-list.component';
import { CreateEmployeeUserComponent } from './admin/create-employee-user/create-employee-user.component';
import { EmployeelistComponent } from './admin/employeelist/employeelist.component';
import { DeleteEmployeeComponent } from './admin/delete-employee/delete-employee.component';
import { UpdateprofileComponent } from './admin/updateprofile/updateprofile.component';
import { EmployeedashboardComponent } from './admin/employeedashboard/employeedashboard.component';
import { AuthGuard } from './auth.guard';
import { ListofemployeeComponent } from './admin/listofemployee/listofemployee.component';
import { RegisterdesignationComponent } from './admin/registerdesignation/registerdesignation.component';
import { RegisterradiusComponent } from './admin/registerradius/registerradius.component';
import { LeavetypeComponent } from './admin/leavetype/leavetype.component';
import { LeaveComponent } from './admin/leave/leave.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',loadComponent:()=>import('./home/home.component').then(c=>c.HomeComponent) },
    { path: 'login', loadComponent:()=>import('./login/login.component').then(c=>c.LoginComponent)},
    { path: 'forgetpassword', loadComponent:()=>import('./forgetpassword/forgetpassword.component').then(c=>c.ForgetpasswordComponent)},
    { path: 'vregister', loadComponent:()=>import('./vregister/vregister.component').then(c=>c.VregisterComponent)},
    {
        path: 'Admin', component: AdminComponent, canActivate: [AuthGuard], children: [
            { path: 'Dashboard', loadComponent:()=>import('./admin/dashboard/dashboard.component').then(c=>c.DashboardComponent) },
            { path: 'Registeremployee', loadComponent:()=>import('./admin/registeremployee/registeremployee.component').then(c=>c.RegisteremployeeComponent) },
            { path: 'Edit', loadComponent:()=>import('./admin/editemployee/editemployee.component').then(c=>c.EditemployeeComponent) },
            { path: 'AttendanceList',loadComponent:()=>import('./admin/attendance-list/attendance-list.component').then(c=>c.AttendanceListComponent) },
            { path: 'CreateEmployeeUser', loadComponent:()=>import('./admin/create-employee-user/create-employee-user.component').then(c=>c.CreateEmployeeUserComponent) },
            { path: 'Employeelist', loadComponent:()=>import('./admin/employeelist/employeelist.component').then(c=>c.EmployeelistComponent) },
            { path: 'DeleteEmployee', loadComponent:()=>import('./admin/delete-employee/delete-employee.component').then(c=>c.DeleteEmployeeComponent) },
            { path: 'Updateprofile', loadComponent:()=>import('./admin/updateprofile/updateprofile.component').then(c=>c.UpdateprofileComponent) },
            { path: 'listofemployee', loadComponent:()=>import('./admin/listofemployee/listofemployee.component').then(c=>c.ListofemployeeComponent) },
            { path: 'Employeedashboard', loadComponent:()=>import('./admin/employeedashboard/employeedashboard.component').then(c=>c.EmployeedashboardComponent) },
            { path: 'Registerdesignation', loadComponent:()=>import('./admin/registerdesignation/registerdesignation.component').then(c=>c.RegisterdesignationComponent) },
            { path: 'Registerradius', loadComponent:()=>import('./admin/registerradius/registerradius.component').then(c=>c.RegisterradiusComponent) },
            { path: 'Leavetype', loadComponent:()=>import('./admin/leavetype/leavetype.component').then(c=>c.LeavetypeComponent) },
            { path: 'Leave', loadComponent:()=>import('./admin/leave/leave.component').then(c=>c.LeaveComponent) }
        ]
    },
];
