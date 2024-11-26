export class Hotel {
  id: number; // Removido o '?', tornando 'id' obrigatório
  nome: string;
  endereco?: string;
  descricao?: string;
  numeroDeQuartos?: number;

  constructor(
    id: number,
    nome: string = '',
    endereco?: string,
    descricao?: string,
    numeroDeQuartos?: number
  ) {
    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
    this.descricao = descricao;
    this.numeroDeQuartos = numeroDeQuartos;
  }
}
