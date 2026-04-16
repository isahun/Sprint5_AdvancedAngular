// ============================================================
// TEST DE COMPONENT: BookEditComponent
// ============================================================
// ComponentFixture és el "contenidor de test" que Angular crea
// per instanciar un component en un entorn aïllat, sense DOM real.
// Ens dóna accés tant a la instància del component (.componentInstance)
// com al DOM simulat (.nativeElement) i al cicle de vida Angular.
// ============================================================

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookEditComponent } from './book-edit-component';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;

  // beforeEach async: el TestBed necessita compilar els templates
  // (HTML + CSS) abans de crear el component. compileComponents()
  // és asíncron perquè pot implicar peticions per carregar fitxers
  // externs, per això usem async/await.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Els components standalone s'afegeixen a imports[], no a declarations[].
      // Això és diferent dels components tradicionals (NgModule-based).
      imports: [BookEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;

    // whenStable() espera que tots els efectes asíncrons pendents
    // (Promises, Observables, signals amb effect()) s'hagin resolt.
    // BookEditComponent té un effect() que inicialitza els camps del
    // formulari quan rep un input() — esperar l'estabilitat garanteix
    // que el DOM reflecteix l'estat inicial correctament.
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
