import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const service = inject(AuthService);
  if (service.loggedInStatus) {
    return true;
  }
  // router.navigate(['/chat-dashboard'])
  return false;
};
