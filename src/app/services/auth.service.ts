import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: string = '';

  constructor() {}

  // Definir o papel do usuário após o login
  setUserRole(role: string) {
    this.userRole = role;
  }

  // Obter o papel do usuário
  getUserRole(): string {
    return this.userRole;
  }

  // Verificar se o usuário é admin
  isAdmin(): boolean {
    return this.userRole === 'admin';
  }
}
