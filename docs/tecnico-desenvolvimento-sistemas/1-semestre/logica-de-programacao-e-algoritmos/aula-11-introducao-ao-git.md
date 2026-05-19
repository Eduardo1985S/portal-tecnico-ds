---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-11-introducao-ao-git
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-11-introducao-ao-git
sidebar_position: 11
title: Aula 11 — Introdução ao Git
description: Aula 11 do curso de Lógica de Programação e Algoritmos
---

# Aula 11 — Introdução ao Git

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Entender a importância do controle de versão no mercado de trabalho, instalar o Git e dar os primeiros passos versionando arquivos localmente.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é controle de versão?
- Instalação e Configuração do Git.
- Primeiros comandos: `git init`, `git status`, `git add` e `git commit`.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O Fim do "Trabalho_Final_Versao_10_AgoraVai"
Você já precisou fazer um trabalho em grupo onde os arquivos ficavam se multiplicando com nomes estranhos? No desenvolvimento de software, lidar com códigos que mudam todos os dias exige organização. O **Git** é um sistema de controle de versão que funciona como uma "máquina do tempo" para o seu código. Ele tira "fotos" (commits) de como o projeto estava em um determinado momento, permitindo voltar atrás se algo der errado.

### Os Comandos Essenciais
O Git funciona através do terminal (linha de comando). Os passos iniciais são sempre:
1. **`git init`**: Inicia o Git na sua pasta. Ele cria um cofre invisível.
2. **`git status`**: Mostra o estado atual. Quais arquivos foram alterados?
3. **`git add .`**: Adiciona os arquivos modificados na "área de preparação" (palco), dizendo ao Git que eles farão parte da próxima foto.
4. **`git commit -m "mensagem"`**: Bate a foto e salva as mudanças no histórico com uma mensagem explicando o que foi feito.

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Imagine que você criou um arquivo `algoritmo.txt`. Para versioná-lo, você abre o terminal na pasta e digita:

```bash
git init
git add algoritmo.txt
git commit -m "Meu primeiro arquivo no controle de versão"
git status
```
O terminal irá confirmar que as alterações foram salvas (commitadas) com sucesso!

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o Git no seu computador (se ainda não tiver).
2. Configure o seu nome e email no terminal:
   - `git config --global user.name "Seu Nome"`
   - `git config --global user.email "seu.email@exemplo.com"`
3. Crie uma pasta chamada `meu-primeiro-projeto`, abra-a no terminal e inicie o Git nela.
4. Crie um arquivo de texto e faça o seu primeiro **commit**.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno possui o Git instalado e configurado corretamente.
- [ ] A pasta do projeto possui o diretório oculto `.git` (criado pelo `git init`).
- [ ] O comando `git log` mostra o histórico com o commit realizado pelo aluno.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: crie mais dois arquivos nessa mesma pasta. Faça um `git add .` e crie um segundo commit com uma mensagem como `"Adicionando mais arquivos de teste"`. 

Depois, rode o comando `git log` e admire o seu histórico de versões crescendo! Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
