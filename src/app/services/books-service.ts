import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Book } from '../interfaces/book.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/books';

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "S'ha produït un error desconegut!";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Codi d'error del servidor: ${error.status}, missatge: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(b: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, b);
  }

  updateBook(b: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${b.id}`, b);
  }

  deleteBook(id: string): Observable<unknown> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
