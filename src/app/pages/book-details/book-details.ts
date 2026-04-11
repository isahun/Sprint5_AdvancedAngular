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

  private route = inject(ActivatedRoute);

  service = inject(BooksService);
  router  = inject(Router);

  book: Book | undefined;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('bookId');

    this.book = this.service.books().find(b => b.id === id) ?? undefined;
  }

  goBack() {
    this.router.navigate(['/books']);
  }
}
