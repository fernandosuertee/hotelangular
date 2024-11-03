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
    localStorage.setItem('userRole', role); // Armazenar o papel no localStorage
  }

  // Obter o papel do usuário
  getUserRole(): string {
    return this.userRole || localStorage.getItem('userRole') || '';
  }

  // Verificar se o usuário é admin
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  // Método de logout
  logout() {
    this.userRole = ''; // Limpa o papel do usuário
    localStorage.removeItem('userRole'); // Remove o papel do localStorage
  }
}
