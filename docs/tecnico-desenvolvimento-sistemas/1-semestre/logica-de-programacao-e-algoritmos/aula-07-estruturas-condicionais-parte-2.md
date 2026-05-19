---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-07-estruturas-condicionais-parte-2
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-07-estruturas-condicionais-parte-2
sidebar_position: 7
title: Aula 07 — Estruturas Condicionais (Parte 2)
description: Aula 07 do curso de Lógica de Programação e Algoritmos
---

# Aula 07 — Estruturas Condicionais (Parte 2)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a lidar com múltiplas possibilidades de decisão usando condicionais encadeadas e criar menus iterativos usando a estrutura de múltipla escolha.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Estruturas condicionais encadeadas (vários `se` dentro de `senao`).
- Estrutura de múltipla escolha (`escolha... caso`).
- Criação de menus interativos simples.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Condicionais Encadeadas
Muitas vezes, temos mais de duas opções. Exemplo: um semáforo pode estar verde, amarelo ou vermelho. Nesses casos, usamos condicionais aninhadas (uma dentro da outra):
```text
se (cor = "Verde") entao
   escreval("Pode passar")
senao
   se (cor = "Amarelo") entao
      escreval("Atenção")
   senao
      escreval("Pare!")
   fimse
fimse
```
*Note que cada `se` que abrimos, precisa ter um `fimse` correspondente no final.*

### Estrutura `escolha... caso`
Quando temos uma variável que pode ter muitos valores específicos (como um menu de opções 1, 2, 3, 4), ficar escrevendo vários `se... senao` deixa o código feio e difícil de ler. Para isso existe o `escolha`:

```text
escolha opcao
   caso 1
      escreval("Você escolheu Iniciar")
   caso 2
      escreval("Você escolheu Configurações")
   caso 3
      escreval("Saindo do sistema...")
   outrocaso
      escreval("Opção inválida!")
fimescolha
```

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Criando um mini-calculadora:

```text
algoritmo "CalculadoraMenu"
var
   n1, n2: real
   op: inteiro
inicio
   escreval("Digite o primeiro número: ")
   leia(n1)
   escreval("Digite o segundo número: ")
   leia(n2)
   
   escreval("ESCOLHA UMA OPERAÇÃO:")
   escreval("[1] Somar")
   escreval("[2] Subtrair")
   leia(op)
   
   escolha op
      caso 1
         escreval("A soma é: ", n1 + n2)
      caso 2
         escreval("A subtração é: ", n1 - n2)
      outrocaso
         escreval("Operação inválida.")
   fimescolha
fimalgoritmo
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Desenvolva um algoritmo simulando um sistema de doações (Criança Esperança, Teleton, etc):
1. Exiba um menu com opções de doação:
   [1] para doar R$10
   [2] para doar R$25
   [3] para doar R$50
   [4] para doar outros valores
   [5] para cancelar
2. Leia a opção do usuário.
3. Se ele escolher de 1 a 3, confirme a doação. Se ele escolher 4, peça para ele digitar um valor e confirme.
4. Use a estrutura `escolha... caso`.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O menu foi exibido de forma clara no terminal.
- [ ] A estrutura `escolha... caso` foi usada para processar a opção digitada.
- [ ] A opção "outros valores" (`caso 4`) pede um novo valor via `leia`.
- [ ] O uso de `outrocaso` para opções que não existem no menu foi implementado.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: crie um sistema de conversão de moedas. 

Peça ao usuário para informar um valor em Reais (R$) e exiba um menu perguntando para qual moeda ele quer converter: [1] Dólar, [2] Euro, [3] Libra. Utilize cotações fictícias, faça a conta e exiba o resultado! Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
