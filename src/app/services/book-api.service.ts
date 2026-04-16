import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from '../interfaces/book.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  private http = inject(HttpClient);
  apiUrl = environment.apiUrl + '/books';

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  addBook(b: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, b).pipe(catchError(this.handleError));
  }

  updateBook(b: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${b.id}`, b).pipe(catchError(this.handleError));
  }

  deleteBook(id: string): Observable<unknown> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
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
}
