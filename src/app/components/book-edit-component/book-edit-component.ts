import { Component, input, output, signal, effect, ChangeDetectionStrategy  } from '@angular/core';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-edit-component',
  imports: [],
  templateUrl: './book-edit-component.html',
  styleUrl: './book-edit-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookEditComponent {
  constructor() {
  effect(() => {
    const book = this.currentBook();
    if (book) {
      this.title.set(book.title);
      this.author.set(book.author);
      this.category.set(book.category);
    }
  });
}

  currentBook = input<Book>();
  title = signal('');
  author = signal('');
  category = signal('');

  bookSaved = output<Book>();

  save(){
    this.bookSaved.emit({
      id: this.currentBook()!.id,
      title: this.title(),
      author: this.author(),
      category: this.category()
    });
  }

}
