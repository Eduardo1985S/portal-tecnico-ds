---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-16-estruturas-de-repeticao-no-js
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-16-estruturas-de-repeticao-no-js
sidebar_position: 16
title: Aula 16 — Estruturas de Repetição no JS
description: Aula 16 do curso de Lógica de Programação e Algoritmos
---

# Aula 16 — Estruturas de Repetição no JS

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a traduzir os laços de repetição do VisuAlg para o JavaScript, conhecendo o `while`, `do... while` e o famoso `for`, além de seus atalhos matemáticos.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Tradução do `enquanto` para `while` e do `repita` para `do... while`.
- Tradução do `para` para `for`.
- Operadores de incremento (`i++`) e decremento (`i--`).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O `while` e o `do... while`
A lógica é idêntica à que já aprendemos.
- O `while` (Enquanto) testa a condição antes de entrar no laço.
- O `do... while` (Faça... Enquanto) executa o bloco primeiro, e só testa a condição no final, garantindo que rode pelo menos uma vez. *Cuidado: no VisuAlg a gente testava até ser verdadeiro. No JS, o bloco repete **enquanto** a condição for verdadeira!*

### O `for` e os Operadores de Atalho
No VisuAlg, escrevíamos `contador <- contador + 1`. No JavaScript, usamos o atalho **`++`** para somar 1 e **`--`** para subtrair 1. 

A estrutura do `for` em JS é dividida em 3 partes dentro dos parênteses: 
`for (criação da variável; condição limite; incremento)`

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Traduzindo um contador simples usando o `for`:

```javascript
// Vai de 1 até 5
for (let i = 1; i <= 5; i++) {
    console.log("Número: " + i);
}

// O código acima é equivalente a:
let j = 1;
while (j <= 5) {
    console.log("Com while: " + j);
    j++; // Nunca esqueça de incrementar para não dar loop infinito!
}
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Vamos refatorar o exercício do caixa de supermercado! 
1. Crie um arquivo `caixa.js`.
2. Como no Node.js puro não temos um comando `leia` tão fácil, vamos simular os preços usando um "array" escondido (ou definindo os valores num loop fixo, ou criando variáveis).
3. **Melhor ainda:** Crie um laço `for` que rode 5 vezes, simulando a leitura de 5 produtos. Dentro do laço, crie uma variável com um preço aleatório (ou fixo, como R$ 10.50) e vá somando a uma variável `total`.
4. No final, exiba o total da compra no console.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A variável `total` foi inicializada com `0` fora do laço.
- [ ] O laço `for` está configurado corretamente (ex: `let i = 1; i <= 5; i++`).
- [ ] O acúmulo dos valores usa o operador de soma corretamente (`total = total + valor` ou `total += valor`).
- [ ] O console exibe o resultado final de forma clara.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: crie um laço `for` que faça uma contagem regressiva para o lançamento de um foguete (indo de 10 até 0). 

*Dica:* em vez de somar (`i++`), você precisará inicializar a variável em 10, a condição deve testar se é maior ou igual a 0, e você deve subtrair a cada passo (`i--`). Exiba "Fogo!" quando chegar no 0. Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
