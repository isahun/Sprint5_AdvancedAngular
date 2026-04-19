import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// GUARD FUNCIONAL: en Angular modern els guards són funcions simples (CanActivateFn),
// no classes. Això els fa més lleugers i fàcils de testejar.
//
// Quan Angular intenta navegar a una ruta protegida, executa aquest guard PRIMER.
// Només si retorna `true` (o una UrlTree vàlida) permet la navegació.
//
// Rep dos paràmetres:
//   route → conté informació de la ruta destí (inclòs route.data amb els rols)
//   state → conté la URL destí (útil per redirigir de tornada després del login)
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Llegim la Signal directament — no cal Observable ni async/await.
  // Les Signals són síncrones, perfectes per a guards.
  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    // L'usuari té sessió. Ara comprovem si la ruta requereix rols específics.
    // route.data és un objecte lliure definit a app.routes.ts:
    //   data: { roles: ['admin'] }
    // El cast a string[] | undefined és necessari perquè TypeScript no coneix
    // l'estructura de data en temps de compilació.
    const requiredRoles = route.data['roles'] as string[] | undefined;

    if (requiredRoles && requiredRoles.length > 0) {
      if (!authService.hasRole(requiredRoles)) {
        // Usuari autenticat però sense el rol necessari → 403 Forbidden
        console.warn('Accés denegat: L\'usuari no té els rols necessaris.');
        // parseUrl() crea una UrlTree que Angular interpreta com a redirecció.
        // És preferible a router.navigate() dins un guard perquè és síncron.
        return router.parseUrl('/unauthorized');
      }
    }

    // Autenticat i amb els rols correctes → deixem passar
    return true;

  } else {
    // Sense sessió → redirigim al login
    console.log('Accés denegat: Usuari no autenticat. Redirigint al login.');
    return router.parseUrl('/login');
  }
};
