import { Component, inject, input, computed, output, ChangeDetectionStrategy } from '@angular/core';
import { BooksService } from '../../services/books-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookEditComponent } from '../../components/book-edit-component/book-edit-component';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-details',
  imports: [BookEditComponent],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
  // OnPush: com que totes les dades vénen via input() signals i computed(),
  // Angular pot detectar canvis de forma eficient sense revisar tot el template.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetails {
  service = inject(BooksService);

  // input.required vol dir que el component PARE està obligat a passar aquest valor.
  // Si no es passa, Angular llença un error en temps de compilació.
  bookId = input.required<string>();

  // output() defineix esdeveniments que aquest component pot emetre cap al component pare.
  // El pare escoltarà amb (bookDeleted)="..." al template.
  bookDeleted = output<string>();
  bookUpdated = output<Book>();
  goBack = output<void>(); // void perquè no cal enviar cap dada, només notificar

  books = toSignal(this.service.getBooks(), { initialValue: [] });

  // computed() crea un signal derivat d'altres signals.
  // S'actualitza automàticament quan canvia books() o bookId().
  book = computed(() => this.books().find((b) => b.id === this.bookId()));

  // Quan BookEditComponent emet bookSaved, aquest mètode rep el llibre
  // i el passa cap amunt a BookList via l'output bookUpdated.
  // BookDetails no crida el servei directament: delega la responsabilitat al pare.
  onBookSaved(book: Book) {
    this.bookUpdated.emit(book);
  }

  // Emet l'id cap al pare (BookList) perquè sigui ell qui cridi deleteBook al servei.
  deleteBook() {
    this.bookDeleted.emit(this.bookId());
  }
}
