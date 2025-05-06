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
    exibir('Acesso permitido. Seja bem-vindo(a)!','green');
  } catch (erro) {
    exibir(erro.message, 'red');
  }
}

function exibir(texto, cor) {
  let saida = document.getElementById('mensagem');
  if (saida instanceof HTMLParagraphElement) {
    saida.textContent = texto;
    saida.style.color = cor;
  }
}


document.addEventListener('DOMContentLoaded', configurar);
