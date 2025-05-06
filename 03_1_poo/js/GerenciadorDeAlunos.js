import Aluno from './Aluno.js';

class GerenciadorDeAlunos {
  constructor() {
    this.aluno = null;
    this.#configurar();
  }

  #configurar() {
    try {
      let notaInput = document.getElementById('nota');
      let adicionarNotaBtn = document.getElementById('adicionarNotaBtn');
      let calcularMediaBtn = document.getElementById('calcularMediaBtn');
      let limparConteudoBtn = document.getElementById('limparConteudoBtn');

      //prettier-ignore
      if ((notaInput instanceof HTMLInputElement) && (adicionarNotaBtn instanceof HTMLButtonElement) &&
      (calcularMediaBtn instanceof HTMLButtonElement) && (limparConteudoBtn instanceof HTMLButtonElement)) 
      {
        adicionarNotaBtn.addEventListener('click', () => this.acrescentarNota(notaInput));
        calcularMediaBtn.addEventListener('click', () => this.exibirMedia());
        limparConteudoBtn.addEventListener('click', () => this.limparConteudo());
      } else {
        throw new Error("Elementos de interface não encontrados ou do tipo errado.");
      }
    } catch (erro) {
      console.error(`Erro na configuração dos elementos: ${erro.message}`);
    }
  }

  obterNome() {
    let nomeInput = document.getElementById('nome');

    if (nomeInput instanceof HTMLInputElement) {
      return nomeInput.value;
    } else {
      console.error('Elemento de nome inválido ou inexistente.');
      return '';
    }
  }

  inicializarAluno() {
    let nome = this.obterNome();

    if (!nome) {
      alert('Por favor, insira o nome do aluno.');
      return false;
    }

    if (!this.aluno) {
      this.aluno = new Aluno(nome);
    } else {
      this.aluno = new Aluno(nome, this.aluno.notas);
    }

    return true;
  }

  acrescentarNota(notaInput) {
    if (!this.inicializarAluno()) return;

    let nota = Number(notaInput.value);
    //prettier-ignore
    if ((!isNaN(nota)) && (nota >= 0) && (nota <= 10)) {
      try {
        this.aluno.adicionarNota(nota);
        notaInput.value = '';
        this.exibirNotas();
      } catch (erro) {
        alert(`Erro ao adicionar nota: ${erro.message}`);
      }
    } else {
      alert('Digite uma nota válida entre 0 e 10.');
    }
  }

  exibirMedia() {
    if (!this.aluno) {
      alert('Nenhum aluno foi inicializado.');
      return;
    }

    let resultado = document.getElementById('resultado');

    if (resultado instanceof HTMLParagraphElement) {
      try {
        let media = this.aluno.calcularMedia();
        resultado.textContent = `Aluno: ${this.aluno.nome}, Média: ${media}`;
      } catch (erro) {
        alert(`Erro ao calcular ou exibir média: ${erro.message}`);
      }
    } else {
      console.log('Elemento para exibir média não encontrado.');
    }
  }

  exibirNotas() {
    if (!this.aluno) {
      alert('Nenhum aluno foi inicializado.');
      return;
    }

    let notasAdicionadas = document.getElementById('notasAdicionadas');

    if (notasAdicionadas instanceof HTMLParagraphElement) {
      //prettier-ignore
      notasAdicionadas.textContent = `Notas adicionadas: ${this.aluno.notas.join(', ')}`;
    } else {
      console.error('Elemento para exibir notas não encontrado.');
    }
  }

  limparConteudo() {
    let notasAdicionadas = document.getElementById('notasAdicionadas');
    let resultado = document.getElementById('resultado');
    let nomeInput = document.getElementById('nome');

    //prettier-ignore
    if ((notasAdicionadas instanceof HTMLParagraphElement) && (resultado instanceof HTMLParagraphElement) && (nomeInput instanceof HTMLInputElement) )
    {
      notasAdicionadas.textContent = '';
      resultado.textContent = '';
      nomeInput.value = '';
      this.aluno = null;
    } else {
      console.error('Um ou mais elementos não foram encontrados.');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GerenciadorDeAlunos();
});
