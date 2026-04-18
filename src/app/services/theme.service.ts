import { Injectable, signal, effect } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      localStorage.setItem('app-theme', this.theme());
      document.body.className = this.theme() + '-theme';
    });
  }

  private getInitialTheme(): Theme {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('app-theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    }
    return 'light';
  }

  toggleTheme() {
    this.theme.update(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  }
}
