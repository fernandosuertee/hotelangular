import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Quarto {
  id: number;
  numero: string;
  tipo: string;
  status: string;
  hotel: { id: number; nome?: string };
}

@Component({
  selector: 'app-gerenciar-quarto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gerenciar-quarto.component.html',
  styleUrls: ['./gerenciar-quarto.component.scss']
})
export class GerenciarQuartoComponent {
  quartoId: number | null = null;
  isLoading: boolean = false;
  quartos: Quarto[] = [];
  quartoSelecionado: Quarto | null = null;

  hoteis = [
    { id: 1, nome: 'Hotel A' },
    { id: 2, nome: 'Hotel B' },
    // Adicione outros hotéis, se necessário
  ];

  showEditModal = false;
  showDetailsModal = false;
  showListAllModal = false;

  editForm = {
    numero: '',
    tipo: '',
    status: '',
    hotelSelecionado: 0
  };

  constructor(private router: Router) {
    this.carregarQuartos();
  }

  carregarQuartos(): void {
    const quartosArmazenados = JSON.parse(localStorage.getItem('quartos') || '[]');
    this.quartos = quartosArmazenados.map((quarto: any, index: number) => ({
      id: quarto.id || index + 1,
      numero: quarto.numero,
      tipo: quarto.tipo,
      status: quarto.status,
      hotel: { id: quarto.hotel.id, nome: this.hoteis.find(h => h.id === quarto.hotel.id)?.nome || 'Hotel Desconhecido' }
    }));
  }

  verDetalhes(): void {
    if (this.quartoId === null || this.quartoId < 0) {
      alert('Por favor, insira um ID de quarto válido.');
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.quartoSelecionado = this.quartos.find(quarto => quarto.id === this.quartoId) || null;
      if (this.quartoSelecionado) {
        this.showDetailsModal = true;
      } else {
        alert('Quarto não encontrado.');
      }
      this.isLoading = false;
    }, 1000);
  }

  editarQuarto(): void {
    if (this.quartoId === null || this.quartoId < 0) {
      alert('Por favor, insira um ID de quarto válido.');
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      const quarto = this.quartos.find(quarto => quarto.id === this.quartoId);
      if (quarto) {
        this.editForm = {
          numero: quarto.numero,
          tipo: quarto.tipo,
          status: quarto.status,
          hotelSelecionado: quarto.hotel.id
        };
        this.showEditModal = true;
        this.quartoSelecionado = quarto;
      } else {
        alert('Quarto não encontrado para edição.');
      }
      this.isLoading = false;
    }, 1000);
  }

  excluirQuarto(): void {
    if (this.quartoId === null || this.quartoId < 0) {
      alert('Por favor, insira um ID de quarto válido.');
      return;
    }

    if (confirm(`Tem certeza de que deseja excluir o quarto com ID: ${this.quartoId}?`)) {
      const index = this.quartos.findIndex(quarto => quarto.id === this.quartoId);
      if (index !== -1) {
        this.quartos.splice(index, 1);
        localStorage.setItem('quartos', JSON.stringify(this.quartos));
        alert(`Quarto com ID ${this.quartoId} foi excluído.`);
        this.quartoSelecionado = null;
        this.quartoId = null;
      } else {
        alert('Quarto não encontrado para exclusão.');
      }
    }
  }

  listarQuartos(): void {
    this.showListAllModal = true;
  }

  fecharModal(): void {
    this.showEditModal = false;
    this.showDetailsModal = false;
    this.showListAllModal = false;
    this.quartoSelecionado = null;
  }

  salvarEdicao(): void {
    if (this.quartoSelecionado) {
      this.quartoSelecionado.numero = this.editForm.numero;
      this.quartoSelecionado.tipo = this.editForm.tipo;
      this.quartoSelecionado.status = this.editForm.status;
      this.quartoSelecionado.hotel.id = this.editForm.hotelSelecionado;
      localStorage.setItem('quartos', JSON.stringify(this.quartos));
      alert(`Quarto com ID ${this.quartoSelecionado.id} atualizado com sucesso.`);
      this.fecharModal();
    }
  }
}
