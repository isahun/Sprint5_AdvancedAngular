import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Pàgina 403 — l'usuari està autenticat però no té el rol necessari.
// RouterLink s'importa explícitament perquè és un component standalone:
// no hereta els imports del mòdul pare com en el sistema de mòduls clàssic.
@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink], // necessari per usar routerLink al template
  templateUrl: './unauthorized.html',
  styleUrl: './unauthorized.css',
})
export class Unauthorized {}
