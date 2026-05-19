---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-03-introducao-ao-pseudocodigo
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-03-introducao-ao-pseudocodigo
sidebar_position: 3
title: Aula 03 — Introdução ao Pseudocódigo
description: Aula 03 do curso de Lógica de Programação e Algoritmos
---

# Aula 03 — Introdução ao Pseudocódigo

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender a utilidade do pseudocódigo na programação e aprender o que são variáveis e tipos de dados.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é Pseudocódigo (Português Estruturado).
- Conceito de Variáveis.
- Tipos de Dados Básicos (Inteiro, Real, Caractere, Lógico).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que é Pseudocódigo?
Enquanto o fluxograma é um desenho, o **pseudocódigo** (também chamado de Português Estruturado) é uma forma de escrever o algoritmo usando palavras reais da nossa língua, mas com uma estrutura que lembra muito a de uma linguagem de programação. Ele serve como uma "ponte" entre o nosso pensamento humano e o código que o computador lê.

### O que são Variáveis?
Imagine que a memória do computador é como um grande armário cheio de gavetas. Uma **variável** é como se você pegasse uma dessas gavetas, colocasse uma etiqueta com um nome nela e guardasse uma informação lá dentro. 

Por exemplo, podemos criar uma gaveta chamada `idade` e guardar o número `16` dentro dela. Se mais tarde precisarmos saber a idade, basta "abrir a gaveta" `idade`.

### Tipos de Dados
O computador precisa saber o tipo de coisa que você está guardando na gaveta para não misturar letras com números matemáticos:
1. **Inteiro:** Números sem vírgula (ex: 10, -5, 100).
2. **Real:** Números quebrados, com vírgula/ponto (ex: 7.5, 3.14).
3. **Caractere (ou Texto):** Letras, palavras ou frases (ex: "Maria", "Rua A").
4. **Lógico:** Apenas duas possibilidades, Verdadeiro ou Falso (útil para tomadas de decisão).

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

No pseudocódigo, a declaração de uma variável para armazenar o nome e a idade de um aluno seria assim:

```text
Var
   nome_aluno : Caractere
   idade : Inteiro
Inicio
   nome_aluno <- "João"
   idade <- 17
Fim
```
*(Lê-se: a variável `nome_aluno` recebe o texto "João")*

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Em uma folha ou bloco de notas, crie a estrutura de um pseudocódigo que declare as seguintes variáveis com seus tipos corretos e depois atribua um valor fictício a elas:
1. O preço de um produto.
2. A quantidade em estoque.
3. O nome do produto.
4. Se o produto está em promoção ou não (Verdadeiro/Falso).

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Declarou corretamente o tipo **Real** para o preço.
- [ ] Declarou corretamente o tipo **Inteiro** para o estoque.
- [ ] Declarou corretamente o tipo **Caractere** para o nome.
- [ ] Declarou corretamente o tipo **Lógico** para a promoção.
- [ ] Fez a atribuição (`<-`) de valores compatíveis com cada tipo.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: observe o ambiente ao seu redor e liste 5 informações diferentes. Tente classificá-las nos tipos de dados que aprendemos hoje. (Exemplo: "O número da minha casa é do tipo Inteiro"). 

Saber categorizar a informação é o primeiro passo para conseguir armazená-la no computador corretamente!
