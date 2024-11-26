export class Hotel {
    id?: number;
    nome: string;
    endereco: string;
    descricao: string;
    numeroDeQuartos: number;
  
    constructor(
      id?: number,
      nome: string = '',
      endereco: string = '',
      descricao: string = '',
      numeroDeQuartos: number = 0
    ) {
      this.id = id;
      this.nome = nome;
      this.endereco = endereco;
      this.descricao = descricao;
      this.numeroDeQuartos = numeroDeQuartos;
    }
  }
  