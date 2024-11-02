import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-hotel',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    // Validações dos campos obrigatórios
    if (!this.nome || !this.endereco || !this.descricao || !this.numeroDeQuartos) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (this.numeroDeQuartos <= 0) {
      alert('Número de quartos deve ser maior que zero.');
      return;
    }

    // Inicia o ícone de carregamento
    this.isLoading = true;
    
    setTimeout(() => {
      this.isLoading = false;
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/home']); // Navega para a página inicial após o cadastro
    }, 2000);}
    
}
