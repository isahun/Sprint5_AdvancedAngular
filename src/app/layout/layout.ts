import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout {
  // Injectem els serveis com a propietats públiques perquè el template
  // hi accedeixi directament (authService.isAuthenticated(), themeService.theme()...)
  themeService = inject(ThemeService);
  authService = inject(AuthService);

  // Signal local per controlar si el menú mòbil (hamburger) és obert o tancat.
  // És local perquè només afecta aquest component — no cal un servei global.
  menuOpen = signal(false);

  // Inverteix l'estat del menú: obert → tancat, tancat → obert.
  // .update() rep la funció transformadora en lloc d'un valor fix.
  toggleMenu() {
    this.menuOpen.update(open => !open);
  }

  // Tanca el menú explícitament. S'usa als links del menú mòbil per
  // tancar-lo automàticament quan l'usuari navega a una altra pàgina.
  closeMenu() {
    this.menuOpen.set(false);
  }
}
