import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: string = '';
  senha: string = '';
  isAdminLogin: boolean = false;
  isLoading: boolean = false; // Define o isLoading

  constructor(private router: Router, private authService: AuthService) {}

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

    // Inicia o carregamento
    this.isLoading = true;

    // Simulação do login com tempo para carregamento
    setTimeout(() => {
      this.isLoading = false; // Finaliza o carregamento
      if (this.isAdminLogin && this.login === 'admin@gmail.com' && this.senha === 'admin') {
        alert('Login de administrador bem-sucedido!');
        this.authService.setUserRole('admin');
        this.router.navigate(['home']);
      } else if (!this.isAdminLogin && this.login === 'usuario@gmail.com' && this.senha === 'usuario') {
        alert('Login de atendente bem-sucedido!');
        this.authService.setUserRole('user');
        this.router.navigate(['home']);
      } else {
        alert('Usuário ou senha incorretos.');
      }
    }, 2000); // Tempo de 2 segundos para simular carregamento
  }
}
