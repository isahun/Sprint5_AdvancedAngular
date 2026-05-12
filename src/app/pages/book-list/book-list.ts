import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { BookService } from '../../services/book.service';
import { BookDetails } from '../book-details/book-details';
import { Book } from '../../interfaces/book.interface';
import { BookSearchComponent } from '../../components/book-search/book-search';

@Component({
  selector: 'app-book-list',
  imports: [BookDetails, BookSearchComponent],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookList {
  bookState = inject(BookService);
  selectedBookId = signal<string | null>(null);

  constructor() {
    this.bookState.loadBooks();
  }

  selectBook(id: string) {
    this.selectedBookId.set(id);
  }

  addBook() {
    this.bookState.addBook({
      title: 'Apegos Feroces',
      author: 'Vivian Gornik',
      category: 'Biografia',
      price: 20,
      src: '',
    });
  }

  updateBook(book: Book) {
    this.bookState.updateBook(book);
  }

  deleteBook(id: string) {
    if (this.selectedBookId() === id) this.selectedBookId.set(null);
    this.bookState.removeBook(id);
  }

  removeSelected() {
    if (window.confirm(`Segur que vols eliminar ${this.bookState.selectedCount()} llibres?`)) {
      this.bookState.removeSelectedBooks();
    }
  }
}
