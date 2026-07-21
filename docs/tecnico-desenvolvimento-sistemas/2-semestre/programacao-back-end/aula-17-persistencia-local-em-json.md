---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-17-persistencia-local-em-json
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-17-persistencia-local-em-json
sidebar_position: 17
title: Aula 17 — Persistência Local em JSON
description: Aprenda a criar um sistema de persistência de dados real salvando e lendo informações em arquivos JSON locais com o módulo nativo node:fs/promises e ES Modules.
---

# Aula 17 — Persistência Local em JSON

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o conceito de **Persistência de Dados**, utilizar o módulo nativo **`node:fs/promises`** do Node.js com funções assíncronas (`async/await`) e **ES Modules**, e construir um repositório que salva, atualiza e lê informações persistentes em um arquivo local `.json`.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O conceito de persistência de dados vs armazenamento volátil em memória.
- Operações de I/O (Input/Output) de arquivos com `node:fs/promises`.
- Métodos assíncronos: `fs.readFile()` e `fs.writeFile()`.
- Resolução segura de caminhos com `node:path` e `URL`.
- Tratamento de arquivo ausente (erro `ENOENT`) com criação automática.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. Por que precisamos de Persistência?
Até a aula anterior, todos os dados salvos na nossa API ficavam gravados apenas em variáveis na memória RAM. Quando o servidor era reiniciado ou caía, **todos os cadastros eram perdidos**.

A **Persistência de Dados** garante que as informações sejam gravadas em uma mídias não volátil (como o disco rígido ou SSD).

---

### 2. O Módulo `node:fs/promises` com ES Modules

No Node.js moderno, utilizamos a API baseada em Promises do módulo de sistema de arquivos (`node:fs/promises`):

```javascript
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Descobrindo o caminho do diretório atual em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho absoluto para o arquivo de banco de dados
const BANCO_PATH = path.join(__dirname, '../data/banco.json');
```

---

### 3. Ciclo de Leitura e Escrita de Arquivos JSON

```
[ Ação do Usuário (POST) ] ---> [ Ler banco.json existente ] ---> [ Inserir item no Array ] ---> [ Salvar banco.json ]
```

#### Operação 1: Leitura Assíncrona com `fs.readFile()`
```javascript
export const lerDados = async () => {
  try {
    const conteudo = await fs.readFile(BANCO_PATH, 'utf-8');
    return JSON.parse(conteudo);
  } catch (erro) {
    // Se o arquivo não existir (ENOENT), cria um array vazio inicial
    if (erro.code === 'ENOENT') {
      await fs.writeFile(BANCO_PATH, '[]', 'utf-8');
      return [];
    }
    throw erro;
  }
};
```

#### Operação 2: Escrita Assíncrona com `fs.writeFile()`
```javascript
export const salvarDados = async (dados) => {
  const jsonString = JSON.stringify(dados, null, 2);
  await fs.writeFile(BANCO_PATH, jsonString, 'utf-8');
};
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### API de Cadastro de Clientes com Banco JSON Físico

#### Arquivo 1: `src/repository/clienteRepository.js`
```javascript
// src/repository/clienteRepository.js
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');
const FILE_PATH = path.join(DATA_DIR, 'clientes.json');

// Função auxiliar para garantir a existência do arquivo
const inicializarArquivo = async () => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(FILE_PATH);
  } catch {
    await fs.writeFile(FILE_PATH, '[]', 'utf-8');
  }
};

export const buscarClientes = async () => {
  await inicializarArquivo();
  const dados = await fs.readFile(FILE_PATH, 'utf-8');
  return JSON.parse(dados);
};

export const salvarCliente = async (novoCliente) => {
  const clientes = await buscarClientes();

  const clienteComId = {
    id: clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1,
    ...novoCliente,
    cadastradoEm: new Date().toISOString()
  };

  clientes.push(clienteComId);
  await fs.writeFile(FILE_PATH, JSON.stringify(clientes, null, 2), 'utf-8');

  return clienteComId;
};

export const removerCliente = async (id) => {
  const clientes = await buscarClientes();
  const index = clientes.findIndex(c => c.id === Number(id));

  if (index === -1) return false;

  clientes.splice(index, 1);
  await fs.writeFile(FILE_PATH, JSON.stringify(clientes, null, 2), 'utf-8');
  return true;
};
```

#### Arquivo 2: `src/controllers/clienteController.js`
```javascript
// src/controllers/clienteController.js
import * as repo from '../repository/clienteRepository.js';

export const listar = async (req, res, next) => {
  try {
    const clientes = await repo.buscarClientes();
    return res.status(200).json({ sucesso: true, total: clientes.length, dados: clientes });
  } catch (erro) {
    next(erro);
  }
};

export const criar = async (req, res, next) => {
  try {
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ sucesso: false, erro: 'Nome e e-mail são obrigatórios.' });
    }

    const novo = await repo.salvarCliente({ nome, email });
    return res.status(201).json({ sucesso: true, dados: novo });
  } catch (erro) {
    next(erro);
  }
};

export const deletar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletado = await repo.removerCliente(id);

    if (!deletado) {
      return res.status(404).json({ sucesso: false, erro: 'Cliente não encontrado para remoção.' });
    }

    return res.status(200).json({ sucesso: true, mensagem: 'Cliente removido do arquivo local.' });
  } catch (erro) {
    next(erro);
  }
};
```

#### Arquivo 3: `src/app.js`
```javascript
// src/app.js
import express from 'express';
import { listar, criar, deletar } from './controllers/clienteController.js';

const app = express();
const PORTA = 3000;

app.use(express.json());

app.get('/api/v1/clientes', listar);
app.post('/api/v1/clientes', criar);
app.delete('/api/v1/clientes/:id', deletar);

app.listen(PORTA, () => {
  console.log("==========================================");
  console.log(`🚀 API com Persistência em JSON rodando em http://localhost:${PORTA}`);
  console.log("==========================================");
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Sistema Persistente de Chamados Técnicos

**Objetivo:** Criar um módulo de persistência local para salvar chamados de suporte em um arquivo chamado `data/chamados.json`.

**Instruções:**
1. Crie um projeto Express com `"type": "module"`.
2. Em `src/repository/chamadoRepository.js`, implemente as funções com `node:fs/promises`:
   - `obterChamados()`: Lê do arquivo `data/chamados.json`.
   - `adicionarChamado(dados)`: Adiciona um novo chamado (`{ id, titulo, descricao, status: "ABERTO" }`) e reescreve o arquivo JSON.
   - `atualizarStatus(id, novoStatus)`: Busca o chamado por ID, altera seu status (ex: "EM ANDAMENTO" ou "CONCLUÍDO") e salva o arquivo.
3. Crie os controllers e rotas equivalentes (`GET /api/v1/chamados`, `POST /api/v1/chamados` e `PATCH /api/v1/chamados/:id`).
4. Inicie o servidor, cadastre 2 chamados via Postman/Thunder Client, reinicie o servidor no terminal (`Ctrl + C` e `npm start`) e faça um `GET` para confirmar que os dados **continuam salvos no arquivo físico**!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno compreendeu o conceito de persistência de dados em arquivos locais.
- [ ] O aluno utilizou o módulo nativo `node:fs/promises` com sintaxe `async/await`.
- [ ] O aluno gerenciou o caminho absoluto do arquivo com `node:path` e `import.meta.url`.
- [ ] O aluno utilizou `JSON.parse()` na leitura e `JSON.stringify(dados, null, 2)` na escrita.
- [ ] O aluno confirmou que os dados permanecem salvos no arquivo após reiniciar a aplicação.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

A persistência em arquivos JSON é a ponte perfeita entre a lógica em memória e os Bancos de Dados Relacionais (SQL). Na próxima aula, aprenderemos a refatorar e consolidar essa estrutura!

**Desafio Extra:** Adicione uma trava de segurança com `try/catch` para que, caso o arquivo JSON seja corrompido manualmente por um usuário, o sistema faça o backup do arquivo quebrado com a extensão `.bak` e gere um novo arquivo JSON limpo!
