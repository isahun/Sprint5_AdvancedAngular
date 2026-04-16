import { Component, input, output, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-edit-component',
  imports: [],
  templateUrl: './book-edit-component.html',
  styleUrl: './book-edit-component.css',
  // OnPush és compatible amb Signals: Angular detecta canvis als signals automàticament
  // i re-renderitza només quan cal, sense necessitat de comprovació constant.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookEditComponent {
  // input<Book>() sense .required vol dir que el valor és opcional (pot ser undefined).
  currentBook = input<Book>();

  // Signals locals que guarden els valors editats per l'usuari al formulari.
  title = signal('');
  author = signal('');
  category = signal('');

  // output<Book>() permet emetre el llibre editat cap al component pare (BookDetails).
  bookSaved = output<Book>();

  constructor() {
    // effect() s'executa automàticament cada cop que canvia qualsevol signal que llegeix.
    // Aquí llegeix currentBook(), de manera que quan el pare passa un nou llibre,
    // els camps del formulari s'inicialitzen amb els seus valors.
    effect(() => {
      const book = this.currentBook();
      if (book) {
        this.title.set(book.title);
        this.author.set(book.author);
        this.category.set(book.category);
      }
    });
  }

  save() {
    // Construïm l'objecte Book actualitzat amb l'id original i els nous valors dels signals.
    // La ! després de currentBook() li diu a TypeScript que sabem que no és undefined en aquest punt.
    this.bookSaved.emit({
      id: this.currentBook()!.id,
      title: this.title(),
      author: this.author(),
      category: this.category(),
    });
  }
}
