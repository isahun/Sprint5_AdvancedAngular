// ============================================================
// SERVEI HTTP: BookApiService
// ============================================================
// Aquest servei s'encarrega exclusivament de les comunicacions
// amb l'API REST (json-server). Separa la lògica de xarxa de
// la lògica d'estat (BooksService), seguint el principi de
// responsabilitat única.
//
// Tots els mètodes retornen Observables: no llancen la petició
// fins que algú s'hi subscriu. Cada petició passa per catchError
// perquè els errors HTTP no deixin l'Observable sense tancar.
// ============================================================

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from '../interfaces/book.interface';
import { environment } from '../../environments/environment';

// @Injectable({ providedIn: 'root' }) registra el servei al DI
// container global: Angular crea una única instància compartida
// per tota l'aplicació (patró Singleton).
@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  // inject() és l'alternativa moderna al constructor DI.
  // HttpClient és el client HTTP d'Angular: gestiona capçaleres,
  // serialització JSON i integra el sistema d'interceptors.
  private http = inject(HttpClient);

  // La URL base es llegeix de l'entorn per evitar valors hardcodejats.
  // En producció, environment.apiUrl apuntaria al servidor real.
  apiUrl = environment.apiUrl + '/books';

  // GET /books — retorna tots els llibres com a Observable<Book[]>.
  // .pipe(catchError(...)) intercepta qualsevol error HTTP o de xarxa
  // i el transforma en un error llegible via handleError.
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // GET /books/:id — retorna un únic llibre per id.
  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // POST /books — crea un llibre nou al servidor.
  // Omit<Book, 'id'> indica que el client no envia l'id:
  // json-server l'assigna automàticament i el retorna a la resposta.
  addBook(b: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, b).pipe(catchError(this.handleError));
  }

  // PUT /books/:id — substitueix el recurs sencer al servidor.
  // A diferència de PATCH, PUT envia tots els camps del llibre.
  updateBook(b: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${b.id}`, b).pipe(catchError(this.handleError));
  }

  // DELETE /books/:id — elimina el llibre. json-server retorna
  // un cos buit, per això el tipus de retorn és Observable<unknown>.
  deleteBook(id: string): Observable<unknown> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // handleError és un mètode privat que transforma HttpErrorResponse
  // en un missatge llegible i retorna un Observable que falla
  // (throwError) perquè el subscriptor pugui gestionar l'error.
  //
  // Distingeix dos orígens d'error:
  //   - ErrorEvent: error de xarxa al client (sense connexió, CORS...)
  //   - Altres: error HTTP del servidor (404, 500, etc.)
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "S'ha produït un error desconegut!";
    if (error.error instanceof ErrorEvent) {
      // Error de xarxa (costat client): el missatge ve de l'event.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error HTTP (costat servidor): tenim codi d'estat i missatge.
      errorMessage = `Codi d'error del servidor: ${error.status}, missatge: ${error.message}`;
    }
    console.error(errorMessage);
    // throwError crea un Observable que emet un error immediatament.
    // El subscriptor el rep al callback `error` del subscribe().
    return throwError(() => new Error(errorMessage));
  }
}
