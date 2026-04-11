import { Injectable, signal } from '@angular/core';
import { Book } from '../interfaces/book.interface';

// @Injectable({ providedIn: 'root' }) means Angular creates ONE shared instance
// of this service for the whole app. Any component that injects BooksService
// gets the exact same object — so the data is always in sync.
@Injectable({
  providedIn: 'root',
})
export class BooksService {

  // signal() is Angular's reactive primitive. Think of it as a variable that
  // Angular watches: whenever its value changes, any template or computed()
  // that reads it will automatically update.
  // You read a signal by calling it like a function: books()
  books = signal<Book[]>([
    { id: '1', title: 'The lord of the Rings', author: 'J.R.R. Tolkien', category: 'Epic' },
    { id: '2', title: 'Metafísica de los tubos', author: 'Amélie Nothomb', category: 'Other'},
    { id: '3', title: 'Poesía completa', author:'Alejandra Pizarnik', category: 'Poetry'}
  ]);
}
