import { Component } from '@angular/core';
import { QuartoService } from '../../services/quarto.service';
import { HotelService } from '../../services/hotel.service';
import Swal from 'sweetalert2';
import { Quarto } from '../../models/quarto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'app-cadastrar-quarto',
  standalone: true,
  imports: [InputComponent, CommonModule, FormsModule],
  templateUrl: './cadastrar-quarto.component.html',
  styleUrls: ['./cadastrar-quarto.component.scss']
})
export class CadastrarQuartoComponent {
  
  numero: number | null = null;
  tipo: string = '';
  status: string = 'Disponível';
  hotelSelecionado: number | null = null;

  capacidadeMinima: number | null = null;
  capacidadeMaxima: number | null = null;

  capacidadeMinimaMinima: number = 1; // Valor mínimo permitido para capacidade mínima
  capacidadeMinimaMaxima: number = 7; // Valor máximo permitido para capacidade mínima
  capacidadeMaximaMinima: number = 1; // Valor mínimo permitido para capacidade máxima
  capacidadeMaximaMaxima: number = 7; // Valor máximo permitido para capacidade máxima

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


  validarCampos(): boolean {
    const regexNome = /^[A-Z0-9 ]+$/; // Apenas letras, números e espaços
  
    if (!this.numero || this.numero <= 0) {
      Swal.fire({
        title: 'Erro',
        text: 'O número do quarto deve ser um valor positivo.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }
  
    if (!this.tipo || !regexNome.test(this.tipo.toUpperCase())) {
      Swal.fire({
        title: 'Erro',
        text: 'O tipo do quarto deve ser válido e não pode conter símbolos.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }
  
    if (!this.status) {
      Swal.fire({
        title: 'Erro',
        text: 'O status do quarto deve ser selecionado.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }
  
    if (!this.hotelSelecionado) {
      Swal.fire({
        title: 'Erro',
        text: 'Você deve selecionar um hotel.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }
  
    const hotelId = Number(this.hotelSelecionado);
    const hotel = this.hoteis.find((h) => h.id === hotelId);
  
    if (hotel && hotel.quartosCadastrados >= hotel.numeroDeQuartos) {
      Swal.fire({
        title: 'Erro',
        text: 'O hotel já alcançou o limite máximo de quartos cadastrados.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }
    if (this.capacidadeMinima == null || this.capacidadeMaxima == null) {
      Swal.fire({
        title: 'Erro',
        text: 'As capacidades mínima e máxima devem ser informadas.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }
  
    if (this.capacidadeMinima <= 0 || this.capacidadeMaxima <= 0) {
      Swal.fire({
        title: 'Erro',
        text: 'As capacidades mínima e máxima devem ser valores positivos.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }
  
    if (this.capacidadeMinima > this.capacidadeMaxima) {
      Swal.fire({
        title: 'Erro',
        text: 'A capacidade mínima não pode ser maior que a capacidade máxima.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }
  
    return true;
  }
  
  formatarNumeroQuarto(): void {
    if (this.numero !== null) {
      const numeroFormatado = this.numero.toString().replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
      this.numero = numeroFormatado ? parseInt(numeroFormatado, 10) : null; // Converte para número ou null
    }
  }
  

  carregarHoteis(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (hoteis) => {
        this.hoteis = hoteis;
      },
      error: (err) => {
        console.error('Erro ao carregar hotéis:', err);
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível carregar os hotéis. Tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'Fechar',
        });
      },
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
          confirmButtonText: 'Fechar',
        });
      },
    });
  }

  onTipoChange(): void {
    switch (this.tipo.toLowerCase()) {
      case 'quarto solteiro':
        this.capacidadeMinima = 1;
        this.capacidadeMaxima = 1;
        break;
      case 'quarto casal':
        this.capacidadeMinima = 1;
        this.capacidadeMaxima = 2;
        break;
      case 'quarto triplo':
        this.capacidadeMinima = 1;
        this.capacidadeMaxima = 3;
        break;
      case 'apartamento':
        this.capacidadeMinima = 1;
        this.capacidadeMaxima = 7;
        break;
      case 'master deluxe':
        this.capacidadeMinima = 1;
        this.capacidadeMaxima = 2;
        break;
      default:
        this.capacidadeMinima = null;
        this.capacidadeMaxima = null;
        break;
    }
  }  

  validarCapacidade(): void {
    if (
      this.capacidadeMinima !== null &&
      this.capacidadeMaxima !== null &&
      (this.capacidadeMinima < this.capacidadeMinimaMinima ||
        this.capacidadeMaxima > this.capacidadeMaximaMaxima ||
        this.capacidadeMinima > this.capacidadeMaxima)
    ) {
      Swal.fire({
        title: 'Erro',
        text: 'A capacidade mínima e máxima não são válidas!',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });

      // Resetar campos inválidos
      this.capacidadeMinima = null;
      this.capacidadeMaxima = null;
    }
  }
  

  cadastrarQuarto(): void {
    if (!this.validarCampos()) {
      return;
    }
  
    const hotelSelecionado = this.hoteis.find(h => h.id === this.hotelSelecionado);

    const novoQuarto: Quarto = {
      numero: this.numero!.toString(),
      tipo: this.tipo,
      status: this.status,
      capacidadeMinima: this.capacidadeMinima!,
      capacidadeMaxima: this.capacidadeMaxima!,
      hotel: {
        id: Number(this.hotelSelecionado),
        nome: hotelSelecionado?.nome || ''
      },
    };
  
    console.log("Quarto antes do envio ao serviço:", novoQuarto);
  
    this.isLoading = true;

    this.quartoService.createQuarto(novoQuarto).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Sucesso',
          text: 'Quarto cadastrado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        // Resetar os campos
        this.numero = null;
        this.tipo = '';
        this.status = 'Disponível';
        this.hotelSelecionado = null;
        this.capacidadeMinima = null;
        this.capacidadeMaxima = null;
        this.carregarQuartos();
      },
      error: (err) => {
        console.error('Erro ao cadastrar quarto:', err);
        this.isLoading = false;
        Swal.fire({
          title: 'Erro',
          text: `Erro ao cadastrar o quarto: ${err.error.message || 'Detalhes não disponíveis.'}`,
          icon: 'error',
          confirmButtonText: 'Fechar',
        });
      },
    });
  }
  
}
