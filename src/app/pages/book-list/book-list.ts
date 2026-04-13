import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../services/books-service';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {

  service = inject(BooksService);
}
