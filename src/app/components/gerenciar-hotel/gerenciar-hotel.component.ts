import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Hotel {
  id: number;
  nome: string;
  endereco: string;
  descricao: string;
  numeroDeQuartos: number;
}

@Component({
  selector: 'app-gerenciar-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gerenciar-hotel.component.html',
  styleUrls: ['./gerenciar-hotel.component.scss']
})
export class GerenciarHotelComponent {
  hotelId: number | null = null;
  isLoading: boolean = false;
  hoteis: Hotel[] = [];
  hotelSelecionado: Hotel | null = null;

  showEditModal = false;
  showDetailsModal = false;
  showListAllModal = false;

  editForm = {
    nome: '',
    endereco: '',
    descricao: '',
    numeroDeQuartos: 0
  };

  constructor(private router: Router) {
    this.carregarHoteis();
  }

  carregarHoteis(): void {
    const hoteisArmazenados = JSON.parse(localStorage.getItem('hoteis') || '[]');
    this.hoteis = hoteisArmazenados.map((hotel: any, index: number) => ({
      id: index + 1,
      nome: hotel.nome,
      endereco: hotel.endereco,
      descricao: hotel.descricao,
      numeroDeQuartos: hotel.numeroDeQuartos,
    }));
  }

  verDetalhes(): void {
    if (this.hotelId === null || this.hotelId < 0) {
      alert('Por favor, insira um ID de hotel válido.');
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.hotelSelecionado = this.hoteis.find(hotel => hotel.id === this.hotelId) || null;
      if (this.hotelSelecionado) {
        this.showDetailsModal = true;
      } else {
        alert('Hotel não encontrado.');
      }
      this.isLoading = false;
    }, 1000);
  }

  editarHotel(): void {
    if (this.hotelId === null || this.hotelId < 0) {
      alert('Por favor, insira um ID de hotel válido.');
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      const hotel = this.hoteis.find(hotel => hotel.id === this.hotelId);
      if (hotel) {
        this.editForm = {
          nome: hotel.nome,
          endereco: hotel.endereco,
          descricao: hotel.descricao,
          numeroDeQuartos: hotel.numeroDeQuartos
        };
        this.showEditModal = true;
        this.hotelSelecionado = hotel;
      } else {
        alert('Hotel não encontrado para edição.');
      }
      this.isLoading = false;
    }, 1000);
  }

  excluirHotel(): void {
    if (this.hotelId === null || this.hotelId < 0) {
      alert('Por favor, insira um ID de hotel válido.');
      return;
    }

    if (confirm(`Tem certeza de que deseja excluir o hotel com ID: ${this.hotelId}?`)) {
      const index = this.hoteis.findIndex(hotel => hotel.id === this.hotelId);
      if (index !== -1) {
        this.hoteis.splice(index, 1);
        localStorage.setItem('hoteis', JSON.stringify(this.hoteis));
        alert(`Hotel com ID ${this.hotelId} foi excluído.`);
        this.hotelSelecionado = null;
        this.hotelId = null;
      } else {
        alert('Hotel não encontrado para exclusão.');
      }
    }
  }

  listarHoteis(): void {
    this.showListAllModal = true;
  }

  fecharModal(): void {
    this.showEditModal = false;
    this.showDetailsModal = false;
    this.showListAllModal = false;
    this.hotelSelecionado = null;
  }

  salvarEdicao(): void {
    if (this.hotelSelecionado) {
      this.hotelSelecionado.nome = this.editForm.nome;
      this.hotelSelecionado.endereco = this.editForm.endereco;
      this.hotelSelecionado.descricao = this.editForm.descricao;
      this.hotelSelecionado.numeroDeQuartos = this.editForm.numeroDeQuartos;
      localStorage.setItem('hoteis', JSON.stringify(this.hoteis));
      alert(`Hotel com ID ${this.hotelSelecionado.id} atualizado com sucesso.`);
      this.fecharModal();
    }
  }
}
