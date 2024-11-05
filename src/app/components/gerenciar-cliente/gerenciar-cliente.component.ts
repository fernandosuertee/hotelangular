import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Cliente {
  id: number;
  nome: string;
  email: string;
}

@Component({
  selector: 'app-gerenciar-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gerenciar-cliente.component.html',
  styleUrls: ['./gerenciar-cliente.component.scss']
})
export class GerenciarClienteComponent {
  clienteId: number | null = null;
  isLoading: boolean = false;
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente | null = null;

  showEditModal = false;
  showDetailsModal = false;
  showListAllModal = false;

  editForm = {
    nome: '',
    email: ''
  };

  constructor(private router: Router, private route: ActivatedRoute) {
    this.carregarClientes();
  }

  carregarClientes(): void {
    const clientesArmazenados = JSON.parse(localStorage.getItem('clientes') || '[]');
    this.clientes = clientesArmazenados.map((cliente: any, index: number) => ({
      id: index + 1,
      nome: cliente.nome,
      email: cliente.email,
    }));
  }

  verDetalhes(): void {
    if (this.clienteId === null || this.clienteId < 0) {
      alert('Por favor, insira um ID de cliente válido.');
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.clienteSelecionado = this.clientes.find(cliente => cliente.id === this.clienteId) || null;
      if (this.clienteSelecionado) {
        this.showDetailsModal = true;
      } else {
        alert('Cliente não encontrado.');
      }
      this.isLoading = false;
    }, 1000);
  }

  editarCliente(): void {
    if (this.clienteId === null || this.clienteId < 0) {
      alert('Por favor, insira um ID de cliente válido.');
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      const cliente = this.clientes.find(cliente => cliente.id === this.clienteId);
      if (cliente) {
        this.editForm = {
          nome: cliente.nome,
          email: cliente.email
        };
        this.showEditModal = true;
        this.clienteSelecionado = cliente;
      } else {
        alert('Cliente não encontrado para edição.');
      }
      this.isLoading = false;
    }, 1000);
  }

  excluirCliente(): void {
    if (this.clienteId === null || this.clienteId < 0) {
      alert('Por favor, insira um ID de cliente válido.');
      return;
    }

    if (confirm(`Tem certeza de que deseja excluir o cliente com ID: ${this.clienteId}?`)) {
      const index = this.clientes.findIndex(cliente => cliente.id === this.clienteId);
      if (index !== -1) {
        this.clientes.splice(index, 1);
        localStorage.setItem('clientes', JSON.stringify(this.clientes));
        alert(`Cliente com ID ${this.clienteId} foi excluído.`);
        this.clienteSelecionado = null;
        this.clienteId = null;
      } else {
        alert('Cliente não encontrado para exclusão.');
      }
    }
  }

  listarClientes(): void {
    this.showListAllModal = true;
  }

  fecharModal(): void {
    this.showEditModal = false;
    this.showDetailsModal = false;
    this.showListAllModal = false;
    this.clienteSelecionado = null;
  }

  salvarEdicao(): void {
    if (this.clienteSelecionado) {
      this.clienteSelecionado.nome = this.editForm.nome;
      this.clienteSelecionado.email = this.editForm.email;
      localStorage.setItem('clientes', JSON.stringify(this.clientes));
      alert(`Cliente com ID ${this.clienteSelecionado.id} atualizado com sucesso.`);
      this.fecharModal();
    }
  }
}
