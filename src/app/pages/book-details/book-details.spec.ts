// ============================================================
// TEST DE COMPONENT: BookDetails
// ============================================================
// BookDetails rep el bookId com a input() lligat a la ruta
// i fa una crida HTTP per obtenir les dades del llibre.
// En un test real caldria mockejar BookApiService i provideRouter,
// però el test de scaffold comprova únicament que el component
// es pot instanciar sense errors de DI ni de compilació.
// ============================================================

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetails } from './book-details';

describe('BookDetails', () => {
  let component: BookDetails;
  let fixture: ComponentFixture<BookDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetails);
    component = fixture.componentInstance;

    // whenStable() aquí és important perquè BookDetails usa toSignal()
    // internament: quan es crea el component, dispara una crida HTTP
    // que en entorn de test quedaria penjada. En absència de
    // HttpTestingController, whenStable() simplement resol les
    // Promises i microtasks pendents sense bloquejar el test.
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
