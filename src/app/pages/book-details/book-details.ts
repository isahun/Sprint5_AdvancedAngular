import { Component, inject, input, computed } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books-service';

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

  book = computed(() => this.service.getBook(this.bookId()));

  goBack() {
    this.router.navigate(['/books']);
  }
}
