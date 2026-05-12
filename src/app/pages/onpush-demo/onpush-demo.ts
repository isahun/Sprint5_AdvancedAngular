import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookItemComponent } from '../../components/book-item/book-item';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-onpush-demo',
  standalone: true,
  imports: [CommonModule, BookItemComponent],
  template: `
    <div class="p-8">
      <h2 class="text-2xl font-bold mb-6 text-center">Demo OnPush Change Detection</h2>

      <div class="flex gap-4 justify-center mb-8">
        <button (click)="refreshBooks()"
                class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Actualitzar llibres (nova referència) ✅
        </button>
        <button (click)="mutateBookTitle()"
                class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Mutar títol directament ❌
        </button>
      </div>

      <p class="text-center text-sm text-gray-500 mb-8">
        Obre la consola del navegador per veure els logs
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        @for (book of books(); track book.id) {
          <app-book-item [book]="book" />
        } @empty {
          <p class="col-span-full text-center text-gray-500">No hi ha llibres.</p>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnpushDemo {
  private initialBooks: Book[] = [
    { id: '1', title: 'El Senyor dels Anells', author: 'J.R.R. Tolkien', category: 'Fantasia', price: 25.00, src: '' },
    { id: '2', title: '1984', author: 'George Orwell', category: 'Sci-fi', price: 15.50, src: '' },
    { id: '3', title: 'Orgull i Prejudici', author: 'Jane Austen', category: 'Romanç', price: 12.75, src: '' },
  ];

  books = signal<Book[]>([...this.initialBooks]);

  refreshBooks(): void {
    // Nova referència → OnPush detecta el canvi ✅
    const updated = this.initialBooks.map(b => ({ ...b }));
    updated.push({ id: '4', title: 'El Gran Gatsby', author: 'F. Scott Fitzgerald', category: 'Novel·la', price: 14.00, src: '' });
    this.books.set(updated);
    console.log('Llibres actualitzats (nova referència) → es veu al DOM');
  }

  mutateBookTitle(): void {
    // Mutació directa → OnPush NO detecta el canvi ❌
    this.books()[0].title = 'Títol Mutat!';
    console.log('Títol mutat directament → NO es veu al DOM amb OnPush');
  }
}
