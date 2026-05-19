---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-05-conhecendo-o-visualg
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-05-conhecendo-o-visualg
sidebar_position: 5
title: Aula 05 — Conhecendo o VisuAlg
description: Aula 05 do curso de Lógica de Programação e Algoritmos
---

# Aula 05 — Conhecendo o VisuAlg

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Sair do papel e começar a usar uma ferramenta real (VisuAlg) para executar e testar nossos pseudocódigos no computador, além de entender como comparar valores.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Interface e Estrutura básica no VisuAlg.
- Operadores Relacionais (`>`, `<`, `>=`, `<=`, `=`, `<>`).
- Operadores Lógicos (E, OU, NAO).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Conhecendo o VisuAlg
Até agora, escrevemos no papel. O **VisuAlg** é um programa que consegue ler o nosso pseudocódigo e executá-lo de verdade, mostrando telas e pedindo que você digite os valores. Isso vai provar se o seu algoritmo está certo ou não. Ele exige uma estrutura exata (com a palavra `algoritmo`, `var`, `inicio` e `fimalgoritmo`).

### Operadores Relacionais
Servem para **comparar** dois valores. O resultado de uma comparação é sempre Verdadeiro ou Falso.
- `=` Igual a (Atenção: no VisuAlg, `<-` atribui e `=` compara).
- `<>` Diferente de.
- `>` Maior que e `<` Menor que.
- `>=` Maior ou igual e `<=` Menor ou igual.

### Operadores Lógicos
Servem para juntar várias comparações em uma só.
- **E:** Só é verdadeiro se **todas** as condições forem verdadeiras. (Ex: Para entrar, precisa ter ingresso `E` ser maior de 18 anos).
- **OU:** É verdadeiro se **pelo menos uma** condição for verdadeira. (Ex: Entra de graça se for criança `OU` idoso).
- **NAO:** Inverte a lógica. O que era Verdadeiro vira Falso e vice-versa.

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Criando a estrutura básica no VisuAlg:

```text
algoritmo "VerificaMaioridade"
var
   idade: inteiro
   eh_maior: logico
inicio
   escreval("Digite sua idade:")
   leia(idade)
   
   // Verifica se a idade é maior ou igual a 18
   eh_maior <- (idade >= 18)
   
   escreval("Você é maior de idade? ", eh_maior)
fimalgoritmo
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Abra o VisuAlg e crie um novo arquivo. 
1. Crie um algoritmo que leia as notas de **duas** provas de um aluno.
2. Calcule a média dessas notas `(nota1 + nota2) / 2`.
3. Verifique se a média é maior ou igual a 7 (guardando o resultado em uma variável do tipo `logico`).
4. Mostre a média na tela e se o aluno foi aprovado (Verdadeiro ou Falso).

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O algoritmo rodou sem erros de sintaxe no VisuAlg.
- [ ] Os cálculos matemáticos usaram parênteses corretamente na média.
- [ ] O aluno usou o operador relacional `>=` para verificar a aprovação.
- [ ] O resultado exibido em tela faz sentido e está correto.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: crie novos algoritmos no VisuAlg brincando com os operadores.

Tente fazer um algoritmo que pergunta o salário de uma pessoa e verifica se ela ganha mais que o salário mínimo (Verdadeiro/Falso). Ver seu código "ganhando vida" na tela preta do VisuAlg é o primeiro grande passo de um desenvolvedor!
