import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage = signal<string | null>(null);

  onSubmit(): void {
    this.errorMessage.set(null); // Neteja l'error anterior
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email && password) {
        this.authService.login({ email, password }).subscribe({
          next: () => {
            this.router.navigate(['/books']); // Redirigeix a una ruta protegida després de l'èxit
          },
          error: (err: Error) => {
            this.errorMessage.set(err.message || 'Credencials invàlides');
          },
        });
      }
    } else {
      this.loginForm.markAllAsTouched(); // Mostra errors de validació
    }
  }
}

