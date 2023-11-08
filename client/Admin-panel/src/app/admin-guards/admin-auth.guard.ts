import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/admin/auth.service';
import { catchError, map, of } from 'rxjs';

export const adminAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAdminLoggedIn().pipe(
    map(() => {
      router.navigate(['/admin/dashboard']);
      return false;
    }),
    catchError(() => of(true))
  );
};

