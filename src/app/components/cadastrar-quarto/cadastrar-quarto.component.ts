import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastrar-quarto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-quarto.component.html',
  styleUrls: ['./cadastrar-quarto.component.scss']
})
export class CadastrarQuartoComponent implements OnInit {
  numero: string = '';
  tipo: string = '';
  status: string = '';
  hotelSelecionado!: number;
  hoteis: any[] = [];
  isLoading: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarHoteis();
  }

  carregarHoteis() {
    this.isLoading = true; // Mostra o carregamento ao buscar os hotéis
    this.http.get<any[]>('/api/hoteis').subscribe(
      (data) => {
        this.hoteis = data;
        this.isLoading = false; // Esconde o carregamento ao carregar os hotéis
      },
      (error) => {
        console.error('Erro ao buscar hotéis:', error);
        alert('Erro ao carregar a lista de hotéis. Tente novamente.');
        this.isLoading = false;
      }
    );
  }

  cadastrarQuarto() {
    if (!this.numero || !this.tipo || !this.status || !this.hotelSelecionado) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const quarto = {
      numero: this.numero,
      tipo: this.tipo,
      status: this.status,
      hotel: { id: this.hotelSelecionado } // Vincula ao hotel selecionado
    };

    this.isLoading = true;
    this.http.post('/api/quartos', quarto).subscribe(
      () => {
        this.isLoading = false;
        alert('Quarto cadastrado com sucesso!');
        this.router.navigate(['/home']);
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro ao cadastrar quarto:', error);
        alert('Erro ao cadastrar o quarto. Tente novamente.');
      }
    );
  }
}
