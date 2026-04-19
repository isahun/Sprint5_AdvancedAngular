import { User } from "./user.interface";

// Estructura de la resposta que retorna l'API en fer login.
// Omit<User, 'token'>: còpia de User SENSE el camp token.
// El token viatja per separat (accessToken) per deixar clar
// que és una credencial diferent de les dades de perfil.
export interface AuthResponse {
  user: Omit<User, 'token'>; // dades del perfil (id, email, username, roles)
  accessToken: string;        // JWT que s'usarà per autenticar les peticions
  expiresIn: number;          // temps en segons fins que expira el token
  refreshToken?: string;      // ? = opcional, s'usa per renovar el token sense re-login
}
