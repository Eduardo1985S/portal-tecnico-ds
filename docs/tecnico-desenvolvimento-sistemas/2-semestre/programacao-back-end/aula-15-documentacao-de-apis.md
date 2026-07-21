---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-15-documentacao-de-apis
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-15-documentacao-de-apis
sidebar_position: 15
title: Aula 15 — Documentação de APIs
description: Aprenda a documentar e testar suas APIs RESTful profissionalmente utilizando Postman, Swagger UI e a especificação OpenAPI em Node.js com ES Modules.
---

# Aula 15 — Documentação de APIs

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender a importância da documentação para a integração de sistemas Back-End, criar coleções de testes automatizados com **Postman/Thunder Client** e integrar a interface gráfica interativa do **Swagger UI (`swagger-ui-express`)** em um servidor Express com **ES Modules**.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- A importância de APIs autodocumentadas e o padrão OpenAPI Specification (OAS).
- Organização de Coleções (Collections) e Variáveis de Ambiente (`{{base_url}}`) no Postman / Thunder Client.
- Instalação e integração do Swagger no Express (`swagger-ui-express`).
- Estruturação do arquivo de especificação `swagger.json`.
- Disponibilização da página interativa de documentação em `/api-docs`.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. Por que documentar uma API?
Uma API Back-End sem documentação é como uma caixa-preta: os desenvolvedores Front-End, Mobile e parceiros de integração não saberão quais rotas existem, quais cabeçalhos são necessários, qual o formato do JSON esperado no `body` ou quais códigos de erro podem ser retornados.

#### Benefícios de uma API Documentada:
- **Agilidade no Desenvolvimento:** Equipes de Front-End e Back-End trabalham em paralelo sem dúvidas sobre os contratos.
- **Padrão da Indústria:** Utilização da especificação **OpenAPI 3.0**.
- **Testabilidade:** A documentação interativa permite testar endpoints diretamente do navegador!

---

### 2. Ferramentas de Teste: Postman & Thunder Client

Antes de disponibilizar a API, testamos suas rotas utilizando clientes HTTP dedicados:

- **Collections:** Agrupam todas as rotas do projeto por recurso (ex: pasta `Tarefas`, pasta `Usuários`).
- **Environment Variables:** Permitem definir a URL base como variável (ex: `{{base_url}} = http://localhost:3000/api/v1`).

```
[ POSTMAN COLLECTION ]
└── 📁 Task API (v1)
    ├── 🟢 GET Listar Tarefas       ({{base_url}}/tarefas)
    ├── 🔵 POST Criar Tarefa        ({{base_url}}/tarefas)
    ├── 🟡 PUT Atualizar Tarefa     ({{base_url}}/tarefas/1)
    └── 🔴 DELETE Remover Tarefa    ({{base_url}}/tarefas/1)
```

---

### 3. O Ecossistema Swagger & `swagger-ui-express`
O **Swagger** é um conjunto de ferramentas de código aberto baseado na especificação OpenAPI que gera uma documentação visual moderna e interativa a partir de um arquivo `swagger.json`.

```bash
# Instalando o visualizador do Swagger para Express
npm install swagger-ui-express
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Integrando o Swagger UI no Express com ES Modules

#### Arquivo 1: `src/docs/swagger.json`
```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "API RESTful de Tarefas (Task API)",
    "description": "Documentação oficial das rotas da API RESTful do curso de Back-End.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:3000/api/v1",
      "description": "Servidor Local de Desenvolvimento"
    }
  ],
  "paths": {
    "/tarefas": {
      "get": {
        "summary": "Retorna a lista completa de tarefas",
        "responses": {
          "200": {
            "description": "Lista de tarefas retornada com sucesso"
          }
        }
      },
      "post": {
        "summary": "Cadastra uma nova tarefa",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "titulo": { "type": "string", "example": "Estudar Swagger" },
                  "descricao": { "type": "string", "example": "Documentar a API Express" }
                },
                "required": ["titulo", "descricao"]
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Tarefa criada com sucesso" },
          "400": { "description": "Dados de entrada inválidos" }
        }
      }
    }
  }
}
```

#### Arquivo 2: `src/app.js` (Com Importação de JSON em ES Modules)
```javascript
// src/app.js
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';

// Solução nativa para importar arquivos JSON no ES Modules
const require = createRequire(import.meta.url);
const swaggerDocument = require('./docs/swagger.json');

const app = express();
const PORTA = 3000;

app.use(express.json());

// Rota de Documentação Interativa Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Exemplo de rota
app.get('/api/v1/tarefas', (req, res) => {
  return res.json({ sucesso: true, dados: [] });
});

app.listen(PORTA, () => {
  console.log("==========================================");
  console.log(`🚀 Servidor rodando em http://localhost:${PORTA}`);
  console.log(`📄 Documentação Swagger em http://localhost:${PORTA}/api-docs`);
  console.log("==========================================");
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Documentando a API de Veículos com Swagger

**Objetivo:** Criar um arquivo de especificação OpenAPI (`swagger.json`) para a API de Veículos e integrar o `swagger-ui-express` no projeto.

**Instruções:**
1. Abra o projeto da API de Veículos (criado na Aula 14).
2. Instale o pacote `swagger-ui-express` (`npm install swagger-ui-express`).
3. Crie a pasta `src/docs/` e adicione o arquivo `swagger.json` documentando:
   - Rota `GET /api/v1/veiculos` (com status `200 OK`).
   - Rota `POST /api/v1/veiculos` (com schema do body: `marca`, `modelo`, `ano`, `preco`).
   - Rota `GET /api/v1/veiculos/{id}` (com o parâmetro de rota `id`).
4. Em `src/app.js`, importe o `swagger.json` usando `createRequire` e sirva o Swagger na rota `/api-docs`.
5. Inicie o servidor (`npm start`), acesse `http://localhost:3000/api-docs` no navegador e execute requisições de teste pela própria interface gráfica!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno compreendeu o papel do padrão OpenAPI 3.0 na especificação de APIs.
- [ ] O aluno organizou uma coleção de rotas e variáveis de ambiente no Postman / Thunder Client.
- [ ] O aluno instalou a dependência `swagger-ui-express`.
- [ ] O aluno utilizou `createRequire` para importar o arquivo `swagger.json` em ES Modules.
- [ ] O aluno disponibilizou e validou a interface gráfica interativa do Swagger na rota `/api-docs`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

A documentação viva (Swagger) garante que seu projeto seja 100% profissional e pronto para consumo por equipes de desenvolvimento em qualquer lugar do mundo!

**Desafio Extra:** Adicione ao `swagger.json` a descrição da rota `DELETE /api/v1/veiculos/{id}` incluindo a resposta de erro `404 Not Found`!
