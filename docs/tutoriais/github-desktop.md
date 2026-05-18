---
id: tutoriais-github-desktop
slug: /tutoriais/github-desktop
sidebar_position: 4
title: Utilizar o GitHub Desktop
description: Guia de instalação e primeiros passos com o GitHub Desktop, uma interface visual para o Git.
---

# GitHub Desktop: Controle de Versão Visual

Embora seja muito importante aprender os comandos de terminal do Git (como `git commit`, `git push`, `git pull`), às vezes uma interface visual pode facilitar bastante a gestão dos seus repositórios e ajudar a entender o fluxo. O **GitHub Desktop** é a ferramenta oficial do GitHub para isso.

## 1. Download e Instalação

O GitHub Desktop está disponível para Windows e macOS.

1. Acesse o site: [desktop.github.com](https://desktop.github.com/).
2. Clique no botão de download para o seu sistema.
3. Execute o instalador baixado. A instalação é direta e não possui muitas etapas.

*(Nota para usuários Linux: Não há versão oficial do GitHub Desktop para Linux. Você pode usar clientes alternativos como o GitKraken, SmartGit ou usar extensões dentro do próprio VS Code).*

## 2. Primeiro Acesso e Login

1. Ao abrir o GitHub Desktop pela primeira vez, você será recebido por uma tela de boas-vindas.
2. Clique em **Sign in to GitHub.com**.
3. Uma janela do seu navegador se abrirá solicitando autorização. Se você já estiver logado no GitHub no navegador, basta confirmar. Caso contrário, faça login.
4. Após autorizar, retorne ao GitHub Desktop.
5. Em seguida, ele pedirá para configurar seu "Git Name" e "Email" (caso você já não tenha configurado via terminal). Insira seus dados para que eles sejam atrelados aos seus commits.

## 3. Operações Básicas

A tela inicial oferecerá as seguintes opções principais:

- **Clone a repository from the internet:** Para baixar um projeto que já existe no GitHub (seu ou de terceiros) para o seu computador.
- **Create a new repository on your hard drive:** Para iniciar um projeto do zero e criar a pasta onde ele viverá.
- **Add an existing repository from your hard drive:** Se você já começou um projeto no seu computador e agora quer controlá-lo com o GitHub Desktop.

### Realizando seu primeiro Commit (Salvamento)

1. Após abrir um repositório, faça uma alteração em algum arquivo do projeto usando o seu editor de código (como o VS Code).
2. Volte ao GitHub Desktop. Na aba **Changes** (à esquerda), você verá exatamente quais linhas de código foram adicionadas ou removidas.
3. Na caixa de texto no canto inferior esquerdo (Summary), escreva uma mensagem resumindo o que você fez (ex: "Criada a página de login"). A descrição (Description) é opcional.
4. Clique no botão azul **Commit to main** (ou o nome da sua branch atual).

### Enviando para o GitHub (Push)

O "Commit" salva as alterações apenas no seu computador. Para mandar para as nuvens (GitHub), você precisa fazer um **Push**.

- Se o projeto já estiver publicado no GitHub, clique no botão **Push origin** na barra superior.
- Se for um repositório novo que você acabou de criar no seu PC, clique em **Publish repository** para criar o projeto no seu perfil online do GitHub.

O GitHub Desktop simplifica muito esse fluxo visualizando o antes e depois do código sem a necessidade de comandos!
