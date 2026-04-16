import { Component, inject, input, computed, output } from '@angular/core';
import { BooksService } from '../../services/books-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookEditComponent } from '../../components/book-edit-component/book-edit-component';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-details',
  imports: [BookEditComponent],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails {
  service = inject(BooksService);

  bookId = input.required<string>();
  bookDeleted = output<string>();
  bookUpdated = output<Book>();
  goBack = output<void>();

  books = toSignal(this.service.getBooks(), { initialValue: [] as Book[] });

  book = computed(() => this.books().find((b) => b.id === this.bookId()));

  onBookSaved(book: Book) {
    this.bookUpdated.emit(book);
  }

  deleteBook() {
    this.bookDeleted.emit(this.bookId());
  }
}
