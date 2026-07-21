---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-20-refinamento-e-projeto-final
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-20-refinamento-e-projeto-final
sidebar_position: 20
title: Aula 20 — Refinamento e Projeto Final
description: Conclua e polimente seu Projeto Integrador Back-End configurando suporte a CORS, elaborando a documentação no README.md e realizando a apresentação final da API RESTful.
---

# Aula 20 — Refinamento e Projeto Final

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Finalizar e polir o **Projeto Integrador de Back-End**, integrando o middleware de segurança **CORS (Cross-Origin Resource Sharing)** para permitir o consumo por aplicações Web e Mobile, redigir a documentação oficial do repositório no arquivo **`README.md`** e apresentar a API RESTful funcional.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Configuração do middleware de liberação de origem cruzada **CORS** (`npm install cors`).
- Preparação da documentação de repositório profissional em **`README.md`**.
- Testes finais de integração de ponta a ponta (E2E) com Postman/Swagger UI.
- Checklist de Validação Final da API Back-End.
- Publicação e apresentação do projeto final.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. Conectando o Back-End com o Mundo: O Middleware CORS
Por padrão de segurança da Web (Same-Origin Policy), navegadores bloqueiam que uma aplicação Frontend (ex: rodando na porta 5173 do Vite) faça requisições para uma API Back-End rodando em outra porta ou domínio (ex: porta 3000 do Express).

Para liberar o acesso seguro ao nosso Back-End, instalamos e aplicamos o middleware **`cors`**:

```bash
npm install cors
```

```javascript
import express from 'express';
import cors from 'cors';

const app = express();

// Libera requisições vindas de qualquer origem (Frontend/Mobile)
app.use(cors());

// Ou restringe apenas a origens específicas confiáveis:
// app.use(cors({ origin: 'http://localhost:5173' }));
```

---

### 2. O Cartão de Visitas do Repositório: `README.md`

Todo projeto profissional de Back-End deve conter um arquivo `README.md` explicativo contendo:

1. **Título e Descrição do Projeto.**
2. **Tecnologias Utilizadas:** Node.js, Express, ES Modules, Swagger UI, JSON File System.
3. **Instruções de Instalação e Execução:** Como rodar o `npm install` e `npm start`.
4. **Endereços Importantes:** Rota da API (`http://localhost:3000/api/v1/`) e Rota da Documentação (`http://localhost:3000/api-docs`).

---

### 3. Checklist de Validação Final do Projeto

```
[ CHECKLIST DE CONCLUSAO DE PROJETO ]
├── 1. ES Modules: Todos os arquivos usam import/export com a extensão .js
├── 2. Middleware CORS: Habilitado para integração com o Frontend
├── 3. Arquitetura MVC: Pastas controllers/, models/, repository/, routes/ organizadas
├── 4. Persistência JSON: Dados lidos e salvos em disco com node:fs/promises
├── 5. Documentação Swagger: Ativa e acessível em /api-docs
├── 6. Git & GitHub: Repositório com .gitignore (sem a pasta node_modules)
└── 7. README.md: Documentação com instruções passo a passo de inicialização
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Servidor Express Final Refinado (`src/app.js`)

```javascript
// src/app.js
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';

import eventoRoutes from './routes/eventoRoutes.js';
import inscricaoRoutes from './routes/inscricaoRoutes.js';
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
import { erroMiddleware } from './middlewares/erroMiddleware.js';

const require = createRequire(import.meta.url);
const swaggerDocument = require('./docs/swagger.json');

const app = express();
const PORTA = process.env.PORT || 3000;

// 1. Middlewares Globais de Segurança e Leitura de Dados
app.use(cors()); // Libera integração com Frontend e Mobile
app.use(express.json()); // Parser de JSON
app.use(loggerMiddleware); // Auditoria de Logs

// 2. Documentação Interativa Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 3. Rotas da API RESTful Versionada (v1)
app.use('/api/v1/eventos', eventoRoutes);
app.use('/api/v1/inscricoes', inscricaoRoutes);

// 4. Captura de Rota Não Encontrada (404)
app.use((req, res) => {
  return res.status(404).json({ 
    sucesso: false, 
    erro: 'Endpoint não encontrado na EventTech API.' 
  });
});

// 5. Middleware Centralizado de Tratamento de Erros (500)
app.use(erroMiddleware);

// 6. Inicialização do Servidor
app.listen(PORTA, () => {
  console.log("==================================================");
  console.log(`🎉 EVENTTECH API RESTful SUBIU COM SUCESSO!`);
  console.log(`🌐 Servidor rodando em  : http://localhost:${PORTA}`);
  console.log(`📄 Documentação Swagger: http://localhost:${PORTA}/api-docs`);
  console.log("==================================================");
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Polimento Final e Elaboração do README.md

**Objetivo:** Finalizar o Projeto Integrador, adicionando a biblioteca CORS e redigindo o arquivo `README.md` do repositório.

**Instruções:**
1. No seu projeto final, instale o pacote `cors` (`npm install cors`) e habilite-o no `app.js`.
2. Adicione um manipulador para rotas inexistentes (404) antes do `erroMiddleware`.
3. Na raiz do projeto, crie o arquivo `README.md` com o seguinte formato:
   ```markdown
   # 🚀 EventTech API - Sistema de Gestão de Eventos

   API RESTful desenvolvida em Node.js com arquitetura MVC, persistência de dados local em JSON e documentação OpenAPI.

   ## 🛠️ Tecnologias Utilizadas
   - **Node.js** (v18+)
   - **Express.js** (Framework Web)
   - **ES Modules** (Sintaxe moderna `import/export`)
   - **Swagger UI** (Documentação interativa)
   - **CORS** (Integração com Frontend)

   ## 🚀 Como Executar o Projeto
   1. Clone o repositório.
   2. Instale as dependências:
      ```bash
      npm install
      ```
   3. Inicie o servidor:
      ```bash
      npm start
      ```
   4. Acesse a documentação Swagger em: `http://localhost:3000/api-docs`
   ```
4. Teste a execução do comando `npm start`, acesse `http://localhost:3000/api-docs` e confirme que todas as rotas funcionam 100%!
5. Faça o commit final (`git commit -m "chore: finaliza documentacao e configuracoes de CORS do projeto"`) e apresente o projeto!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno instalou e configurou o middleware `cors` na aplicação Express.
- [ ] O aluno adicionou o tratamento para endpoints não encontrados (Status 404).
- [ ] O aluno redigiu o arquivo `README.md` com as instruções de instalação e uso.
- [ ] O aluno testou a API via Swagger UI e confirmou a persistência no arquivo JSON.
- [ ] O aluno concluiu e apresentou o Projeto Integrador de Back-End com sucesso.

---

## <i className="fa-solid fa-trophy" style={{ color: 'var(--ifm-color-primary)' }}></i> Parabéns!

Você concluiu a jornada de **Programação Back-End**! Agora você possui domínio para construir APIs RESTful profissionais com Node.js, Express, ES Modules, arquitetura MVC, tratamento de erros e documentação Swagger!
