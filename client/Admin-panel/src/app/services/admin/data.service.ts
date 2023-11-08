import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as env from '../../../environments/environment';
import { Observable } from 'rxjs';
import { apiRes } from 'src/app/models/api_res';
import { userData } from 'src/app/models/userModel';
const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly _apiUrl = env.environment.api_url;
  constructor(private _http: HttpClient) {}

  getUsersData(): Observable<Array<userData>> {
    const url = `${this._apiUrl}/admin/getUsersData`;
    return this._http.get<Array<userData>>(url);
  }

  getUser(id: string): Observable<apiRes> {
    const url = `${this._apiUrl}/admin/getUser?id=${id}`;
    return this._http.get<apiRes>(url);
  }
}
