import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterResponse, ValidateVendorRequest } from '../../interface/front/register-response';
import { loginresponse } from '../../interface/front/loginresponse';
@Injectable({
  providedIn: 'root'
})
export class FloginNregisterService {
  private GetCountriesasyc: string = `https://localhost:7205/api/LoginNRegister/GetCountries`;
  private GetEmployeeCountsasyc: string = `https://localhost:7205/api/LoginNRegister/GetEmployeesC`;
  private ValidateMobilesasyc: string = `https://localhost:7205/api/LoginNRegister/ValidateVendorMobile`;
  private ValidateEmailIDsasyc: string = `https://localhost:7205/api/LoginNRegister/ValidateVendorEmailID`;
  private VRegisterUsrasync: string = 'https://localhost:7205/api/LoginNRegister/VRegister';
  private Loginasync: string = 'https://localhost:7205/api/LoginNRegister/Login';
  private ValidateVendorforresetPasswordasync: string = 'https://localhost:7205/api/LoginNRegister/ValidateVendorforresetPassword';
  private ForgetPasswordasync: string = 'https://localhost:7205/api/LoginNRegister/ForgetPassword';
  constructor(private http: HttpClient) { }

  GetCountries(TokenKey: string): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${TokenKey}`
      });
    return this.http.get(this.GetCountriesasyc, { headers });
  }

  GetEmployeeC(TokenKey: string): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${TokenKey}`
      });
    return this.http.get(this.GetEmployeeCountsasyc, { headers });
  }

  ValidateVendorMobile(TokenKey: string, MobileNumber: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${TokenKey}`
    });
    const params = {
      MobileNumber: MobileNumber
    }
    return this.http.get(this.ValidateMobilesasyc, { headers, params });
  }
  ValidateVendorEmailID(TokenKey: string, EmailID: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${TokenKey}`
    });
    const params = {
      EmailID: EmailID
    };
    return this.http.get(this.ValidateEmailIDsasyc, { headers, params });
  }
  RegisterUser(user: RegisterResponse): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.VRegisterUsrasync, user);
  }
  LoginVendor(user: loginresponse): Observable<loginresponse> {
    return this.http.post<loginresponse>(this.Loginasync, user);
  }
  ValidateVendorforresetPassword(user: ValidateVendorRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.ValidateVendorforresetPasswordasync, user);
  }
  ForgetPassword(user: RegisterResponse): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.ForgetPasswordasync, user);
  }
}
