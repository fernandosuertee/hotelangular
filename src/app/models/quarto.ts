import { Hotel } from './hotel';

export class Quarto {
  id?: number;
  numero: string;
  tipo: string;
  status: string;
  hotel: Hotel; // 'hotel' é obrigatório

  constructor(
    numero: string,
    tipo: string,
    status: string,
    hotel: Hotel,
    id?: number
  ) {
    this.id = id;
    this.numero = numero;
    this.tipo = tipo;
    this.status = status;
    this.hotel = hotel;
  }
}
