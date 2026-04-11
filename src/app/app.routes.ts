import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { BookList } from './components/book-list/book-list';
import { BookDetails } from './components/book-details/book-details';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'books', component: BookList },
  { path: 'books/:bookId', component: BookDetails },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFound }
];
