import { Component, inject, signal } from '@angular/core';
import { BooksService } from '../../services/books-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap } from 'rxjs';
import { BookDetails } from '../book-details/book-details';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-list',
  imports: [BookDetails],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  private service = inject(BooksService);
  private refresh$ = new BehaviorSubject<void>(undefined);

  books = toSignal(this.refresh$.pipe(switchMap(() => this.service.getBooks())), {
    initialValue: [],
  });
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
    this.service.addBook(newBook).subscribe({
      next: () => this.refresh$.next(),
      error: (err) => console.error('Error afegint el llibre', err),
    });
  }

  updateBook(book: Book) {
    this.service.updateBook(book).subscribe({
      next: () => {
        this.refresh$.next();
      }
    })
  }

  deleteBook(id: string) {
    this.service.deleteBook(id).subscribe({
      next: () => {
        this.selectedBookId.set(null);
        this.refresh$.next();
      },
    });
  }
}
