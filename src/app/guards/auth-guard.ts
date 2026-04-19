import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Utilitzem la Signal isAuthenticated
  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    // Opcionalment, comprovar rols si la ruta els requereix
    const requiredRoles = route.data['roles'] as string[] | undefined;
    if (requiredRoles && requiredRoles.length > 0) {
      if (!authService.hasRole(requiredRoles)) {
        console.warn('Accés denegat: L\'usuari no té els rols necessaris.');
        // Redirigir a una pàgina de "no autoritzat" o al login
        return router.parseUrl('/unauthorized'); // Crea una ruta per a això
      }
    }
    return true; // L'usuari està autenticat i té els rols necessaris
  } else {
    console.log('Accés denegat: Usuari no autenticat. Redirigint al login.');
    return router.parseUrl('/login'); // Redirigeix al login
  }
};
