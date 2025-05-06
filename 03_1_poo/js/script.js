import Aluno from './Aluno.js';

let aluno;

function acrescentar(notaInput) {
  let nota = Number(notaInput.value);

  // Valida se o valor da nota é um número válido
  // prettier-ignore
  if (!isNaN(nota) && (nota >= 0) && (nota <= 10)) {
      if (!aluno) {
        alert('Por favor, insira o nome do aluno antes de adicionar notas.');
        return;
      }
      try {
        aluno.adicionarNota(nota); // Adiciona a nota usando o método da classe
        notaInput.value = '';
        exibirConteudo(); // Exibe as notas atualizadas
      } catch (erro) {
      alert(`Erro ao adicionar nota: ${erro.message}`);
      }
    } 
    else {
      alert('Digite uma nota válida entre 0 e 10.');
    }
}

function obterNome() {
  let nomeInput = document.getElementById('nome');

  if (nomeInput instanceof HTMLInputElement) {
    return nomeInput.value;
  } else {
    console.error('Elemento de nome inválido ou inexistente.');
    return '';
  }
}

function inicializarAluno() {
  let nome = obterNome();

  if (!nome) {
    alert('Por favor, insira o nome do aluno.');
    return false;
  }
  if (!aluno) {
    aluno = new Aluno(nome);
  } else {
    aluno = new Aluno(nome, aluno.notas); // Mantém as notas existentes ao atualizar o nome
  }
  return true;
}

function calcularMedia() {
  try {
    // forma explicita
    // if (aluno === null || aluno === undefined || (aluno.notas.length === 0))
    //prettier-ignore
    if ((!aluno) || (!aluno.notas.length)) { //simplificação
      alert('Adicione ao menos uma nota antes de calcular a média.');
      return 0;
    }
    return aluno.calcularMedia();
  } catch (erro) {
    alert(`Erro ao calcular média: ${erro.message}`);
    return 0;
  }
}

function exibirConteudo() {
  let notasAdicionadas = document.getElementById('notasAdicionadas');

  if (notasAdicionadas instanceof HTMLParagraphElement) {
    //prettier-ignore
    notasAdicionadas.textContent = `Notas adicionadas: ${aluno.notas.join(', ')}`;
  } else {
    console.error('Elemento para exibir notas não encontrado.');
  }
}

function exibirMedia() {
  try {
    let resultado = document.getElementById('resultado');

    if (resultado instanceof HTMLParagraphElement) {
      let media = calcularMedia();
      resultado.textContent = `Aluno: ${aluno.nome}, Média: ${media}`;
    }
  } catch (erro) {
    alert(`Erro ao exibir média: ${erro.message}`);
  }
}

function limparConteudo() {
  let nomeInput = document.getElementById('nome');
  let notaInput = document.getElementById('nota');
  let notasAdicionadas = document.getElementById('notasAdicionadas');
  let resultado = document.getElementById('resultado');

  //prettier-ignore
  if ((nomeInput instanceof HTMLInputElement) && (notaInput instanceof HTMLInputElement) &&
  (notasAdicionadas instanceof HTMLParagraphElement) && (resultado instanceof HTMLParagraphElement)) 
  {
    nomeInput.value = '';
    notaInput.value = '';
    notasAdicionadas.textContent = '';
    resultado.textContent = '';
    aluno = null; // Reinicia o aluno
  } 
  else {
    console.error('Um ou mais elementos não foram encontrados.');
  }
}

function configurar() {
  try {
    let notaInput = document.getElementById('nota');
    let adicionarNotaBtn = document.getElementById('adicionarNotaBtn');
    let calcularMediaBtn = document.getElementById('calcularMediaBtn');
    let limparConteudoBtn = document.getElementById('limparConteudoBtn');

    //prettier-ignore
    if ((notaInput instanceof HTMLInputElement) && (adicionarNotaBtn instanceof HTMLButtonElement) &&
      (calcularMediaBtn instanceof HTMLButtonElement) && (limparConteudoBtn instanceof HTMLButtonElement)) 
    {
      adicionarNotaBtn.addEventListener('click', () => {
        if (inicializarAluno()) {
          acrescentar(notaInput);
        }
      });

      calcularMediaBtn.addEventListener('click', () => {
        exibirMedia();
      });

      limparConteudoBtn.addEventListener('click', () => {
        limparConteudo();
      });
    } 
    else {
      throw new Error('Um ou mais elementos da interface não foram encontrados.');
    }
  } catch (erro) {
    alert(`Erro na configuração dos eventos: ${erro.message}`);
  }
}

document.addEventListener('DOMContentLoaded', configurar);
