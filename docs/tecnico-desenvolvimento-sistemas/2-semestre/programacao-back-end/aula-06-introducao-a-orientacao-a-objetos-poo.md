---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-06-introducao-a-orientacao-a-objetos-poo
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-06-introducao-a-orientacao-a-objetos-poo
sidebar_position: 6
title: Aula 06 — Introdução à Orientação a Objetos (POO)
description: Aprenda os pilares da Programação Orientada a Objetos (POO) no JavaScript moderno usando classes, construtores, atributos e métodos.
---

# Aula 06 — Introdução à Orientação a Objetos (POO)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o paradigma de Programação Orientada a Objetos (POO), entender a diferença entre Classes e Objetos, dominar o uso do método `constructor` e do operador `this`, e criar modelos de entidades do mundo real em arquivos modulares com **ES Modules**.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O paradigma da Programação Orientada a Objetos (POO) no Back-End.
- Conceito de Classe (Molde) vs Objeto (Instância).
- Atributos (Estado) e Métodos (Comportamento).
- O método especial `constructor()` e a palavra-chave `this`.
- Instanciação de objetos com o operador `new`.
- Exportação de Classes com ES Modules (`export default class`).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. Por que usar POO no Back-End?
No desenvolvimento de software, a **POO** nos ajuda a representar elementos do mundo real (como Usuários, Produtos, Contas Bancárias ou Pedidos) na forma de dados e comportamentos agrupados de maneira lógica e intuitiva.

Em vez de manipular variáveis soltas e dispersas, agrupamos tudo em **entidades organizadas**.

---

### 2. Classe vs Objeto (A Planta Baixa vs A Casa)

| Conceito | Definição | Exemplo do Mundo Real | Exemplo no Código |
| :--- | :--- | :--- | :--- |
| **Classe (Class)** | O modelo, fôrma ou planta baixa que define quais atributos e métodos a entidade terá. | A planta arquitetônica de uma casa. | `class ContaBancaria { ... }` |
| **Objeto (Instância)** | A criação concreta baseada na classe, construída na memória usando o operador `new`. | A casa real construída na rua X. | `const minhaConta = new ContaBancaria();` |

---

### 3. Anatomia de uma Classe em JavaScript

Uma classe em JavaScript ES6+ possui três partes essenciais:

```javascript
class Usuario {
  // 1. Construtor: Executado automaticamente no momento em que usamos `new`
  constructor(nome, email) {
    this.nome = nome;   // Atributo
    this.email = email; // Atributo
    this.ativo = true;  // Atributo com valor padrão
  }

  // 2. Métodos: Comportamentos que o objeto pode executar
  desativarConta() {
    this.ativo = false;
    console.log(`A conta do usuário ${this.nome} foi desativada.`);
  }

  exibirPerfil() {
    return `Nome: ${this.nome} | E-mail: ${this.email} | Status: ${this.ativo ? 'Ativo' : 'Inativo'}`;
  }
}
```

> 💡 **O Operador `this`:** A palavra-chave `this` faz referência à instância exata do objeto que está executando aquele código naquele instante.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Sistema de Gestão de Contas Bancárias

Vamos estruturar um modelo de **ContaBancaria** utilizando ES Modules.

#### Pasta do Projeto:
```
sistema-bancario/
├── models/
│   └── ContaBancaria.js
├── app.js
└── package.json
```

#### Arquivo 1: `models/ContaBancaria.js`
```javascript
// models/ContaBancaria.js

export default class ContaBancaria {
  constructor(titular, numeroConta, saldoInicial = 0) {
    this.titular = titular;
    this.numeroConta = numeroConta;
    this.saldo = saldoInicial;
  }

  depositar(valor) {
    if (valor <= 0) {
      console.log(`❌ [${this.titular}] O valor de depósito deve ser maior que zero.`);
      return false;
    }
    this.saldo += valor;
    console.log(`💵 [${this.titular}] Depósito de R$ ${valor.toFixed(2)} realizado com sucesso!`);
    return true;
  }

  sacar(valor) {
    if (valor <= 0) {
      console.log(`❌ [${this.titular}] Valor de saque inválido.`);
      return false;
    }

    if (valor > this.saldo) {
      console.log(`⚠️ [${this.titular}] Saque de R$ ${valor.toFixed(2)} recusado: Saldo insuficiente (Saldo atual: R$ ${this.saldo.toFixed(2)}).`);
      return false;
    }

    this.saldo -= valor;
    console.log(`💸 [${this.titular}] Saque de R$ ${valor.toFixed(2)} realizado com sucesso!`);
    return true;
  }

  exibirExtrato() {
    console.log("------------------------------------------");
    console.log(`🏦 Extrato - Conta: ${this.numeroConta}`);
    console.log(`Titular : ${this.titular}`);
    console.log(`Saldo   : R$ ${this.saldo.toFixed(2)}`);
    console.log("------------------------------------------");
  }
}
```

#### Arquivo 2: `app.js`
```javascript
// app.js
import ContaBancaria from './models/ContaBancaria.js';

console.log("==========================================");
console.log("🏦 SISTEMA BANCÁRIO DIGITAL - BACK-END");
console.log("==========================================");

// Instanciando dois objetos independentes da mesma classe
const contaAna = new ContaBancaria('Ana Maria', '1001-X', 500);
const contaBruno = new ContaBancaria('Bruno Souza', '2002-Y', 100);

// Operações na conta da Ana
contaAna.depositar(250);
contaAna.sacar(100);
contaAna.exibirExtrato();

// Operações na conta do Bruno
contaBruno.sacar(150); // Deve falhar por saldo insuficiente
contaBruno.depositar(300);
contaBruno.exibirExtrato();
```

#### Arquivo 3: `package.json`
```json
{
  "name": "poo-introducao",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node app.js"
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Modelagem da Entidade `Produto`

**Objetivo:** Criar uma classe `Produto` orientada a objetos com atributos, construtor e métodos de manipulação de preço e estoque.

**Instruções:**
1. Crie uma pasta chamada `atividade-aula-06` com `"type": "module"` no `package.json`.
2. Crie a pasta `models/` e dentro dela crie `Produto.js` exportando como `default`:
   - Atributos no `constructor`: `id`, `nome`, `preco`, `quantidadeEstoque`.
   - Método `aplicarDesconto(porcentagem)`: Reduz o preço atual do produto na porcentagem informada.
   - Método `adicionarEstoque(qtd)`: Incrementa o estoque caso a quantidade seja maior que zero.
   - Método `vender(qtd)`: Reduz a quantidade em estoque caso haja unidades suficientes. Se não houver, exibe mensagem de erro.
   - Método `exibirFichaTecnica()`: Exibe os dados formatados do produto no console.
3. No arquivo `index.js`, importe a classe `Produto`, instancie 2 produtos diferentes (ex: `Notebook` e `Mouse`), execute operações de venda, desconto e reestocagem, e exiba a ficha técnica.
4. Execute com `npm start`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno compreendeu a diferença entre uma Classe (molde) e um Objeto (instância).
- [ ] O aluno utilizou o método `constructor()` para declarar e inicializar atributos.
- [ ] O aluno utilizou a palavra-chave `this` para acessar dados da própria instância.
- [ ] O aluno exportou a classe utilizando `export default class`.
- [ ] O aluno instanciou objetos com o operador `new` e executou seus métodos com sucesso.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

A Orientação a Objetos é um dos pilares de maior sucesso da engenharia de software mundial. Na próxima aula, avançaremos nos conceitos avançados da POO, como **Encapsulamento** (atributos privados `#`) e **Herança (`extends`)**!

**Desafio Extra:** Adicione à classe `Produto` um método chamado `calcularValorTotalEmEstoque()` que retorna o produto entre `preco` e `quantidadeEstoque`.
