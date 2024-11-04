import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service'; 
import { Reserva } from '../../models/reserva.model'; 

@Component({
  selector: 'app-gerenciar-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-reserva.component.html',
  styleUrls: ['./gerenciar-reserva.component.scss']
})
export class GerenciarReservaComponent implements OnInit {
  reservas: Reserva[] = [];
  reservaSelecionada: Reserva | null = null;
  reservaId: string = '';

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.listarReservas();
  }

  listarReservas(): void {
    this.reservaService.listarTodasReservas().subscribe((reservas: Reserva[]) => {
      this.reservas = reservas;
    });
  }

  buscarReserva(): void {
    const id = Number(this.reservaId);
    if (isNaN(id) || id <= 0) {
      alert('Por favor, insira um ID de reserva válido.');
      return;
    }
    this.reservaService.buscarReservaPorId(id).subscribe((reserva: Reserva) => {
      this.reservaSelecionada = reserva;
    });
  }

  selecionarReserva(reserva: Reserva): void {
    this.reservaSelecionada = reserva;
  }

  atualizarReserva(reserva: Reserva): void {
    this.reservaService.atualizarReserva(reserva.id, reserva).subscribe(() => {
      alert('Reserva atualizada com sucesso.');
      this.listarReservas();
    });
  }

  deletarReserva(id: number): void {
    this.reservaService.deletarReserva(id).subscribe(() => {
      alert('Reserva deletada com sucesso.');
      this.listarReservas();
    });
  }
}
