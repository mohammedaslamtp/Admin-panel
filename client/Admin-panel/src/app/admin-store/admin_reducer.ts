import { createReducer, on } from "@ngrx/store";import * as AuthAction from '../admin-store/admin-actions/admin_auth';

// initial state:
export const initialState:authState = {
  isLoading: false,
  error: null,
  data: null,
};

// login reducer:
export const loginReducer = createReducer(
  initialState,
  on(AuthAction.AuthData, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthAction.AuthSuccess, (state, action) => ({
    ...state,
    isLoading: true,
    data: action.Auth,
    error: null,
  })),
  on(loginAction.LoginFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
    data: null,
  }))
);
