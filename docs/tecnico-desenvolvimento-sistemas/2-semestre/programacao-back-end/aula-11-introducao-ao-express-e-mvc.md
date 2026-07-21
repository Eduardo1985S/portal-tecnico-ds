---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-11-introducao-ao-express-e-mvc
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-11-introducao-ao-express-e-mvc
sidebar_position: 11
title: Aula 11 — Introdução ao Express e MVC
description: Aprenda a instalar e configurar o framework Express.js com ES Modules, entenda o padrão de arquitetura MVC (Model-View-Controller) e crie seu primeiro servidor Back-End estruturado.
---

# Aula 11 — Introdução ao Express e MVC

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Instalar e configurar o framework **Express.js** em um projeto Node.js moderno utilizando **ES Modules**, compreender os conceitos da arquitetura **MVC (Model-View-Controller)** e construir uma API com rotas básicas organizadas em controladores.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é o Express.js e suas vantagens em relação ao módulo HTTP nativo.
- Instalação de dependências via NPM (`npm install express`).
- Arquitetura de Software: O Padrão MVC (Model-View-Controller).
- Organização de pastas para projetos profissionais (`controllers/`, `models/`, `routes/`).
- Instanciação do aplicativo Express e envio de respostas em formato JSON (`res.json()`).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. O que é o Express.js?
O **Express.js** é o framework Web mais popular do ecossistema Node.js. Ele abstrai a complexidade do módulo HTTP nativo, fornecendo uma interface simples e robusta para:
- Criar servidores HTTP e definir rotas de forma expressiva.
- Manipular dados de requisição (`req`) e enviar respostas (`res`).
- Gerenciar Middlewares (interceptadores de requisição).

---

### 2. O Padrão de Arquitetura MVC (Model-View-Controller)
Para evitar que o código da API fique bagunçado em um único arquivo, utiliza-se a arquitetura **MVC**:

```
[ Cliente / Frontend ] <---> [ Controller ] <---> [ Model ] <---> [ Banco de Dados ]
                                   |
                                   v
                             [ View / JSON ]
```

1. **Model (Modelo):** Representa a estrutura de dados e as regras de negócio da aplicação (ex: Classe `Usuario` ou tabela do Banco de Dados).
2. **View (Visão):** Representa a camada visual. Em APIs RESTful modernas, a "View" é o próprio objeto JSON retornado no corpo da resposta HTTP.
3. **Controller (Controlador):** É o cérebro da rota. Recebe a requisição do cliente, processa a lógica chamando o Model e envia a resposta apropriada (`res.json()`).

---

### 3. Organização Profissional de Pastas

```
meu-projeto-express/
├── src/
│   ├── controllers/      # Controladores das rotas
│   │   └── produtoController.js
│   ├── models/           # Modelos de dados e classes
│   │   └── Produto.js
│   └── app.js            # Inicializador do servidor Express
├── package.json
└── .gitignore
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Construindo a Primeira API Express com Arquitetura MVC

#### Passo 1: Instale o Express
```bash
npm init -y
npm install express
```

#### Passo 2: Configure o `package.json`
```json
{
  "name": "primeiro-express-mvc",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/app.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}
```

#### Passo 3: Crie o Modelo (`src/models/Produto.js`)
```javascript
// src/models/Produto.js
export default class Produto {
  constructor(id, nome, preco) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
  }
}
```

#### Passo 4: Crie o Controlador (`src/controllers/produtoController.js`)
```javascript
// src/controllers/produtoController.js
import Produto from '../models/Produto.js';

// Simulação de banco de dados em memória
const produtos = [
  new Produto(1, 'Notebook Dell', 4500),
  new Produto(2, 'Mouse sem Fio', 120)
];

export const listarProdutos = (req, res) => {
  return res.status(200).json({
    sucesso: true,
    total: produtos.length,
    dados: produtos
  });
};

export const buscarStatusApi = (req, res) => {
  return res.status(200).json({
    status: 'ONLINE',
    mensagem: 'API Express MVC operacional!'
  });
};
```

#### Passo 5: Crie a Aplicação Express (`src/app.js`)
```javascript
// src/app.js
import express from 'express';
import { listarProdutos, buscarStatusApi } from './controllers/produtoController.js';

const app = express();
const PORTA = 3000;

// Configuração do middleware para aceitar JSON no corpo da requisição
app.use(express.json());

// Definição das rotas conectadas aos Controllers
app.get('/', buscarStatusApi);
app.get('/api/produtos', listarProdutos);

// Inicialização do servidor
app.listen(PORTA, () => {
  console.log("==========================================");
  console.log(`🚀 Servidor Express rodando em http://localhost:${PORTA}`);
  console.log("==========================================");
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### API de Gerenciamento de Alunos com Express e MVC

**Objetivo:** Criar um projeto Express configurado com ES Modules e organizar as rotas iniciais usando a estrutura MVC.

**Instruções:**
1. Crie a estrutura de pastas do projeto: `src/models/`, `src/controllers/` e o arquivo `src/app.js`.
2. Instale o Express (`npm install express`) e adicione `"type": "module"` no `package.json`.
3. Em `src/models/Aluno.js`, crie e exporte a classe `Aluno` (com `id`, `nome`, `curso`, `matriculado`).
4. Em `src/controllers/alunoController.js`, crie um array com 3 alunos mockados e crie as funções:
   - `getAlunos(req, res)`: Retorna a lista de alunos com status `200 OK` em JSON.
   - `getHealth(req, res)`: Retorna `{ status: "OK", timestamp: new Date() }`.
5. Em `src/app.js`, importe o Express e o controller, registre as rotas `GET /health` e `GET /alunos`, e coloque o servidor para rodar na porta `3000`.
6. Execute com `npm start` e teste o acesso no navegador em `http://localhost:3000/alunos`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno instalou o pacote `express` via NPM.
- [ ] O aluno configurou `"type": "module"` no `package.json` para usar `import express from 'express'`.
- [ ] O aluno entendeu os papéis das camadas Model, View e Controller no MVC.
- [ ] O aluno organizou o código dividindo as responsabilidades nas pastas `models/` e `controllers/`.
- [ ] O aluno utilizou `res.status().json()` para responder à requisição.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

O Express é a ferramenta mais utilizada em APIs Back-End com Node.js no mundo. Ao adotar a arquitetura MVC desde o início, você garante que seu projeto permaneça limpo e escalável!

**Desafio Extra:** Instale a biblioteca `nodemon` como dependência de desenvolvimento (`npm install -D nodemon`) e adicione o script `"dev": "nodemon src/app.js"` no `package.json` para reiniciar o servidor automaticamente ao salvar alterações!
