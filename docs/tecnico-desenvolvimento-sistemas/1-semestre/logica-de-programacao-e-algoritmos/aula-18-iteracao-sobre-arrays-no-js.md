---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-18-iteracao-sobre-arrays-no-js
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-18-iteracao-sobre-arrays-no-js
sidebar_position: 18
title: Aula 18 — Iteração sobre Arrays no JS
description: Aula 18 do curso de Lógica de Programação e Algoritmos
---

# Aula 18 — Iteração sobre Arrays no JS

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender como visitar cada uma das gavetas do seu Array automaticamente usando laços de repetição, sem precisar escrever uma linha de código para cada posição.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Percorrendo Arrays com o `for` clássico.
- Introdução ao atalho `for...of` do JavaScript.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O Casamento Perfeito: `For` e `Arrays`
Se você tem uma lista com 100 alunos, como imprimir todos os nomes? A resposta está em usar o laço `for`. Como sabemos que os índices do array começam em 0 e vão até o (tamanho - 1), podemos criar um `for` que começa em `i = 0` e vai até `i < array.length`.

### O Atalho `for...of`
O JavaScript é uma linguagem moderna e tem atalhos incríveis. Para não precisarmos nos preocupar com índices (`[i]`), limites e variáveis contadoras toda hora, existe o `for...of`. Ele extrai o item de dentro da gaveta automaticamente!

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Lendo uma lista de convidados:

```javascript
let convidados = ["Ana", "Carlos", "Beatriz", "João"];

console.log("--- USANDO O FOR CLÁSSICO ---");
for (let i = 0; i < convidados.length; i++) {
    console.log("Convidado " + i + ": " + convidados[i]);
}

console.log("\n--- USANDO O FOR...OF ---");
for (let nome of convidados) {
    console.log("Bem-vindo(a), " + nome + "!");
}
```
*Repare que o `for...of` é muito mais fácil de ler em voz alta: "Para cada nome da lista convidados..."*

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie um arquivo `notas.js`.
2. Crie um array chamado `notas` contendo 4 notas de um aluno (ex: `[7.5, 8.0, 6.5, 9.0]`).
3. Crie uma variável `soma` inicializada em 0.
4. Utilize um laço `for...of` para percorrer o array e somar cada nota na variável `soma`.
5. Ao final, calcule a média dividindo a soma total pelo tamanho do array (`notas.length`) e exiba se o aluno foi aprovado (média >= 7).

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O array contém números (sem aspas, pois não são strings).
- [ ] A estrutura `for...of` foi usada corretamente.
- [ ] A média é calculada fora do laço.
- [ ] Uma estrutura condicional (`if`) diz se foi aprovado ou reprovado ao final.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: crie um array com uma lista de nomes e use um `for` clássico para procurar se o SEU NOME está nessa lista. 

Se encontrar o seu nome, o programa deve exibir "Nome encontrado na posição X!" (lembre-se que o índice do `for` te dá a posição!). Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
