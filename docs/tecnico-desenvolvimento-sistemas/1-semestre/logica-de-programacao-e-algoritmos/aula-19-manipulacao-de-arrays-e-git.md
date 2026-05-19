---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-19-manipulacao-de-arrays-e-git
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-19-manipulacao-de-arrays-e-git
sidebar_position: 19
title: Aula 19 — Manipulação de Arrays e Git
description: Aula 19 do curso de Lógica de Programação e Algoritmos
---

# Aula 19 — Manipulação de Arrays e Git

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Juntar tudo o que vimos: Arrays, Laços e Condicionais para resolver um dos problemas clássicos da computação (encontrar o maior e o menor valor de uma lista) e salvar no GitHub.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Combinação de `Arrays` + `For` + `If`.
- Algoritmo de busca do Maior/Menor valor.
- Prática de versionamento: Commit e Push para o GitHub.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O Algoritmo Clássico do "Rei da Colina"
Para descobrir quem é a pessoa mais velha de uma lista, fazemos assim na programação:
1. Chutamos que a primeira pessoa da lista (`lista[0]`) é a mais velha. Guardamos ela como o "Rei".
2. Depois, olhamos a segunda pessoa. Ela é mais velha que o Rei atual? Se for, ela toma o trono e vira o novo Rei.
3. Fazemos isso usando um `for` até o final da lista. No fim, quem sobrar no trono é o mais velho absoluto!

Isso se chama atualização de variável baseada em comparação e é extremamente comum em todo tipo de sistema (e-commerce, relatórios financeiros, jogos, etc).

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Encontrando o maior número da lista:

```javascript
let numeros = [15, 8, 90, 42, 7];

// Assumimos que o primeiro número é o maior
let maior = numeros[0];

for (let i = 1; i < numeros.length; i++) {
    // Se o número atual for maior que o "Rei" atual, ele toma a coroa!
    if (numeros[i] > maior) {
        maior = numeros[i];
    }
}

console.log("O maior número da lista é o: " + maior);
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Sua missão agora é encontrar o **MENOR** valor!
1. Crie um arquivo `temperaturas.js`.
2. Crie um array com as seguintes temperaturas: `[22, 18, 15, 30, 25, 12, 28]`.
3. Escreva o algoritmo "Rei da Colina" invertido: se a temperatura for MENOR do que a que está no trono, ela assume a posição de menor temperatura.
4. Exiba a menor temperatura encontrada.
5. Após finalizar e testar, use o terminal para enviar esse arquivo para o seu repositório no GitHub (`git add`, `git commit`, `git push`).

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A variável `menor` começa recebendo o primeiro item do array.
- [ ] O laço `for` varre toda a lista.
- [ ] A condição `if (temperaturas[i] < menor)` foi aplicada.
- [ ] O arquivo pode ser visto na nuvem pelo link do repositório no GitHub.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: pegue o código das temperaturas e melhore-o para que ele encontre o MAIOR e o MENOR valor **ao mesmo tempo**, passando apenas uma vez pelo `for` (use duas variáveis separadas como "Rei" e "Bobo da corte"). Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
