---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-14-operadores-e-tipos-de-dados-no-js
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-14-operadores-e-tipos-de-dados-no-js
sidebar_position: 14
title: Aula 14 — Operadores e Tipos de Dados no JS
description: Aula 14 do curso de Lógica de Programação e Algoritmos
---

# Aula 14 — Operadores e Tipos de Dados no JS

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprofundar nos tipos de dados do JavaScript e dominar os operadores matemáticos e lógicos para comparar informações.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Tipos Primitivos (`Number`, `String`, `Boolean`).
- Operadores Matemáticos, Relacionais e Lógicos (`&&`, `||`, `!`).
- A grande diferença: `=` vs `==` vs `===`.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O problema do "Igual"
No VisuAlg, usávamos `<-` para guardar um valor e `=` para comparar. O JS usa apenas sinais de `=` para tudo, mas em quantidades diferentes:
- **`=` (Atribuição):** Guarda um valor. Ex: `let idade = 20`.
- **`==` (Igualdade frouxa):** Compara se os valores são iguais, mesmo que de tipos diferentes. Ex: `20 == "20"` (Isso é Verdadeiro no JS!).
- **`===` (Igualdade estrita):** Compara se o valor E o tipo são iguais. Ex: `20 === "20"` (Isso é Falso, pois um é número e o outro é texto). **Sempre use `===` para evitar bugs!**

### Outros Operadores
- **Diferente de:** `!==` (Estritamente diferente).
- **Maior/Menor:** `>`, `<`, `>=`, `<=`.
- **Lógicos:**
  - `&&` (E / AND)
  - `||` (OU / OR - *são duas barras em pé*)
  - `!` (NAO / NOT - *ponto de exclamação*)

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Validando um login simples no console:

```javascript
const usuarioBD = "admin";
const senhaBD = "1234";

let usuarioDigitado = "admin";
let senhaDigitada = "0000";

// O usuário está certo E a senha também?
let loginSucesso = (usuarioDigitado === usuarioBD) && (senhaDigitada === senhaBD);

console.log("Acesso permitido? " + loginSucesso);
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie um arquivo `operadores.js`.
2. Declare variáveis para a nota de um aluno e a sua porcentagem de faltas.
3. Usando apenas variáveis e operadores lógicos (`&&` e `>`, `<`), crie uma variável `aprovado` que guarde `true` se a nota for maior ou igual a 7 E as faltas forem menores que 25.
4. Exiba o resultado final.
5. Faça um `git add` e `git commit` no seu projeto para salvar o progresso!

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] As variáveis foram declaradas com os tipos corretos (Number).
- [ ] O operador `&&` foi usado para exigir as duas condições simultâneas.
- [ ] Os sinais `>=` e `<` foram usados corretamente.
- [ ] As alterações do código foram comitadas usando o Git.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: mude os valores das variáveis do aluno (ex: coloque a nota como 8, mas as faltas como 30) e rode o código de novo para testar se ele reprova. Depois de testar todas as possibilidades, suba tudo para o GitHub com um `git push`! Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
