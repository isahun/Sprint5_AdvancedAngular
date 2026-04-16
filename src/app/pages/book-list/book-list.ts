import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../services/books-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {

  private service = inject(BooksService);
  books = toSignal(this.service.getBooks(), { initialValue: [] });
}
