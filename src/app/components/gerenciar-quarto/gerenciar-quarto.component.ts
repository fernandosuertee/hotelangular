import { Component } from '@angular/core';
import { QuartoService } from '../../services/quarto.service';
import { HotelService } from '../../services/hotel.service';
import Swal from 'sweetalert2';
import { Quarto } from '../../models/quarto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


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
    hotel: { id: 0, nome: '' }, // Alterado de null para 0
  };

  quartoForm = {
    numero: '',
    tipo: '',
    status: '',
    hotelId: 0, // Valor padrão inicial
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
      next: (quartos) => {
        this.quartos = quartos.map((quarto) => ({
          ...quarto,
          hotel: quarto.hotel != null ? quarto.hotel : { id: 0, nome: 'Desconhecido' },
        }));
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível carregar os quartos.', 'error');
      },
    });
  }  

  editarQuarto(): void {
    if (!this.quartoId) {
      Swal.fire('Erro', 'Por favor, insira um ID de quarto válido.', 'error');
      return;
    }
  
    this.quartoService.getQuartoById(this.quartoId).subscribe({
      next: (quarto: Quarto) => {
        this.isLoading = false;
  
        this.editForm = {
          numero: quarto.numero,
          tipo: quarto.tipo,
          status: quarto.status,
          hotel: {
            id: quarto.hotel.id,
            nome: quarto.hotel.nome,
          },
        };
        this.showEditModal = true;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Erro', 'Quarto não encontrado.', 'error');
      },
    });
  }
  

  salvarEdicao(): void {
    if (this.editForm.hotel.id === 0) {
      Swal.fire('Erro', 'Por favor, selecione um hotel válido.', 'error');
      return;
    }

    const quartoAtualizado: Quarto = {
      id: this.quartoId!,
      numero: this.editForm.numero,
      tipo: this.editForm.tipo,
      status: this.editForm.status,
      hotel: {
        id: this.editForm.hotel.id,
        nome: this.editForm.hotel.nome,
      },
    };

    this.isLoading = true;
    this.quartoService.updateQuarto(this.quartoId!, quartoAtualizado).subscribe({
      next: () => {
        this.isLoading = false;
        this.fecharModal();
        this.carregarQuartos();
        Swal.fire('Sucesso', 'Quarto atualizado com sucesso.', 'success');
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Erro', 'Não foi possível salvar as alterações.', 'error');
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
      next: (quarto) => {
        this.isLoading = false;
        this.quartoSelecionado = quarto;
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

  cadastrarQuarto(): void {
    const novoQuarto: Quarto = {
      numero: this.quartoForm.numero,
      tipo: this.quartoForm.tipo,
      status: this.quartoForm.status,
      hotel: { id: this.quartoForm.hotelId, nome: '' }, // Passa um objeto hotel com ID
    };
  
    this.quartoService.createQuarto(novoQuarto).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Quarto cadastrado com sucesso.', 'success');
        this.carregarQuartos(); // Atualiza a lista de quartos
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível cadastrar o quarto.', 'error');
      },
    });
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
