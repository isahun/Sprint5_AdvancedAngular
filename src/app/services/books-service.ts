import { Injectable, signal } from '@angular/core';
import { Book } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {

  books = signal<Book[]>([
    { id: '1', title: 'The lord of the Rings', author: 'J.R.R. Tolkien', category: 'Epic' },
    { id: '2', title: 'Metafísica de los tubos', author: 'Amélie Nothomb', category: 'Other'},
    { id: '3', title: 'Poesía completa', author:'Alejandra Pizarnik', category: 'Poetry'}
  ]);
}
