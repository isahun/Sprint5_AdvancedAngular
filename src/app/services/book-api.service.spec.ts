import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { BookApiService } from './book-api.service';
import { beforeEach, describe, expect, it, afterEach } from 'vitest';
import { Book } from '../interfaces/book.interface';

describe('BookService', () => {
  let service: BookApiService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'http://localhost:3000/books';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //GET
  it('should retrieve all books via GET', () => {
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

    service.getBooks().subscribe((result) => {
      expect(result).toEqual(mockBooks);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);
  });

  //POST
  it('should add a book via POST', () => {
    const newBook: Omit<Book, 'id'> = {
      title: 'Dicen que Nevers es más triste',
      author: 'Angélica Lidell',
      category: 'Ficció moderna',
    };

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
    expect(req.request.body).toEqual(newBook);
    req.flush(returnedBook);
  });

  //DELETE
  it('should delete a book via DELETE', () => {
    const bookIdToDelete = '1';

    service.deleteBook(bookIdToDelete).subscribe((result) => {
      expect(result).toEqual(null);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${bookIdToDelete}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  //PUT
  it('should update a book via PUT', () => {
    const updatedBook: Book = {
      id: '1',
      title: 'The lord of the Rings',
      author: 'Tolkien',
      category: 'Epic',
    };

    service.updateBook(updatedBook).subscribe((result) => {
      expect(result).toEqual(updatedBook);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${updatedBook.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedBook);
    req.flush(updatedBook);
  });

  //ERROR HANDLING
  it('should handle HTTP errors gracefully', () => {
    const errorMessage = 'Test 404 Error';
    service.getBooks().subscribe({
      next: () => expect.fail("hauria d'haver fallat"),
      error: (err) => expect(err.message).toContain('404'),
    });

    const req = httpTestingController.expectOne(apiUrl);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
