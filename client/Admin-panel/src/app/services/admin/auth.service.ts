import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as env from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/models/admin_login';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _apiUrl = env.environment.api_url;
  constructor(private _http: HttpClient, private _router: Router) {}

  adminLogin(data: Auth): Observable<any> {
    const url = `${this._apiUrl}/admin/adminLogin`;
    return this._http.post<any>(url, data, httpOptions);
  }

  storeAdminToken(accessToken: string) {
    localStorage.setItem('admin_access_token', accessToken);
  }

  isAdminLoggedIn(): Observable<boolean> {
    const url = `${this._apiUrl}/admin/isLoggedIn`;
    return this._http.get<boolean>(url);
  }

  adminLogout() {
    localStorage.removeItem('admin_access_token');
    this._router.navigate(['/admin/login']);
  }
}
