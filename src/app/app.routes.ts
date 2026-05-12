import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BookList } from './pages/book-list/book-list';
import { BookDetails } from './pages/book-details/book-details';
import { NotFound } from './pages/not-found/not-found';
import { Layout } from './layout/layout';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', component: Home },
      { path: 'books', component: BookList },
      { path: 'books/:bookId', component: BookDetails },
      {
        path: 'onpush-demo',
        loadComponent: () => import('./pages/onpush-demo/onpush-demo').then(m => m.OnpushDemo),
      },
      {
        path: 'admin',
        loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
        canActivate: [authGuard],
        data: { roles: ['admin'] },
      },
    ],
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./pages/unauthorized/unauthorized').then((m) => m.Unauthorized),
  },
  { path: '**', component: NotFound },
];
