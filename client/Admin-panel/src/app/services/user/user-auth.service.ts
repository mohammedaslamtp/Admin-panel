import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as env from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { apiRes } from 'src/app/models/api_res';
import { Auth } from 'src/app/models/admin_login';

export const authId = new BehaviorSubject<string>('');

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private readonly _apiUrl = env.environment.api_url;
  constructor(private _http: HttpClient, private _router: Router) {}

  userLogin(userData: Auth): Observable<any> {
    const url = `${this._apiUrl}/userLogin`;
    return this._http.post<apiRes>(url, userData, httpOptions);
  }

  isUserLoggedIn(): Observable<boolean> {
    const url = `${this._apiUrl}/isUserLoggedIn`;
    return this._http.get<boolean>(url);
  }

  storeUserToken(accessToken: string) {
    localStorage.setItem('user_access_token', accessToken);
  }

  getData(): Observable<apiRes> {
    const url = `${this._apiUrl}/userData`;
    return this._http.get<apiRes>(url);
  }

  logout() {
    const url = `${this._apiUrl}/logout`;
    localStorage.removeItem('user_access_token');
    this._router.navigate(['/login']);
  }
}
