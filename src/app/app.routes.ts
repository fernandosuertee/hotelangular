import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { CadastrarHotelComponent } from './components/cadastrar-hotel/cadastrar-hotel.component';
import { CadastrarReservaComponent } from './components/cadastrar-reserva/cadastrar-reserva.component';
import { CadastrarQuartoComponent } from './components/cadastrar-quarto/cadastrar-quarto.component';
import { GerenciarClienteComponent } from './components/gerenciar-cliente/gerenciar-cliente.component';
import { GerenciarQuartoComponent } from './components/gerenciar-quarto/gerenciar-quarto.component';
import { GerenciarHotelComponent } from './components/gerenciar-hotel/gerenciar-hotel.component';
import { GerenciarReservaComponent } from './components/gerenciar-reserva/gerenciar-reserva.component';
import { loginGuard } from './guards/auth.guard';


export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [loginGuard] },
  { path: 'registrar', component: RegistrarComponent, canActivate: [loginGuard] },
  { path: 'cadastrar-reserva', component: CadastrarReservaComponent, canActivate: [loginGuard] },
  { path: 'cadastrar-hotel', component: CadastrarHotelComponent, canActivate: [loginGuard] },
  { path: 'cadastrar-quarto', component: CadastrarQuartoComponent, canActivate: [loginGuard] },
  { path: 'gerenciar-cliente', component: GerenciarClienteComponent, canActivate: [loginGuard] },
  { path: 'gerenciar-quarto', component: GerenciarQuartoComponent, canActivate: [loginGuard] },
  { path: 'gerenciar-hotel', component: GerenciarHotelComponent, canActivate: [loginGuard] },
  { path: 'gerenciar-reserva', component: GerenciarReservaComponent, canActivate: [loginGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];