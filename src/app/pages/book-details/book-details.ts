import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { BookEditComponent } from '../../components/book-edit-component/book-edit-component';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-details',
  imports: [BookEditComponent],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetails {
  book = input.required<Book>();
  bookDeleted = output<string>();
  bookUpdated = output<Book>();
  goBack = output<void>();

  onBookSaved(book: Book) {
    this.bookUpdated.emit(book);
  }

  deleteBook() {
    this.bookDeleted.emit(this.book().id);
  }
}
