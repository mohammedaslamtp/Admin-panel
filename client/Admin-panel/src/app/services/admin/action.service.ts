import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as env from '../../../environments/environment';
import { userData } from 'src/app/models/userModel';
import { Observable } from 'rxjs';
import { apiRes } from 'src/app/models/api_res';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  private readonly _apiUrl = env.environment.api_url;
  constructor(private _http: HttpClient) {}

  createUser(userData: userData): Observable<apiRes> {
    const url = `${this._apiUrl}/admin/addUser`;
    return this._http.post<apiRes>(url, userData, httpOptions);
  }

  editUser(userData: userData, id: string): Observable<apiRes> {
    const url = `${this._apiUrl}/admin/editUser?id=${id}`;
    return this._http.put<apiRes>(url, userData, httpOptions);
  }

  deleteUser(id: string): Observable<apiRes> {
    const url = `${this._apiUrl}/admin/deleteUser?id=${id}`;
    return this._http.delete<apiRes>(url, httpOptions);
  }

}
