---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-13-introducao-ao-javascript-e-ambiente
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-13-introducao-ao-javascript-e-ambiente
sidebar_position: 13
title: Aula 13 — Introdução ao JavaScript e Ambiente
description: Aula 13 do curso de Lógica de Programação e Algoritmos
---

# Aula 13 — Introdução ao JavaScript e Ambiente

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Dar adeus ao VisuAlg e migrar todo o seu conhecimento lógico para uma das linguagens de programação mais utilizadas no mundo: o JavaScript.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é JavaScript e como o Node.js permite executá-lo fora do navegador.
- Preparação do ambiente (VS Code + Node.js).
- Sintaxe básica (declarando variáveis com `let` e `const`).
- Exibindo dados na tela (`console.log`).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que é o JavaScript?
O JavaScript (JS) é a linguagem da web. Tudo que é interativo em um site geralmente é feito em JS. Com o surgimento do **Node.js**, o JavaScript saiu apenas dos navegadores e passou a rodar em servidores e no próprio terminal do seu computador!

### Nossa nova casa: o VS Code
O VisuAlg serviu para aprendermos os fundamentos. Agora, usaremos um editor de texto profissional: o **Visual Studio Code**. Ele permite criar arquivos `.js` e executá-los utilizando o terminal integrado.

### Variáveis no JS (`let` e `const`)
A sintaxe agora é em inglês e muito mais direta! 
Não usamos mais `var X : inteiro`. O JS é esperto o suficiente para descobrir o tipo sozinho:
- **`let`**: Cria uma variável que pode mudar de valor no futuro.
- **`const`**: Cria uma constante, ou seja, um valor que não pode ser alterado depois de declarado.

A saída de tela, que antes era `escreval`, agora se chama **`console.log()`**.

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Traduzindo um código simples para JS:

```javascript
// O "//" serve para criar comentários no código!

// Criando variáveis
let nome = "Maria";
let idade = 20;
const cpf = "123.456.789-00"; // CPF não muda, então usamos const

idade = 21; // Posso mudar o valor de 'let' normalmente

console.log("Olá " + nome + "! Você tem " + idade + " anos.");
```
*Para executar isso no terminal, você digitaria: `node nome_do_arquivo.js`.*

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma pasta nova para as aulas de JS e abra-a no VS Code.
2. Crie um arquivo chamado `index.js`.
3. Escreva um código que declare uma variável `let` com o nome de um produto e uma `const` com o preço dele.
4. Exiba no terminal uma mensagem como: "O produto [Nome] custa [Preco]".
5. Altere o valor do nome do produto no meio do código e mostre-o novamente.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O Node.js está instalado e funcionando (teste rodando `node -v` no terminal).
- [ ] O arquivo foi salvo com a extensão correta `.js`.
- [ ] O código rodou no terminal usando o comando `node index.js`.
- [ ] Os conceitos de `let` e `const` foram aplicados corretamente.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: crie um novo arquivo JS chamado `perfil.js`. Tente guardar informações sobre sua série ou jogo favorito usando `let` (coisas que podem mudar, como a temporada atual) e `const` (coisas que não mudam, como o criador ou ano de lançamento). 

Imprima tudo bonitinho usando `console.log`. Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
