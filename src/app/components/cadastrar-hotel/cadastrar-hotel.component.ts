import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Hotel {
  nome: string;
  endereco: string;
  descricao: string;
  numeroDeQuartos: number;
}

@Component({
  selector: 'app-cadastrar-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastrar-hotel.component.html',
  styleUrls: ['./cadastrar-hotel.component.scss']
})
export class CadastrarHotelComponent {
  nome: string = '';
  endereco: string = '';
  descricao: string = '';
  numeroDeQuartos!: number;
  isLoading: boolean = false;

  constructor(private router: Router) {}

  cadastrarHotel() {
    if (!this.nome || !this.endereco || !this.descricao || this.numeroDeQuartos <= 0) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;

      const novoHotel: Hotel = {
        nome: this.nome,
        endereco: this.endereco,
        descricao: this.descricao,
        numeroDeQuartos: this.numeroDeQuartos
      };

      const hoteisExistentes = JSON.parse(localStorage.getItem('hoteis') || '[]');
      hoteisExistentes.push(novoHotel);
      localStorage.setItem('hoteis', JSON.stringify(hoteisExistentes));

      alert('Hotel cadastrado com sucesso!');
      this.router.navigate(['/home']);  // Navega para a página inicial após o cadastro
    }, 2000);
  }
}
