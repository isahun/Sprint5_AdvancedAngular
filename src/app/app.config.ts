import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    // provideRouter registers our route definitions with Angular.
    // withComponentInputBinding() is an extra feature flag that tells the router:
    // "whenever you load a component for a route that has URL params (like :bookId),
    // automatically pass those params as input() signals into that component."
    // Without this, you'd have to read params manually via ActivatedRoute.
    provideRouter(routes, withComponentInputBinding())
  ]
};
