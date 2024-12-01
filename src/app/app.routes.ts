import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { HomeComponent } from './components/home/home.component';
import { CadastrarHotelComponent } from './components/cadastrar-hotel/cadastrar-hotel.component';
import { CadastrarReservaComponent } from './components/cadastrar-reserva/cadastrar-reserva.component';
import { CadastrarQuartoComponent } from './components/cadastrar-quarto/cadastrar-quarto.component';
import { GerenciarClienteComponent } from './components/gerenciar-cliente/gerenciar-cliente.component';
import { GerenciarQuartoComponent } from './components/gerenciar-quarto/gerenciar-quarto.component';
import { GerenciarHotelComponent } from './components/gerenciar-hotel/gerenciar-hotel.component';
import { GerenciarReservaComponent } from './components/gerenciar-reserva/gerenciar-reserva.component';



export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
    { path: 'registrar', component: RegistrarComponent },
    { path: 'home', component: HomeComponent },
    { path: 'cadastrar-reserva', component: CadastrarReservaComponent },
    { path: 'cadastrar-hotel', component: CadastrarHotelComponent },
    { path: 'cadastrar-quarto', component: CadastrarQuartoComponent },
    { path: 'gerenciar-cliente', component: GerenciarClienteComponent },
    { path: 'gerenciar-quarto', component: GerenciarQuartoComponent },
    { path: 'gerenciar-hotel', component: GerenciarHotelComponent },
    { path: 'gerenciar-reserva', component: GerenciarReservaComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
