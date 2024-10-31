import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { HomeComponent } from './home/home.component';
import { CadastrarHotelComponent } from './cadastrar-hotel/cadastrar-hotel.component';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { CadastrarReservaComponent } from './cadastrar-reserva/cadastrar-reserva.component';
import { CadastrarQuartoComponent } from './cadastrar-quarto/cadastrar-quarto.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastrar-hotel', component: CadastrarHotelComponent },
  { path: 'cadastrar-usuario', component: CadastrarUsuarioComponent },
  { path: 'cadastrar-reserva', component: CadastrarReservaComponent },
  { path: 'cadastrar-quarto', component: CadastrarQuartoComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
