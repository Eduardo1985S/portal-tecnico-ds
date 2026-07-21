---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-04-manipulacao-de-arrays
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-04-manipulacao-de-arrays
sidebar_position: 4
title: Aula 04 — Manipulação de Arrays
description: Domine os métodos funcionais de manipulação de arrays (map, filter, find, reduce) essenciais para manipular coleções de dados no Back-End.
---

# Aula 04 — Manipulação de Arrays

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender e dominar os métodos funcionais de alta ordem (Higher-Order Functions) para arrays no JavaScript, utilizando `.map()`, `.filter()`, `.find()`, `.findIndex()` e `.reduce()` para transformar, filtrar, localizar e agregar conjuntos de dados comuns em APIs Back-End.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O conceito de Métodos Funcionais e Imutabilidade em coleções.
- Transformação de dados com `.map()`.
- Filtragem e consultas com `.filter()`.
- Busca de registros com `.find()` e `.findIndex()`.
- Acumulação e agregação de dados com `.reduce()`.
- Encadeamento de métodos (Method Chaining).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

No desenvolvimento Back-End, quase todas as respostas de banco de dados ou consultas em APIs chegam como **arrays de objetos**. Em vez de utilizar laços manuais tradicionais como `for` ou `while`, o JavaScript moderno oferece **métodos funcionais imutáveis** que tornam o código mais legível, seguro e declarativo.

---

### 1. Método `.map()` — Transformação de Dados
O `.map()` percorre cada item do array e retorna um **novo array** com exatamente o mesmo tamanho, contendo os elementos transformados segundo a função informada.

```javascript
const produtos = [
  { id: 1, nome: 'Teclado', preco: 100 },
  { id: 2, nome: 'Mouse', preco: 50 },
  { id: 3, nome: 'Monitor', preco: 800 }
];

// Extraindo apenas os nomes dos produtos
const nomes = produtos.map(p => p.nome);
// Resultado: ['Teclado', 'Mouse', 'Monitor']

// Aplicando aumento de 10% nos preços (retornando novos objetos)
const produtosComAumento = produtos.map(p => ({
  ...p,
  preco: p.preco * 1.10
}));
```

---

### 2. Método `.filter()` — Filtragem de Registros
O `.filter()` percorre o array e retorna um **novo array** contendo apenas os elementos que retornarem `true` na condição estipulada.

```javascript
// Filtrando produtos com preço maior que R$ 80
const produtosCaros = produtos.filter(p => p.preco > 80);
// Resultado: [{ id: 1, nome: 'Teclado', preco: 100 }, { id: 3, nome: 'Monitor', preco: 800 }]
```

---

### 3. Métodos `.find()` e `.findIndex()` — Busca de Elementos
- `.find()`: Retorna o **primeiro elemento** que satisfazer a condição (ou `undefined` se não encontrar).
- `.findIndex()`: Retorna a **posição (índice)** do primeiro elemento encontrado (ou `-1` se não encontrar).

```javascript
// Buscando um produto pelo ID (comum em controllers Back-End)
const produtoBuscado = produtos.find(p => p.id === 2);
// Resultado: { id: 2, nome: 'Mouse', preco: 50 }

const indiceRemover = produtos.findIndex(p => p.id === 99);
// Resultado: -1 (produto não existe)
```

---

### 4. Método `.reduce()` — Agregação e Acumulação
O `.reduce()` é utilizado para reduzir todo o array a **um único valor** (como uma soma total, média ou um objeto agrupado).

Sintaxe básica:
`array.reduce((acumulador, elementoAtual) => { ... }, valorInicial)`

```javascript
// Somando o preço de todos os produtos
const valorTotalEstoque = produtos.reduce((acumulador, p) => acumulador + p.preco, 0);
// Resultado: 950
```

---

### 5. Encadeamento de Métodos (Method Chaining)
Você pode encadear múltiplos métodos em sequência para realizar operações complexas de forma elegante:

```javascript
// Calcular o valor total dos produtos que custam mais de R$ 80
const totalCaros = produtos
  .filter(p => p.preco > 80)
  .reduce((total, p) => total + p.preco, 0);
// Resultado: 900 (100 + 800)
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Relatório de Vendas de uma API de Produtos

Vamos criar uma estrutura modularizada com **ES Modules** simulando o processamento de relatórios em um servidor.

#### Arquivo 1: `relatorio.js`
```javascript
// relatorio.js

export const listarProdutosEmEstoque = (produtos) => {
  return produtos.filter(produto => produto.estoque > 0);
};

export const buscarProdutoPorId = (produtos, id) => {
  return produtos.find(produto => produto.id === id);
};

export const gerarResumoFinanceiro = (produtos) => {
  const totalItens = produtos.reduce((acc, p) => acc + p.estoque, 0);
  const valorTotal = produtos.reduce((acc, p) => acc + (p.preco * p.estoque), 0);
  const mediaPreco = (produtos.reduce((acc, p) => acc + p.preco, 0) / produtos.length);

  return {
    totalItensEmEstoque: totalItens,
    valorTotalPatrimonio: valorTotal,
    precoMedioProduto: mediaPreco
  };
};
```

#### Arquivo 2: `app.js`
```javascript
// app.js
import { 
  listarProdutosEmEstoque, 
  buscarProdutoPorId, 
  gerarResumoFinanceiro 
} from './relatorio.js';

const inventario = [
  { id: 101, nome: 'Notebook Dell', categoria: 'Eletrônicos', preco: 4500, estoque: 5 },
  { id: 102, nome: 'Cadeira Ergonômica', categoria: 'Móveis', preco: 1200, estoque: 0 },
  { id: 103, nome: 'Teclado Mecânico', categoria: 'Periféricos', preco: 350, estoque: 12 },
  { id: 104, nome: 'Monitor 27"', categoria: 'Eletrônicos', preco: 1800, estoque: 3 }
];

console.log("==========================================");
console.log("📊 RELATÓRIO DE INVENTÁRIO BACK-END");
console.log("==========================================");

// 1. Produtos Disponíveis
const disponiveis = listarProdutosEmEstoque(inventario);
console.log(`\n✅ Produtos com Estoque (${disponiveis.length}):`);
console.log(disponiveis.map(p => `- ${p.nome} (R$ ${p.preco})`).join('\n'));

// 2. Busca Individual
const idBusca = 103;
const produtoEncontrado = buscarProdutoPorId(inventario, idBusca);
console.log(`\n🔍 Busca por ID (${idBusca}):`, produtoEncontrado ? produtoEncontrado.nome : 'Não encontrado');

// 3. Resumo Financeiro
const resumo = gerarResumoFinanceiro(inventario);
console.log("\n💰 Resumo Financeiro:");
console.log(`- Total de Unidades no Depósito : ${resumo.totalItensEmEstoque}`);
console.log(`- Patrimônio Total em Estoque  : R$ ${resumo.valorTotalPatrimonio.toFixed(2)}`);
console.log(`- Preço Médio dos Produtos      : R$ ${resumo.precoMedioProduto.toFixed(2)}`);
```

#### Arquivo 3: `package.json`
```json
{
  "name": "manipulacao-arrays",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node app.js"
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Sistema de Filtragem e Métricas de Tarefas (To-Do API)

**Objetivo:** Construir funções funcionais de manipulação de arrays para simular os filtros e métricas de um sistema de gerenciamento de tarefas.

**Instruções:**
1. Crie uma pasta chamada `atividade-aula-04` com `"type": "module"` no `package.json`.
2. Crie o arquivo `tarefas.js` exportando as seguintes funções:
   - `filtrarConcluidas(tarefas)`: Usa `.filter()` para retornar apenas as tarefas com `concluida === true`.
   - `filtrarPorPrioridade(tarefas, prioridade)`: Usa `.filter()` para retornar tarefas com prioridade `'alta'`, `'media'` ou `'baixa'`.
   - `obterTitulosFormatados(tarefas)`: Usa `.map()` para retornar uma lista de strings no formato `"[CONCLUÍDA] - Titulo"` ou `"[PENDENTE] - Titulo"`.
   - `calcularPercentualConcluidas(tarefas)`: Usa `.reduce()` ou cálculo de comprimento para retornar a porcentagem de tarefas finalizadas.
3. No arquivo `index.js`, crie um array com pelo menos 5 tarefas variando títulos, prioridades e status de conclusão.
4. Teste e exiba o resultado de todas as funções no console.
5. Execute com `npm start`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno compreendeu quando utilizar `.map()`, `.filter()`, `.find()` e `.reduce()`.
- [ ] O aluno evitou alterar o array original diretamente (respeitou a imutabilidade).
- [ ] O aluno utilizou Arrow Functions de forma limpa nos métodos iterativos.
- [ ] O aluno aplicou o encadeamento de métodos quando necessário.
- [ ] O aluno organizou o código com ES Modules (`import/export`) e testou com `npm start`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

O domínio de métodos funcionais de arrays é o segredo para escrever rotas de busca, paginação, relatórios e tratamentos de dados limpos em servidores Node.js.

**Desafio Extra:** Tente combinar `.filter()` e `.map()` em uma única linha para retornar apenas os nomes dos produtos da categoria `'Eletrônicos'` que possuem estoque superior a 0!
