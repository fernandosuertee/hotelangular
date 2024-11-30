import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { HospedeService } from '../../services/hospede.service';
import { HotelService } from '../../services/hotel.service';
import { QuartoService } from '../../services/quarto.service';
import { Reserva } from '../../models/reserva.model';
import { Hospede } from '../../models/hospede.model';
import { Hotel } from '../../models/hotel';
import { Quarto } from '../../models/quarto';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-reserva.component.html',
  styleUrls: ['./cadastrar-reserva.component.scss'],
})
export class CadastrarReservaComponent implements OnInit {
  hospedes: Hospede[] = [];
  hoteis: Hotel[] = [];
  quartos: Quarto[] = [];

  hospedeSelecionado!: number | null;
  hotelSelecionado!: number | null;
  quartoSelecionado!: number | null;
  dataCheckIn!: string;
  dataCheckOut!: string;
  numHospedes!: number;

  isLoading: boolean = false;

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
    if (this.hotelSelecionado) {
      this.quartoService.getTodosQuartosPorHotel(this.hotelSelecionado).subscribe({
        next: (quartos: Quarto[]) => {
          this.quartos = quartos;
        },
        error: () => {
          Swal.fire('Erro', 'Não foi possível carregar os quartos.', 'error');
        },
      });
    }
  }

  getDataMinima(): string {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
  }

  cadastrarReserva(): void {
    if (!this.validarCampos()) {
      return;
    }

    const hospede = this.hospedes.find((h) => h.id === this.hospedeSelecionado);
    const hotel = this.hoteis.find((h) => h.id === this.hotelSelecionado);
    const quarto = this.quartos.find((q) => q.id === this.quartoSelecionado);

    if (!hospede || !hotel || !quarto) {
      Swal.fire('Erro', 'Dados inválidos. Verifique os campos selecionados.', 'error');
      return;
    }

    const novaReserva = new Reserva(
      hospede,
      hotel,
      quarto,
      this.dataCheckIn,
      this.dataCheckOut,
      this.numHospedes
    );

    this.isLoading = true;

    this.reservaService.criarReserva(novaReserva).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire('Sucesso', 'Reserva cadastrada com sucesso!', 'success');
        this.limparCampos();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erro ao cadastrar reserva:', err); // Loga o erro no console
        let mensagemErro = 'Não foi possível cadastrar a reserva.';
        if (err.error) {
          if (err.error.message) {
            mensagemErro = err.error.message;
          } else if (typeof err.error === 'string') {
            mensagemErro = err.error;
          } else if (err.error.errors) {
            mensagemErro = err.error.errors.map((e: any) => e.defaultMessage).join(', ');
          }
        }
        Swal.fire('Erro', mensagemErro, 'error');
      },
    });
  }

  validarCampos(): boolean {

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataCheckIn = new Date(this.dataCheckIn);
    const dataCheckOut = new Date(this.dataCheckOut);


    if (!this.hospedeSelecionado) {
      Swal.fire('Erro', 'Selecione um hóspede.', 'error');
      return false;
    }
    if (!this.hotelSelecionado) {
      Swal.fire('Erro', 'Selecione um hotel.', 'error');
      return false;
    }
    if (!this.quartoSelecionado) {
      Swal.fire('Erro', 'Selecione um quarto.', 'error');
      return false;
    }
    if (!this.dataCheckIn || !this.dataCheckOut) {
      Swal.fire('Erro', 'Selecione as datas de check-in e check-out.', 'error');
      return false;
    }
    if (new Date(this.dataCheckIn) < new Date()) {
      Swal.fire('Erro', 'Data de check-in não pode ser no passado.', 'error');
      return false;
    }
    if (new Date(this.dataCheckOut) <= new Date(this.dataCheckIn)) {
      Swal.fire('Erro', 'Data de check-out deve ser após o check-in.', 'error');
      return false;
    }
    if (!this.numHospedes || this.numHospedes <= 0) {
      Swal.fire('Erro', 'Número de hóspedes deve ser maior que zero.', 'error');
      return false;
    }


    const quarto = this.quartos.find((q) => q.id === this.quartoSelecionado);
    if (quarto) {
      if (
        this.numHospedes < quarto.capacidadeMinima ||
        this.numHospedes > quarto.capacidadeMaxima
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

  limparCampos(): void {
    this.hospedeSelecionado = 0;
    this.hotelSelecionado = 0;
    this.quartoSelecionado = 0;
    this.dataCheckIn = '';
    this.dataCheckOut = '';
    this.numHospedes = 0;
    this.quartos = [];
  }
}