---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-05-documentacao-dinamica-com-swagger
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-05-documentacao-dinamica-com-swagger
sidebar_position: 5
title: Aula 05 — Documentação Dinâmica de APIs com Swagger UI
description: Documente suas rotas RESTful no padrão OpenAPI 3.0 e gere interfaces interativas com Swagger no Express.
---

# Aula 05 — Documentação Dinâmica de APIs com Swagger UI

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a documentar APIs profissionais no padrão OpenAPI 3.0 utilizando a biblioteca **Swagger UI Express**, permitindo que outros desenvolvedores (especialmente dos times Front-End e Mobile) compreendam e testem os endpoints interativamente diretamente pelo navegador.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- A importância de contratos de API claros na engenharia de software.
- A especificação OpenAPI 3.0 (estrutura de tags, paths, responses, schemas).
- Instalação e configuração do `swagger-ui-express`.
- Documentação de parâmetros de rota, corpos de requisição (`req.body`) e códigos de status.
- Testando endpoints interativamente pela interface do Swagger.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que é o Swagger / OpenAPI?
Quando desenvolvemos um servidor Back-End, a equipe de Front-End precisa saber exatamente:
* Qual é a URL do endpoint?
* É um método `GET`, `POST`, `PUT` ou `DELETE`?
* Quais parâmetros ou JSON ele espera receber?
* Quais status HTTP ele pode retornar e qual é a estrutura da resposta?

O **OpenAPI** é o padrão internacional adotado pela indústria para descrever APIs RESTful. O **Swagger UI** é uma ferramenta que lê essa especificação e gera automaticamente uma página web visual, elegante e interativa onde qualquer pessoa pode ler a documentação e clicar em **"Try it out"** para testar as rotas em tempo real!

### Instalação:
```bash
npm install swagger-ui-express
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Criando o Arquivo de Especificação: `src/docs/swagger.json`
```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Portal Técnico DS — API Back-End",
    "version": "1.0.0",
    "description": "Documentação oficial das rotas da API desenvolvida no curso Técnico em Desenvolvimento de Sistemas."
  },
  "servers": [
    {
      "url": "http://localhost:3333",
      "description": "Servidor de Desenvolvimento Local"
    }
  ],
  "paths": {
    "/usuarios": {
      "post": {
        "summary": "Cadastra um novo usuário",
        "tags": ["Usuários"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "nome": { "type": "string", "example": "Lucas Silva" },
                  "email": { "type": "string", "example": "lucas@email.com" },
                  "senha": { "type": "string", "example": "123456" }
                },
                "required": ["nome", "email", "senha"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Usuário criado com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": { "type": "string", "example": "a1b2c3d4" },
                    "nome": { "type": "string", "example": "Lucas Silva" },
                    "email": { "type": "string", "example": "lucas@email.com" }
                  }
                }
              }
            }
          },
          "400": { "description": "Erro de validação dos dados de entrada" },
          "409": { "description": "E-mail já existente no banco de dados" }
        }
      }
    }
  }
}
```

### 2. Configurando o Swagger no Servidor: `src/server.js`
```javascript
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Carrega o arquivo de especificação OpenAPI
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'docs/swagger.json'), 'utf-8')
);

// Disponibiliza a documentação na rota /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3333, () => {
  console.log('🚀 Servidor rodando!');
  console.log('📖 Documentação disponível em: http://localhost:3333/api-docs');
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o pacote `swagger-ui-express` no seu projeto.
2. Crie a pasta `src/docs` e o arquivo `swagger.json`.
3. Adicione a rota de listagem `GET /usuarios` na documentação, indicando os status 200 (sucesso) e exemplo de retorno em lista.
4. Inicie o servidor com `npm run dev` e abra a URL `http://localhost:3333/api-docs` no navegador.
5. Use o botão **"Try it out"** na interface do Swagger para enviar uma requisição real para o seu servidor e conferir a resposta!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A rota `/api-docs` carrega com a interface visual interativa do Swagger.
- [ ] A documentação inclui título, versão e descrição profissional do projeto.
- [ ] Os endpoints cadastrados apresentam exemplos claros de entrada e saída.
- [ ] É possível disparar requisições diretamente pela interface sem precisar do Postman.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione na documentação do Swagger um novo endpoint para buscar usuário por ID: `GET /usuarios/{id}`. Configure o campo `parameters` informando que o `{id}` é obrigatório no caminho (`in: "path"`). Teste a validação na interface visual!
