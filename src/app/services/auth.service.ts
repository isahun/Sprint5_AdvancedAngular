import { Injectable, inject, signal, effect, computed } from '@angular/core';
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

  currentUser = signal<User | null>(this.loadCurrentUser());
  isAuthenticated = computed(() => !!this.currentUser());

  constructor() {
    effect(() => {
      const user = this.currentUser();
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
    if (typeof localStorage === 'undefined') {
      return null;
    }

    const storedUser = localStorage.getItem('currentUser');

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem('currentUser');
      return null;
    }
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http
      .get<
        User[]
      >(`${this.API_URL}/users?email=${credentials.email}&password=${credentials.password}`)
      .pipe(
        map((users) => {
          if (users.length === 0) throw new Error('Credencials invàlides');
          const u = users[0];
          const user: User = { ...u, token: 'mock-jwt-' + u.id };
          this.currentUser.set(user);
          return { user: u, accessToken: user.token, expiresIn: 3600 } as AuthResponse;
        }),
        catchError(this.handleError),
      );
  }

  logout(): void {
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.currentUser()?.token || null;
  }

  hasRole(requiredRoles: string[]): boolean {
    const user = this.currentUser();
    if (!user || !user.roles) {
      return false;
    }
    return requiredRoles.some((role) => user.roles.includes(role));
  }

  private handleError(error: unknown): Observable<never> {
    let errorMessage = "S'ha produït un error d'autenticació!";

    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error del client: ${error.error.message}`;
      } else {
        errorMessage = `Error del servidor: ${error.status}, ${error.error?.message || error.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
