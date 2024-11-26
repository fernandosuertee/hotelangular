import { Component } from '@angular/core';
import { QuartoService } from '../../services/quarto.service';
import { HotelService } from '../../services/hotel.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-quarto',
  standalone: true,
  imports: [CommonModule, FormsModule], // Inclua CommonModule e FormsModule
  templateUrl: './cadastrar-quarto.component.html',
  styleUrls: ['./cadastrar-quarto.component.scss']
})
export class CadastrarQuartoComponent {
  numero: number | null = null;
  tipo: string = '';
  status: string = 'Disponível'; // Valor inicial fixo
  hotelSelecionado: number | null = null;

  hoteis: any[] = [];
  quartos: any[] = [];
  isLoading: boolean = false;

  constructor(
    private quartoService: QuartoService,
    private hotelService: HotelService
  ) {
    this.carregarHoteis();
    this.carregarQuartos();
  }

  

  carregarHoteis(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (hoteis) => {
        this.hoteis = hoteis;
      },
      error: () => {
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível carregar os hotéis.',
          icon: 'error',
          confirmButtonText: 'Fechar'
        });
      }
    });
  }

  carregarQuartos(): void {
    this.quartoService.getAllQuartos().subscribe({
      next: (quartos) => {
        this.quartos = quartos;
      },
      error: () => {
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível carregar os quartos.',
          icon: 'error',
          confirmButtonText: 'Fechar'
        });
      }
    });
  }

  validarCampos(): boolean {
    if (!this.numero || !this.tipo || !this.hotelSelecionado) {
      Swal.fire({
        title: 'Erro',
        text: 'Todos os campos obrigatórios devem ser preenchidos.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
      return false;
    }

    if (this.numero <= 0) {
      Swal.fire({
        title: 'Erro',
        text: 'O número do quarto deve ser um valor positivo.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
      return false;
    }

    // Converta hotelSelecionado para número se não for
    const hotelId = Number(this.hotelSelecionado);

    const quartoDuplicado = this.quartos.find(
      (quarto) =>
        quarto.numero === this.numero!.toString() &&
        quarto.hotelId === hotelId
    );

    if (quartoDuplicado) {
      Swal.fire({
        title: 'Erro',
        text: 'Já existe um quarto com este número no mesmo hotel.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
      return false;
    }

    const hotelExiste = this.hoteis.some((hotel) => Number(hotel.id) === hotelId);
    if (!hotelExiste) {
      Swal.fire({
        title: 'Erro',
        text: 'O hotel selecionado não existe.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
      return false;
    }

    return true;
  }

  cadastrarQuarto(): void {
    if (!this.validarCampos()) {
      return;
    }

    const novoQuarto = {
      numero: this.numero!.toString(),
      tipo: this.tipo,
      status: this.status,
      hotelId: Number(this.hotelSelecionado) // Certifique-se de que é um número
    };

    this.isLoading = true;

    this.quartoService.createQuarto(novoQuarto).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Sucesso',
          text: 'Quarto cadastrado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        this.numero = null;
        this.tipo = '';
        this.status = 'Disponível'; // Reseta o status
        this.hotelSelecionado = null;
        this.carregarQuartos();
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível cadastrar o quarto. Tente novamente.',
          icon: 'error',
          confirmButtonText: 'Fechar'
        });
      }
    });
  }

  onSelectChange(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement.value) {
      selectElement.classList.add('has-value');
    } else {
      selectElement.classList.remove('has-value');
    }
  }
}
