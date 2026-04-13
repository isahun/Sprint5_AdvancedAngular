import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../services/books-service';

@Component({
  selector: 'app-book-list',
  // RouterLink must be listed here so the template can use [routerLink]="..."
  // on anchor tags. Angular's standalone components need every directive/pipe
  // they use to be explicitly imported — there is no global "module" doing it.
  imports: [RouterLink],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {

  // inject() is the modern alternative to constructor injection.
  // Angular sees that BooksService exists as a singleton and hands us that instance.
  // Now this.service.books() gives us the list of books in the template.
  service = inject(BooksService);

  // No Router needed here: the template uses [routerLink] for navigation,
  // which is declarative (HTML-driven). Programmatic navigation with Router.navigate()
  // is only needed when you want to navigate from inside TypeScript code (e.g. after
  // a form submit), which this component doesn't do.
}
