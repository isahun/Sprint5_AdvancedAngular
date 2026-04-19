import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BookList } from './pages/book-list/book-list';
import { BookDetails } from './pages/book-details/book-details';
import { NotFound } from './pages/not-found/not-found';
import { Layout } from './layout/layout';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  // /login: fora del Layout i sense guard → accessible sempre (necessari per iniciar sessió)
  { path: 'login', component: Login },

  // Ruta arrel: usa Layout com a component pare (conté navbar + router-outlet).
  // canActivate: [authGuard] protegeix TOTES les rutes filles d'un cop.
  // Si l'usuari no té sessió, el guard el redirigeix a /login abans de renderitzar res.
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', component: Home },
      { path: 'books', component: BookList },
      { path: 'books/:bookId', component: BookDetails },

      // Ruta amb control de ROL: a més d'estar autenticat, cal tenir el rol 'admin'.
      // data: { roles: ['admin'] } passa informació estàtica al guard via route.data.
      // loadComponent: càrrega lazy (el fitxer JS no es descarrega fins que s'accedeix)
      {
        path: 'admin',
        loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
        canActivate: [authGuard], // segon guard que comprova el rol
        data: { roles: ['admin'] },
      },
    ],
  },

  // /unauthorized: accessible sense guard — l'usuari pot arribar aquí sense sessió
  // (p.ex. si el guard el redirigeix per falta de rol).
  // loadComponent: càrrega lazy perquè és una pàgina poc visitada.
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./pages/unauthorized/unauthorized').then((m) => m.Unauthorized),
  },

  // Wildcard: captura qualsevol URL no definida. SEMPRE ha d'anar l'últim.
  // (Si posem /unauthorized després del **, mai s'hi arriba)
  { path: '**', component: NotFound },
];
