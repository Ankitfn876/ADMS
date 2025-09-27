import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class AuthJWTService {
  static GetTokenKey() {
    throw new Error('Method not implemented.');
  }
  private GetTokenkeyasyc: string = 'https://localhost:7205/api/Auth/GetToken';
  private ipApiUrl = 'https://api.ipify.org?format=json';
  private readonly SECRET_KEY = '$ecdgtert##$@@@$%^retKey123!';
  private readonly USER_KEY = 'UserID';
  private readonly USER_NAME = 'USERNAME';
  private readonly TOKEN_KEY = 'TOKEN';
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }


GetTokenKey(): Observable<HttpResponse<any>> {
  const headers = new HttpHeaders({
    'servicekey': 'FE742EC4-FA93-46C9-9470-27312BDD5937'
  });

  // Observe the full response to access headers
  return this.http.get<any>(this.GetTokenkeyasyc, { 
    headers, 
    observe: 'response' 
  });
}



  getIpAddress(): Observable<any> {
    return this.http.get(this.ipApiUrl);
  }

  // Encrypt a value
  private encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.SECRET_KEY).toString();
  }

  // Decrypt a value
  decrypt(value: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(value, this.SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      return '';
    }
  }

  setUserId(id: string, username: string) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.USER_KEY, this.encrypt(id));
      sessionStorage.setItem(this.USER_NAME, this.encrypt(username));
      this.GetTokenKey().subscribe({
      next: response => {
        
        const tokenKey = response.headers.get('X-Auth-Token');  // 👈 Fetch from header
        
       
        if (tokenKey) {
          sessionStorage.setItem(this.TOKEN_KEY, this.encrypt(tokenKey));
        }
      },
      error: err => {
        console.error('Failed to fetch token:', err);
      }
    });

    }

  }
  getUserId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const encrypted = sessionStorage.getItem(this.USER_KEY);
      return encrypted ? this.decrypt(encrypted) : null;
    }
    return null;
  }
  getusername(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const encrypted = sessionStorage.getItem(this.USER_NAME);
      return encrypted ? this.decrypt(encrypted) : null;
    }
    return null;
  }
  getglobaltoken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const encrypted = sessionStorage.getItem(this.TOKEN_KEY);
      return encrypted;
    }
    return null;
  }


  clearSession() {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.removeItem(this.USER_KEY);
    }
  }
  isLoggedIn(): boolean {
    return this.getUserId() !== null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
  }
}
