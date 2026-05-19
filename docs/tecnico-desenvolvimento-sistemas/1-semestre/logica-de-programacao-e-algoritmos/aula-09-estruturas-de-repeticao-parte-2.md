---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-09-estruturas-de-repeticao-parte-2
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-09-estruturas-de-repeticao-parte-2
sidebar_position: 9
title: Aula 09 — Estruturas de Repetição (Parte 2)
description: Aula 09 do curso de Lógica de Programação e Algoritmos
---

# Aula 09 — Estruturas de Repetição (Parte 2)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a usar o laço de repetição mais famoso da programação: o `para` (for), ideal para quando sabemos exatamente quantas vezes queremos repetir algo.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Estrutura `para... de... ate... faca`.
- Diferença entre os três tipos de laço.
- Contadores e Acumuladores (revisão aplicada).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### A Estrutura `para` (For)
Enquanto o `enquanto` e o `repita` são ótimos para situações onde não sabemos quando o loop vai acabar (ex: "continue pedindo a senha até o usuário acertar"), o `para` é feito para repetições contadas (ex: "faça isso 10 vezes").

O `para` já cuida de criar um contador, aumentar o valor dele e verificar o limite, tudo na mesma linha!

```text
var
   i: inteiro
inicio
   // Vai repetir exatamente 5 vezes, com o 'i' indo de 1 até 5
   para i de 1 ate 5 faca
      escreval("O valor de i agora é: ", i)
   fimpara
```

### Qual laço usar?
- **Enquanto (While):** Use quando você não sabe quantas vezes vai repetir e a condição é checada no INÍCIO.
- **Repita (Do-While):** Use quando não sabe quantas vezes vai repetir, mas o código precisa rodar PELO MENOS UMA VEZ.
- **Para (For):** Use quando você SABE exatamente quantas vezes o laço precisa rodar (ex: percorrer os 30 alunos de uma sala).

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Imprimindo a tabuada do número 7:

```text
algoritmo "TabuadaDoSete"
var
   i, resultado: inteiro
inicio
   escreval("--- TABUADA DO 7 ---")
   para i de 1 ate 10 faca
      resultado <- 7 * i
      escreval("7 x ", i, " = ", resultado)
   fimpara
fimalgoritmo
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Faça um algoritmo que pergunte ao usuário para qual número ele quer calcular a tabuada (ex: ele digita 5). Em seguida, use a estrutura `para` para imprimir a tabuada desse número de 1 até 10.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Leu o número desejado pelo usuário através do comando `leia`.
- [ ] Utilizou a estrutura `para... de... ate... faca`.
- [ ] A multiplicação está sendo feita de forma correta (numero x contador).
- [ ] A tela exibe a tabuada de forma formatada (ex: `5 x 1 = 5`).

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: modifique o seu algoritmo da tabuada para que ele pergunte ao usuário não só qual número ele quer multiplicar, mas também ATÉ QUAL NÚMERO ele quer multiplicar (ex: ir até o 20 em vez do 10). Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
