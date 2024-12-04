
import { inject } from '@angular/core';
import {  CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';



export const loginGuard: CanActivateFn = (route, state) => {
  

  const loginService = inject(LoginService);
  const router = inject(Router);


  
  if (loginService.hasPermission('USER') && state.url.startsWith('/admin')) {
    alert('Rota não permitida para seu tipo de usuário');
    return false; 
  }

  return true; 
};
