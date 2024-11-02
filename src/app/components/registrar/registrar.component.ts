import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  nome: string = '';
  email: string = '';
  confirmEmail: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  registrar() {
    if (!this.nome || !this.email || !this.confirmEmail) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    if (this.email !== this.confirmEmail) {
      alert('Os e-mails não correspondem.');
      return;
    }

    // Inicia o carregamento
    this.isLoading = true;

    // Simula o tempo de cadastro com carregamento
    setTimeout(() => {
      this.isLoading = false; // Finaliza o carregamento
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/home']);
    }, 2000); // Tempo de 2 segundos para simular carregamento
  }
}
