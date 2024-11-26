export class Quarto {
  id?: number;
  numero: string;
  tipo: string;
  status: string;
  hotel: {
    id: number;
    nome: string;
    endereco?: string;
    descricao?: string;
  }; // Hotel como objeto completo

  constructor(
    numero: string,
    tipo: string,
    status: string,
    hotel: { id: number; nome: string },
    id?: number
  ) {
    this.id = id;
    this.numero = numero;
    this.tipo = tipo;
    this.status = status;
    this.hotel = hotel;
  }
}
