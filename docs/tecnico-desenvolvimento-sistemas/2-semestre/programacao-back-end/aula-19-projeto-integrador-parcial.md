---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-19-projeto-integrador-parcial
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-19-projeto-integrador-parcial
sidebar_position: 19
title: Aula 19 — Projeto Integrador Parcial
description: Desenvolva a primeira etapa do Projeto Integrador de Back-End criando uma API RESTful completa em MVC, com middlewares de validação, persistência local em JSON e documentação Swagger.
---

# Aula 19 — Projeto Integrador Parcial

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Construir a primeira entrega completa do **Projeto Integrador de Back-End (EventTech API)**, integrando a arquitetura **MVC**, roteamento RESTful com **ES Modules**, middlewares de validação/auditoria, persistência local assíncrona em arquivos JSON (`node:fs/promises`) e documentação interativa com **Swagger UI**.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Consolidação prática de todas as tecnologias estudadas no semestre.
- Arquitetura de API RESTful profissional em 4 camadas (`routes`, `controllers`, `repository`, `models`).
- Persistência em arquivos físicos JSON com `node:fs/promises`.
- Middlewares de log, validação de dados e tratamento centralizado de erros.
- Integração da especificação OpenAPI / Swagger UI na rota `/api-docs`.
- Versionamento com Git e Conventional Commits.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. O Escopo do Projeto Integrador: EventTech API

Nesta etapa, você atuará como desenvolvedor Back-End para criar a API que gerencia a plataforma de **Eventos e Inscrições (EventTech)**.

#### Entidades do Sistema:
1. **`Evento`:** `{ id, titulo, descricao, data, capacidade, vagasDisponiveis }`
2. **`Inscricao`:** `{ id, eventoId, nomeParticipante, emailParticipante, dataInscricao }`

---

### 2. Diagrama Arquitetural da Aplicação

```
                                  [ CLIENTE / POSTMAN / SWAGGER ]
                                                |
                                                v
                                        [ src/app.js ]
                                                |
                                                v
                                   [ Middlewares (Log, Error) ]
                                                |
                                                v
                                        [ src/routes/ ]
                                                |
                                                v
                                     [ src/controllers/ ]
                                                |
                                                v
                                    [ src/repository/ ]
                                                |
                                                v
                                    [ data/*.json (Disco) ]
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Estrutura de Código do Projeto EventTech API

#### Estrutura Completa de Pastas:
```
eventtech-api/
├── data/
│   ├── eventos.json
│   └── inscricoes.json
├── src/
│   ├── controllers/
│   │   └── eventoController.js
│   ├── docs/
│   │   └── swagger.json
│   ├── middlewares/
│   │   ├── loggerMiddleware.js
│   │   └── erroMiddleware.js
│   ├── models/
│   │   └── Evento.js
│   ├── repository/
│   │   └── eventoRepository.js
│   ├── routes/
│   │   └── eventoRoutes.js
│   └── app.js
├── .gitignore
└── package.json
```

#### 1. Repositório Assíncrono (`src/repository/eventoRepository.js`)
```javascript
// src/repository/eventoRepository.js
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PATH = path.join(__dirname, '../../data/eventos.json');

const inicializarArquivo = async () => {
  try {
    await fs.access(FILE_PATH);
  } catch {
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
    await fs.writeFile(FILE_PATH, '[]', 'utf-8');
  }
};

export const buscarTodos = async () => {
  await inicializarArquivo();
  const conteudo = await fs.readFile(FILE_PATH, 'utf-8');
  return JSON.parse(conteudo);
};

export const salvar = async (novoEvento) => {
  const eventos = await buscarTodos();

  const eventoComId = {
    id: eventos.length > 0 ? eventos[eventos.length - 1].id + 1 : 1,
    ...novoEvento,
    vagasDisponiveis: novoEvento.capacidade,
    criadoEm: new Date().toISOString()
  };

  eventos.push(eventoComId);
  await fs.writeFile(FILE_PATH, JSON.stringify(eventos, null, 2), 'utf-8');
  return eventoComId;
};
```

#### 2. Controlador (`src/controllers/eventoController.js`)
```javascript
// src/controllers/eventoController.js
import * as eventoRepo from '../repository/eventoRepository.js';

export const listarEventos = async (req, res, next) => {
  try {
    const eventos = await eventoRepo.buscarTodos();
    return res.status(200).json({ sucesso: true, total: eventos.length, dados: eventos });
  } catch (erro) {
    next(erro);
  }
};

export const criarEvento = async (req, res, next) => {
  try {
    const { titulo, descricao, data, capacidade } = req.body;

    if (!titulo || !data || !capacidade) {
      return res.status(400).json({ 
        sucesso: false, 
        erro: 'Os campos titulo, data e capacidade são obrigatórios.' 
      });
    }

    const novo = await eventoRepo.salvar({ titulo, descricao, data, capacidade: Number(capacidade) });
    return res.status(201).json({ sucesso: true, dados: novo });
  } catch (erro) {
    next(erro);
  }
};
```

#### 3. Servidor Principal (`src/app.js`)
```javascript
// src/app.js
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';

import eventoRoutes from './routes/eventoRoutes.js';
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
import { erroMiddleware } from './middlewares/erroMiddleware.js';

const require = createRequire(import.meta.url);
const swaggerDocument = require('./docs/swagger.json');

const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(loggerMiddleware);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas Versionadas
app.use('/api/v1/eventos', eventoRoutes);

// Tratamento de Erros
app.use(erroMiddleware);

app.listen(PORTA, () => {
  console.log("==========================================");
  console.log(`🚀 EventTech API v1 rodando em http://localhost:${PORTA}`);
  console.log(`📄 Swagger UI disponível em http://localhost:${PORTA}/api-docs`);
  console.log("==========================================");
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Desenvolvimento do Módulo de Inscrições do Projeto Integrador

**Objetivo:** Construir o segundo módulo do Projeto Integrador (`Inscricao`), integrando a verificação de vagas disponíveis do evento antes de confirmar o cadastro.

**Instruções:**
1. No seu projeto `EventTech API`, crie a camada `src/repository/inscricaoRepository.js` salvando em `data/inscricoes.json`.
2. Em `src/controllers/inscricaoController.js`, implemente a rota `POST /api/v1/inscricoes`:
   - Recebe `{ eventoId, nomeParticipante, emailParticipante }`.
   - **Regra de Negócio:** Busca o evento no `eventoRepository.js`. Se o evento não existir, retorna `404 Not Found`. Se `vagasDisponiveis` for 0, retorna `400 Bad Request` com a mensagem `"Evento lotado! Não há vagas disponíveis."`.
   - Se houver vaga, registra a inscrição no `inscricoes.json` e decrementa 1 de `vagasDisponiveis` no `eventos.json`.
3. Adicione as rotas no `inscricaoRoutes.js` e conecte no `app.js`.
4. Atualize o `swagger.json` documentando o novo endpoint de inscrições.
5. Faça commits semânticos no Git (`feat: implementa modulo de inscricoes com controle de vagas`).

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno organizou a aplicação inteiramente na estrutura arquitetural MVC.
- [ ] O aluno configurou ES Modules (`"type": "module"`) em todo o projeto.
- [ ] O aluno implementou a persistência de dados em arquivos JSON locais com `node:fs/promises`.
- [ ] O aluno aplicou validações de regras de negócio entre entidades (verificação de vagas do evento).
- [ ] O aluno documentou os endpoints na rota `/api-docs` com o Swagger.
- [ ] O aluno enviou o código para o repositório Git com `.gitignore` configurado.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Parabéns por concluir a primeira etapa do Projeto Integrador! Sua API possui arquitetura de nível profissional, persistência de dados e documentação oficial! Na próxima e última aula, faremos os **refinamentos finais e a apresentação do projeto**!

**Desafio Extra:** Adicione a funcionalidade de cancelar uma inscrição (`DELETE /api/v1/inscricoes/:id`), devolvendo automaticamente 1 vaga disponível para o evento correspondente!
