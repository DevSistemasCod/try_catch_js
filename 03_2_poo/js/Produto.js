export default class Produto {
  #nome;
  #quantidade;
  #preco;

  constructor(nome, quantidade, preco) {
    this.#nome = nome;
    this.#quantidade = quantidade;
    this.#preco = preco; 
  }

  valorTotal() {
    try {
      let total = this.#quantidade * this.#preco;
      
      if (isNaN(total)) {
        throw new Error('Erro ao calcular o valor total: resultado inválido.');
      }
      return total.toFixed(2);
    } catch (erro) {
      console.error(erro.message);
      return 'Erro';
    }
  }

  //prettier-ignore
  toString() {
    return `Nome: ${this.#nome}, Quantidade ${this.#quantidade}, 
    Preço Unitário: R$ ${this.#preco}, Valor Total: R$ ${this.valorTotal()}`;
  }
}
