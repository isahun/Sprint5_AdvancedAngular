import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
// ReactiveFormsModule: necessari per usar [formGroup] i formControlName al template
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// REACTIVE FORMS: en lloc de llegir els valors del DOM directament (Template-driven),
// definim l'estructura del formulari aquí al TypeScript.
// Avantatges: validació centralitzada, fàcil de testejar, control total de l'estat.

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule], // necessari per als directives del formulari al template
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  // FormGroup: agrupa els controls del formulari.
  // Cada FormControl representa un camp: valor inicial + array de validators.
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,  // no pot estar buit
      Validators.email,     // ha de tenir format de correu vàlid
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  // Signal per mostrar errors d'autenticació a la UI (credencials incorrectes, etc.)
  // Separada del formulari perquè no és un error de validació sinó de negoci.
  errorMessage = signal<string | null>(null);

  onSubmit(): void {
    // Netegem l'error anterior abans de cada intent
    this.errorMessage.set(null);

    if (this.loginForm.valid) {
      // .value pot retornar undefined per cada camp (per disseny de TypeScript amb forms),
      // per això comprovem que email i password existeixin abans d'enviar
      const { email, password } = this.loginForm.value;
      if (email && password) {
        this.authService.login({ email, password }).subscribe({
          next: () => {
            // Login correcte → naveguem a la ruta protegida principal
            this.router.navigate(['/books']);
          },
          error: (err: Error) => {
            // Login fallit (credencials incorrectes o error de xarxa)
            this.errorMessage.set(err.message || 'Credencials invàlides');
          },
        });
      }
    } else {
      // Si l'usuari fa submit sense tocar els camps, els errors no es mostren
      // perquè els camps no estan "touched". markAllAsTouched() força la visualització.
      this.loginForm.markAllAsTouched();
    }
  }
}
