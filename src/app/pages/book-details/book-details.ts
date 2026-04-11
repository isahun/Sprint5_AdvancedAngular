// ── OLD APPROACH: ActivatedRoute + OnInit ────────────────────────────────────
// import { Component, inject, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BooksService } from '../../services/books-service';
// import { Book } from '../../interfaces/book.interface';
//
// @Component({ selector: 'app-book-details', ... })
// export class BookDetails implements OnInit {
//
//   private route = inject(ActivatedRoute); // reads current route info
//   service = inject(BooksService);
//   router  = inject(Router);
//
//   book: Book | undefined; // plain property — not reactive, set manually
//
//   ngOnInit() {
//     // snapshot = one-time read of the route at the moment the component loads.
//     // paramMap holds the :param segments defined in app.routes.ts.
//     const id = this.route.snapshot.paramMap.get('bookId');
//     this.book = this.service.books().find(b => b.id === id) ?? undefined;
//   }
//
//   goBack() { this.router.navigate(['/books']); }
// }

// ── NEW APPROACH: input() + computed() signals ────────────────────────────────
// Requires withComponentInputBinding() in app.config.ts so Angular automatically
// maps route :params to @Input() / input() with the matching name.
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

  // input.required<string>() — Angular automatically fills this with the value
  // of the :bookId route param (name must match exactly what's in app.routes.ts).
  // No lifecycle hook needed: the value is available from the start.
  bookId = input.required<string>();

  // computed() derives a value from one or more signals and stays in sync.
  // Whenever bookId() changes (e.g. navigating between books), book() updates too.
  // This replaces the manual find() we had inside ngOnInit().
  book = computed(() => this.service.getBook(this.bookId()));

  // Programmatic navigation: called from the template's (click) event.
  // Router.navigate() is the TypeScript equivalent of clicking a [routerLink].
  goBack() {
    this.router.navigate(['/books']);
  }
}
