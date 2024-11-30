import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../models/reserva.model';
import Swal from 'sweetalert2';
import { Hospede } from '../../models/hospede.model';
import { Hotel } from '../../models/hotel';
import { Quarto } from '../../models/quarto';
import { HospedeService } from '../../services/hospede.service';
import { HotelService } from '../../services/hotel.service';
import { QuartoService } from '../../services/quarto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


interface EditForm {
  hospedeId: number | null;
  hotelId: number | null;
  quartoId: number | null;
  dataCheckIn: string;
  dataCheckOut: string;
  numHospedes: number;
  statusReserva: string;
}

@Component({
  selector: 'app-gerenciar-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-reserva.component.html',
  styleUrls: ['./gerenciar-reserva.component.scss'],
})

export class GerenciarReservaComponent implements OnInit {
  reservaId!: number;
  isLoading: boolean = false;
  reservas: Reserva[] = [];
  hospedes: Hospede[] = [];
  hoteis: Hotel[] = [];
  quartos: Quarto[] = [];

  reservaSelecionada: Reserva | null = null;

  showEditModal: boolean = false;
  showDetailsModal: boolean = false;
  showListAllModal: boolean = false;
  editForm: EditForm = {
    hospedeId: null,
    hotelId: null,
    quartoId: null,
    dataCheckIn: '',
    dataCheckOut: '',
    numHospedes: 1,
    statusReserva: 'CONFIRMADA',
  };
  
  constructor(
    private reservaService: ReservaService,
    private hospedeService: HospedeService,
    private hotelService: HotelService,
    private quartoService: QuartoService
  ) {}

  ngOnInit(): void {
    this.carregarHospedes();
    this.carregarHoteis();
  }

  carregarHospedes(): void {
    this.hospedeService.getAllHospedes().subscribe({
      next: (hospedes) => {
        this.hospedes = hospedes;
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível carregar os hóspedes.', 'error');
      },
    });
  }

  carregarHoteis(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (hoteis) => {
        this.hoteis = hoteis;
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível carregar os hotéis.', 'error');
      },
    });
  }

  carregarQuartos(): void {
    if (this.editForm.hotelId) {
      this.quartoService.getTodosQuartosPorHotel(this.editForm.hotelId).subscribe({
        next: (quartos: Quarto[]) =>  {
          this.quartos = quartos;
        },
        error: () => {
          Swal.fire('Erro', 'Não foi possível carregar os quartos.', 'error');
        },
      });
    }
  }

  verDetalhes(): void {
    if (!this.reservaId) {
      Swal.fire('Erro', 'Por favor, insira um ID de reserva válido.', 'error');
      return;
    }

    this.isLoading = true;
    this.reservaService.obterReservaPorId(this.reservaId).subscribe({
      next: (reserva) => {
        this.isLoading = false;
        this.reservaSelecionada = reserva;
        this.showDetailsModal = true;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Erro', 'Reserva não encontrada.', 'error');
      },
    });
  }

  editarReserva(): void {
    if (!this.reservaId) {
      Swal.fire('Erro', 'Por favor, insira um ID de reserva válido.', 'error');
      return;
    }

    this.isLoading = true;
    this.reservaService.obterReservaPorId(this.reservaId).subscribe({
      next: (reserva) => {
        this.isLoading = false;
        this.reservaSelecionada = reserva;
        this.editForm = {
          hospedeId: this.reservaSelecionada?.hospede?.id || null,
          hotelId: this.reservaSelecionada?.hotel?.id || null,
          quartoId: this.reservaSelecionada?.quarto?.id || null,
          dataCheckIn: this.reservaSelecionada?.dataCheckIn || '',
          dataCheckOut: this.reservaSelecionada?.dataCheckOut || '',
          numHospedes: this.reservaSelecionada?.numHospedes || 1,
          statusReserva: this.reservaSelecionada?.statusReserva || 'CONFIRMADA',
        };
        this.carregarQuartos();
        this.showEditModal = true;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Erro', 'Reserva não encontrada.', 'error');
      },
    });
  }

  salvarEdicao(): void {
    if (!this.validarCamposEdicao()) {
      return;
    }

    const hospede = this.hospedes.find((h) => h.id === this.editForm.hospedeId);
    const hotel = this.hoteis.find((h) => h.id === this.editForm.hotelId);
    const quarto = this.quartos.find((q) => q.id === this.editForm.quartoId);

    if (!hospede || !hotel || !quarto) {
      Swal.fire('Erro', 'Dados inválidos. Verifique os campos selecionados.', 'error');
      return;
    }

    const reservaAtualizada = new Reserva(
      hospede,
      hotel,
      quarto,
      this.editForm.dataCheckIn,
      this.editForm.dataCheckOut,
      this.editForm.numHospedes,
      this.editForm.statusReserva,
      this.reservaSelecionada!.id
    );

    this.isLoading = true;

    this.reservaService.atualizarReserva(this.reservaSelecionada!.id!, reservaAtualizada).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire('Sucesso', 'Reserva atualizada com sucesso!', 'success');
        this.fecharModal();
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire('Erro', err.error || 'Não foi possível atualizar a reserva.', 'error');
      },
    });
  }

  validarCamposEdicao(): boolean {

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataCheckIn = new Date(this.editForm.dataCheckIn);
    const dataCheckOut = new Date(this.editForm.dataCheckOut);
    dataCheckIn.setHours(0, 0, 0, 0);
    dataCheckOut.setHours(0, 0, 0, 0);

    if (dataCheckIn < hoje) {
      Swal.fire('Erro', 'Data de check-in não pode ser no passado.', 'error');
      return false;
    }
    if (dataCheckOut <= dataCheckIn) {
      Swal.fire('Erro', 'Data de check-out deve ser após o check-in.', 'error');
      return false;
    }
    
    if (!this.editForm.hospedeId) {
      Swal.fire('Erro', 'Selecione um hóspede.', 'error');
      return false;
    }
    if (!this.editForm.hotelId) {
      Swal.fire('Erro', 'Selecione um hotel.', 'error');
      return false;
    }
    if (!this.editForm.quartoId) {
      Swal.fire('Erro', 'Selecione um quarto.', 'error');
      return false;
    }
    if (!this.editForm.dataCheckIn || !this.editForm.dataCheckOut) {
      Swal.fire('Erro', 'Selecione as datas de check-in e check-out.', 'error');
      return false;
    }
    if (new Date(this.editForm.dataCheckIn) < new Date()) {
      Swal.fire('Erro', 'Data de check-in não pode ser no passado.', 'error');
      return false;
    }
    if (new Date(this.editForm.dataCheckOut) <= new Date(this.editForm.dataCheckIn)) {
      Swal.fire('Erro', 'Data de check-out deve ser após o check-in.', 'error');
      return false;
    }
    if (!this.editForm.numHospedes || this.editForm.numHospedes <= 0) {
      Swal.fire('Erro', 'Número de hóspedes deve ser maior que zero.', 'error');
      return false;
    }
    if (!this.editForm.statusReserva) {
      Swal.fire('Erro', 'Selecione o status da reserva.', 'error');
      return false;
    }


    const quarto = this.quartos.find((q) => q.id === Number(this.editForm.quartoId));
    if (quarto) {
      if (
        this.editForm.numHospedes < quarto.capacidadeMinima ||
        this.editForm.numHospedes > quarto.capacidadeMaxima
      ) {
        Swal.fire(
          'Erro',
          `Número de hóspedes inválido para o tipo de quarto '${quarto.tipo}'. O número permitido é entre ${quarto.capacidadeMinima} e ${quarto.capacidadeMaxima}.`,
          'error'
        );
        return false;
      }
    }

    return true;
  }

  excluirReserva(): void {
    if (!this.reservaId) {
      Swal.fire('Erro', 'Por favor, insira um ID de reserva válido.', 'error');
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente excluir esta reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.reservaService.deletarReserva(this.reservaId).subscribe({
          next: () => {
            this.isLoading = false;
            Swal.fire('Sucesso', 'Reserva excluída com sucesso!', 'success');
          },
          error: (err) => {
            this.isLoading = false;
            Swal.fire('Erro', err.error || 'Não foi possível excluir a reserva.', 'error');
          },
        });
      }
    });
  }

  listarReservas(): void {
    this.isLoading = true;
    this.reservaService.listarReservas().subscribe({
      next: (reservas) => {
        this.isLoading = false;
        this.reservas = reservas;
        this.showListAllModal = true;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Erro', 'Não foi possível listar as reservas.', 'error');
      },
    });
  }

  
  fecharModal(): void {
    this.showEditModal = false;
    this.showDetailsModal = false;
    this.showListAllModal = false;
    this.reservaSelecionada = null;
    this.editForm = {
      hospedeId: null,
      hotelId: null,
      quartoId: null,
      dataCheckIn: '',
      dataCheckOut: '',
      numHospedes: 1,
      statusReserva: 'CONFIRMADA',
    };
  }

}