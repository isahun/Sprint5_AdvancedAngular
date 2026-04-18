import { Book } from './../interfaces/book.interface';
import { Injectable, signal, computed, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BookApiService } from './book-api.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksService = inject(BookApiService);

  private _books = signal<Book[]>([]);
  books = this._books.asReadonly();

  private _selectedBookIds = signal<Set<string>>(new Set<string>());
  selectedBookIds = this._selectedBookIds.asReadonly();

  selectedCount = computed(() => this._selectedBookIds().size);

  loadBooks() {
    this.booksService.getBooks().subscribe({
      next: (books) => this._books.set(books),
    });
  }

  addBook(book: Omit<Book, 'id'>) {
    this.booksService.addBook(book).subscribe({
      next: () => this.loadBooks(),
    });
  }

  updateBook(book: Book) {
    this.booksService.updateBook(book).subscribe({
      next: () => this.loadBooks(),
    });
  }

  removeBook(id: string) {
    this.booksService.deleteBook(id).subscribe({
      next: () => {
        this._selectedBookIds.update((currentIds) => {
          const newSet = new Set(currentIds);
          newSet.delete(id);
          return newSet;
        });
        this.loadBooks();
      },
    });
  }

  toggleBookSelection(id: string) {
    this._selectedBookIds.update((currentIds) => {
      const newSet = new Set(currentIds);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  clearSelectedBooks() {
    this._selectedBookIds.set(new Set<string>());
  }

  removeSelectedBooks() {
    const deletes$ = [...this._selectedBookIds()].map((id) => this.booksService.deleteBook(id));
    forkJoin(deletes$).subscribe({
      next: () => {
        this.clearSelectedBooks();
        this.loadBooks();
      },
    });
  }
}
