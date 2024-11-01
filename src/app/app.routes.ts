import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrar',
    loadComponent: () => import('./registrar/registrar.component').then(c => c.RegistrarComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'cadastrar-hotel',
    loadComponent: () => import('./cadastrar-hotel/cadastrar-hotel.component').then(c => c.CadastrarHotelComponent)
  },
  {
    path: 'cadastrar-usuario',
    loadComponent: () => import('./cadastrar-usuario/cadastrar-usuario.component').then(c => c.CadastrarUsuarioComponent)
  },
  {
    path: 'cadastrar-reserva',
    loadComponent: () => import('./cadastrar-reserva/cadastrar-reserva.component').then(c => c.CadastrarReservaComponent)
  },
  {
    path: 'cadastrar-quarto',
    loadComponent: () => import('./cadastrar-quarto/cadastrar-quarto.component').then(c => c.CadastrarQuartoComponent)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
