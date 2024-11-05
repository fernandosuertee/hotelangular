import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-reserva.component.html',
  styleUrls: ['./cadastrar-reserva.component.scss'],
})
export class CadastrarReservaComponent implements OnInit {
  hospedes: any[] = [];
  hoteis: any[] = [];
  quartos: any[] = [];
  hospedeSelecionado!: number;
  hotelSelecionado!: number;
  quartoSelecionado!: number;
  dataCheckIn!: string;
  dataCheckOut!: string;
  numHospedes!: number;
  isLoading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarHospedes();
    this.carregarHoteis();
  }

  carregarHospedes() {
    const hospedesSalvos = JSON.parse(localStorage.getItem('clientes') || '[]');
    this.hospedes = hospedesSalvos.map((cliente: any, index: number) => ({
      id: index + 1,
      nome: cliente.nome,
      email: cliente.email,
    }));
  }

  carregarHoteis() {
    const hoteisSalvos = JSON.parse(localStorage.getItem('hoteis') || '[]');
    this.hoteis = hoteisSalvos.length > 0 ? hoteisSalvos : [{ id: 1, nome: 'Hotel Central' }];
  }

  carregarQuartos() {
    const quartosSalvos = JSON.parse(localStorage.getItem('quartos') || '[]');
    this.quartos = quartosSalvos.filter((quarto: any) => quarto.hotelId === this.hotelSelecionado);
  }

  gerarIdReserva(): number {
    const reservasExistentes = JSON.parse(localStorage.getItem('reservas') || '[]');
    return reservasExistentes.length > 0
      ? reservasExistentes[reservasExistentes.length - 1].id + 1
      : 1;
  }

  cadastrarReserva() {
    if (
      !this.hospedeSelecionado ||
      !this.hotelSelecionado ||
      !this.quartoSelecionado ||
      !this.dataCheckIn ||
      !this.dataCheckOut ||
      !this.numHospedes
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Verifica se a data de check-out é posterior à data de check-in
    if (new Date(this.dataCheckOut) <= new Date(this.dataCheckIn)) {
      alert('A data de check-out deve ser posterior à data de check-in.');
      return;
    }

    const reserva = {
      id: this.gerarIdReserva(),
      hospedeId: this.hospedeSelecionado,
      hotelId: this.hotelSelecionado,
      quartoId: this.quartoSelecionado,
      dataCheckIn: this.dataCheckIn,
      dataCheckOut: this.dataCheckOut,
      numHospedes: this.numHospedes,
      status: 'Pendente',
    };

    const reservasExistentes = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservasExistentes.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservasExistentes));

    alert('Reserva cadastrada com sucesso!');
    this.router.navigate(['/home']);
  }
}
