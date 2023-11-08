import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { UserAuthService } from '../services/user/user-auth.service';

export const userLoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(UserAuthService);
  const router = inject(Router);
  return authService.isUserLoggedIn().pipe(
    map(() => {
      router.navigate(['/']);
      return false;
    }),
    catchError(() => of(true))
  );
};
