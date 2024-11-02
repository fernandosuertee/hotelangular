import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastrar-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-reserva.component.html',
  styleUrls: ['./cadastrar-reserva.component.scss']
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

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarHospedes();
    this.carregarHoteis();
  }

  carregarHospedes() {
    this.isLoading = true;
    this.http.get<any[]>('/api/hospedes').subscribe(
      (data) => {
        this.hospedes = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar hóspedes:', error);
        alert('Erro ao carregar a lista de hóspedes. Tente novamente.');
        this.isLoading = false;
      }
    );
  }

  carregarHoteis() {
    this.isLoading = true;
    this.http.get<any[]>('/api/hoteis').subscribe(
      (data) => {
        this.hoteis = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar hotéis:', error);
        alert('Erro ao carregar a lista de hotéis. Tente novamente.');
        this.isLoading = false;
      }
    );
  }

  carregarQuartos() {
    this.isLoading = true;
    this.http.get<any[]>(`/api/quartos?hotelId=${this.hotelSelecionado}`).subscribe(
      (data) => {
        this.quartos = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar quartos:', error);
        alert('Erro ao carregar a lista de quartos. Tente novamente.');
        this.isLoading = false;
      }
    );
  }

  cadastrarReserva() {
    if (!this.hospedeSelecionado || !this.hotelSelecionado || !this.quartoSelecionado || !this.dataCheckIn || !this.dataCheckOut || !this.numHospedes) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const reserva = {
      hospede: { id: this.hospedeSelecionado },
      hotel: { id: this.hotelSelecionado },
      quarto: { id: this.quartoSelecionado },
      dataCheckIn: this.dataCheckIn,
      dataCheckOut: this.dataCheckOut,
      numHospedes: this.numHospedes,
      status: "Pendente"
    };

    this.isLoading = true;
    this.http.post('/api/reservas', reserva).subscribe(
      () => {
        this.isLoading = false;
        alert('Reserva cadastrada com sucesso!');
        this.router.navigate(['/home']);
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro ao cadastrar reserva:', error);
        alert('Erro ao cadastrar a reserva. Tente novamente.');
      }
    );
  }
}
