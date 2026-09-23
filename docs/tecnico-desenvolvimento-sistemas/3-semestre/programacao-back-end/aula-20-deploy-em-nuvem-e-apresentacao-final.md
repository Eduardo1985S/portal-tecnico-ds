---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-20-deploy-em-nuvem-e-apresentacao-final
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-20-deploy-em-nuvem-e-apresentacao-final
sidebar_position: 20
title: Aula 20 — Publicação (Deploy) em Nuvem e Apresentação Final
description: Publique sua API Node.js e banco de dados PostgreSQL na nuvem e conclua a formação Back-End com portfólio profissional.
---

# Aula 20 — Publicação (Deploy) em Nuvem e Apresentação Final

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a realizar o **Deploy em Nuvem** de uma aplicação Node.js e de um banco de dados relacional PostgreSQL gerenciado utilizando plataformas de nuvem modernas (Render / Railway / Supabase), configurar variáveis de ambiente de produção e apresentar publicamente a API documentada e operacional.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O conceito de Deploy Contínuo (CD) integrado ao GitHub.
- Provisionamento de banco de dados PostgreSQL gerenciado na nuvem.
- Execução automatizada de migrações em ambientes remotos.
- Configuração de portas dinâmicas (`process.env.PORT`) e CORS em produção.
- Apresentação pública da documentação interativa Swagger hospedada.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que é o Deploy?
Deploy (ou Implantação) é o ato de mover uma aplicação que funciona na sua máquina local (`localhost`) para um servidor conectado 24 horas por dia à internet global com um endereço público (URL segura HTTPS).

Plataformas de nuvem modernas como **Render** e **Railway** oferecem integração nativa com o GitHub: cada vez que você faz um `git push` na branch `main`, a plataforma:
1. Detecta a alteração.
2. Faz o download do novo código.
3. Executa `npm install`.
4. Roda as migrações do banco (`npx prisma migrate deploy`).
5. Inicializa o servidor com `npm start`.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Roteiro de Publicação Passo a Passo (Render / Railway)

### 1. Criando o Banco de Dados PostgreSQL na Nuvem
1. Acesse [render.com](https://render.com) ou [railway.app](https://railway.app) e crie uma conta gratuita com seu GitHub.
2. Clique em **New +** → **PostgreSQL Database**.
3. Escolha um nome para o banco (ex: `api-tds-senai`), selecione a região mais próxima e clique em **Create Database**.
4. Copie a **Internal Database URL** (ou External URL) gerada pela plataforma.

### 2. Criando o Web Service da API Node.js
1. No painel, clique em **New +** → **Web Service**.
2. Conecte o repositório do seu GitHub onde a API está salva.
3. Preencha as configurações essenciais:
   - **Environment:** `Node`
   - **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command:** `npm start`
4. Na seção **Environment Variables**, adicione as variáveis necessárias:
   - `DATABASE_URL`: cole a URL do banco PostgreSQL criado no passo anterior.
   - `JWT_SECRET`: defina uma chave secreta longa e forte para produção.
   - `NODE_ENV`: `production`
5. Clique em **Deploy Web Service** e acompanhe os logs de inicialização!

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática: Apresentação Final

1. Obtenha a URL pública HTTPS gerada pela plataforma (ex: `https://api-tds-turma.onrender.com`).
2. Acesse a documentação do Swagger online adicionando `/api-docs` ao final da URL.
3. Diante da turma e do professor:
   - Demonstre a criação de um novo usuário via Swagger na nuvem.
   - Realize o login e copie o token JWT gerado.
   - Execute uma requisição autenticada comprovando a persistência no banco PostgreSQL em produção.
   - Apresente a arquitetura em 3 camadas e as boas práticas implementadas no repositório.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A API está publicada e acessível publicamente via protocolo seguro HTTPS.
- [ ] O banco de dados PostgreSQL na nuvem recebeu todas as migrações sem erros.
- [ ] A documentação interativa Swagger está disponível e funcional no endereço público.
- [ ] O `README.md` do repositório no GitHub exibe o link da API online e instruções completas.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Parabéns, Desenvolvedor(a) Back-End! 🎓

Você concluiu com maestria a trilha completa de **Programação Back-End**! Você dominou:
* Arquitetura em camadas desacopladas e princípios SOLID.
* Validação estrita de contratos de dados com Zod.
* Modelagem relacional e migrações com Prisma ORM e PostgreSQL.
* Segurança avançada com Hashing Bcrypt, Autenticação JWT e Autorização RBAC.
* Upload de arquivos, consumo de APIs externas e Deploy em Nuvem.

Seu Back-End agora está 100% pronto para atender as aplicações web com React e os aplicativos mobile com React Native desenvolvidos nas próximas disciplinas!
