function validarEmprestimo() {
  try {
    let nomeInput = document.getElementById('nome');
    let idadeInput = document.getElementById('idade');
    let valorInput = document.getElementById('valor');

    //prettier-ignore
    if((nomeInput instanceof HTMLInputElement) && (idadeInput instanceof HTMLInputElement)
       && (valorInput instanceof HTMLInputElement)) {
        let nome = nomeInput.value.trim();
        let idade = parseInt(idadeInput.value);
        let valor = parseFloat(valorInput.value);

        if (!nome) {
            throw new Error('O nome não pode estar vazio.');
        }
        //prettier-ignore
        if (isNaN(idade) || (idade < 18) || (idade > 70)) {
            throw new Error('A idade deve estar entre 18 e 65 anos.');
        }
        //prettier-ignore
        if (isNaN(valor) || (valor < 100) || (valor > 30000)) {
            throw new Error( 'O valor solicitado deve ser maior que R$100 e até R$30.000.');
        }
        let texto = '. O Pedido foi enviado para análise.';
        let dadosUsuario = `${nome}, idade ${idade}, valor R$ ${valor} ${texto}`;
        exibirMensagem(dadosUsuario, 'green');
        nomeInput.value = '';
        idadeInput.value = '';
        valorInput.value = '';
    }
  } catch (erro) {
    exibirMensagem(erro.message, 'red');
  }
}

function exibirMensagem(conteudo, cor) {
  let dados = document.getElementById('mensagem');

  if (dados instanceof HTMLParagraphElement) {
    dados.textContent = conteudo;
    dados.style.color = cor;
  }
}

function configurar() {
  let enviarBtn = document.getElementById('enviarBtn');

  if (enviarBtn instanceof HTMLButtonElement) {
    enviarBtn.addEventListener('click', validarEmprestimo);
  }
}

document.addEventListener('DOMContentLoaded', configurar);


