---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-06-estruturas-condicionais-parte-1
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-06-estruturas-condicionais-parte-1
sidebar_position: 6
title: Aula 06 — Estruturas Condicionais (Parte 1)
description: Aula 06 do curso de Lógica de Programação e Algoritmos
---

# Aula 06 — Estruturas Condicionais (Parte 1)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a fazer o computador tomar decisões com base em condições, executando caminhos diferentes dependendo da situação.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Estrutura Condicional Simples (`se... entao`).
- Estrutura Condicional Composta (`se... entao... senao`).
- Práticas de tomada de decisão (ex: aprovado/reprovado, par ou ímpar).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que são Estruturas Condicionais?
Até agora, nossos códigos rodavam do começo ao fim sempre seguindo a mesma reta. Mas no mundo real, tomamos decisões o tempo todo: *"Se estiver chovendo, levo guarda-chuva; senão, vou de óculos de sol"*. Na programação, usamos a instrução **Se (If)** para criar esses desvios.

### Condicional Simples (`se... entao`)
É usada quando só queremos que algo aconteça se uma condição for **Verdadeira**. Se for Falsa, o programa apenas ignora e segue em frente.
```text
se (idade >= 18) entao
   escreval("Pode entrar na festa!")
fimse
```

### Condicional Composta (`se... entao... senao`)
Aqui, criamos uma bifurcação. Se a condição for Verdadeira, ele faz uma coisa; **senão (caso contrário)**, ele faz outra obrigatoriamente.
```text
se (media >= 7) entao
   escreval("Aprovado!")
senao
   escreval("Reprovado!")
fimse
```

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Algoritmo para descobrir se um número é Par ou Ímpar (usando o operador de resto da divisão `%` ou `MOD`):

```text
algoritmo "ParOuImpar"
var
   numero: inteiro
inicio
   escreval("Digite um número inteiro:")
   leia(numero)
   
   se (numero % 2 = 0) entao
      escreval("O número é PAR!")
   senao
      escreval("O número é ÍMPAR!")
   fimse
fimalgoritmo
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Crie um algoritmo no VisuAlg para um radar de velocidade:
1. Peça ao usuário para digitar a velocidade do carro (em km/h).
2. Se a velocidade for **maior que 80**, exiba a mensagem: "MULTADO! Você ultrapassou o limite de velocidade." e calcule uma multa de R$ 5,00 por cada km acima de 80. Mostre o valor da multa.
3. Se a velocidade for menor ou igual a 80, exiba: "Velocidade ok, boa viagem!".

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O algoritmo lê a velocidade corretamente.
- [ ] Utiliza a estrutura `se... entao... senao`.
- [ ] O cálculo da multa está correto (ex: se passou a 90km/h, passou 10km/h do limite, multa de R$ 50).
- [ ] A mensagem certa é exibida para cada situação.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: crie um algoritmo que peça a idade de um nadador e o classifique nas categorias: Infantil (até 12 anos), Juvenil (13 a 17) ou Adulto (maior que 18). 

*Dica:* Para esse desafio, você precisará usar um `se` dentro do `senao`, o que chamamos de condicionais encadeadas, que será o tema profundo da nossa próxima aula! Tente quebrar a cabeça um pouco. Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
