import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BookList } from './pages/book-list/book-list';
import { BookDetails } from './pages/book-details/book-details';
import { NotFound } from './pages/not-found/not-found';
import { Layout } from './layout/layout';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'books', component: BookList },
      { path: 'books/:bookId', component: BookDetails },
    ]
   },
  { path: '**', component: NotFound }
];
