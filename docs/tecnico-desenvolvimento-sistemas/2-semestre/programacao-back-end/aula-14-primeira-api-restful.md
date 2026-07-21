---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-14-primeira-api-restful
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-14-primeira-api-restful
sidebar_position: 14
title: Aula 14 — Primeira API RESTful
description: Construa sua primeira API RESTful completa integrando os conceitos de verbos HTTP, arquitetura MVC, padronização de recursos e códigos de status.
---

# Aula 14 — Primeira API RESTful

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender os princípios fundamentais da arquitetura **REST (Representational State Transfer)**, projetar URIs RESTful padronizadas em versão (`/api/v1/...`) e construir uma API RESTful funcional completa aplicando o mapeamento **CRUD** (Create, Read, Update, Delete) em memória.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O padrão arquitetural REST e suas regras de nomenclatura de recursos.
- Boas práticas em URIs: uso de substantivos no plural (`/produtos`, `/usuarios`).
- Mapeamento completo das operações CRUD com Verbos HTTP e Status Codes.
- Versionamento de rotas de API (`/api/v1/...`).
- Integração da arquitetura MVC com o Express em um projeto completo.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. O que é uma API RESTful?
Uma API é considerada **RESTful** quando atende aos princípios do estilo arquitetural REST (*Representational State Transfer*), criado por Roy Fielding.

#### Regras de Ouro de uma API RESTful:
1. **Recursos Baseados em Substantivos no Plural:** As URLs identificam recursos (coisas), nunca ações/verbos.
   - ❌ Errado: `/api/buscarProdutos`, `/api/cadastrarCliente`
   - ✅ Correto: `/api/v1/produtos`, `/api/v1/clientes`
2. **Uso Correto dos Verbos HTTP:** A ação é determinada pelo método HTTP, não pela URL.
3. **Stateless (Sem Estado):** Cada requisição contém todas as informações necessárias para ser processada.
4. **Respostas em Formato Padrão (JSON):** Comunicação padronizada com cabeçalho `Content-Type: application/json`.

---

### 2. Mapeamento Matriz RESTful (CRUD)

| Operação | Método HTTP | Rota (URI) | Status de Sucesso | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| **Create (Criar)** | `POST` | `/api/v1/tarefas` | `201 Created` | Adiciona uma nova tarefa |
| **Read All (Listar Todos)** | `GET` | `/api/v1/tarefas` | `200 OK` | Retorna lista de tarefas |
| **Read One (Buscar Único)**| `GET` | `/api/v1/tarefas/:id` | `200 OK` | Retorna os dados de uma tarefa |
| **Update (Atualizar)** | `PUT` | `/api/v1/tarefas/:id` | `200 OK` | Substitui os dados de uma tarefa |
| **Delete (Remover)** | `DELETE` | `/api/v1/tarefas/:id` | `200 OK` / `204` | Remove uma tarefa do sistema |

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Construindo a API RESTful de Gestão de Tarefas (Task API)

#### Estrutura do Projeto:
```
task-api/
├── src/
│   ├── controllers/
│   │   └── tarefaController.js
│   ├── models/
│   │   └── Tarefa.js
│   ├── routes/
│   │   └── tarefaRoutes.js
│   └── app.js
└── package.json
```

#### Arquivo 1: `src/models/Tarefa.js`
```javascript
// src/models/Tarefa.js
export default class Tarefa {
  constructor(id, titulo, descricao, concluida = false) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.concluida = concluida;
    this.criadoEm = new Date();
  }
}
```

#### Arquivo 2: `src/controllers/tarefaController.js`
```javascript
// src/controllers/tarefaController.js
import Tarefa from '../models/Tarefa.js';

// Banco de dados em memória inicial
let tarefas = [
  new Tarefa(1, 'Estudar ES Modules', 'Revisar sintaxe de import/export em Node.js', true),
  new Tarefa(2, 'Criar API RESTful', 'Implementar as 5 rotas CRUD no Express', false)
];

// GET /api/v1/tarefas (Read All)
export const listarTarefas = (req, res) => {
  return res.status(200).json({
    sucesso: true,
    total: tarefas.length,
    dados: tarefas
  });
};

// GET /api/v1/tarefas/:id (Read One)
export const buscarTarefaPorId = (req, res) => {
  const { id } = req.params;
  const tarefa = tarefas.find(t => t.id === Number(id));

  if (!tarefa) {
    return res.status(404).json({ sucesso: false, erro: 'Tarefa não encontrada!' });
  }

  return res.status(200).json({ sucesso: true, dados: tarefa });
};

// POST /api/v1/tarefas (Create)
export const criarTarefa = (req, res) => {
  const { titulo, descricao } = req.body;

  if (!titulo || !descricao) {
    return res.status(400).json({ 
      sucesso: false, 
      erro: 'Os campos titulo e descricao são obrigatórios!' 
    });
  }

  const novaTarefa = new Tarefa(
    tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
    titulo,
    descricao
  );

  tarefas.push(novaTarefa);
  return res.status(201).json({ sucesso: true, dados: novaTarefa });
};

// PUT /api/v1/tarefas/:id (Update)
export const atualizarTarefa = (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, concluida } = req.body;

  const index = tarefas.findIndex(t => t.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ sucesso: false, erro: 'Tarefa não encontrada para atualização!' });
  }

  // Atualizando os campos
  tarefas[index].titulo = titulo !== undefined ? titulo : tarefas[index].titulo;
  tarefas[index].descricao = descricao !== undefined ? descricao : tarefas[index].descricao;
  tarefas[index].concluida = concluida !== undefined ? concluida : tarefas[index].concluida;

  return res.status(200).json({ 
    sucesso: true, 
    mensagem: 'Tarefa atualizada com sucesso!', 
    dados: tarefas[index] 
  });
};

// DELETE /api/v1/tarefas/:id (Delete)
export const removerTarefa = (req, res) => {
  const { id } = req.params;
  const index = tarefas.findIndex(t => t.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ sucesso: false, erro: 'Tarefa não encontrada para remoção!' });
  }

  const tarefaRemovida = tarefas.splice(index, 1);
  return res.status(200).json({ 
    sucesso: true, 
    mensagem: 'Tarefa removida com sucesso!', 
    dados: tarefaRemovida[0] 
  });
};
```

#### Arquivo 3: `src/routes/tarefaRoutes.js`
```javascript
// src/routes/tarefaRoutes.js
import express from 'express';
import { 
  listarTarefas, 
  buscarTarefaPorId, 
  criarTarefa, 
  atualizarTarefa, 
  removerTarefa 
} from '../controllers/tarefaController.js';

const router = express.Router();

router.get('/', listarTarefas);
router.get('/:id', buscarTarefaPorId);
router.post('/', criarTarefa);
router.put('/:id', atualizarTarefa);
router.delete('/:id', removerTarefa);

export default router;
```

#### Arquivo 4: `src/app.js`
```javascript
// src/app.js
import express from 'express';
import tarefaRoutes from './routes/tarefaRoutes.js';

const app = express();
const PORTA = 3000;

app.use(express.json());

// Versionamento de rotas RESTful
app.use('/api/v1/tarefas', tarefaRoutes);

app.listen(PORTA, () => {
  console.log("==========================================");
  console.log(`🚀 API RESTful v1 rodando em http://localhost:${PORTA}/api/v1/tarefas`);
  console.log("==========================================");
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### API RESTful de Gestão de Veículos

**Objetivo:** Construir uma API RESTful completa com as 5 rotas CRUD para a entidade `Veiculo`.

**Instruções:**
1. Crie uma pasta de projeto Express com `"type": "module"` no `package.json`.
2. Em `src/models/Veiculo.js`, declare a classe `Veiculo` (atributos: `id`, `marca`, `modelo`, `ano`, `preco`).
3. Em `src/controllers/veiculoController.js`, implemente as funções CRUD:
   - `GET /api/v1/veiculos` (Listar todos)
   - `GET /api/v1/veiculos/:id` (Buscar por ID com tratamento de 404)
   - `POST /api/v1/veiculos` (Criar com validação de campos e status 201)
   - `PUT /api/v1/veiculos/:id` (Atualizar dados por ID)
   - `DELETE /api/v1/veiculos/:id` (Remover por ID)
4. Configure a rota em `src/routes/veiculoRoutes.js` e conecte no `src/app.js`.
5. Teste o funcionamento de todas as 5 rotas no Postman, Thunder Client ou cURL.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno aplicou os princípios RESTful utilizando substantivos no plural nas URIs.
- [ ] O aluno versionou as rotas da API com o prefixo `/api/v1/`.
- [ ] O aluno implementou com sucesso os 5 métodos CRUD (`GET`, `POST`, `PUT`, `DELETE`).
- [ ] O aluno utilizou os Status Codes corretos (`200`, `201`, `400`, `404`).
- [ ] O aluno organizou a aplicação seguindo o padrão arquitetural MVC.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Parabéns por construir sua primeira API RESTful completa! Nas próximas aulas, aprenderemos a **documentar** esta API e a persistir esses dados em arquivos locais JSON!

**Desafio Extra:** Adicione a funcionalidade de buscar veículos por marca utilizando Query Params na rota `GET /api/v1/veiculos?marca=Toyota`!
