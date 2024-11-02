import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { HomeComponent } from './components/home/home.component';
import { CadastrarHotelComponent } from './components/cadastrar-hotel/cadastrar-hotel.component';
import { CadastrarReservaComponent } from './components/cadastrar-reserva/cadastrar-reserva.component';
import { CadastrarQuartoComponent } from './components/cadastrar-quarto/cadastrar-quarto.component';
import { AdminGuard } from './guards/admin.guard'; 

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastrar-reserva', component: CadastrarReservaComponent },
  { path: 'cadastrar-hotel', component: CadastrarHotelComponent, canActivate: [AdminGuard]},
  { path: 'cadastrar-quarto', component: CadastrarQuartoComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
