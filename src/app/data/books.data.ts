import { Book } from '../interfaces/book.interface';

// Default dataset extracted to its own file so both BooksService
// and any reset logic share the same source of truth (DRY).
export const DEFAULT_BOOKS: Book[] = [
  { id: '1', title: 'The lord of the Rings', author: 'J.R.R. Tolkien', category: 'Epic' },
  { id: '2', title: 'Metafísica de los tubos', author: 'Amélie Nothomb', category: 'Other' },
  { id: '3', title: 'Poesía completa', author: 'Alejandra Pizarnik', category: 'Poetry' }
];
