import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login: string = '';
  senha: string = '';
  isAdminLogin: boolean = false;
  router = inject(Router);

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  logar() {
    if (!this.login || !this.senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.login)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    // Verifica se o login é de administrador com as credenciais 'admin@gmail.com'/'admin'
    if (this.isAdminLogin && this.login === 'admin@gmail.com' && this.senha === 'admin') {
      alert('Login de administrador bem-sucedido!');
      this.router.navigate(['admin']);
    } 
    // Verifica o login de atendente (usuario) com credenciais 'usuario@gmail.com'/'usuario'
    else if (!this.isAdminLogin && this.login === 'usuario@gmail.com' && this.senha === 'usuario') {
      alert('Login de atendente bem-sucedido!');
      this.router.navigate(['home']);
    } 
    // Caso as credenciais estejam incorretas
    else {
      alert('Usuário ou senha incorretos.');
    }
  }
}
