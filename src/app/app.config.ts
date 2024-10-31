// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'registrar', loadComponent: () => import('./registrar/registrar.component').then(m => m.RegistrarComponent) },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'cadastrar-hotel', loadComponent: () => import('./cadastrar-hotel/cadastrar-hotel.component').then(m => m.CadastrarHotelComponent) },
  { path: 'cadastrar-usuario', loadComponent: () => import('./cadastrar-usuario/cadastrar-usuario.component').then(m => m.CadastrarUsuarioComponent) },
  { path: 'cadastrar-reserva', loadComponent: () => import('./cadastrar-reserva/cadastrar-reserva.component').then(m => m.CadastrarReservaComponent) },
  { path: 'cadastrar-quarto', loadComponent: () => import('./cadastrar-quarto/cadastrar-quarto.component').then(m => m.CadastrarQuartoComponent) },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Rota padrão
  { path: '**', redirectTo: '/login' } // Rota curinga
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
