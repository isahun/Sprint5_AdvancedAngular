import { TestBed } from '@angular/core/testing';

import { BookSearch } from './book-search';

describe('BookSearch', () => {
  let service: BookSearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookSearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
