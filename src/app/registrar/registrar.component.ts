import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [RouterModule, FormsModule],  // Inclui RouterModule para o uso de routerLink
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  email: string = '';
  confirmEmail: string = '';
  senha: string = '';
  confirmSenha: string = '';

  constructor(private router: Router) {}

  // Função para registrar com validações
  registrar() {
    // Verifica se todos os campos estão preenchidos
    if (!this.email || !this.confirmEmail || !this.senha || !this.confirmSenha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Valida formato do e-mail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    // Verifica se e-mail e confirmação de e-mail são iguais
    if (this.email !== this.confirmEmail) {
      alert('Os e-mails não correspondem.');
      return;
    }

    // Verifica se a senha atende aos requisitos mínimos (exemplo: 6 caracteres)
    if (this.senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Verifica se senha e confirmação de senha são iguais
    if (this.senha !== this.confirmSenha) {
      alert('As senhas não correspondem.');
      return;
    }

    // Se todas as validações passarem, registra o usuário e redireciona
    alert('Cadastro realizado com sucesso!');
    this.router.navigate(['/home']);
  }
}
