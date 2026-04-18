import { Injectable, signal, effect } from '@angular/core';
import { Book } from '../interfaces/book.interface';
import { DEFAULT_BOOKS } from '../data/books.data';

// @Injectable({ providedIn: 'root' }) means Angular creates ONE shared instance
// of this service for the whole app. Any component that injects BooksService
// gets the exact same object — so the data is always in sync.
@Injectable({
  providedIn: 'root',
})
export class BooksService {

  // Private signal — components cannot modify it directly.
  // asReadonly() exposes a version that only allows reading,
  // so all mutations must go through the service methods below.
  private _books = signal<Book[]>(this.loadFromStorage());
  books = this._books.asReadonly();

  constructor() {
    // effect() runs once immediately, then re-runs automatically
    // whenever any signal it reads (_books) changes.
    // Here we use it as a side effect: persist the current book list
    // to localStorage every time it changes.
    effect(() => {
      localStorage.setItem('library-books', JSON.stringify(this._books()));
    });
  }

  // A plain method on the service — components call this to get a single book.
  // find() returns the first match or undefined (unlike filter() which always returns an array).
  // Returning Book | undefined forces the caller to handle the "not found" case.
  getBook(id: string): Book | undefined {
    return this.books().find((book) => book.id === id);
  }

  // update() receives the current value and returns the new one.
  // We filter out the deleted book and return the rest.
  // The signal updates, the effect fires, localStorage is updated.
  removeBook(id: string) {
    this._books.update(books => books.filter(b => b.id !== id));
  }

  // Clears localStorage and resets the signal to the original data.
  // The effect fires again and writes DEFAULT_BOOKS back to localStorage.
  resetBooks() {
    localStorage.removeItem('library-books');
    this._books.set(DEFAULT_BOOKS);
  }

  // Called once when the service initializes (signal default value).
  // If localStorage has saved data, parse and use it.
  // Otherwise fall back to DEFAULT_BOOKS.
  private loadFromStorage(): Book[] {
    const saved = localStorage.getItem('library-books');
    if (saved) return JSON.parse(saved);
    return DEFAULT_BOOKS;
  }
}
