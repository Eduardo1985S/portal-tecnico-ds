---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-15-estruturas-condicionais-no-js
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-15-estruturas-condicionais-no-js
sidebar_position: 15
title: Aula 15 — Estruturas Condicionais no JS
description: Aula 15 do curso de Lógica de Programação e Algoritmos
---

# Aula 15 — Estruturas Condicionais no JS

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Traduzir o nosso conhecimento de condicionais (`se/senao` e `escolha/caso`) do VisuAlg para o mundo real do JavaScript usando `if`, `else` e `switch`.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Tradução de `se` para `if` e `senao` para `else`.
- Condicionais encadeadas: `else if`.
- Estrutura de múltipla escolha: `switch... case`.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O `If` e o `Else`
No JavaScript, a estrutura condicional funciona exatamente com a mesma lógica do VisuAlg, apenas mudamos o idioma (para o inglês) e substituímos palavras como `entao` e `fimse` por chaves `{ }`.
As chaves servem para delimitar o bloco de código que pertence àquela condição.

### O `Switch`
Para menus ou opções diretas (o antigo `escolha`), usamos o `switch`. No JS, precisamos obrigatoriamente adicionar a palavra `break` no final de cada caso (`case`), para que o código pare de verificar os casos de baixo após achar a resposta correta.

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Traduzindo um `se/senao` encadeado para JavaScript:

```javascript
let sinal = "Amarelo";

if (sinal === "Verde") {
    console.log("Pode passar!");
} else if (sinal === "Amarelo") {
    console.log("Atenção, diminua a velocidade!");
} else {
    console.log("Pare imediatamente!");
}
```

Usando o `Switch`:

```javascript
let opcao = 2;

switch (opcao) {
    case 1:
        console.log("Carregando jogo...");
        break;
    case 2:
        console.log("Abrindo Configurações...");
        break;
    default: // O equivalente ao "outrocaso"
        console.log("Opção inválida!");
        break;
}
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Vamos refatorar! Pegue a atividade da **Aula 06** (Radar de Velocidade) que você fez em VisuAlg ou Portugol e reescreva-a inteiramente em JavaScript.
Declare a velocidade em uma variável `let` e crie a estrutura de `if / else` para exibir no `console.log` se o motorista foi multado ou não, calculando o valor da multa se for o caso.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O código utiliza `if` e `else` corretamente com a sintaxe de chaves `{ }`.
- [ ] A condição do `if` está entre parênteses `()`.
- [ ] O cálculo da multa é feito dentro do bloco correspondente.
- [ ] Nenhuma mensagem do VisuAlg (`escreval` ou `fimse`) escapou para o código JS.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: crie um arquivo chamado `dias-da-semana.js` e implemente um `switch... case`. 

Crie uma variável com um número de 1 a 7 e faça o programa imprimir qual é o dia da semana correspondente (1 = Domingo, 2 = Segunda, etc). Se colocar o número 8, o `default` deve avisar que o dia é inválido. Não esqueça do `break`! Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
