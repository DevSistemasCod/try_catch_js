export default class Contato {
  #nome;
  #telefone;
  #email;

  constructor(nome, telefone, email) {
    this.validarNome(nome);
    this.validarTelefone(telefone);
    this.validarEmail(email);

    this.#nome = nome;
    this.#telefone = telefone;
    this.#email = email;
  }

  get nome() {
    return this.#nome;
  }

  get telefone() {
    return this.#telefone;
  }

  get email() {
    return this.#email;
  }

  validarNome(nome) {
    //prettier-ignore
    if ((typeof nome !== "string") || (nome.trim() === "")) {
        throw new Error("O nome deve ser uma string não vazia.");
      }
  }

  validarTelefone(telefone) {
    if (typeof telefone !== 'string') {
      throw new Error('O telefone deve ser uma string.');
    }

    let apenasNumeros = '';
    for (let i = 0; i < telefone.length; i++) {
      let caractere = telefone[i];
      if (caractere !== ' ') {
        apenasNumeros = apenasNumeros + caractere;
      }
    }

    //prettier-ignore
    if ((apenasNumeros.length < 10) || (apenasNumeros.length > 11)) {
      throw new Error('O telefone deve conter entre 10 e 11 dígitos numéricos.');
    }
  }

  validarEmail(email) {
    //prettier-ignore
    if ((typeof email !== 'string') || (!email.includes('@')) ||
      (!email.endsWith('.com') && !email.endsWith('.org') && !email.endsWith('.com.br'))) 
    {
      //prettier-ignore
      throw new Error("O e-mail deve conter '@' e terminar com '.com' ou '.com.br' ou '.org'.");
    }
  }
}
