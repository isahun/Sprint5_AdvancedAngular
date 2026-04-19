// Model de l'usuari autenticat. Conté tant les dades del perfil
// com el token JWT generat en fer login.
export interface User {
  id: string;
  email: string;
  username: string;
  token: string;      // JWT — s'afegeix al header Authorization de cada petició
  roles: string[];    // array de rols: ['user'] o ['user', 'admin']
}
