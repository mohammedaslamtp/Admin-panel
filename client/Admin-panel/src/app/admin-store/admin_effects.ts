import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import * as AuthAction from '../admin-store/admin-actions/admin_auth';
import { AuthService } from '../services/admin/auth.service';

@Injectable()
export class effects {
  constructor(
    private _actions$: Actions,
    private _route: Router,
    private _authService: AuthService
  ) {}

  getAuthData$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthAction.AuthData),
      mergeMap((res) => {
        return this._authService.adminLogin(res.Auth).pipe(
          map((_loginRes) => {
            if (_loginRes.accessToken)
              this._authService.storeAdminToken(_loginRes?.accessToken);
            return AuthAction.AuthSuccess({ Auth: _loginRes });
          }),
          catchError((err) => {
            return of(AuthAction.AuthFailure({ error: err.error }));
          })
        );
      })
    )
  );
}
