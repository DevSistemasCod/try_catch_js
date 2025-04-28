function configurar() {
  let verificarBtn = document.getElementById('verificarBtn');
  let idadeInput = document.getElementById('idade');

  //prettier-ignore
  if((verificarBtn instanceof HTMLButtonElement) && (idadeInput instanceof HTMLInputElement)){
        verificarBtn.addEventListener('click', () => {
            let idade = idadeInput.value;
            validar(idade);
            idadeInput.value = '';
        });
    }
}

function validar(idadeStr) {
  try {
    let idade = parseInt(idadeStr);

    if (isNaN(idade)) {
      throw new Error('A idade deve ser um número.');
    }
    if (idade < 0) {
      throw new Error('A idade não pode ser negativa.');
    }
    if (idade < 18) {
      throw new Error('Acesso negado. Você deve ter 18 anos ou mais.');
    }
    exibirConteudo('Acesso permitido. Seja bem-vindo(a)!');
  } catch (erro) {
    exibirErro(erro.message);
  }
}

function exibirErro(erroMsg) {
  let mensagem = document.getElementById('mensagem');

  if (mensagem instanceof HTMLParagraphElement) {
    mensagem.textContent = erroMsg;
    mensagem.style.color = 'red';
  }
}

function exibirConteudo(texto) {
  let mensagem = document.getElementById('mensagem');

  if (mensagem instanceof HTMLParagraphElement) {
    mensagem.textContent = texto;
    mensagem.style.color = 'green';
  }
}

document.addEventListener('DOMContentLoaded', configurar);
