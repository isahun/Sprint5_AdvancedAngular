import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authToken = authService.getToken();

  // Clonar la sol·licitud i afegir l'Authorization header si hi ha un token
  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  // Passar la sol·licitud clonada al següent handler i capturar errors
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        // Per 401: Pot ser token invàlid, expirat, o no proporcionat.
        // Per 403: L'usuari no té permisos per accedir al recurs.
        console.error("Error d'autorització/autenticació:", error.statusText);
        authService.logout(); // Força el tancament de sessió
        router.navigate(['/login']); // Redirigeix al login
      }
      return throwError(() => error); // Torna a llançar l'error perquè altres observadors el gestionin
    }),
  );
};
