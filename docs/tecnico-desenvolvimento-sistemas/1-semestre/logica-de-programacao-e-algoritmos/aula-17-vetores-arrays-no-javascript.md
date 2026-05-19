---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-17-vetores-arrays-no-javascript
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-17-vetores-arrays-no-javascript
sidebar_position: 17
title: Aula 17 — Vetores (Arrays) no JavaScript
description: Aula 17 do curso de Lógica de Programação e Algoritmos
---

# Aula 17 — Vetores (Arrays) no JavaScript

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Entender como o JavaScript lida com vetores (agora chamados de Arrays) e aprender a guardar várias informações dentro da mesma variável usando colchetes.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que são Arrays em JavaScript.
- Índices começando em `0`.
- Métodos básicos: adicionar (`.push()`), remover (`.pop()`) e checar o tamanho (`.length`).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O Poder dos Arrays
No VisuAlg precisávamos dizer o tamanho exato do vetor e ele era fixo (`vetor [1..10]`). No JavaScript, os Arrays são dinâmicos! Eles crescem e encolhem conforme a nossa necessidade, e podemos misturar tipos de dados (embora não seja recomendável misturar coisas que não têm relação).

**A Regra de Ouro do JS:** O primeiro item de um Array sempre mora na gaveta `0`, e não na `1`!

### Propriedades e Métodos
Os arrays vêm com ferramentas (métodos) prontas de fábrica:
- **`array.length`**: Retorna o tamanho total do array (quantos itens tem dentro).
- **`array.push("item")`**: Adiciona um novo item no FINAL da fila.
- **`array.pop()`**: Tira e descarta o ÚLTIMO item da fila.

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Manipulando um carrinho de compras:

```javascript
// Criando um array vazio (representado pelos colchetes)
let carrinho = [];

// Adicionando itens
carrinho.push("Maçã");
carrinho.push("Banana");
carrinho.push("Uva");

console.log("Quantidade de itens: " + carrinho.length); // Vai mostrar 3

// Acessando o primeiro item (Índice ZERO)
console.log("O primeiro item é: " + carrinho[0]);

// Removendo a Uva (que era o último da fila)
carrinho.pop();
console.log("Carrinho atual: ", carrinho);
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie um arquivo JS chamado `playlist.js`.
2. Crie um array chamado `musicas` já contendo 3 nomes de músicas que você gosta.
3. Imprima a segunda música da lista (lembre-se de qual é o índice dela!).
4. Use o `.push()` para adicionar mais duas músicas novas à playlist.
5. Imprima no console o tamanho total da sua playlist usando `.length`.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O array foi criado corretamente usando colchetes `[ ]`.
- [ ] O índice correto (`[1]`) foi usado para acessar o segundo elemento.
- [ ] O método `.push()` foi utilizado de forma correta, passando a string nos parênteses.
- [ ] A propriedade `.length` está exibindo o total finalizado.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: pegue o seu código do GitHub de aulas anteriores e brinque um pouco com os comandos de arrays que você viu aqui. Tente criar uma lista de convidados para uma festa. Algumas pessoas chegaram na porta (use `push`), mas o salão lotou e o último teve que sair (use `pop`). 

Seu desafio é sempre imprimir como a lista está após cada alteração. Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
