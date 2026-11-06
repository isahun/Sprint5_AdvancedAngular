import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetails } from './book-details';
import { Book } from '../../interfaces/book.interface';

describe('BookDetails', () => {
  let component: BookDetails;
  let fixture: ComponentFixture<BookDetails>;

  const mockBook: Book = {
    id: '1',
    title: 'Apegos Feroces',
    author: 'Vivian Gornick',
    category: 'Biografia',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('book', mockBook);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
