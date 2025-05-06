import Contato from './Contato.js';

class GerenciadorDeAgenda {
  contatos = [];

  // mapeia identificadores de elementos HTML para suas respectivas
  // referências no DOM, facilita o acesso desses elementos no código.
  elementosHTML = {
    nomeInput: document.getElementById('nome'),
    telefoneInput: document.getElementById('telefone'),
    emailInput: document.getElementById('email'),
    mensagemDiv: document.getElementById('mensagem'),
    listaContatos: document.getElementById('listaContatos'),
    inputBuscar: document.getElementById('busca'),
    botaoSalvar: document.getElementById('btnSalvar'),
    botaoBuscar: document.getElementById('btnBuscar'),
    botaoOrdenar: document.getElementById('btnOrdenar'),
  };

  constructor() {
    this.contatoEditando = null;
    this.validarElementos(this.elementosHTML);
    this.configurar();
  }

  // verifica se os elementos estão corretamente referenciados no DOM,
  // lança um erro caso algum deles não seja encontrado.
  // O método Object.entries(elementos) retorna um array de pares [chave, valor]
  // para cada propriedade enumerável de um objeto elementos.
  validarElementos(elementos) {
    for (let [chave, elemento] of Object.entries(elementos)) {
      if (!elemento) {
        throw new Error(`Elemento ${chave} não encontrado no DOM.`);
      }
    }
  }

  configurar() {
    let { botaoSalvar, botaoBuscar, botaoOrdenar } = this.elementosHTML;

    //prettier-ignore
    if ((botaoSalvar instanceof HTMLButtonElement) && (botaoBuscar instanceof HTMLButtonElement)
    && (botaoOrdenar instanceof HTMLButtonElement)) {
      botaoSalvar.addEventListener('click', this.salvar.bind(this));
      botaoBuscar.addEventListener('click', this.filtrarContatos.bind(this));
      botaoOrdenar.addEventListener('click', this.ordenarContatos.bind(this));
    }
  }

  salvar() {
    let { nomeInput, telefoneInput, emailInput } = this.elementosHTML;

    //prettier-ignore
    if ((nomeInput instanceof HTMLInputElement) && (telefoneInput instanceof HTMLInputElement) 
    && (emailInput instanceof HTMLInputElement)) {
      let nome = nomeInput.value.trim();
      let telefone = telefoneInput.value.trim();
      let email = emailInput.value.trim();
  
      try {
        // Verifica se o contato está sendo editado
        let contatoDuplicado = false;
        if (this.contatoEditando === null) {
          // Se não estiver editando, valida duplicidade de telefone ou email
          contatoDuplicado = this.contatos.some(
            (contato) => contato.telefone === telefone || contato.email === email
          );
        }
  
        if (contatoDuplicado) {
          throw new Error('Já existe um contato com o mesmo telefone ou e-mail.');
        }
  
        let novoContato = new Contato(nome, telefone, email);
        if (this.contatoEditando !== null) {
          // Substitui o contato editado
          this.contatos[this.contatoEditando] = novoContato;
          this.contatoEditando = null;  // Reseta a edição
        } else {
          // Adiciona um novo contato
          this.contatos.push(novoContato);
        }
        
        console.log(this.contatos);
  
        this.limparCampos();
        this.atualizarExibicao();
      } catch (erro) {
        this.exibirMensagem(erro.message, 'red');
      }
    }
  }

  buscarContatosPorNome(nomeBusca) {
    // filtra os contatos retornando apenas aqueles cujo nome, 
    // convertido para minúsculas, contém o termo de busca 
    // também convertido para minúsculas, garantindo uma busca case-insensitive.
    return this.contatos.filter((contato) =>
      contato.nome.toLowerCase().includes(nomeBusca.toLowerCase())
    );
  }

  filtrarContatos() {
    let { inputBuscar } = this.elementosHTML;

    if (inputBuscar instanceof HTMLInputElement) {
      let termoBusca = inputBuscar.value.trim();
      let contatosFiltrados = this.buscarContatosPorNome(termoBusca);

      if (contatosFiltrados.length > 0) {
        this.atualizarExibicao(contatosFiltrados);
      } else {
        this.atualizarExibicao([]); // Limpa a lista
        this.exibirMensagem('Nome não encontrado.', 'red');
      }

      inputBuscar.value = '';
    }
  }

  // uso de parâmetro com valor padrão se o argumento correspondente 
  // não for fornecido ao chamar o métod, o valor padrão será utilizado.
  atualizarExibicao(listaParaExibir = this.contatos) {
    let { listaContatos } = this.elementosHTML;

    if (listaContatos instanceof HTMLUListElement) {
      while (listaContatos.firstChild) {
        listaContatos.removeChild(listaContatos.firstChild);
      }

      if (listaParaExibir.length === 0) {
        let item = document.createElement('li');
        item.textContent = 'Nenhum contato encontrado.';
        item.style.color = 'gray';
        listaContatos.appendChild(item);
      } else {
        listaParaExibir.forEach((contato) => {
          let indiceOriginal = this.contatos.indexOf(contato);
          let item = document.createElement('li');
          let nome = document.createElement('strong');
          nome.textContent = contato.nome;

          let br1 = document.createElement('br');
          let telefone = document.createElement('span');
          telefone.textContent = contato.telefone;

          let br2 = document.createElement('br');
          let email = document.createElement('span');
          email.textContent = contato.email;

          let br3 = document.createElement('br');
          let botaoEditar = document.createElement('button');
          botaoEditar.textContent = 'Editar';
          botaoEditar.onclick = () => this.editar(indiceOriginal);

          let botaoExcluir = document.createElement('button');
          botaoExcluir.textContent = 'Excluir';
          botaoExcluir.onclick = () => this.excluir(indiceOriginal);

          item.appendChild(nome);
          item.appendChild(br1);
          item.appendChild(telefone);
          item.appendChild(br2);
          item.appendChild(email);
          item.appendChild(br3);
          item.appendChild(botaoEditar);
          item.appendChild(botaoExcluir);
          listaContatos.appendChild(item);
        });
      }
    }
  }

  limparCampos() {
    let { nomeInput, telefoneInput, emailInput } = this.elementosHTML;

    //prettier-ignore
    if ((nomeInput instanceof HTMLInputElement) && (telefoneInput instanceof HTMLInputElement) 
    && (emailInput instanceof HTMLInputElement)) {
      nomeInput.value = '';
      telefoneInput.value = '';
      emailInput.value = '';
      this.exibirMensagem('', '');
    }
  }

  editar(indice) {
    let contato = this.contatos[indice];
    let { nomeInput, telefoneInput, emailInput } = this.elementosHTML;

    //prettier-ignore
    if ((nomeInput instanceof HTMLInputElement) && (telefoneInput instanceof HTMLInputElement) 
    && (emailInput instanceof HTMLInputElement)) {
      nomeInput.value = contato.nome;
      telefoneInput.value = contato.telefone;
      emailInput.value = contato.email;

      this.exibirMensagem('Editando contato...', 'green');
      this.contatoEditando = indice;
    }
  }

  exibirMensagem(mensagem, cor) {
    let { mensagemDiv } = this.elementosHTML;

    if (mensagemDiv instanceof HTMLDivElement) {
      mensagemDiv.textContent = mensagem;
      mensagemDiv.style.color = cor;
    }
  }

  excluir(indice) {
    if (confirm('Deseja excluir este contato?')) {
      this.contatos.splice(indice, 1);
      this.atualizarExibicao();
    }
  }

  ordenarContatos() {
    // ordena os contatos na lista this.contatos em ordem alfabética com base no nome, 
    // usando o método localeCompare para comparar strings.
    this.contatos.sort((contato1, contato2) =>
      contato1.nome.localeCompare(contato2.nome)
    );

    this.atualizarExibicao();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GerenciadorDeAgenda();
});
