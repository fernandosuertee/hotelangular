import { Component } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Hotel } from '../../models/hotel';

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
  
    this.isLoading = true;
    this.hotelService.getHotelById(this.hotelId).subscribe({
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

    this.isLoading = true;
  this.hotelService.getHotelById(this.hotelId).subscribe({
    next: (hotel) => {
      this.isLoading = false;

      // Validar valores retornados para garantir que não sejam indefinidos ou vazios
      if (!hotel.endereco || !hotel.descricao) {
        Swal.fire({
          title: 'Erro',
          text: 'Endereço e descrição são obrigatórios e não podem estar vazios.',
          icon: 'error',
          confirmButtonText: 'Fechar',
        });
        return;
      }

      this.editForm = {
        nome: hotel.nome,
        endereco: hotel.endereco, 
        descricao: hotel.descricao, 
        numeroDeQuartos: hotel.numeroDeQuartos || 0, 
      };

      this.showEditModal = true;
    },
    error: () => {
      this.isLoading = false;
      Swal.fire({
        title: 'Erro',
        text: 'Hotel não encontrado para edição.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      }
    });
  }

  validarEdicao(): boolean {
    if (!this.editForm.nome.trim()) {
      Swal.fire({
        title: 'Erro',
        text: 'O nome do hotel não pode estar vazio.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
      return false;
    }
  
    if (!this.editForm.endereco.trim()) {
      Swal.fire({
        title: 'Erro',
        text: 'O endereço não pode estar vazio.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
      return false;
    }
  
    if (!this.editForm.descricao.trim()) {
      Swal.fire({
        title: 'Erro',
        text: 'A descrição não pode estar vazia.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
      return false;
    }
  
    if (this.editForm.numeroDeQuartos <= 0) {
      Swal.fire({
        title: 'Erro',
        text: 'O número de quartos deve ser maior que zero.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
      return false;
    }
  
    if (this.hotelSelecionado) {
      const quartosCadastrados = this.hotelSelecionado?.quartosCadastrados ?? 0;// Garantindo que a propriedade exista
  
      if (this.editForm.numeroDeQuartos < quartosCadastrados) {
        Swal.fire({
          title: 'Erro',
          text: `O número de quartos deve ser maior ou igual ao número de quartos já cadastrados (${quartosCadastrados}).`,
          icon: 'error',
          confirmButtonText: 'Fechar'
        });
        return false;
      }
    }
  
    return true;
  } 

  salvarEdicao(): void {
    if (!this.validarEdicao()) {
      return;
    }

    const hotelAtualizado: Hotel = {
      id: this.hotelId!,
      nome: this.editForm.nome,
      endereco: this.editForm.endereco,
      descricao: this.editForm.descricao,
      numeroDeQuartos: this.editForm.numeroDeQuartos
    };

    this.isLoading = true;
    this.hotelService.updateHotel(this.hotelId!, hotelAtualizado).subscribe({
      next: () => {
        this.isLoading = false;
        this.fecharModal();
        Swal.fire({
          title: 'Sucesso',
          text: 'Hotel atualizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.listarHoteis();
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

    const id = this.hotelId;
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
        this.hotelService.deleteHotel(id!).subscribe({
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
