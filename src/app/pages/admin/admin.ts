import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

// Pàgina exclusiva per a usuaris amb rol 'admin'.
// El guard comprova el rol ABANS de renderitzar aquest component —
// si hi arribes, és que estàs autenticat i tens permisos.
@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  // Injectem AuthService per mostrar el nom de l'usuari al template.
  // authService és públic perquè el template hi accedeix directament.
  authService = inject(AuthService);
}
