import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books-service';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails implements OnInit {

  // ActivatedRoute is Angular's service that gives you information about
  // the currently active route — its URL, params, query params, etc.
  private route = inject(ActivatedRoute);

  service = inject(BooksService);
  router  = inject(Router);

  // A plain class property — not a signal, not reactive.
  // We have to set it manually once the component initialises.
  book: Book | undefined;

  ngOnInit() {
    // snapshot = a one-time read of the route state at the moment
    // the component loads. paramMap holds all the :param segments.
    // 'bookId' must match the name you used in app.routes.ts: 'books/:bookId'
    const id = this.route.snapshot.paramMap.get('bookId');

    // Now we manually search the array with the id we just read
    this.book = this.service.books().find(b => b.id === id) ?? undefined;
  }

  // Programmatic navigation: called from the template's (click) event.
  // Router.navigate() is the TypeScript equivalent of clicking a [routerLink].
  goBack() {
    this.router.navigate(['/books']);
  }
}
