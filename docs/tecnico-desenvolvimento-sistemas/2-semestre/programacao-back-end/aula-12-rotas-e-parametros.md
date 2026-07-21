---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-12-rotas-e-parametros
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-12-rotas-e-parametros
sidebar_position: 12
title: Aula 12 — Rotas e Parâmetros
description: Domine os diferentes tipos de parâmetros no Express (Route Params, Query Params e Body Params) e modularize suas rotas usando express.Router().
---

# Aula 12 — Rotas e Parâmetros

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender e dominar a manipulação dos três tipos de parâmetros de requisição no Express (**`req.params`**, **`req.query`** e **`req.body`**), modularizar endpoints utilizando **`express.Router()`** e definir contratos claros de entradas e saídas nas respostas da API.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Modularização de rotas com `express.Router()`.
- Captura de parâmetros dinâmicos de URL com `req.params`.
- Captura de filtros e pesquisas na URL com `req.query`.
- Recebimento de payloads em JSON com `req.body`.
- Validação básica de entrada e tratamento de erros de rota (`400` e `404`).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. Os 3 Tipos de Parâmetros no Express

Para construir APIs RESTful completas, precisamos receber dados enviados pelo cliente de três formas diferentes:

| Tipo | Onde fica localizado? | Sintaxe no Express | Exemplo de URL / Uso |
| :--- | :--- | :--- | :--- |
| **Route Params** | Na estrutura da rota URL | `req.params` | `/api/produtos/:id` $\rightarrow$ `req.params.id` |
| **Query Params** | Após o caractere `?` na URL | `req.query` | `/api/produtos?categoria=ti&ordenar=preco` |
| **Body Params** | No corpo da requisição (JSON) | `req.body` | Enviado via `POST`/`PUT` com `express.json()` |

---

### 2. Detalhando Cada Tipo de Parâmetro

#### a) Route Params (`req.params`)
Utilizados para identificar um **recurso específico** obrigatoriamente.
```javascript
// Rota declarada com :id
app.get('/api/usuarios/:id', (req, res) => {
  const { id } = req.params; // Extrai o ID da URL
  console.log(`Buscando usuário com ID: ${id}`);
});
```

#### b) Query Params (`req.query`)
Utilizados para **filtros, pesquisas, ordenação e paginação** opcionais.
```javascript
// URL: /api/produtos?busca=notebook&limite=5
app.get('/api/produtos', (req, res) => {
  const { busca, limite } = req.query;
  console.log(`Filtro: ${busca} | Limite: ${limite}`);
});
```

#### c) Body Params (`req.body`)
Utilizados para enviar **dados complexos** ou cadastros (ex: formulários). Exige o middleware `app.use(express.json())`.
```javascript
app.post('/api/produtos', (req, res) => {
  const { nome, preco } = req.body;
  console.log(`Criando produto: ${nome} - R$ ${preco}`);
});
```

---

### 3. Modularizando Rotas com `express.Router()`
À medida que a aplicação cresce, isolamos o registro de rotas em arquivos dentro da pasta `routes/`:

```javascript
// src/routes/produtoRoutes.js
import express from 'express';
import { 
  listarProdutos, 
  buscarProdutoPorId 
} from '../controllers/produtoController.js';

const router = express.Router();

router.get('/', listarProdutos);
router.get('/:id', buscarProdutoPorId);

export default router;
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### API de Catálogo de Livros com Rotas e Parâmetros

#### Arquivo 1: `src/controllers/livroController.js`
```javascript
// src/controllers/livroController.js

const livros = [
  { id: 1, titulo: 'Clean Code', autor: 'Robert C. Martin', categoria: 'Tecnologia' },
  { id: 2, titulo: 'O Codificador Limpo', autor: 'Robert C. Martin', categoria: 'Tecnologia' },
  { id: 3, titulo: 'Duna', autor: 'Frank Herbert', categoria: 'Ficção' }
];

// GET /api/livros (Suporta Query Params: ?categoria=Ficcao)
export const listarLivros = (req, res) => {
  const { categoria } = req.query;

  if (categoria) {
    const filtrados = livros.filter(l => l.categoria.toLowerCase() === categoria.toLowerCase());
    return res.status(200).json({ total: filtrados.length, dados: filtrados });
  }

  return res.status(200).json({ total: livros.length, dados: livros });
};

// GET /api/livros/:id (Usa Route Params)
export const buscarLivroPorId = (req, res) => {
  const { id } = req.params;
  const livroEncontrado = livros.find(l => l.id === Number(id));

  if (!livroEncontrado) {
    return res.status(404).json({ sucesso: false, erro: 'Livro não encontrado!' });
  }

  return res.status(200).json({ sucesso: true, dados: livroEncontrado });
};

// POST /api/livros (Usa Body Params)
export const criarLivro = (req, res) => {
  const { titulo, autor, categoria } = req.body;

  // Validação básica de entrada
  if (!titulo || !autor) {
    return res.status(400).json({ 
      sucesso: false, 
      erro: 'Os campos titulo e autor são obrigatórios!' 
    });
  }

  const novoLivro = {
    id: livros.length + 1,
    titulo,
    autor,
    categoria: categoria || 'Geral'
  };

  livros.push(novoLivro);
  return res.status(201).json({ sucesso: true, dados: novoLivro });
};
```

#### Arquivo 2: `src/routes/livroRoutes.js`
```javascript
// src/routes/livroRoutes.js
import express from 'express';
import { 
  listarLivros, 
  buscarLivroPorId, 
  criarLivro 
} from '../controllers/livroController.js';

const router = express.Router();

router.get('/', listarLivros);
router.get('/:id', buscarLivroPorId);
router.post('/', criarLivro);

export default router;
```

#### Arquivo 3: `src/app.js`
```javascript
// src/app.js
import express from 'express';
import livroRoutes from './routes/livroRoutes.js';

const app = express();
const PORTA = 3000;

app.use(express.json());

// Registrando o módulo de rotas sob o prefixo /api/livros
app.use('/api/livros', livroRoutes);

app.listen(PORTA, () => {
  console.log("==========================================");
  console.log(`🚀 API de Livros rodando em http://localhost:${PORTA}`);
  console.log("==========================================");
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### API de Cadastro de Clientes com Filtros e Validação

**Objetivo:** Criar um módulo de rotas para gerenciamento de clientes que processe `req.params`, `req.query` e `req.body`.

**Instruções:**
1. Crie uma pasta de projeto Express modularizada com `"type": "module"`.
2. Em `src/routes/clienteRoutes.js`, configure as rotas:
   - `GET /api/clientes` (Aceita `req.query.status` para filtrar clientes ativos ou inativos).
   - `GET /api/clientes/:id` (Busca por `req.params.id`. Se o ID não existir, retorna `404 Not Found`).
   - `POST /api/clientes` (Recebe `req.body` contendo `{ nome, email, cpf }`. Valida se todos os campos foram enviados; se faltar algum, retorna `400 Bad Request`).
3. Conecte as rotas ao `src/app.js` usando `app.use('/api/clientes', clienteRoutes)`.
4. Teste as 3 rotas no navegador ou Postman/Thunder Client e valide os códigos de resposta `200`, `201`, `400` e `404`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno diferencou claramente `req.params`, `req.query` e `req.body`.
- [ ] O aluno utilizou `express.Router()` para separar a definição de rotas dos controladores.
- [ ] O aluno converteu o `req.params.id` de string para número (`Number(id)`).
- [ ] O aluno implementou validação básica retornando `400 Bad Request` quando necessário.
- [ ] O aluno configurou o middleware `express.json()` no arquivo principal.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

O domínio de parâmetros e rotas modularizadas é o que permite construir APIs RESTful limpas e padronizadas.

**Desafio Extra:** Tente criar uma rota dinamicamente composta com múltiplos parâmetros, como `/api/cursos/:cursoId/turmas/:turmaId` e extraia ambos no `req.params`!
