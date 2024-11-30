import { Hotel } from './hotel';

export class Quarto {
  id?: number;
  numero: string;
  tipo: string;
  status: string;
  capacidadeMinima: number;
  capacidadeMaxima: number;
  hotel: { id: number; nome: string };

  constructor(
    numero: string,
    tipo: string,
    status: string,
    capacidadeMinima: number,
    capacidadeMaxima: number,
    hotel: { id: number; nome: string},
    id?: number
  ) {
    this.id = id;
    this.numero = numero;
    this.tipo = tipo;
    this.status = status;
    this.capacidadeMinima = capacidadeMinima;
    this.capacidadeMaxima = capacidadeMaxima;
    this.hotel = hotel;
  }
}
