import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastrar-quarto',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarHoteis();
  }

  carregarHoteis() {
    // Dados de hotéis simulados para preencher a seleção de hotéis
    this.hoteis = [
      { id: 1, nome: 'Hotel A' },
      { id: 2, nome: 'Hotel B' },
    ];
  }

  cadastrarQuarto() {
    if (!this.numero || !this.tipo || !this.status || !this.hotelSelecionado) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const quarto = {
      id: Date.now(), // Usa a data como ID único
      numero: this.numero,
      tipo: this.tipo,
      status: this.status,
      hotel: { id: this.hotelSelecionado }
    };

    // Armazena no localStorage
    const quartos = JSON.parse(localStorage.getItem('quartos') || '[]');
    quartos.push(quarto);
    localStorage.setItem('quartos', JSON.stringify(quartos));

    alert('Quarto cadastrado com sucesso!');
    this.router.navigate(['/home']); // Volta para a página inicial após o cadastro
  }
}
