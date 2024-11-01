import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { CadastrarHotelComponent } from './cadastrar-hotel/cadastrar-hotel.component';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { CadastrarReservaComponent } from './cadastrar-reserva/cadastrar-reserva.component';
import { CadastrarQuartoComponent } from './cadastrar-quarto/cadastrar-quarto.component';
import { AdminComponent } from './admin/admin.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'home', component: HomeComponent },  // Página inicial do atendente

  // Rota para o admin, com suas funcionalidades
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'cadastrar-hotel', component: CadastrarHotelComponent },
      { path: 'cadastrar-usuario', component: CadastrarUsuarioComponent },
      { path: 'cadastrar-reserva', component: CadastrarReservaComponent },
      { path: 'cadastrar-quarto', component: CadastrarQuartoComponent }
    ]
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
