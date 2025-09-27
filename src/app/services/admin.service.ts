import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employees } from '../interface/admin/employees';
import { employeesresponse } from '../interface/admin/employeesresponse';
import { Attendancelist } from '../interface/admin/Attendancelist';
import { Radiusresponse } from '../interface/admin/radiusresponse';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private ValidateEmailIDsasyc: string = `https://localhost:7205/api/Admin/ValidateEmailID`;
  private ValidateMobilesasyc: string = `https://localhost:7205/api/Admin/ValidateMobile`;
  private Getemployeelist: string = `https://localhost:7205/api/Admin/Getemployeelist`;
  private GetEmployeeByEmployeeID: string = `https://localhost:7205/api/Admin/GetEmployeeByEmployeeID`;
  private EditEmployee: string = 'https://localhost:7205/api/Admin/EditEmployee';
  private GetGenders: string = 'https://localhost:7205/api/Admin/GetGenders';
  private GetMarital: string = `https://localhost:7205/api/Admin/GetMarital`;
  private VRegisterUsrasync: string = 'https://localhost:7205/api/Admin/Employeeregistration';
  private DeleteEmployeeByEmployeeID: string = `https://localhost:7205/api/Admin/DeleteEmployeeByID`;
  private CreateEmpUsers: string = `https://localhost:7205/api/Admin/CreateEmpUsers`;
  private Attendancelist: string = 'https://localhost:7205/api/Admin/EmployeeattendanceList';
  private GetDesignationByVendor: string = 'https://localhost:7205/api/Admin/GetDesignationByVendor';
  private RegisterDesignationVendor: string = 'https://localhost:7205/api/Admin/RegisterDesignationVendor';
  private EditDesignationVendor: string = 'https://localhost:7205/api/Admin/EditDesignationVendor';
  private Registerradius: string = 'https://localhost:7205/api/Admin/Registerradius';
  private Updateradius: string = 'https://localhost:7205/api/Admin/Updateradius';
  private Getradiuslist: string = 'https://localhost:7205/api/Admin/GetRadiusByVendor';
  private GetVendorprofile: string = 'https://localhost:7205/api/Admin/GetVendorprofile';
  private UpdateVendorProfile: string = 'https://localhost:7205/api/Admin/UpdateVendorProfile';
  private RegisterLeaveType: string = 'https://localhost:7205/api/Admin/RegisterLeaveType';
  private UpdateLeaveType: string = 'https://localhost:7205/api/Admin/UpdateLeaveType';
  private GetLeaveTypebyVendorIDAsyc: string = 'https://localhost:7205/api/Admin/GetLeaveTypebyVendorIDAsyc';
  private DeleteLeavetypeAsyc: string = 'https://localhost:7205/api/Admin/DeleteLeavetypeAsyc';
  private GetEmployeeCountbyVendorID: string = 'https://localhost:7205/api/Admin/GetEmployeeCountbyVendorID';
  private GetEmployeeCountmarkedattendacebyVendorIDAsyc: string = 'https://localhost:7205/api/Admin/GetEmployeeCountmarkedattendacebyVendorIDAsyc';
  private GetPendingLeaveCountbyVendorIDAsyc: string = 'https://localhost:7205/api/Admin/GetLeaveCountbyVendorIDAsyc';
  private GetPendingleavelistbyvendorIDAsyc: string = 'https://localhost:7205/api/Admin/GetPendingleavelistbyvendorIDAsyc';
  private GetapproveorrejectleavelistbyvendorIDAsyc: string = 'https://localhost:7205/api/Admin/GetapproveorrejectleavelistbyvendorIDAsyc';
  private LeaveStatusAsyc: string = 'https://localhost:7205/api/Admin/LeaveStatusAsyc';
  private UpdateLeavestatusapporreject: string = 'https://localhost:7205/api/Admin/UpdateLeavestatusapporreject';

  constructor(private http: HttpClient) { }

  GetGender(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.GetGenders, { headers });
  }
  GetMaritals(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.GetMarital, { headers });
  }
  ValidateEmailID(token: string, EmailID: string, VendorID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      EmailID: EmailID,
      VendorID: VendorID
    };
    return this.http.get(this.ValidateEmailIDsasyc, { headers, params });
  }
  ValidateMobilenumber(token: string, Mobile: number, VendorID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      MobileNumber: Mobile,
      VendorID: VendorID
    }
    return this.http.get(this.ValidateMobilesasyc, { headers, params });
  }

  RegisterEmployee(token: string, employees: employeesresponse): Observable<employeesresponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<employeesresponse>(this.VRegisterUsrasync, employees, { headers });
  }

  GetEmployeeListByVendorID(token: string, VendorID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      VendorID: VendorID
    }
    return this.http.get(this.Getemployeelist, { headers, params });
  }

  GetEmployeeListByEmpID(token: string, EmployeeID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      EmployeeID: EmployeeID
    }
    return this.http.get(this.GetEmployeeByEmployeeID, { headers, params });
  }

  EditEmployeeByID(token: string, employees: employeesresponse): Observable<employeesresponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<employeesresponse>(this.EditEmployee, employees, { headers });
  }

  DeleteEmployeeByID(token: string, ID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // ✅ Required for sending JSON payload
    });

    const body = {
      ID: ID
    };

    return this.http.post<any>(this.DeleteEmployeeByEmployeeID, body, { headers });
  }

  CreateEUser(token: string, ID: number, VendorID: number, IP: string, mobile: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // ✅ Required for sending JSON payload
    });

    const body = {
      Employees_ID: ID,
      VendorID: VendorID,
      IPAddress: IP,
      Mobile_Number: mobile
    };

    return this.http.post<any>(this.CreateEmpUsers, body, { headers });
  }


  RegisterDesignation(token: string, Designatio: employeesresponse): Observable<employeesresponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<employeesresponse>(this.RegisterDesignationVendor, Designatio, { headers });
  }

  EditDesignation(token: string, Name: string, VendorID: number, ID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const body = {
      ID: ID,
      VendorID: VendorID,
      IpAddress: '',
      DesignationName: Name
    };
    return this.http.post<any>(this.EditDesignationVendor, body, { headers });
  }
  GetDesignationList(token: string, VendorID: number): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      VendorID: VendorID
    }
    return this.http.get(this.GetDesignationByVendor, { headers, params });
  }

  Registerradiusasync(token: string, radius: Radiusresponse): Observable<Radiusresponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Radiusresponse>(this.Registerradius, radius, { headers });
  }

  Updateradiusasync(token: string, radius: Radiusresponse): Observable<Radiusresponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Radiusresponse>(this.Updateradius, radius, { headers });
  }

  Getradiusasync(token: string, VendorID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      VendorID: VendorID
    }
    return this.http.get(this.Getradiuslist, { headers, params });
  }

  Updatevendorprofile(token: string, profile: employeesresponse): Observable<employeesresponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<employeesresponse>(this.UpdateVendorProfile, profile, { headers });
  }

  GetVendorprofileasyc(token: string, VendorID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      VendorID: VendorID
    }
    return this.http.get(this.GetVendorprofile, { headers, params });
  }

  /**
 * Registers a new leave type for an employee.
 * 
 * @param token - The Bearer token for API authorization
 * @param leavetype - The leave type data to be registered (payload)
 * @returns Observable of employeesresponse containing the API response
 */
  RegisterLeaveTypeasyc(token: string, leavetype: employeesresponse): Observable<employeesresponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<employeesresponse>(this.RegisterLeaveType, leavetype, { headers });
  }
  /**
* Update a old leave type for an employee.
* 
* @param token - The Bearer token for API authorization
* @param leavetype - The leave type data to be registered (payload)
* @returns Observable of employeesresponse containing the API response
*/
  UpdateLeaveTypeasyc(token: string, leavetype: employeesresponse): Observable<employeesresponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<employeesresponse>(this.UpdateLeaveType, leavetype, { headers });
  }

  /**
 * Get a leave type for an employee.
 * 
 * @param token - The Bearer token for API authorization
 * @returns Observable of employeesresponse containing the API response
 */
  GetLeavetypeasyc(token: string, VendorID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      VendorID: VendorID
    }
    return this.http.get(this.GetLeaveTypebyVendorIDAsyc, { headers, params });
  }

  /**
* Delete a leave type .
* 
* @param token - The Bearer token for API authorization
* @returns Observable of employeesresponse containing the API response
*/

  DeleteLeavebyIDasyc(token: string, ID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // ✅ Required for sending JSON payload
    });

    const body = {
      ID: ID
    };

    return this.http.post<any>(this.DeleteLeavetypeAsyc, body, { headers });
  }

  /**
* Get a Employee count.
* 
* @param token - The Bearer token for API authorization
* @returns Observable of employeesresponse containing the API response
*/
  GetEmployeeCountasyc(token: string, VendorID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      VendorID: VendorID
    }
    return this.http.get(this.GetEmployeeCountbyVendorID, { headers, params });
  }


  /**
* Get a Employee count and marked attendance count today.
* 
* @param token - The Bearer token for API authorization
* @returns Observable of employeesresponse containing the API response
*/
  GetMarkedattendaceCountasyc(token: string, VendorID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      VendorID: VendorID
    }
    return this.http.get(this.GetEmployeeCountmarkedattendacebyVendorIDAsyc, { headers, params });
  }
  /**
* Get total pending leave count .
* 
* @param token - The Bearer token for API authorization
* @returns Observable of employeesresponse containing the API response
*/
  GetpendingLeaveCountasyc(token: string, VendorID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      VendorID: VendorID
    }
    return this.http.get(this.GetPendingLeaveCountbyVendorIDAsyc, { headers, params });
  }
  /**
* API Get pending leave list .
* 
* @param token - The Bearer token for API authorization
* @returns Observable of employeesresponse containing the API response
*/
  GetPendingleavelistbyvendorID(token: string, VendorID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      VendorID: VendorID
    }
    return this.http.get(this.GetPendingleavelistbyvendorIDAsyc, { headers, params });
  }

  /**
*API Get approve and reject leave list .
* 
* @param token - The Bearer token for API authorization
* @returns Observable of employeesresponse containing the API response
*/
  GetapproveorrejectleavelistbyvendorID(token: string, VendorID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = {
      VendorID: VendorID
    }
    return this.http.get(this.GetapproveorrejectleavelistbyvendorIDAsyc, { headers, params });
  }

  LeaveStatus(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.LeaveStatusAsyc, { headers });
  }



  Updateleavestatusapproveorreject(token: string, LeaveID: number, StatusID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const params = {
      LeaveID: LeaveID,
      StatusID: StatusID
    }
    
    return this.http.post<any>(this.UpdateLeavestatusapporreject, params,{ headers });
  }
}
