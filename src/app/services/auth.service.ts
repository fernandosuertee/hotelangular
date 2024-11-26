import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: string = '';

  constructor() {}


  setUserRole(role: string) {
    this.userRole = role;
    localStorage.setItem('userRole', role); 
  }


  getUserRole(): string {
    return this.userRole || localStorage.getItem('userRole') || '';
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }


  logout() {
    this.userRole = ''; 
    localStorage.removeItem('userRole'); 
  }
}