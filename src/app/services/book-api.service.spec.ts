// ============================================================
// TESTS DEL SERVEI HTTP: BookApiService
// ============================================================
// Aquest fitxer prova totes les operacions HTTP del servei.
// No fa cap petició real a internet: Angular proporciona
// HttpTestingController, que intercepta les crides d'HttpClient
// i ens permet inspeccionar-les i respondre-les manualment.
// Això fa que els tests siguin ràpids, deterministes i aïllats.
// ============================================================

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { BookApiService } from './book-api.service';
import { beforeEach, describe, expect, it, afterEach } from 'vitest';
import { Book } from '../interfaces/book.interface';

describe('BookService', () => {
  let service: BookApiService;
  let httpTestingController: HttpTestingController;

  // URL base de l'API — ha de coincidir exactament amb la que
  // el servei fa servir internament (environment.apiUrl + 'books').
  const apiUrl = 'http://localhost:3000/books';

  // -----------------------------------------------------------
  // beforeEach: s'executa ABANS de cada test individual.
  // Configura un entorn Angular mínim (TestBed) amb:
  //   - provideHttpClient()       → habilita HttpClient al DI container
  //   - provideHttpClientTesting()→ substitueix el backend real per un mock
  // Després injecta les dues instàncies que necessitem al test.
  // -----------------------------------------------------------
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    // HttpTestingController és el "controlador de peticions falses":
    // ens permet dir "espero que s'hagi fet una petició a aquesta URL"
    // i respondre-la amb dades que nosaltres controlem.
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookApiService);
  });

  // -----------------------------------------------------------
  // afterEach: s'executa DESPRÉS de cada test.
  // httpTestingController.verify() comprova que no hagi quedat
  // cap petició HTTP sense respondre (sense .flush()).
  // Si queda alguna, el test falla — és una xarxa de seguretat
  // per detectar crides HTTP inesperades o oblidades.
  // -----------------------------------------------------------
  afterEach(() => {
    httpTestingController.verify();
  });

  // -----------------------------------------------------------
  // Test bàsic: el servei s'instancia correctament.
  // Si el constructor fallés o les dependències no estiguessin
  // registrades al DI, aquest test ja fallaria aquí.
  // -----------------------------------------------------------
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // -----------------------------------------------------------
  // GET /books — recuperar tots els llibres
  // -----------------------------------------------------------
  it('should retrieve all books via GET', () => {
    // Dades fictícies que simulen la resposta del servidor.
    const mockBooks: Book[] = [
      {
        id: '1',
        title: 'The lord of the Rings',
        author: 'J.R.R. Tolkien',
        category: 'Epic',
      },
      {
        id: '2',
        title: 'Metafísica de los tubos',
        author: 'Amélie Nothomb',
        category: 'Modern fiction',
      },
    ];

    // Subscrivim l'Observable que retorna el servei.
    // El callback del subscribe no s'executarà fins que cridem
    // req.flush() més avall — l'Observable queda "pendent".
    service.getBooks().subscribe((result) => {
      // Quan el flush arriba, comprovem que les dades rebudes
      // coincideixen exactament amb les que hem definit com a mock.
      expect(result).toEqual(mockBooks);
    });

    // expectOne() busca UNA petició pendent a la URL indicada.
    // Si no n'hi ha cap, o n'hi ha més d'una, el test falla.
    const req = httpTestingController.expectOne(apiUrl);

    // Verifiquem que el mètode HTTP és el correcte.
    expect(req.request.method).toBe('GET');

    // flush() envia la resposta simulada i desencadena el callback
    // del subscribe definit a dalt.
    req.flush(mockBooks);
  });

  // -----------------------------------------------------------
  // POST /books — afegir un llibre nou
  // El servidor assigna l'id, per això el payload és Omit<Book, 'id'>.
  // -----------------------------------------------------------
  it('should add a book via POST', () => {
    // El cos que enviem al servidor: sense id (el generarà json-server).
    const newBook: Omit<Book, 'id'> = {
      title: 'Dicen que Nevers es más triste',
      author: 'Angélica Lidell',
      category: 'Ficció moderna',
    };

    // El servidor retorna el llibre creat amb l'id assignat.
    const returnedBook: Book = {
      id: '99',
      title: 'Dicen que Nevers es más triste',
      author: 'Angélica Lidell',
      category: 'Ficció moderna',
    };

    service.addBook(newBook).subscribe((result) => {
      expect(result).toEqual(returnedBook);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');

    // Comprovem també el cos de la petició sortint:
    // ha de ser exactament el newBook sense id.
    expect(req.request.body).toEqual(newBook);

    req.flush(returnedBook);
  });

  // -----------------------------------------------------------
  // DELETE /books/:id — eliminar un llibre per id
  // La URL ha d'incloure l'id com a segment de ruta.
  // json-server retorna null (cos buit) en un DELETE exitós.
  // -----------------------------------------------------------
  it('should delete a book via DELETE', () => {
    const bookIdToDelete = '1';

    service.deleteBook(bookIdToDelete).subscribe((result) => {
      // json-server retorna {} o null en els DELETEs, acceptem null.
      expect(result).toEqual(null);
    });

    // La URL ha de ser /books/1, no /books?id=1.
    const req = httpTestingController.expectOne(`${apiUrl}/${bookIdToDelete}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  // -----------------------------------------------------------
  // PUT /books/:id — actualitzar un llibre existent
  // A diferència del PATCH, el PUT substitueix el recurs sencer.
  // -----------------------------------------------------------
  it('should update a book via PUT', () => {
    const updatedBook: Book = {
      id: '1',
      title: 'The lord of the Rings',
      author: 'Tolkien',        // autor modificat respecte la versió original
      category: 'Epic',
    };

    service.updateBook(updatedBook).subscribe((result) => {
      expect(result).toEqual(updatedBook);
    });

    // La URL ha d'incloure l'id del llibre que s'actualitza.
    const req = httpTestingController.expectOne(`${apiUrl}/${updatedBook.id}`);
    expect(req.request.method).toBe('PUT');

    // Comprovem que el cos conté el llibre complet (amb id inclòs).
    expect(req.request.body).toEqual(updatedBook);

    req.flush(updatedBook);
  });

  // -----------------------------------------------------------
  // GESTIÓ D'ERRORS — resposta amb codi d'error HTTP
  // -----------------------------------------------------------
  it('should handle HTTP errors gracefully', () => {
    service.getBooks().subscribe({
      next: () => expect.fail("hauria d'haver fallat"),

      // Quan el servidor respon amb un codi d'error (404 en aquest cas),
      // HttpClient llança un HttpErrorResponse. El servei hauria de
      // capturar-lo amb catchError i retornar un error observable
      // amb un missatge llegible — comprovem que el missatge inclou "404".
      error: (err) => expect(err.message).toContain('404'),
    });

    const req = httpTestingController.expectOne(apiUrl);

    // flush() amb un segon argument simula una resposta d'error HTTP:
    // { status, statusText } fan que HttpClient tracti la resposta com a error.
    req.flush('Test 404 Error', { status: 404, statusText: 'Not Found' });
  });
});
