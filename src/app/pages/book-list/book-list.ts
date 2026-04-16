import { Component, inject, signal } from '@angular/core';
import { BooksService } from '../../services/books-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap } from 'rxjs';
import { BookDetails } from '../book-details/book-details';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-list',
  // Cal declarar aquí els components fills que s'usen al template (BookDetails).
  imports: [BookDetails],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  private service = inject(BooksService);

  // BehaviorSubject és un Observable especial que guarda l'últim valor emès.
  // L'usem com a "disparador" de refresc: cada vegada que cridem .next(), es torna a fer el getBooks().
  private refresh$ = new BehaviorSubject<void>(undefined);

  // toSignal converteix un Observable en un Signal per poder-lo usar al template de forma reactiva.
  // switchMap cancel·la la petició anterior i en fa una de nova cada cop que refresh$ emet.
  // Resultat: cada cop que cridem refresh$.next(), es torna a carregar la llista de l'API.
  books = toSignal(this.refresh$.pipe(switchMap(() => this.service.getBooks())), {
    initialValue: [],
  });

  // Signal que guarda l'id del llibre seleccionat, o null si no n'hi ha cap.
  selectedBookId = signal<string | null>(null);

  selectBook(id: string) {
    this.selectedBookId.set(id);
  }

  addBook() {
    const newBook = {
      title: 'Apegos Feroces',
      author: 'Vivian Gornik',
      category: 'Biografia',
    };
    // .subscribe() és imprescindible: sense ell, l'Observable no s'executa i no es fa cap petició.
    // next: s'executa si la petició va bé → refresh$.next() torna a carregar la llista.
    this.service.addBook(newBook).subscribe({
      next: () => this.refresh$.next(),
      error: (err) => console.error('Error afegint el llibre', err),
    });
  }

  updateBook(book: Book) {
    this.service.updateBook(book).subscribe({
      next: () => this.refresh$.next(),
    });
  }

  deleteBook(id: string) {
    this.service.deleteBook(id).subscribe({
      next: () => {
        // Deseleccionem el llibre eliminat per tornar a mostrar la llista.
        this.selectedBookId.set(null);
        this.refresh$.next();
      },
    });
  }
}
