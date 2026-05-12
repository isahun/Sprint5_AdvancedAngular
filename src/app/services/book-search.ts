import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Book } from '../interfaces/book.interface';

@Injectable({ providedIn: 'root' })
export class BookSearchService {
  private allBooks: Book[] = [
    { id: '1', title: 'El Senyor dels Anells', author: 'J.R.R. Tolkien', category: 'Fantasia', price: 25.00, src: '' },
    { id: '2', title: '1984', author: 'George Orwell', category: 'Sci-fi', price: 15.50, src: '' },
    { id: '3', title: 'Orgull i Prejudici', author: 'Jane Austen', category: 'Romanç', price: 12.75, src: '' },
    { id: '4', title: 'Crim i Càstig', author: 'Fyodor Dostoevsky', category: 'Thriller existencial', price: 18.00, src: '' },
    { id: '5', title: 'Les Aventures d\'Alícia al País de les Meravelles', author: 'Lewis Carroll', category: 'Fantasia', price: 10.00, src: '' },
    { id: '6', title: 'Dune', author: 'Frank Herbert', category: 'Sci-fi', price: 22.00, src: '' },
    { id: '7', title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', category: 'Realisme màgic', price: 19.50, src: '' },
  ];

  searchBooks(term: string): Observable<Book[]> {
    if (!term.trim()) {
      // Si el terme de cerca és buit, retorna tots els llibres
      return of(this.allBooks).pipe(delay(200)); // Simula latència
    }

    const lowerCaseTerm = term.toLowerCase();
    return of(this.allBooks).pipe(
      delay(500), // Simula latència de xarxa
      map(books =>
        books.filter(
          book =>
            book.title.toLowerCase().includes(lowerCaseTerm) ||
            book.author.toLowerCase().includes(lowerCaseTerm)
        )
      )
    );
  }
}
