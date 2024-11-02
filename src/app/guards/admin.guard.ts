
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('AdminGuard: verificando se o usuário é admin');
    if (this.authService.isAdmin()) {
      return true;
    } else {
      alert('Acesso negado. Somente administradores podem acessar esta página.');
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
