import { createAction, props } from '@ngrx/store';
import { adminAuth } from 'src/app/models/admin_login';

export const AuthData = createAction(
  '[login] login data',
  props<{ Auth: adminAuth }>()
);

export const AuthSuccess = createAction(
  '[Auth] Auth success',
  props<{ Auth: adminAuth }>()
);

export const AuthFailure = createAction(
  '[Auth] Auth failed',
  props<{ error: string | null }>()
);
