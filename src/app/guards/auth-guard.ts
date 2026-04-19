import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    const requiredRoles = route.data['roles'] as string[] | undefined;
    if (requiredRoles && requiredRoles.length > 0) {
      if (!authService.hasRole(requiredRoles)) {
        console.warn('Accés denegat: L\'usuari no té els rols necessaris.');
        return router.parseUrl('/unauthorized');
      }
    }
    return true;
  } else {
    console.log('Accés denegat: Usuari no autenticat. Redirigint al login.');
    return router.parseUrl('/login');
  }
};
