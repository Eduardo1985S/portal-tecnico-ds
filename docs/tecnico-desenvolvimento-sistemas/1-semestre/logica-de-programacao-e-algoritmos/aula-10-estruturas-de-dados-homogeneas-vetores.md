---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-10-estruturas-de-dados-homogeneas-vetores
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-10-estruturas-de-dados-homogeneas-vetores
sidebar_position: 10
title: Aula 10 — Estruturas de Dados Homogêneas (Vetores)
description: Aula 10 do curso de Lógica de Programação e Algoritmos
---

# Aula 10 — Estruturas de Dados Homogêneas (Vetores)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Descobrir como armazenar múltiplas informações do mesmo tipo em uma única variável, criando "listas" no nosso algoritmo.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que são Vetores (Arrays unidimensionais).
- Declaração e acesso de posições em vetores no VisuAlg.
- Percorrendo vetores usando a estrutura `para`.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que são Vetores (Arrays)?
Imagine que você precise guardar a nota de 50 alunos. Declarar 50 variáveis diferentes (`nota1`, `nota2`, `nota3`...) seria impossível de gerenciar! 

Um **vetor** resolve isso: ele é como um grande armário com várias gavetas, onde todas as gavetas guardam o mesmo tipo de coisa (por exemplo, apenas números inteiros). Cada gaveta tem um "endereço", que chamamos de **Índice**.

### Acessando os Índices
No VisuAlg, se criarmos um vetor chamado `notas` com 5 posições, podemos acessar a primeira gaveta chamando `notas[1]`, a segunda `notas[2]`, e assim por diante.

### Percorrendo com o `Para`
Lembra que o `para` serve exatamente para repetir algo sabendo a quantidade certa? Ele é o melhor amigo do vetor. Podemos usar a variável contadora do laço para abrir uma gaveta por vez: `notas[i]`.

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Lendo e exibindo a idade de 3 pessoas usando um vetor:

```text
algoritmo "LendoIdades"
var
   idades: vetor [1..3] de inteiro
   i: inteiro
inicio
   // Lendo as idades
   para i de 1 ate 3 faca
      escreval("Digite a idade da pessoa ", i, ":")
      leia(idades[i]) // Guarda na gaveta correspondente!
   fimpara
   
   escreval("--- AS IDADES FORAM ---")
   
   // Mostrando as idades
   para i de 1 ate 3 faca
      escreval("Idade da pessoa ", i, " é: ", idades[i])
   fimpara
fimalgoritmo
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Crie um algoritmo para registrar o nome de 5 super-heróis.
1. Declare um vetor do tipo caractere com posições de `1..5`.
2. Faça um laço `para` pedindo para o usuário digitar os nomes.
3. Faça **outro** laço `para` para exibir na tela: "O herói salvo na posição [i] é [nome_do_heroi]".

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Declarou o vetor usando a sintaxe `vetor [1..5] de caractere`.
- [ ] Usou um laço de repetição para entrada de dados (o `leia`).
- [ ] Usou um segundo laço de repetição para saída de dados (o `escreval`).
- [ ] Conseguiu exibir os heróis na ordem em que foram digitados.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: crie um vetor para armazenar 5 números inteiros. Em seguida, percorra esse vetor usando um laço e calcule a **soma total** de todos os números digitados, exibindo apenas o resultado final no final. Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
