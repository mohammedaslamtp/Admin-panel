import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/admin/auth.service';

export const adminDashGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAdminLoggedIn().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/admin/login']);
      return of(false);
    })
  );
};
