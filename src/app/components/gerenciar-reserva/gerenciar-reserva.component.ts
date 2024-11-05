import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Reserva {
  id: number;
  hospedeId: number;
  hotelId: number;
  quartoId: number;
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
  styleUrls: ['./gerenciar-reserva.component.scss'],
})
export class GerenciarReservaComponent implements OnInit {
  reservaId: number | null = null;
  isLoading: boolean = false;
  reservas: Reserva[] = [];
  reservaSelecionada: Reserva | null = null;

  hospedes: any[] = [];
  hoteis: any[] = [];
  quartos: any[] = [];

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
    hospede: { id: 0 },
  };

  constructor() {}

  ngOnInit(): void {
    this.carregarReservas();
    this.carregarHospedes();
    this.carregarHoteis();
    this.carregarQuartos();
  }

  carregarReservas() {
    this.reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
  }

  carregarHospedes() {
    this.hospedes = JSON.parse(localStorage.getItem('clientes') || '[]');
  }  

  carregarHoteis() {
    this.hoteis = JSON.parse(localStorage.getItem('hoteis') || '[]');
  }

  carregarQuartos() {
    this.quartos = JSON.parse(localStorage.getItem('quartos') || '[]');
  }

  obterNomeHospede(hospedeId: number | undefined): string {
    if (hospedeId === undefined) {
      return 'Desconhecido';
    }
    const hospede = this.hospedes.find((h: any) => h.id === hospedeId);
    return hospede ? hospede.nome : 'Desconhecido';
  }

  obterEmailHospede(hospedeId: number | undefined): string {
    if (hospedeId === undefined) {
      return 'Desconhecido';
    }
    const hospede = this.hospedes.find((h: any) => h.id === hospedeId);
    return hospede ? hospede.email : 'Desconhecido';
  }

  obterNomeHotel(hotelId: number | undefined): string {
    if (hotelId === undefined) {
      return 'Desconhecido';
    }
    const hotel = this.hoteis.find((h: any) => h.id === hotelId);
    return hotel ? hotel.nome : 'Desconhecido';
  }

  obterNumeroQuarto(quartoId: number | undefined): string {
    if (quartoId === undefined) {
      return 'Desconhecido';
    }
    const quarto = this.quartos.find((q: any) => q.id === quartoId);
    return quarto ? quarto.numero : 'Desconhecido';
  }
  


  verDetalhes(): void {
    if (this.reservaId === null || this.reservaId <= 0) {
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
    }, 500);
  }

  editarReserva(): void {
    if (this.reservaId === null || this.reservaId <= 0) {
      alert('Por favor, insira um ID de reserva válido.');
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      const reserva = this.reservas.find(reserva => reserva.id === this.reservaId);
      if (reserva) {
        const hospede = this.hospedes.find(h => h.id === reserva.hospedeId);

        this.editForm = {
          nomeUsuario: hospede ? hospede.nome : '',
          email: hospede ? hospede.email : '',
          dataCheckIn: reserva.dataCheckIn,
          dataCheckOut: reserva.dataCheckOut,
          numHospedes: reserva.numHospedes,
          status: reserva.status,
          hotel: { id: reserva.hotelId },
          quarto: { id: reserva.quartoId },
          hospede: { id: reserva.hospedeId },
        };
        this.showEditModal = true;
        this.reservaSelecionada = reserva;
      } else {
        alert('Reserva não encontrada para edição.');
      }
      this.isLoading = false;
    }, 500);
  }

  excluirReserva(): void {
    if (this.reservaId === null || this.reservaId <= 0) {
      alert('Por favor, insira um ID de reserva válido.');
      return;
    }

    if (confirm(`Tem certeza de que deseja excluir a reserva com ID: ${this.reservaId}?`)) {
      const index = this.reservas.findIndex(reserva => reserva.id === this.reservaId);
      if (index !== -1) {
        this.reservas.splice(index, 1);
        localStorage.setItem('reservas', JSON.stringify(this.reservas));
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
      // Atualiza os campos da reserva selecionada
      this.reservaSelecionada.dataCheckIn = this.editForm.dataCheckIn;
      this.reservaSelecionada.dataCheckOut = this.editForm.dataCheckOut;
      this.reservaSelecionada.numHospedes = this.editForm.numHospedes;
      this.reservaSelecionada.status = this.editForm.status;
      this.reservaSelecionada.hospedeId = this.editForm.hospede.id;
      this.reservaSelecionada.hotelId = this.editForm.hotel.id;
      this.reservaSelecionada.quartoId = this.editForm.quarto.id;

      // Atualizar informações do hóspede no array de hóspedes
      const hospedeIndex = this.hospedes.findIndex(h => h.id === this.editForm.hospede.id);
      if (hospedeIndex !== -1) {
        this.hospedes[hospedeIndex].nome = this.editForm.nomeUsuario;
        this.hospedes[hospedeIndex].email = this.editForm.email;
        localStorage.setItem('clientes', JSON.stringify(this.hospedes));
      }

      // Atualiza o localStorage das reservas
      localStorage.setItem('reservas', JSON.stringify(this.reservas));
      alert(`Reserva com ID ${this.reservaSelecionada.id} atualizada com sucesso.`);
      this.fecharModal();
    }
  }
}
