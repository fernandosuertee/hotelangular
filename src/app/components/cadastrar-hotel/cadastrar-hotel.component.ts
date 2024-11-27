import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../shared/input/input.component';
import { HotelService, Hotel } from '../../services/hotel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-hotel',
  standalone: true,
  imports: [InputComponent, FormsModule, CommonModule],
  templateUrl: './cadastrar-hotel.component.html',
  styleUrls: ['./cadastrar-hotel.component.scss']
})
export class CadastrarHotelComponent {
  nome: string = '';
  endereco: string = '';
  descricao: string = '';
  numeroDeQuartos!: number;
  isLoading: boolean = false;
  hoteisExistentes: Hotel[] = [];

  constructor(private router: Router, private hotelService: HotelService) {
    this.carregarHoteis();
  }


  carregarHoteis(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (hoteis) => {
        this.hoteisExistentes = hoteis;
      },
      error: () => {
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível carregar os hotéis existentes.',
          icon: 'error',
          confirmButtonText: 'Fechar'
        });
      }
    });
  }

  isNomeUnico(): boolean {
    return !this.hoteisExistentes.some((hotel) => hotel.nome === this.nome);
  }

  cadastrarHotel(): void {
    if (!this.validarCampos()) {
      return;
    }
  
    const novoHotel: Hotel = {
      nome: this.nome,
      endereco: this.endereco,
      descricao: this.descricao,
      numeroDeQuartos: this.numeroDeQuartos,
    };
  
    this.isLoading = true;
  
    this.hotelService.createHotel(novoHotel).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Sucesso',
          text: 'Hotel cadastrado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        const errorMessage = err.error?.message || 'Erro desconhecido. Tente novamente mais tarde.';
        Swal.fire({
          title: 'Erro',
          text: `Não foi possível cadastrar o hotel. Detalhes: ${errorMessage}`,
          icon: 'error',
          confirmButtonText: 'Fechar',
        });
        console.error('Erro ao cadastrar hotel:', err);
      },
    });
  }
  
  validarCampos(): boolean {
    const regexNome = /^[A-Z ]+$/; // Apenas letras maiúsculas e espaços
  
    if (!this.nome.trim() || !regexNome.test(this.nome)) {
      Swal.fire({
        title: 'Erro',
        text: 'O campo "Nome do Hotel" não pode estar vazio ou conter caracteres inválidos.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }
  
    if (!this.isNomeUnico()) {
      Swal.fire({
        title: 'Erro',
        text: 'Já existe um hotel com este nome. Por favor, escolha outro nome.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }
  
    if (!this.endereco.trim()) {
      Swal.fire({
        title: 'Erro',
        text: 'O campo "Endereço" não pode estar vazio.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }
  
    if (!this.descricao.trim()) {
      Swal.fire({
        title: 'Erro',
        text: 'O campo "Descrição" não pode estar vazio.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }
  
    if (!this.numeroDeQuartos || this.numeroDeQuartos <= 0) {
      Swal.fire({
        title: 'Erro',
        text: 'O número de quartos deve ser maior que zero.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
      return false;
    }
  
    return true;
  }
  
  formatarNome(nome: string): void {
    this.nome = nome.toUpperCase().replace(/[^A-Z ]/g, ''); // Caixa alta e remove símbolos
  }
  
}
