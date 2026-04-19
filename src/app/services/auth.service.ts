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
  // URL base de l'API. Tots els endpoints d'auth partiran d'aquí.
  private readonly API_URL = 'http://localhost:3000';
  private http = inject(HttpClient);
  private router = inject(Router);

  // SIGNAL: emmagatzema l'usuari actual o null si no hi ha sessió.
  // S'inicialitza cridant loadCurrentUser() per recuperar la sessió
  // guardada al localStorage (persistència entre recàrregues de pàgina).
  currentUser = signal<User | null>(this.loadCurrentUser());

  // SIGNAL: booleà derivat de currentUser. Indica si hi ha sessió activa.
  // No es calcula manualment — l'effect() del constructor el manté al dia.
  isAuthenticated = signal(false);

  constructor() {
    // EFFECT: s'executa automàticament cada vegada que currentUser canvia.
    // Té dues responsabilitats:
    //   1. Mantenir isAuthenticated sincronitzat (!!user → true si hi ha usuari)
    //   2. Persistir l'usuari al localStorage per sobreviure recàrregues
    effect(() => {
      const user = this.currentUser();
      this.isAuthenticated.set(!!user); // !! converteix qualsevol valor a boolean
      if (user) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      } else {
        // Si user és null (logout), eliminem la clau del localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('currentUser');
        }
      }
    });
  }

  // Intenta recuperar l'usuari del localStorage en arrencar l'app.
  // Si no existeix o localStorage no està disponible (SSR), retorna null.
  private loadCurrentUser(): User | null {
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) as User : null;
    }
    return null;
  }

  // LOGIN: en lloc de POST (no suportat per json-server v1),
  // fem un GET filtrant per email i password com a query params.
  // Exemple: GET /users?email=user@example.com&password=password123
  // Si l'array de resposta té elements, l'usuari existeix → sessió iniciada.
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.get<any[]>(
      `${this.API_URL}/users?email=${credentials.email}&password=${credentials.password}`
    ).pipe(
      map(users => {
        // json-server retorna un array — si és buit, les credencials no coincideixen
        if (users.length === 0) throw new Error('Credencials invàlides');
        const u = users[0];
        // Construïm l'objecte User afegint un token simulat (en prod vindria del backend)
        const user: User = { ...u, token: 'mock-jwt-' + u.id };
        this.currentUser.set(user); // Actualitza la signal → dispara l'effect
        return { user: u, accessToken: user.token, expiresIn: 3600 } as AuthResponse;
      }),
      catchError(this.handleError)
    );
  }

  // LOGOUT: neteja la signal (dispara l'effect que esborra localStorage)
  // i redirigeix a /login.
  logout(): void {
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  // Retorna el token JWT de l'usuari actual, o null si no hi ha sessió.
  // L'interceptor usa aquest mètode per afegir el header Authorization.
  getToken(): string | null {
    return this.currentUser()?.token || null;
  }

  // Comprova si l'usuari actual té algun dels rols requerits.
  // Usa .some() → n'hi ha prou que tingui UN dels rols de la llista.
  // El guard usa aquest mètode per controlar l'accés per rol.
  hasRole(requiredRoles: string[]): boolean {
    const user = this.currentUser();
    if (!user || !user.roles) {
      return false;
    }
    return requiredRoles.some(role => user.roles.includes(role));
  }

  // Gestió centralitzada d'errors HTTP.
  // Distingeix errors de xarxa (EventError del client)
  // d'errors del servidor (codi HTTP 4xx/5xx).
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'S\'ha produït un error d\'autenticació!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del client: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: ${error.status}, ${error.error?.message || error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
