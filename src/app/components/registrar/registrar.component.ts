import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Cliente {
  id: number;
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

  gerarIdCliente(): number {
    const clientesExistentes = JSON.parse(localStorage.getItem('clientes') || '[]');
    return clientesExistentes.length > 0
      ? clientesExistentes[clientesExistentes.length - 1].id + 1
      : 1;
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

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;

      const novoCliente: Cliente = {
        id: this.gerarIdCliente(),
        nome: this.nome,
        email: this.email
      };

      const clientesExistentes = JSON.parse(localStorage.getItem('clientes') || '[]');
      clientesExistentes.push(novoCliente);
      localStorage.setItem('clientes', JSON.stringify(clientesExistentes));

      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/home']);
    }, 2000);
  }
}
