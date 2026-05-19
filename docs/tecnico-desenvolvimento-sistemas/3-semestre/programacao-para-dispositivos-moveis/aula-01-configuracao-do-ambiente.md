---
id: "tecnico-desenvolvimento-sistemas-3-semestre-programacao-para-dispositivos-moveis-aula-01-configuracao-do-ambiente"
slug: "/tecnico-desenvolvimento-sistemas/3-semestre/programacao-para-dispositivos-moveis/aula-01-configuracao-do-ambiente"
sidebar_position: 1
title: "Aula 01 — Configuração do Ambiente"
description: "Aula 01 do curso de Programação para Dispositivos Móveis - Configuração do Ambiente Expo"
---

# Aula 01 — Configuração do Ambiente

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Sair da teoria web e inicializar o seu primeiro projeto mobile usando o **React Native** e a ferramenta **Expo**, rodando o app direto no seu celular.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é o React Native e o Expo.
- Criação de projetos em branco usando `create-expo-app`.
- A estrutura de pastas inicial e o papel do `App.js`.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que é o React Native?
Diferente da web (HTML/CSS), aplicativos mobile nativos usam Java/Kotlin (Android) ou Swift (iOS). O React Native é um framework criado pelo Facebook que nos permite usar o **JavaScript** que já conhecemos para gerar aplicativos que rodam nos dois sistemas! 

### O que é o Expo?
Se fossemos instalar tudo do zero (Android Studio, Xcode), levaríamos horas só na configuração. O **Expo** é um conjunto de ferramentas que resolve toda essa burocracia pra gente. Com ele, você pode rodar o seu código no seu próprio celular usando o aplicativo "Expo Go", sem precisar de cabos!

### Criando nosso primeiro App
Para evitar que o Expo traga arquivos desnecessários ou código em TypeScript, nós sempre criaremos nossos projetos dizendo para ele ser um projeto **em branco (blank)**, para construirmos tudo do zero e entendermos cada linha. O arquivo principal de todo projeto será sempre o `App.js`.

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Abra o seu terminal na pasta raiz onde ficam seus projetos escolares e digite:

```bash
npx create-expo-app@latest meu-primeiro-app --template blank
```

*Nota: O `--template blank` garante que virá um projeto limpo em JavaScript.*

Depois que terminar, entre na pasta e inicie o servidor:

```bash
cd meu-primeiro-app
npx expo start
```
Um QR Code gigante vai aparecer no seu terminal!

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie o projeto exatamente como mostrado no exemplo prático.
2. Baixe o aplicativo **Expo Go** na Google Play Store ou App Store no seu celular físico.
3. Certifique-se de que o seu celular e o seu computador estão conectados **na mesma rede Wi-Fi**.
4. Se for Android, abra o Expo Go e escaneie o QR Code. Se for iPhone, abra o app de Câmera e aponte para o QR Code.
5. Abra a pasta `meu-primeiro-app` no VS Code.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O projeto foi criado com sucesso usando `--template blank`.
- [ ] O comando `npx expo start` funcionou e exibiu o QR Code.
- [ ] O aluno conseguiu abrir o aplicativo rodando no celular usando o Expo Go.
- [ ] A pasta principal está aberta no VS Code mostrando o arquivo `App.js`.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a programação, a curiosidade é fundamental! Assuma o controle do seu aprendizado: abra o arquivo `App.js` que o Expo gerou para você.

Você não entende a maioria do que está ali ainda, mas procure um texto que diz algo como *"Open up App.js to start working on your app!"*. Mude essa frase para "Este é meu primeiro aplicativo no SENAI!". Salve o arquivo (Ctrl+S) e olhe imediatamente para a tela do seu celular. Percebeu a mágica acontecendo ao vivo? Bem-vindo ao desenvolvimento Mobile!
