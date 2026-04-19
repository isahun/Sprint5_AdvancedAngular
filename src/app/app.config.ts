import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Captura errors globals del navegador (p.ex. errors no gestionats de Promises)
    provideBrowserGlobalErrorListeners(),

    // Configura el Router amb les rutes definides a app.routes.ts.
    // withComponentInputBinding(): permet que els paràmetres de ruta (:bookId)
    // s'injectin automàticament com a input() al component, sense ActivatedRoute.
    provideRouter(routes, withComponentInputBinding()),

    // Registra HttpClient per a tota l'app.
    // withInterceptors([...]): llista d'interceptors que s'executen en ordre
    // per a cada petició HTTP sortint. Aquí afegim el token JWT automàticament.
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
