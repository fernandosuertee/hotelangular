import { Component } from '@angular/core';
import { HotelService, Hotel } from '../../services/hotel.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gerenciar-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule], // Já está importado acima
  templateUrl: './gerenciar-hotel.component.html',
  styleUrls: ['./gerenciar-hotel.component.scss']
})

export class GerenciarHotelComponent {
  hotelId: number | null = null; // Inicialmente null
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

  constructor(private hotelService: HotelService) {}

  listarHoteis(): void {
    this.isLoading = true;
    this.hotelService.getAllHotels().subscribe({
      next: (hoteis) => {
        this.isLoading = false;
        this.hoteis = hoteis;
        this.showListAllModal = true;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível carregar a lista de hotéis.',
          icon: 'error',
          confirmButtonText: 'Fechar'
        });
      }
    });
  }

  verDetalhes(): void {
    if (this.hotelId === null || this.hotelId < 0) {
      Swal.fire({
        title: 'Erro',
        text: 'Por favor, insira um ID de hotel válido.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
      return;
    }

    const id = this.hotelId as number;
    this.isLoading = true;
    this.hotelService.getHotelById(id).subscribe({
      next: (hotel) => {
        this.isLoading = false;
        this.hotelSelecionado = hotel;
        this.showDetailsModal = true;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Erro',
          text: 'Hotel não encontrado.',
          icon: 'error',
          confirmButtonText: 'Fechar'
        });
      }
    });
  }

  editarHotel(): void {
    if (this.hotelId === null || this.hotelId < 0) {
      Swal.fire({
        title: 'Erro',
        text: 'Por favor, insira um ID de hotel válido.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
      return;
    }

    const id = this.hotelId as number;
    this.isLoading = true;
    this.hotelService.getHotelById(id).subscribe({
      next: (hotel) => {
        this.isLoading = false;
        this.editForm = { ...hotel };
        this.showEditModal = true;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Erro',
          text: 'Hotel não encontrado para edição.',
          icon: 'error',
          confirmButtonText: 'Fechar'
        });
      }
    });
  }

  salvarEdicao(): void {
    if (this.hotelId === null) {
      Swal.fire({
        title: 'Erro',
        text: 'Erro ao identificar o hotel para edição.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
      return;
    }

    const id = this.hotelId as number;
    const hotelAtualizado: Hotel = {
      id: id,
      nome: this.editForm.nome,
      endereco: this.editForm.endereco,
      descricao: this.editForm.descricao,
      numeroDeQuartos: this.editForm.numeroDeQuartos
    };

    this.isLoading = true;
    this.hotelService.updateHotel(id, hotelAtualizado).subscribe({
      next: () => {
        this.isLoading = false;
        this.fecharModal();
        Swal.fire({
          title: 'Sucesso',
          text: 'Hotel atualizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível atualizar o hotel.',
          icon: 'error',
          confirmButtonText: 'Fechar'
        });
      }
    });
  }

  excluirHotel(): void {
    if (this.hotelId === null || this.hotelId < 0) {
      Swal.fire({
        title: 'Erro',
        text: 'Por favor, insira um ID de hotel válido.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
      return;
    }

    const id = this.hotelId as number;
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.hotelService.deleteHotel(id).subscribe({
          next: () => {
            this.isLoading = false;
            Swal.fire({
              title: 'Sucesso',
              text: 'Hotel excluído com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          },
          error: () => {
            this.isLoading = false;
            Swal.fire({
              title: 'Erro',
              text: 'Não foi possível excluir o hotel.',
              icon: 'error',
              confirmButtonText: 'Fechar'
            });
          }
        });
      }
    });

    
  }

  fecharModal(): void {
    this.showEditModal = false;
    this.showDetailsModal = false;
    this.showListAllModal = false;
  }
  
  
}
