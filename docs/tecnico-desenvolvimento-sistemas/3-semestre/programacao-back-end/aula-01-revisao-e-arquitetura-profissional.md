---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-01-revisao-e-arquitetura-profissional
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-01-revisao-e-arquitetura-profissional
sidebar_position: 1
title: Aula 01 — Revisão e Arquitetura Profissional de Projetos
description: Revisão das bases de Back-End, evolução arquitetural e configuração profissional de projetos Node.js com variáveis de ambiente.
---

# Aula 01 — Revisão e Arquitetura Profissional de Projetos

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Revisar os conceitos fundamentais de desenvolvimento Back-End aprendidos na etapa 1, compreender a necessidade de evolução para padrões profissionais de mercado, configurar um ambiente Node.js moderno e estruturar variáveis de ambiente seguras com suporte a múltiplos ambientes (desenvolvimento e produção).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O papel do Back-End na engenharia de software corporativa.
- Revisão do ciclo HTTP, status codes e padrão RESTful.
- Por que a persistência em arquivos JSON não escala para a realidade de mercado.
- Estruturação profissional de repositórios Node.js.
- Gestão de variáveis de ambiente com `dotenv` e boas práticas de segurança.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. Da Concepção Inicial à Arquitetura Profissional
No 2º semestre, construímos nossas primeiras APIs RESTful com Express, aplicando o padrão MVC e persistindo dados em arquivos JSON locais através do módulo `fs`. Embora essa abordagem seja excelente para aprender o ciclo de requisição e resposta, sistemas de missão crítica em produção exigem padrões mais robustos:

| Aspecto | Abordagem Inicial (Back-End I) | Padrão Profissional (Back-End II) |
| :--- | :--- | :--- |
| **Persistência** | Arquivos JSON locais (`fs/promises`) | Bancos de Dados Relacionais (PostgreSQL via Prisma ORM) |
| **Arquitetura** | Controllers acumulando validação e lógica | Camadas bem definidas (Routes ↔ Controllers ↔ Services) |
| **Segurança** | Senhas em texto puro | Hashing com Bcrypt e Autenticação JWT Stateless |
| **Validação** | Checagens manuais com `if/else` | Esquemas estritos e inferência de tipos com Zod |
| **Documentação** | Roteiros manuais | Swagger OpenAPI 3.0 dinâmico |

### 2. Gestão Segura de Variáveis de Ambiente
Em projetos profissionais, dados sensíveis (senhas de banco, segredos criptográficos, portas de rede) **nunca** devem ser inseridos diretamente no código-fonte nem versionados no GitHub.

Utilizamos o pacote `dotenv` para ler o arquivo `.env` local e disponibilizá-lo em `process.env`. Para a equipe, versionamos apenas um arquivo de modelo chamado `.env.example`.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Estrutura de Pastas Profissional
```
api-backend/
├── node_modules/
├── src/
│   ├── config/
│   │   └── env.js
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   └── server.js
├── .env
├── .env.example
├── .gitignore
└── package.json
```

### 1. Arquivo `.env.example`
```env
PORT=3333
NODE_ENV=development
DATABASE_URL="postgresql://usuario:senha@localhost:5432/meubanco"
JWT_SECRET="chave_secreta_para_token"
```

### 2. Configuração Centralizada: `src/config/env.js`
```javascript
import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || 3333,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
};
```

### 3. Servidor Inicial: `src/server.js`
```javascript
import express from 'express';
import { env } from './config/env.js';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
    ambiente: env.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

app.listen(env.port, () => {
  console.log(`🚀 Servidor rodando na porta ${env.port} em modo ${env.nodeEnv}`);
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma pasta para o projeto e inicialize um novo pacote Node.js (`npm init -y`).
2. Configure o `"type": "module"` no seu `package.json` para habilitar ES Modules (`import/export`).
3. Instale o Express e o Dotenv (`npm install express dotenv`).
4. Instale o Nodemon como dependência de desenvolvimento (`npm install -D nodemon`).
5. Configure os scripts `"dev": "nodemon src/server.js"` e `"start": "node src/server.js"`.
6. Crie os arquivos `.env`, `.env.example`, `.gitignore` (incluindo `node_modules` e `.env`) e teste a rota `/health` no navegador ou Postman.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O projeto foi inicializado com ES Modules configurado.
- [ ] O arquivo `.gitignore` protege os arquivos `.env` e a pasta `node_modules`.
- [ ] O arquivo `.env.example` serve como documentação clara para outros desenvolvedores.
- [ ] O script `npm run dev` inicializa o servidor automaticamente ao alterar o código.
- [ ] A rota `/health` responde com status 200 e informações do ambiente.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione uma validação no arquivo `src/config/env.js` que verifique se a variável `JWT_SECRET` foi definida. Se estiver rodando em ambiente de produção (`NODE_ENV === 'production'`) e a chave secreta for a padrão, lance um erro impedindo a inicialização insegura da aplicação!
