---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-04-operadores-e-comandos-de-i-o
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-04-operadores-e-comandos-de-i-o
sidebar_position: 4
title: Aula 04 — Operadores e Comandos de I/O
description: Aula 04 do curso de Lógica de Programação e Algoritmos
---

# Aula 04 — Operadores e Comandos de I/O

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender como o computador realiza cálculos matemáticos e como ele se comunica com o usuário através de comandos de entrada e saída.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Operadores Aritméticos Básicos.
- Comandos de Entrada (`leia`).
- Comandos de Saída (`escreva` / `escreval`).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Comandos de Entrada e Saída
Um programa de computador sem interação é bem inútil. Precisamos enviar dados para ele e ele precisa nos mostrar resultados.
- **Saída (`escreva`):** É o comando usado para exibir mensagens na tela. Pense nisso como o computador "falando" com você. Se usarmos `escreval`, ele exibe a mensagem e pula uma linha.
- **Entrada (`leia`):** É o comando que o computador usa para "escutar" o que o usuário digita no teclado. Ele pega o que foi digitado e guarda dentro de uma variável.

### Operadores Aritméticos
Para processar os dados, usamos a matemática básica:
- `+` (Adição)
- `-` (Subtração)
- `*` (Multiplicação - repare que usamos o asterisco!)
- `/` (Divisão)
- `%` ou `MOD` (Resto da Divisão) - Retorna o que sobra de uma divisão (ex: 5 % 2 = 1).

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como escrever um algoritmo que pergunta a idade do usuário e calcula quantos anos ele terá daqui a 10 anos:

```text
Var
   idade_atual, idade_futura : Inteiro
Inicio
   escreval("Olá! Quantos anos você tem?")
   leia(idade_atual)
   
   idade_futura <- idade_atual + 10
   
   escreval("Daqui a 10 anos você terá ", idade_futura, " anos.")
Fim
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Crie um pseudocódigo que:
1. Peça para o usuário digitar o seu ano de nascimento.
2. Peça para o usuário digitar o ano atual.
3. Calcule a idade aproximada do usuário.
4. Exiba a idade na tela com uma mensagem amigável.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Declarou corretamente as variáveis.
- [ ] Utilizou o comando `escreva`/`escreval` para interagir com o usuário.
- [ ] Utilizou o comando `leia` para pegar os anos digitados.
- [ ] Usou o operador de subtração (`-`) corretamente.
- [ ] Exibiu o resultado de forma clara.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: escreva um algoritmo para calcular a conta do restaurante. 

Ele deve ler o valor total consumido, calcular os 10% do garçom (multiplicando por 0.10) e mostrar o valor final a ser pago. Use papel ou bloco de notas. Desafie-se a pensar no passo a passo como a máquina faria!
