import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Reserva {
  id: number;
  hospedeId: number;
  hotelId: number;
  quartoId: number;
  hospede: string;
  hotel: string;
  quarto: string;
  dataCheckIn: string;
  dataCheckOut: string;
  numHospedes: number;
  status: string;
}

@Component({
  selector: 'app-gerenciar-reserva',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gerenciar-reserva.component.html',
  styleUrls: ['./gerenciar-reserva.component.scss']
})
export class GerenciarReservaComponent {
  reservaId: number | null = null;
  isLoading: boolean = false;
  reservas: Reserva[] = [];
  reservaSelecionada: Reserva | null = null;

  // Modais de controle
  showEditModal = false;
  showDetailsModal = false;
  showListAllModal = false;

  // Formulário de edição
  editForm = {
    nomeUsuario: '',
    email: '',
    dataCheckIn: '',
    dataCheckOut: '',
    numHospedes: 1,
    status: '',
    hotel: { id: 0 },
    quarto: { id: 0 },
    hospede: { id: 0 }
  };

  constructor() {
    // Dados simulados para as reservas
    this.reservas = [
      { id: 1, hospedeId: 1, hotelId: 1, quartoId: 101, hospede: 'João Silva', hotel: 'Hotel A', quarto: '101', dataCheckIn: '2024-11-10', dataCheckOut: '2024-11-15', numHospedes: 2, status: 'Confirmada' },
      { id: 2, hospedeId: 2, hotelId: 2, quartoId: 202, hospede: 'Maria Oliveira', hotel: 'Hotel B', quarto: '202', dataCheckIn: '2024-11-12', dataCheckOut: '2024-11-16', numHospedes: 1, status: 'Pendente' },
    ];
  }

  verDetalhes(): void {
    if (this.reservaId === null || this.reservaId < 0) {
      alert('Por favor, insira um ID de reserva válido.');
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.reservaSelecionada = this.reservas.find(reserva => reserva.id === this.reservaId) || null;
      if (this.reservaSelecionada) {
        this.showDetailsModal = true;
      } else {
        alert('Reserva não encontrada.');
      }
      this.isLoading = false;
    }, 1000);
  }

  editarReserva(): void {
    if (this.reservaId === null || this.reservaId < 0) {
      alert('Por favor, insira um ID de reserva válido.');
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      const reserva = this.reservas.find(reserva => reserva.id === this.reservaId);
      if (reserva) {
        // Preenche o formulário de edição com os dados da reserva
        this.editForm = {
          nomeUsuario: reserva.hospede,
          email: 'email_simulado@exemplo.com',  // Simulando o email
          dataCheckIn: reserva.dataCheckIn,
          dataCheckOut: reserva.dataCheckOut,
          numHospedes: reserva.numHospedes,
          status: reserva.status,
          hotel: { id: reserva.hotelId },
          quarto: { id: reserva.quartoId },
          hospede: { id: reserva.hospedeId }
        };
        this.showEditModal = true;
        this.reservaSelecionada = reserva;
      } else {
        alert('Reserva não encontrada para edição.');
      }
      this.isLoading = false;
    }, 1000);
  }

  excluirReserva(): void {
    if (this.reservaId === null || this.reservaId < 0) {
      alert('Por favor, insira um ID de reserva válido.');
      return;
    }

    if (confirm(`Tem certeza de que deseja excluir a reserva com ID: ${this.reservaId}?`)) {
      const index = this.reservas.findIndex(reserva => reserva.id === this.reservaId);
      if (index !== -1) {
        this.reservas.splice(index, 1);
        alert(`Reserva com ID ${this.reservaId} foi excluída.`);
        this.reservaSelecionada = null;
        this.reservaId = null;
      } else {
        alert('Reserva não encontrada para exclusão.');
      }
    }
  }

  listarReservas(): void {
    this.showListAllModal = true;
  }

  fecharModal(): void {
    this.showEditModal = false;
    this.showDetailsModal = false;
    this.showListAllModal = false;
    this.reservaSelecionada = null;
  }

  salvarEdicao(): void {
    if (this.reservaSelecionada) {
      this.reservaSelecionada.hospede = this.editForm.nomeUsuario;
      this.reservaSelecionada.dataCheckIn = this.editForm.dataCheckIn;
      this.reservaSelecionada.dataCheckOut = this.editForm.dataCheckOut;
      this.reservaSelecionada.numHospedes = this.editForm.numHospedes;
      this.reservaSelecionada.status = this.editForm.status;
      alert(`Reserva com ID ${this.reservaSelecionada.id} atualizada com sucesso.`);
      this.fecharModal();
    }
  }
}
