import { Component, input, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200">
      <div class="w-full h-48 bg-amber-100 flex items-center justify-center text-4xl">📚</div>
      <div class="p-4">
        <h3 class="text-xl font-semibold mb-2">{{ book().title }}</h3>
        <p class="text-gray-700 text-sm mb-1">{{ book().author }}</p>
        <p class="text-sm text-gray-500 mb-2">{{ book().category }}</p>
        <p class="text-lg font-bold text-blue-600">{{ book().price | currency:'EUR':'symbol' }}</p>
        <button (click)="addToCart()"
                class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Afegir al cistell ({{ addedCount() }})
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookItemComponent {
  book = input.required<Book>();

  private _addedCount = signal(0);
  addedCount = computed(() => this._addedCount());

  addToCart(): void {
    this._addedCount.update(count => count + 1);
    console.log(`[${this.book().title}] Afegit al cistell. Total: ${this.addedCount()}`);
  }
}
