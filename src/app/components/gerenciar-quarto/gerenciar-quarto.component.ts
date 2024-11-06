import { Component, OnInit } from '@angular/core';
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
export class GerenciarQuartoComponent implements OnInit {
  quartoId: number | null = null;
  isLoading: boolean = false;
  quartos: Quarto[] = [];
  quartoSelecionado: Quarto | null = null;

  showEditModal = false;
  showDetailsModal = false;
  showListAllModal = false;

  editForm = {
    numero: '',
    tipo: '',
    status: '',
    hotelSelecionado: 0
  };

  hoteis: any[] = []; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarHoteis();
    this.carregarQuartos();
  }

  carregarHoteis(): void {
    this.hoteis = JSON.parse(localStorage.getItem('hoteis') || '[]');
  }

  carregarQuartos(): void {
    const quartosArmazenados = JSON.parse(localStorage.getItem('quartos') || '[]');
    this.quartos = quartosArmazenados.map((quarto: any) => {
      const hotel = this.hoteis.find((h: any) => h.id === quarto.hotelId);
      return {
        id: quarto.id,
        numero: quarto.numero,
        tipo: quarto.tipo,
        status: quarto.status,
        hotel: hotel || { id: quarto.hotelId, nome: 'Hotel Desconhecido' }
      };
    });
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
        localStorage.setItem('quartos', JSON.stringify(this.quartos.map(q => ({
          id: q.id,
          numero: q.numero,
          tipo: q.tipo,
          status: q.status,
          hotelId: q.hotel.id
        }))));
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
      this.quartoSelecionado.hotel = this.hoteis.find(h => h.id === this.editForm.hotelSelecionado) || { id: this.editForm.hotelSelecionado, nome: 'Hotel Desconhecido' };


      localStorage.setItem('quartos', JSON.stringify(this.quartos.map(q => ({
        id: q.id,
        numero: q.numero,
        tipo: q.tipo,
        status: q.status,
        hotelId: q.hotel.id
      }))));

      alert(`Quarto com ID ${this.quartoSelecionado.id} atualizado com sucesso.`);
      this.fecharModal();
    }
  }
}
