---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-03-revisao-de-javascript-es6
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-03-revisao-de-javascript-es6
sidebar_position: 3
title: Aula 03 — Revisão de JavaScript ES6+
description: Domine os recursos modernos do JavaScript ES6+ essenciais para o desenvolvimento Back-End profissional.
---

# Aula 03 — Revisão de JavaScript ES6+

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Revisar e dominar os recursos fundamentais introduzidos a partir do ECMAScript 2015 (ES6+), como declarações modernas (`const`/`let`), Arrow Functions, Template Literals, Desestruturação (Destructuring), Operadores Spread/Rest e importação/exportação de ES Modules.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Declaração de variáveis modernas: `let` e `const` vs `var` (Escopo de bloco).
- Arrow Functions e sintaxe enxuta.
- Template Literals e interpolação de strings.
- Desestruturação de Objetos e Arrays (Destructuring).
- Operador Spread (`...`) e Parâmetros Rest (`...`).
- Módulos nativos e modularização com ES Modules (`import/export`).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. Declaração de Variáveis: `const` e `let`
A partir do ES6, o uso de `var` foi substituído por `let` e `const` devido a problemas de escopo e *hoisting*.

- **`const`:** Declara constantes imutáveis por reatribuição. Deve ser o padrão no Back-End.
- **`let`:** Declara variáveis de escopo de bloco que aceitam reatribuição de valor.

```javascript
// Exemplo de escopo
const porta = 3000; // Não pode ser reatribuído: porta = 4000 gera TypeError

let contador = 0;
contador += 1; // Permitido
```

---

### 2. Arrow Functions
As **Arrow Functions** (`() => {}`) oferecem uma sintaxe mais concisa para funções anônimas e mantêm o escopo léxico do operador `this`.

```javascript
// Função tradicional
function somar(a, b) {
  return a + b;
}

// Arrow Function equivalente
const somarArrow = (a, b) => a + b;

// Arrow Function com corpo de bloco
const formatarMoeda = (valor) => {
  const formatado = valor.toFixed(2);
  return `R$ ${formatado}`;
};
```

---

### 3. Desestruturação (Destructuring Assignment)
A desestruturação permite extrair valores de objetos ou elementos de arrays de forma direta e limpa.

#### Desestruturação de Objetos:
```javascript
const usuario = {
  id: 1,
  nome: 'Ana Silva',
  email: 'ana@senai.br',
  nivel: 'Admin'
};

// Extraindo campos diretamente em variáveis
const { nome, email, nivel } = usuario;

console.log(nome);  // Ana Silva
console.log(email); // ana@senai.br
```

#### Desestruturação em Parâmetros de Função:
```javascript
// Passando o objeto e desestruturando nos parâmetros
const exibirInfoUsuario = ({ nome, nivel }) => {
  console.log(`Usuário: ${nome} | Permissão: ${nivel}`);
};

exibirInfoUsuario(usuario);
```

---

### 4. Operador Spread e Rest (`...`)
O operador de três pontos (`...`) tem dois papéis principais:

#### Spread (Espalhar):
Copia elementos de um objeto ou array para outro sem alterar o original.
```javascript
const produtoOriginal = { id: 10, nome: 'Teclado', preco: 150 };

// Criando uma cópia e atualizando o preço
const produtoAtualizado = { 
  ...produtoOriginal, 
  preco: 180, 
  emEstoque: true 
};
```

#### Rest (Agrupar os demais):
Captura o restante dos argumentos em uma função ou os campos restantes de um objeto.
```javascript
const { id, ...dadosDoUsuario } = usuario;
// id = 1
// dadosDoUsuario = { nome: 'Ana Silva', email: 'ana@senai.br', nivel: 'Admin' }
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Construindo um Módulo de Processamento de Pedidos com ES Modules

Vamos criar uma estrutura modularizada simulando o Back-End de um e-commerce.

#### Arquivo 1: `calculadora.js`
```javascript
// calculadora.js
export const calcularSubtotal = (itens) => {
  return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
};

export const aplicarDesconto = (total, porcentagem) => {
  return total - (total * (porcentagem / 100));
};
```

#### Arquivo 2: `app.js`
```javascript
// app.js
import { calcularSubtotal, aplicarDesconto } from './calculadora.js';

const pedido = {
  idPedido: 1001,
  cliente: { nome: 'Carlos Souza', email: 'carlos@email.com' },
  itens: [
    { produto: 'Notebook', preco: 3500, quantidade: 1 },
    { produto: 'Mouse sem Fio', preco: 120, quantidade: 2 }
  ],
  cupomDesconto: 10 // 10%
};

// Desestruturando informações do pedido
const { cliente: { nome }, itens, cupomDesconto } = pedido;

const subtotal = calcularSubtotal(itens);
const totalComDesconto = aplicarDesconto(subtotal, cupomDesconto);

console.log("==========================================");
console.log(`📦 Processando Pedido de: ${nome}`);
console.log("==========================================");
console.log(`Subtotal         : R$ ${subtotal.toFixed(2)}`);
console.log(`Desconto (${cupomDesconto}%)  : R$ ${(subtotal - totalComDesconto).toFixed(2)}`);
console.log(`Total Final      : R$ ${totalComDesconto.toFixed(2)}`);
```

#### Arquivo 3: `package.json`
```json
{
  "name": "revisao-es6",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node app.js"
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Gerenciador de Cadastros de Alunos

**Objetivo:** Aplicar Arrow Functions, Desestruturação, Spread Operator e ES Modules na prática.

**Instruções:**
1. Crie uma pasta `atividade-aula-03` com `"type": "module"` no `package.json`.
2. Crie um arquivo `helper.js` contendo duas funções exportadas:
   - `formatarAluno`: Uma Arrow Function que recebe um objeto `{ nome, curso, nota }` e retorna a string `"Aluno: [NOME] | Curso: [CURSO] | Status: [Aprovado/Reprovado]"` (Considerar aprovado com nota >= 7.0).
   - `adicionarNotaRecuperacao`: Uma Arrow Function que recebe o objeto do aluno e a nova nota, retornando um **novo objeto** atualizado utilizando o operador **Spread (`...`)**.
3. No arquivo `main.js`, importe as funções de `helper.js`:
   - Crie um objeto `alunoOriginal` com nota 5.5.
   - Use a função `adicionarNotaRecuperacao` para gerar o `alunoAtualizado` com nota 8.0.
   - Exiba a formatação dos dois alunos no console usando `formatarAluno`.
4. Execute o programa usando `npm start`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno compreendeu as diferenças entre `const` e `let` e evitou o uso de `var`.
- [ ] O aluno aplicou Arrow Functions com sintaxe concisa.
- [ ] O aluno utilizou a Desestruturação para extrair valores de objetos e parâmetros.
- [ ] O aluno utilizou o operador Spread (`...`) para criar cópias imutáveis de objetos.
- [ ] O aluno utilizou `import` e `export` para integrar os arquivos da atividade prática.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

O domínio das novidades do ES6+ é um divisor de águas na escrita de códigos modernos em Node.js. Recursos como **Desestruturação** e **Imutabilidade com Spread** são amplamente utilizados em controladores, rotas e serviços das melhores APIs RESTful do mercado!

**Desafio Extra:** Tente aplicar a desestruturação com valores padrão (default values): `const { cidade = 'Não informada' } = endereco;`.
