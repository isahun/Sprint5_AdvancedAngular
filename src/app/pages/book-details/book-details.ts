import { Component, inject, input, computed } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books-service';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails {

  service = inject(BooksService);
  router  = inject(Router);

  bookId = input.required<string>();

  books = toSignal(this.service.getBooks(), { initialValue: [] });

  book = computed(() => this.books().find(b => b.id === this.bookId()));

  goBack() {
    this.router.navigate(['/books']);
  }
}
