import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BookList } from './pages/book-list/book-list';
import { BookDetails } from './pages/book-details/book-details';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'books', component: BookList },
  { path: 'books/:bookId', component: BookDetails },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFound }
];
