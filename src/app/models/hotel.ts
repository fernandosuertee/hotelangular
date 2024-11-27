export class Hotel {
  id: number; // ID obrigatório
  nome: string;
  endereco?: string;
  descricao?: string;
  numeroDeQuartos?: number;
  quartosCadastrados?: number; // Adicionado para resolver o problema

  constructor(
    id: number,
    nome: string = '',
    endereco?: string,
    descricao?: string,
    numeroDeQuartos?: number,
    quartosCadastrados?: number
  ) {
    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
    this.descricao = descricao;
    this.numeroDeQuartos = numeroDeQuartos;
    this.quartosCadastrados = quartosCadastrados; // Inicialização
  }
}
