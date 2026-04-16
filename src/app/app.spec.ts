// ============================================================
// TEST DE COMPONENT ARREL: App
// ============================================================
// El component App és el punt d'entrada de l'aplicació.
// Conté únicament <router-outlet /> i no té lògica pròpia,
// per això els tests bàsics comproven instanciació i render.
// ============================================================

import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);

    // whenStable() garanteix que el template s'ha renderitzat completament
    // i que tots els bindings Angular han tingut lloc abans de consultar el DOM.
    await fixture.whenStable();

    // nativeElement és el node DOM real del component.
    // El cast a HTMLElement ens dona l'API estàndard de querySelector.
    const compiled = fixture.nativeElement as HTMLElement;

    // querySelector retorna null si no troba l'element — l'operador ?.
    // evita un crash i el test falla amb un missatge clar si manca el h1.
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, book-app');
  });
});
