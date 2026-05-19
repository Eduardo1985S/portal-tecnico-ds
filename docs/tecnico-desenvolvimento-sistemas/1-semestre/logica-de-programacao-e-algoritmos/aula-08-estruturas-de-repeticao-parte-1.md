---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-08-estruturas-de-repeticao-parte-1
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-08-estruturas-de-repeticao-parte-1
sidebar_position: 8
title: Aula 08 — Estruturas de Repetição (Parte 1)
description: Aula 08 do curso de Lógica de Programação e Algoritmos
---

# Aula 08 — Estruturas de Repetição (Parte 1)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Descobrir como fazer o computador executar tarefas repetitivas milhares de vezes sem precisarmos escrever a mesma linha de código repetidamente.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O conceito de laços de repetição (loops).
- Estrutura `enquanto... faca`.
- Estrutura `repita... ate`.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que são Loops?
Imagine que você precisa exibir a mensagem "Olá" 100 vezes na tela. Fazer 100 comandos `escreval("Olá")` seria um pesadelo. Os laços de repetição (loops) permitem que um bloco de código seja executado repetidas vezes até que uma condição de parada seja atingida.

### A Estrutura `enquanto... faca` (While)
Ele verifica uma condição no **início**. Se a condição for Verdadeira, ele entra no laço e executa o código. Depois volta para cima e testa de novo. Isso continua ENQUANTO a condição for verdadeira.
```text
var
   contador: inteiro
inicio
   contador <- 1
   enquanto (contador <= 10) faca
      escreval(contador)
      contador <- contador + 1 // CUIDADO: Se esquecer isso, o loop é infinito!
   fimenquanto
```

### A Estrutura `repita... ate` (Do-While / Repeat-Until)
Diferente do `enquanto`, o `repita` testa a condição no **final**. Isso significa que o bloco de código será executado **pelo menos uma vez**, não importa o que aconteça, e só vai parar ATÉ que a condição se torne Verdadeira (no VisuAlg, repete até ser Verdadeiro; se for Falso, ele continua repetindo).

```text
var
   senha: texto
inicio
   repita
      escreval("Digite a senha:")
      leia(senha)
   ate (senha = "1234")
   escreval("Acesso Liberado!")
```

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Um programa que faz uma contagem regressiva para o ano novo usando `enquanto`:

```text
algoritmo "ContagemRegressiva"
var
   cont: inteiro
inicio
   cont <- 10
   enquanto (cont >= 0) faca
      escreval(cont)
      cont <- cont - 1
   fimenquanto
   escreval("FELIZ ANO NOVO!")
fimalgoritmo
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Crie um algoritmo para um caixa de supermercado usando `enquanto`:
1. O algoritmo deve ler o preço de vários produtos indefinidamente.
2. Cada vez que ler o preço de um produto, deve somar ao valor total da compra.
3. Se o operador digitar o preço **0 (zero)**, o laço de repetição deve acabar (esta é a condição de saída).
4. No final, o programa exibe o valor total da compra.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Declarou as variáveis para preço e total.
- [ ] Inicializou o total com `0` antes do laço.
- [ ] O laço `enquanto` tem a condição `(preco <> 0)`.
- [ ] O total é acumulado corretamente dentro do laço `(total <- total + preco)`.
- [ ] A leitura (`leia`) do preço precisa acontecer dentro do laço para não dar loop infinito!

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: pegue o exercício do supermercado e adicione um Contador para saber **quantos itens** foram comprados. 

No final, além do total da compra, faça o programa exibir a quantidade de produtos levados. Cuidado: o "zero" que encerra o programa não conta como produto! Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
