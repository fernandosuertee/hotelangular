export class Hospede {
  id?: number;
  nome: string;
  email: string;

  constructor(nome: string, email: string, id?: number) {
    this.nome = nome;
    this.email = email;
    if (id) {
      this.id = id;
    }
  }
}
