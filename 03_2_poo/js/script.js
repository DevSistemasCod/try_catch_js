import Produto from './Produto.js';

let produtos = [];

function configurar() {
  try {
    let adicionarBtn = document.getElementById('adicionarBtn');
    let removerBtn = document.getElementById('removerBtn');

    if (adicionarBtn && removerBtn) {
      adicionarBtn.addEventListener('click', adicionarProduto);
      removerBtn.addEventListener('click', removerProduto);
    }
  } catch (erro) {
    console.error('Erro ao configurar botões:', erro);
    alert('Erro ao configurar os botões da interface.');
  }
}

function adicionarProduto() {
  let nomeInput = document.getElementById('nome');
  let quantidadeInput = document.getElementById('quantidade');
  let precoInput = document.getElementById('preco');
  //prettier-ignore
  if((nomeInput instanceof HTMLInputElement) && (quantidadeInput instanceof HTMLInputElement)
  && (precoInput instanceof HTMLInputElement)){
    let nome = nomeInput.value.trim();
    let quantidade = parseInt(quantidadeInput.value);
    let preco =  parseFloat(precoInput.value);

    //if (!nome || isNaN(quantidade) || isNaN(preco)) {
    if ((nome.trim() === '') || (typeof quantidade !== 'number') || (isNaN(quantidade))
     || (typeof preco !== 'number') || (isNaN(preco))) 
    { 
      alert('Preencha todos os campos corretamente.');
      return;
    }
      
    //O método .find() é usado para buscar o primeiro item 
    // no array que satisfaz a condição fornecida.
    let produtoExistente = produtos.find((p) => p.nome === nome);

    if (produtoExistente) {
      //produtoExistente.quantidade += quantidade;
      produtoExistente.quantidade = produtoExistente.quantidade + quantidade;
    } 
    else {
      try {
        produtos.push(new Produto(nome, quantidade, preco));
      } catch (erro) {
        console.error('Erro ao criar novo produto:', erro);
        alert('Erro ao adicionar o produto.');
        return;
      }
    }
    atualizarLista();
    limparCampos();
  }
}

function removerProduto() {
  try {
    let nomeInput = document.getElementById('nome');

    if (nomeInput instanceof HTMLInputElement) {
      let nome = nomeInput.value.trim();
      //if (!nome) {
      if (nome === '') {
        alert('Informe o nome do produto para remover.');
        return;
      }

      let indice = produtos.findIndex((p) => p.nome === nome);
      if (indice >= 0) {
        produtos.splice(indice, 1);
        atualizarLista();
      } else {
        alert('Produto não encontrado.');
      }

      limparCampos();
    }
  } catch (erro) {
    console.error('Erro ao remover produto:', erro);
    alert('Erro ao tentar remover o produto.');
  }
}

function atualizarLista() {
  try {
    let estoqueLista = document.getElementById('estoqueLista');

    if (estoqueLista instanceof HTMLUListElement) {
      //estoqueLista.innerHTML = '';
      while (estoqueLista.firstChild) {
        estoqueLista.removeChild(estoqueLista.firstChild);
      }

      produtos.forEach((produto) => {
        let li = document.createElement('li');
        li.textContent = produto.toString();
        estoqueLista.appendChild(li);
      });
    }
  } catch (erro) {
    console.error('Erro ao atualizar a lista de produtos:', erro);
    alert('Erro ao atualizar a lista de estoque.');
  }
}

function limparCampos() {
  let nomeInput = document.getElementById('nome');
  let quantidadeInput = document.getElementById('quantidade');
  let precoInput = document.getElementById('preco');

  //prettier-ignore
  if((nomeInput instanceof HTMLInputElement) && (quantidadeInput instanceof HTMLInputElement)
     && (precoInput instanceof HTMLInputElement)){
        nomeInput.value = '';
        quantidadeInput.value = '';
        precoInput.value = '';
    }
    else {
    console.error('Erro ao limpar campos:');
    }
}

document.addEventListener('DOMContentLoaded', configurar);
