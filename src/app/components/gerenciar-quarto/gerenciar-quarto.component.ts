import { Component } from '@angular/core';
import { QuartoService } from '../../services/quarto.service';
import { HotelService } from '../../services/hotel.service';
import Swal from 'sweetalert2';
import { Quarto } from '../../models/quarto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'app-gerenciar-quarto',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent], // Importando InputComponent
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
    hotel: { id: 0, nome: '' },
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
        this.quartos = quartos;
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível carregar os quartos.', 'error');
      },
    });
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
        this.quartoSelecionado = quarto; // Armazena os dados do quarto selecionado
        this.showDetailsModal = true; // Exibe o modal de detalhes
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Erro', 'Quarto não encontrado.', 'error');
      },
    });
  }

  listarQuartos(): void {
    this.showListAllModal = true; // Exibe o modal com todos os quartos
  }

  editarQuarto(): void {
    if (!this.quartoId) {
      Swal.fire('Erro', 'Por favor, insira um ID de quarto válido.', 'error');
      return;
    }

    this.isLoading = true;
    this.quartoService.getQuartoById(this.quartoId).subscribe({
      next: (quarto: Quarto) => {
        this.isLoading = false;

        this.editForm = {
          numero: quarto.numero,
          tipo: quarto.tipo,
          status: quarto.status,
          hotel: {
            id: quarto.hotel.id!,
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

  validarCamposEdicao(): boolean {
    if (!this.editForm.numero || !this.editForm.tipo || !this.editForm.status) {
      Swal.fire({
        title: 'Erro',
        text: 'Todos os campos obrigatórios devem ser preenchidos.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }

    if (parseInt(this.editForm.numero) <= 0) {
      Swal.fire({
        title: 'Erro',
        text: 'O número do quarto deve ser um valor positivo.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }

    // Verificar se já existe um quarto com este número no mesmo hotel, excluindo o próprio quarto sendo editado
    const quartoDuplicado = this.quartos.find(
      (quarto) =>
        quarto.numero === this.editForm.numero &&
        quarto.hotel.id === this.editForm.hotel.id &&
        quarto.id !== this.quartoId
    );

    if (quartoDuplicado) {
      Swal.fire({
        title: 'Erro',
        text: 'Já existe um quarto com este número no mesmo hotel.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }

    return true;
  }

  salvarEdicao(): void {
    if (!this.validarCamposEdicao()) {
      return;
    }

    const quartoAtualizado: Quarto = {
      id: this.quartoId!,
      numero: this.editForm.numero,
      tipo: this.editForm.tipo,
      status: this.editForm.status,
      hotel: {
        id: this.editForm.hotel.id!,
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

  excluirQuarto(): void {
    if (!this.quartoId) {
      Swal.fire('Erro', 'Por favor, insira um ID de quarto válido.', 'error');
      return;
    }

    // Confirmação para exclusão
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
          error: (err) => {
            this.isLoading = false;

            if (err.error.message.includes('ocupado')) {
              Swal.fire(
                'Erro',
                'Não é possível excluir um quarto com status de ocupado.',
                'error'
              );
            } else {
              Swal.fire('Erro', 'Não foi possível excluir o quarto.', 'error');
            }
          },
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
