import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book.interface';
import { BookApiService } from './book-api.service';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private bookApiService = inject(BookApiService);

  getBooks(): Observable<Book[]> {
    return this.bookApiService.getBooks();
  }

  getBookById(id: string): Observable<Book> {
    return this.bookApiService.getBookById(id);
  }

  addBook(b: Omit<Book, 'id'>): Observable<Book> {
    return this.bookApiService.addBook(b);
  }

  updateBook(b: Book): Observable<Book> {
    return this.bookApiService.updateBook(b);
  }

  deleteBook(id: string): Observable<unknown> {
    return this.bookApiService.deleteBook(id);
  }
}
