---
id: tutoriais-configurar-postgresql
slug: /tutoriais/configurar-postgresql
sidebar_position: 6
title: Instalar e Configurar o PostgreSQL
description: Guia de instalação do banco de dados relacional PostgreSQL e do utilitário pgAdmin.
---

# Instalar e Configurar o PostgreSQL

O **PostgreSQL** é um sistema gerenciador de banco de dados relacional (SGBDR) poderoso, de código aberto e muito utilizado no mercado. 

Junto com ele, geralmente instalamos o **pgAdmin**, que é uma ferramenta visual para gerenciar o banco de dados (criar tabelas, ver dados, fazer consultas SQL) sem precisar usar o terminal de linha de comando.

## 1. Download e Instalação

### Windows e macOS
A forma mais simples de instalar o PostgreSQL e o pgAdmin juntos é usando o instalador da EDB (EnterpriseDB).

1. Acesse a página de downloads: [postgresql.org/download/](https://www.postgresql.org/download/).
2. Selecione o seu sistema operacional.
3. Clique em **Download the installer**, que levará você para a página da EDB.
4. Baixe a versão mais recente para o seu sistema.
5. Execute o instalador baixado.

**Atenção aos passos durante a instalação:**
- O instalador perguntará quais componentes instalar. Deixe todos marcados: *PostgreSQL Server*, *pgAdmin 4*, *Stack Builder* e *Command Line Tools*.
- **Senha do Superusuário (postgres):** Esta é a etapa mais importante. Ele pedirá para você definir uma senha para o usuário padrão chamado `postgres`. **Anote esta senha ou escolha algo simples que não vá esquecer** (como `root`, `1234`, ou sua senha de preferência). Você precisará dela em todas as suas aplicações.
- **Porta:** Deixe a porta padrão `5432`.
- O resto você pode avançar mantendo o padrão (Next, Next, Install).

*(O passo final pode sugerir abrir o "Stack Builder" para baixar drivers e complementos extras, mas você pode desmarcar isso e apenas finalizar).*

### Linux (Ubuntu/Debian)
No Linux, usamos o gerenciador de pacotes:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```
E para instalar uma ferramenta visual no Linux, muitas pessoas preferem instalar o DBeaver ou conectar-se através de extensões do VS Code, pois instalar o pgAdmin nativamente via pacote pode ser mais trabalhoso.

## 2. Acessando pelo pgAdmin (Windows/Mac)

1. Procure e abra o **pgAdmin 4** no seu computador. (Ele abrirá em uma aba do seu navegador da web ou em uma janela própria dependendo da versão).
2. Na primeira vez, ele pode pedir para você definir uma senha "mestra" para o próprio programa pgAdmin. Defina e lembre-se dela.
3. Na barra lateral esquerda, clique na setinha para expandir os **Servers**.
4. Clique no servidor local (ex: *PostgreSQL 15*).
5. Ele solicitará a senha que você configurou durante a instalação (a senha do usuário `postgres`). Insira a senha.
6. Se expandir a pasta **Databases**, você verá que já existe um banco chamado `postgres` criado por padrão.

## 3. Criando um Novo Banco de Dados

1. No pgAdmin, clique com o botão direito em **Databases** > **Create** > **Database...**
2. Dê um nome ao seu banco (ex: `escola_db`). Não use espaços, prefira usar *underline* `_`.
3. Clique em **Save**.
4. Pronto! Seu banco está criado. Você já pode conectar a sua aplicação (Node.js, Java, Python, etc.) a ele.

## 4. Dados de Conexão Padrão

Sempre que a sua aplicação precisar da "String de Conexão" para se conectar ao banco na sua máquina, os dados padrão geralmente serão:
- **Host:** `localhost` (ou `127.0.0.1`)
- **Porta:** `5432`
- **Usuário:** `postgres`
- **Senha:** A senha que você definiu na instalação.
- **Banco de Dados:** O nome do banco que você criou (ex: `escola_db`).

Uma string de conexão comum tem esse formato: 
`postgresql://postgres:suasenha@localhost:5432/escola_db`
