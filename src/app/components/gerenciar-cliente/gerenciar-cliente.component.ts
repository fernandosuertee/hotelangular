import { Component } from '@angular/core';
import { HospedeService } from '../../services/hospede.service';
import { Hospede } from '../../models/hospede.model';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms'; // Importar o FormsModule
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gerenciar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-cliente.component.html',
  styleUrls: ['./gerenciar-cliente.component.scss'],
})
export class GerenciarClienteComponent {
  hospedeId: number | null = null;
  isLoading: boolean = false;
  hospedes: Hospede[] = [];
  hospedeSelecionado: Hospede | null = null;

  showEditModal = false;
  showDetailsModal = false;
  showListAllModal = false;

  editForm = {
    nome: '',
    email: '',
  };

  constructor(private hospedeService: HospedeService) {
    this.carregarHospedes();
  }

  carregarHospedes(): void {
    this.hospedeService.getAllHospedes().subscribe({
      next: (hospedes) => {
        this.hospedes = hospedes;
      },
      error: () => {
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível carregar os hóspedes.',
          icon: 'error',
          confirmButtonText: 'Fechar',
        });
      },
    });
  }

  verDetalhes(): void {
    if (!this.hospedeId) {
      Swal.fire('Erro', 'Por favor, insira um ID de hóspede válido.', 'error');
      return;
    }

    this.isLoading = true;
    this.hospedeService.getHospedeById(this.hospedeId).subscribe({
      next: (hospede) => {
        this.isLoading = false;
        this.hospedeSelecionado = hospede;
        this.showDetailsModal = true;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Erro', 'Hóspede não encontrado.', 'error');
      },
    });
  }

  editarHospede(): void {
    if (!this.hospedeId) {
      Swal.fire('Erro', 'Por favor, insira um ID de hóspede válido.', 'error');
      return;
    }

    this.isLoading = true;
    this.hospedeService.getHospedeById(this.hospedeId).subscribe({
      next: (hospede) => {
        this.isLoading = false;
        this.editForm = {
          nome: hospede.nome,
          email: hospede.email,
        };
        this.hospedeSelecionado = hospede;
        this.showEditModal = true;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Erro', 'Hóspede não encontrado para edição.', 'error');
      },
    });
  }

  validarEdicao(): boolean {
    if (!this.editForm.nome.trim()) {
      Swal.fire({
        title: 'Erro',
        text: 'O campo "Nome" não pode estar vazio.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }

    if (!this.editForm.email.trim()) {
      Swal.fire({
        title: 'Erro',
        text: 'O campo "E-mail" não pode estar vazio.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.editForm.email.trim())) {
      Swal.fire({
        title: 'Erro',
        text: 'Por favor, insira um e-mail válido.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }

    // Verificar se o e-mail já está em uso por outro hóspede
    const emailJaCadastrado = this.hospedes.find(
      (hospede) =>
        hospede.email === this.editForm.email.trim() &&
        hospede.id !== this.hospedeSelecionado?.id
    );

    if (emailJaCadastrado) {
      Swal.fire({
        title: 'Erro',
        text: 'Este e-mail já está cadastrado para outro hóspede.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }

    return true;
  }

  salvarEdicao(): void {
    if (!this.validarEdicao()) {
      return;
    }

    const hospedeAtualizado: Hospede = {
      id: this.hospedeSelecionado?.id,
      nome: this.editForm.nome.trim(),
      email: this.editForm.email.trim(),
    };

    this.isLoading = true;
    this.hospedeService.updateHospede(hospedeAtualizado.id!, hospedeAtualizado).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Sucesso',
          text: 'Hóspede atualizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.fecharModal();
        this.carregarHospedes();
      },
      error: (err) => {
        this.isLoading = false;
        let errorMessage = 'Não foi possível atualizar o hóspede.';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
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

  excluirHospede(): void {
    if (!this.hospedeId) {
      Swal.fire('Erro', 'Por favor, insira um ID de hóspede válido.', 'error');
      return;
    }

    Swal.fire({
      title: 'Confirmar exclusão',
      text: 'Tem certeza que deseja excluir este hóspede?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.hospedeService.deleteHospede(this.hospedeId!).subscribe({
          next: () => {
            this.isLoading = false;
            Swal.fire('Sucesso', 'Hóspede excluído com sucesso.', 'success');
            this.carregarHospedes();
          },
          error: (err) => {
            this.isLoading = false;
            let errorMessage = 'Não foi possível excluir o hóspede.';
            if (err.error && err.error.message) {
              errorMessage = err.error.message;
            }
            Swal.fire('Erro', errorMessage, 'error');
          },
        });
      }
    });
  }

  listarHospedes(): void {
    this.showListAllModal = true;
  }

  fecharModal(): void {
    this.showEditModal = false;
    this.showDetailsModal = false;
    this.showListAllModal = false;
    this.hospedeSelecionado = null;
  }
}
