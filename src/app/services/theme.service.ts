import { Injectable, signal, effect } from '@angular/core';

// Tipus restringit: només accepta 'light' o 'dark', res més.
type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal inicialitzada amb el tema guardat (o 'light' per defecte).
  // El valor d'una signal es llegeix cridant-la com a funció: theme()
  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // EFFECT: s'executa cada vegada que la signal `theme` canvia.
    // Té dos efectes secundaris (side effects):
    //   1. Guarda el tema al localStorage per persistir-lo entre recàrregues
    //   2. Aplica la classe CSS al body → tota l'app reacciona al canvi
    effect(() => {
      localStorage.setItem('app-theme', this.theme());
      // La classe del body ('light-theme' o 'dark-theme') és la que
      // activa els overrides de CSS definits a styles.css
      document.body.className = this.theme() + '-theme';
    });
  }

  // Llegeix el tema guardat del localStorage en iniciar l'app.
  // Si no n'hi ha cap (primera visita), retorna 'light' per defecte.
  private getInitialTheme(): Theme {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('app-theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    }
    return 'light';
  }

  // Alterna entre els dos temes. El template crida aquest mètode
  // quan l'usuari fa clic al botó de toggle.
  toggleTheme() {
    this.theme.update(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  }
}
