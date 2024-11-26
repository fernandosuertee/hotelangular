import { Component } from '@angular/core';
import { QuartoService, Quarto as QuartoServiceModel } from '../../services/quarto.service';
import { HotelService } from '../../services/hotel.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Quarto {
  id?: number;
  numero: string;
  tipo: string;
  status: string;
  hotel: {
    id: number;
    nome: string;
  };
}

@Component({
  selector: 'app-gerenciar-quarto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-quarto.component.html',
  styleUrls: ['./gerenciar-quarto.component.scss'],
})
export class GerenciarQuartoComponent {
  quartoId: number | null = null; // ID para busca, edição ou exclusão
  isLoading: boolean = false;
  quartos: Quarto[] = [];
  hoteis: any[] = [];
  quartoSelecionado: Quarto | null = null;

  showEditModal: boolean = false;
  showDetailsModal: boolean = false;
  showListAllModal: boolean = false;

  editForm = {
    numero: '',
    tipo: '',
    status: '',
    hotel: { id: null as number | null, nome: '' },
  };

  constructor(private quartoService: QuartoService, private hotelService: HotelService) {
    this.carregarHoteis();
    this.carregarQuartos();
  }

  carregarHoteis(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (hoteis) => {
        this.hoteis = hoteis;
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível carregar os hotéis.', 'error');
      },
    });
  }

  carregarQuartos(): void {
    this.quartoService.getAllQuartos().subscribe({
      next: (quartos: QuartoServiceModel[]) => {
        this.quartos = quartos.map((quarto) => ({
          ...quarto,
          hotel: { id: quarto.hotelId, nome: '' }, // Mapeamento necessário
        }));
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível carregar os quartos.', 'error');
      },
    });
  }

  fecharModal(): void {
    this.showEditModal = false;
    this.showDetailsModal = false;
    this.showListAllModal = false;
  }

  verDetalhes(): void {
    if (!this.quartoId) {
      Swal.fire('Erro', 'Por favor, insira um ID de quarto válido.', 'error');
      return;
    }

    this.isLoading = true;
    this.quartoService.getQuartoById(this.quartoId).subscribe({
      next: (quarto: QuartoServiceModel) => {
        this.isLoading = false;
        this.quartoSelecionado = {
          ...quarto,
          hotel: { id: quarto.hotelId, nome: '' }, // Ajuste necessário
        };
        this.showDetailsModal = true;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Erro', 'Quarto não encontrado.', 'error');
      },
    });
  }

  listarQuartos(): void {
    this.showListAllModal = true;
  }

  excluirQuarto(): void {
    if (!this.quartoId) {
      Swal.fire('Erro', 'Por favor, insira um ID de quarto válido.', 'error');
      return;
    }
  
    Swal.fire({
      title: 'Confirmar exclusão',
      text: 'Tem certeza que deseja excluir este quarto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.quartoService.deleteQuarto(this.quartoId!).subscribe({
          next: () => {
            this.isLoading = false;
            this.carregarQuartos();
            Swal.fire('Sucesso', 'Quarto excluído com sucesso.', 'success');
          },
          error: () => {
            this.isLoading = false;
            Swal.fire('Erro', 'Não foi possível excluir o quarto.', 'error');
          },
        });
      }
    });
  }  
}
