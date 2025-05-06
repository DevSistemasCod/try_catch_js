export default class Aluno {
  #nome;
  #notas = [];

  constructor(nome, notas = []) {
    this.#nome = nome;
    this.#notas = notas;
  }

  // Método para adicionar uma nota individualmente
  adicionarNota(novaNota) {
    try {
      //prettier-ignore
      if ((novaNota >= 0) && (novaNota <= 10)) {
        this.#notas.push(novaNota);
      } 
      else {
        throw new Error('Nota fora do intervalo permitido (0 a 10).');
      }
    } catch (erro) {// executado se a nota estiver fora do intervalo permitido
      alert(`Erro ao adicionar nota: ${erro.message}`);
    }
  }

  // Método privado para validar se as notas são válidas
  #validarNotas(notas) {
    let notasValidas = notas.every((nota) => {
      return nota >= 0 && nota <= 10;
    });

    //if (notasValidas === false) {
    //simplificação
    if (!notasValidas) {
      alert('Cada nota deve ser um número entre 0 e 10.');
      return false;
    }
    return true;
  }

  // Getters e Setters para notas
  get notas() {
    return this.#notas;
  }

  get nome() {
    return this.#nome;
  }

  set notas(notas) {
    try {
      if (!Array.isArray(notas)) {
        throw new Error('O valor atribuído deve ser um array de números.');
      }
      if (this.#validarNotas(notas)) {
        this.#notas = notas;
      }
    } catch (erro) {//executado se o valor passado para o setter notas não for um array.
      alert(`Erro ao definir notas: ${erro.message}`); 
    }
  }

  // Método para calcular a média simples
  calcularMedia() {
    try {
      if (!this.#validarNotas(this.#notas)) {
        throw new Error('Notas inválidas. Não é possível calcular a média.');
      }

      if (this.#notas.length === 0) {
        throw new Error('Divisão por zero não é aceita! Nenhuma nota disponível.');
      } 
      else {
        let resultado;
        //prettier-ignore
        let soma = this.#notas.reduce((acumulador, notaAtual) => {
        return acumulador + notaAtual; // Soma o valor atual ao acumulador
        }, 0);
        resultado = soma / this.#notas.length;
        return resultado.toFixed(2);
      }
    } catch (erro) {
      alert(`Erro ao calcular a média: ${erro.message}`);
      return 0;
    }// O catch vai acontecer quando:
     // As notas forem inválidas (ou seja, fora do intervalo de 0 a 10).
     // A lista de notas estiver vazia (o que resultaria em divisão por zero).
     // Qualquer erro inesperado ocorra durante o reduce ou outro trecho.
  }

  // Método para exibir informações
  toString() {
    return `${this.#nome}, Notas: ${this.#notas.join(', ')}`;
  }
}
