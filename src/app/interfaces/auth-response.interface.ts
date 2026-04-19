import { User } from "./user.interface";

export interface AuthResponse {
  user: Omit<User, 'token'>;
  accessToken: string;
  expiresIn: number;
  refreshToken?: string;
}
