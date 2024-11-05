import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastrar-quarto',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cadastrar-quarto.component.html',
  styleUrls: ['./cadastrar-quarto.component.scss']
})
export class CadastrarQuartoComponent implements OnInit {
  numero: string = '';
  tipo: string = '';
  status: string = '';
  hotelSelecionado!: number;
  hoteis: any[] = [];
  isLoading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarHoteis();
  }

  carregarHoteis() {
    const hoteisSalvos = JSON.parse(localStorage.getItem('hoteis') || '[]');
    if (hoteisSalvos.length > 0) {
      this.hoteis = hoteisSalvos;
    } else {
      alert('Nenhum hotel encontrado. Por favor, cadastre um hotel primeiro.');
      this.router.navigate(['/cadastrar-hotel']);
    }
  }

  gerarIdQuarto(): number {
    const quartosExistentes = JSON.parse(localStorage.getItem('quartos') || '[]');
    return quartosExistentes.length > 0
      ? quartosExistentes[quartosExistentes.length - 1].id + 1
      : 1;
  }

  cadastrarQuarto() {
    if (!this.numero || !this.tipo || !this.status || !this.hotelSelecionado) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const quarto = {
      id: this.gerarIdQuarto(),
      numero: this.numero,
      tipo: this.tipo,
      status: this.status,
      hotelId: this.hotelSelecionado
    };

    const quartos = JSON.parse(localStorage.getItem('quartos') || '[]');
    quartos.push(quarto);
    localStorage.setItem('quartos', JSON.stringify(quartos));

    alert('Quarto cadastrado com sucesso!');
    this.router.navigate(['/home']);
  }
}
