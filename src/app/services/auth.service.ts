import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly API_URL = 'http://localhost:3000';
  private http = inject(HttpClient);
  private router = inject(Router);

  // Signals per gestionar l'estat d'autenticació
  currentUser = signal<User | null>(this.loadCurrentUser());
  isAuthenticated = signal(false); // S'actualitzarà amb l'efecte

  constructor() {
    // Efecte per actualitzar isAuthenticated i persistir l'usuari
    effect(() => {
      const user = this.currentUser();
      this.isAuthenticated.set(!!user);
      if (user) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      } else {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('currentUser');
        }
      }
    });
  }

  private loadCurrentUser(): User | null {
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) as User : null;
    }
    return null;
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.get<any[]>(
      `${this.API_URL}/users?email=${credentials.email}&password=${credentials.password}`
    ).pipe(
      map(users => {
        if (users.length === 0) throw new Error('Credencials invàlides');
        const u = users[0];
        const user: User = { ...u, token: 'mock-jwt-' + u.id };
        this.currentUser.set(user);
        return { user: u, accessToken: user.token, expiresIn: 3600 } as AuthResponse;
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.currentUser.set(null); // Neteja la Signal
    this.router.navigate(['/login']); // Redirigeix a la pàgina d'inici de sessió
  }

  getToken(): string | null {
    return this.currentUser()?.token || null;
  }

  hasRole(requiredRoles: string[]): boolean {
    const user = this.currentUser();
    if (!user || !user.roles) {
      return false;
    }
    return requiredRoles.some(role => user.roles.includes(role));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'S\'ha produït un error d\'autenticació!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del client: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: ${error.status}, ${error.error?.message || error.statusText}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

