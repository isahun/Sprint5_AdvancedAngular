import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import { Book } from '../../interfaces/book.interface';
import { BookSearchService } from '../../services/book-search';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookSearchComponent implements OnInit {
  private bookSearchService = inject(BookSearchService);

  searchControl = new FormControl<string>('', { nonNullable: true });
  loading = signal(false);
  books$!: Observable<Book[]>;

  ngOnInit(): void {
    this.books$ = this.searchControl.valueChanges.pipe(
      tap(() => this.loading.set(true)), // Mostra el spinner abans de la cerca
      debounceTime(300), // Espera 300ms després de l'última pulsació
      distinctUntilChanged(), // Només si el valor ha canviat
      switchMap((term) => this.bookSearchService.searchBooks(term)), // Cancella la cerca anterior si n'arriba una de nova
      tap(() => this.loading.set(false)), // Amaga el spinner un cop finalitzada la cerca  );
    );

    // Dispara una cerca inicial amb un terme buit per mostrar tots els llibres al principi
    this.searchControl.setValue('');
  }
}
