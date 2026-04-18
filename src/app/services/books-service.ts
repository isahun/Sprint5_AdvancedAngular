import { effect, Injectable, signal } from '@angular/core';
import { Book } from '../interfaces/book.interface';
import { DEFAULT_BOOKS } from '../data/books.data';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _books = signal<Book[]>(this.loadFromStorage());
  books = this._books.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem('library-books', JSON.stringify(this._books()));
    });
  }

  private loadFromStorage(): Book[] {
    const saved = localStorage.getItem('library-books');
    if (saved) return JSON.parse(saved);
    return DEFAULT_BOOKS;
  }

  getBook(id: string) {
    return this.books().find((book) => book.id === id);
  }

  removeBook(id:string) {
    this._books.update(books => books.filter(b => b.id !== id));
  }

  resetBooks() {
  localStorage.removeItem('library-books');
  this._books.set(DEFAULT_BOOKS);
}
}
