import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Book } from '../interfaces/book.interface';
import { environment } from '../../environments/environment';

// @Injectable fa que Angular pugui injectar aquest servei a qualsevol component.
// providedIn: 'root' significa que hi ha una sola instància per tota l'app (singleton).
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  // inject() és la manera moderna d'injectar dependències sense constructor.
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/books';

  // Els mètodes retornen Observables: no fan la petició fins que algú s'hi subscriu (.subscribe()).
  // .pipe(catchError(...)) intercepta errors abans que arribin al component.
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // handleError centralitza la gestió d'errors HTTP.
  // Retorna Observable<never> perquè sempre llença un error, mai un valor vàlid.
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "S'ha produït un error desconegut!";
    if (error.error instanceof ErrorEvent) {
      // Error de xarxa o del client (ex: sense connexió)
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error retornat pel servidor (ex: 404, 500)
      errorMessage = `Codi d'error del servidor: ${error.status}, missatge: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  // Omit<Book, 'id'> vol dir "un Book sense la propietat id".
  // L'API (json-server) assigna l'id automàticament en rebre el POST.
  addBook(b: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, b);
  }

  // PUT envia l'objecte complet substituint el recurs existent a l'API.
  updateBook(b: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${b.id}`, b);
  }

  // Observable<unknown> perquè DELETE pot retornar una resposta buida o un objecte simple.
  deleteBook(id: string): Observable<unknown> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
