import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserAuthService } from '../services/user/user-auth.service';
import { inject } from '@angular/core';
import { map, catchError, of } from 'rxjs';

export const userProfileGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(UserAuthService);
  const router = inject(Router);
  return authService.isUserLoggedIn().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
