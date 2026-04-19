import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// INTERCEPTOR FUNCIONAL: s'executa automàticament per a TOTES les peticions HTTP
// que faci l'app (HttpClient). No cal modificar cap servei individualment.
//
// Té dues responsabilitats:
//   1. Afegir el token JWT a l'header Authorization de cada petició sortint
//   2. Gestionar errors 401/403 forçant el logout automàticament
//
// Rep dos paràmetres:
//   req  → la petició HTTP original (immutable, cal clonar-la per modificar-la)
//   next → funció que passa la petició al següent handler (o al servidor)
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authToken = authService.getToken();

  // Les peticions HTTP són immutables a Angular.
  // Per modificar-les cal clonar-les amb .clone() i passar la còpia modificada.
  // Només clonem si hi ha token — peticions sense sessió van tal qual (p.ex. login).
  if (authToken) {
    req = req.clone({
      setHeaders: {
        // Format estàndard JWT: "Bearer <token>"
        // El backend llegirà aquest header per verificar la identitat de l'usuari
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  // Passem la petició (original o clonada) al següent handler.
  // .pipe(catchError) intercepta errors de la resposta ABANS que arribin al servei.
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // 401 Unauthorized → el token no és vàlid o ha expirat
      // 403 Forbidden    → el token és vàlid però l'usuari no té permisos
      // En tots dos casos, tanquem la sessió i redirigim al login.
      if (error.status === 401 || error.status === 403) {
        console.error("Error d'autorització/autenticació:", error.message);
        authService.logout();
        router.navigate(['/login']);
      }
      // Tornem a llançar l'error perquè el servei original també el pugui gestionar
      // (p.ex. mostrar un missatge d'error a la UI)
      return throwError(() => error);
    }),
  );
};
