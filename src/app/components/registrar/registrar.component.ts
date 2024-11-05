import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Cliente {
  nome: string;
  email: string;
}

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  nome: string = '';
  email: string = '';
  confirmEmail: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

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

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;

      const novoCliente: Cliente = { nome: this.nome, email: this.email };
      const clientesExistentes = JSON.parse(localStorage.getItem('clientes') || '[]');
      clientesExistentes.push(novoCliente);
      localStorage.setItem('clientes', JSON.stringify(clientesExistentes));

      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/home']);
    }, 2000);
  }
}
