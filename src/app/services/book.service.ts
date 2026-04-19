import { Book } from './../interfaces/book.interface';
import { Injectable, signal, computed, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BookApiService } from './book-api.service';

// SERVEI D'ESTAT GLOBAL: centralitza totes les dades i accions sobre llibres.
// Separa la responsabilitat: BookApiService fa les crides HTTP, BookService
// gestiona l'estat (quins llibres hi ha, quins estan seleccionats...).
// Múltiples components poden injectar aquest servei i compartir el mateix estat.
@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksService = inject(BookApiService);

  // Signal privada amb prefix _ per convenció: només es modifica des d'aquí.
  // .asReadonly() exposa una versió pública que els components poden llegir
  // però NO modificar directament → encapsulació de l'estat.
  private _books = signal<Book[]>([]);
  books = this._books.asReadonly();

  // Set<string> per emmagatzemar IDs seleccionats: cerca O(1) i sense duplicats.
  private _selectedBookIds = signal<Set<string>>(new Set<string>());
  selectedBookIds = this._selectedBookIds.asReadonly();

  // COMPUTED: valor derivat que es recalcula automàticament quan _selectedBookIds canvia.
  // .size retorna el nombre d'elements del Set.
  selectedCount = computed(() => this._selectedBookIds().size);

  // Carrega els llibres de l'API i actualitza la signal.
  // Es crida en inicialitzar i després de cada mutació (add/update/delete).
  loadBooks() {
    this.booksService.getBooks().subscribe({
      next: (books) => this._books.set(books),
    });
  }

  addBook(book: Omit<Book, 'id'>) {
    this.booksService.addBook(book).subscribe({
      // Tornem a carregar la llista perquè el servidor assigna l'id nou
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
        // Eliminem l'id del Set de seleccionats abans de recarregar
        // per no deixar un id "fantasma" seleccionat que ja no existeix
        this._selectedBookIds.update((currentIds) => {
          const newSet = new Set(currentIds);
          newSet.delete(id);
          return newSet;
        });
        this.loadBooks();
      },
    });
  }

  // Afegeix o elimina un id del Set de seleccionats (toggle).
  // Cal crear un Set nou — no mutem l'existent perquè les Signals
  // detecten canvis per referència, no per contingut.
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

  // FORKJOIN: executa múltiples Observables en paral·lel i espera que tots acabin.
  // Més eficient que fer els deletes en seqüència — totes les peticions van a la vegada.
  // [...this._selectedBookIds()] converteix el Set en array per poder usar .map()
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
