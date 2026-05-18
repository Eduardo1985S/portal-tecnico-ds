---
id: tutoriais-publicar-na-vercel
slug: /tutoriais/publicar-na-vercel
sidebar_position: 6
title: Publicar na Vercel
description: Aprenda a hospedar seu projeto web gratuitamente na plataforma Vercel.
---

# Publicar sua Aplicação na Vercel

A **Vercel** é uma plataforma focada em performance e facilidade de uso para hospedagem de sites estáticos, aplicações front-end (React, Vue, etc.) e funções Serverless (como projetos Next.js). A integração deles com o GitHub é um de seus maiores diferenciais.

A Vercel oferece um plano gratuito generoso, ideal para estudantes e portfólios.

## Pré-requisitos

Para que a publicação seja fluida, certifique-se de que:
1. Seu projeto está com o código funcionando na sua máquina.
2. Seu projeto está versionado com Git.
3. O código foi enviado (push) para um repositório no **GitHub**.

## Passo a Passo para Deploy (Publicação)

### 1. Criar uma conta na Vercel
1. Acesse [vercel.com](https://vercel.com/).
2. Clique em **Sign Up**.
3. Selecione a opção **Continue with GitHub**. (Isso é muito importante, pois conecta a Vercel aos seus repositórios e simplifica todo o processo).

### 2. Importar o Repositório
1. Após logar, você cairá no Dashboard (Painel de Controle).
2. Clique no botão **Add New...** e selecione **Project**.
3. Na tela "Import Git Repository", você verá a lista dos seus repositórios do GitHub. 
   - *Nota:* Caso não veja seus projetos, clique em "Adjust GitHub App Permissions" e permita que a Vercel leia todos os seus repositórios.
4. Encontre o repositório que deseja publicar e clique em **Import**.

### 3. Configurar o Projeto
Na próxima tela, a Vercel tentará detectar automaticamente que tipo de projeto é o seu (React, Next.js, HTML simples, Vite, etc.).

- **Project Name:** O nome do seu projeto na Vercel (este será parte do URL provisório gerado).
- **Framework Preset:** Se a Vercel não acertou o seu framework, você pode corrigir manualmente.
- **Root Directory:** Apenas altere se o seu código fonte não estiver na raiz do repositório (por exemplo, se estiver dentro de uma pasta `frontend/`).
- **Build and Output Settings:** Normalmente, você não precisa alterar isso, pois os comandos padrão de compilação daquele framework serão aplicados.
- **Environment Variables:** Se o seu projeto precisa de variáveis de ambiente (como senhas de banco de dados ou chaves de API), você deve adicioná-las aqui.

### 4. Deploy!
1. Após verificar as configurações, clique em **Deploy**.
2. A Vercel iniciará o processo de "Build". Você verá um terminal rodando comandos e gerando a versão de produção do seu site.
3. Se houver algum erro no seu código, a compilação falhará e você verá o erro ali.
4. Se tudo der certo, você será redirecionado para uma tela comemorativa com o screenshot do seu site recém-publicado!

### 5. Deploy Contínuo
Uma vez que o projeto está linkado, **você não precisa repetir esse processo**. 
Sempre que você fizer um novo commit e enviar (push) para a *branch principal* (ex: `main`) do seu repositório no GitHub, a Vercel detectará a mudança e atualizará seu site automaticamente.

## Alterando o Domínio (Opcional)
Por padrão, a Vercel gera um link como `seunome-seuprojeto.vercel.app`.
Se você comprar um domínio personalizado (ex: `meusite.com.br`), poderá configurá-lo acessando o seu projeto no Dashboard > Settings > Domains.
