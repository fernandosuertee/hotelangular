import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HospedeService } from '../../services/hospede.service';
import { FormsModule } from '@angular/forms'; // Importar o FormsModule
import { CommonModule } from '@angular/common';
import { Hospede } from '../../models/hospede.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent {
  nome: string = '';
  email: string = '';
  confirmEmail: string = '';
  isLoading: boolean = false;

  constructor(private hospedeService: HospedeService, private router: Router) {}

  cadastrarHospede(): void {
    if (!this.validarCampos()) {
      return;
    }

    const novoHospede: Hospede = {
      nome: this.nome.trim(),
      email: this.email.trim(),
    };

    this.isLoading = true;

    this.hospedeService.createHospede(novoHospede).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Sucesso',
          text: 'Hóspede cadastrado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        // Limpar os campos
        this.nome = '';
        this.email = '';
        this.confirmEmail = '';
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        let errorMessage = 'Erro desconhecido. Tente novamente mais tarde.';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        } else if (err.status === 400) {
          errorMessage = 'Dados inválidos. Verifique as informações e tente novamente.';
        }
        Swal.fire({
          title: 'Erro',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Fechar',
        });
      },
    });
  }

  validarCampos(): boolean {
    if (!this.nome.trim()) {
      Swal.fire({
        title: 'Erro',
        text: 'O campo "Nome" não pode estar vazio.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }

    if (!this.email.trim()) {
      Swal.fire({
        title: 'Erro',
        text: 'O campo "E-mail" não pode estar vazio.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.trim())) {
      Swal.fire({
        title: 'Erro',
        text: 'Por favor, insira um e-mail válido.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }

    if (this.email.trim() !== this.confirmEmail.trim()) {
      Swal.fire({
        title: 'Erro',
        text: 'Os e-mails não correspondem.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }

    return true;
  }
}
