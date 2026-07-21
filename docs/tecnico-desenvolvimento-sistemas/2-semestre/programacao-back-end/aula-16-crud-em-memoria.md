---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-16-crud-em-memoria
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-16-crud-em-memoria
sidebar_position: 16
title: Aula 16 — CRUD em Memória
description: Aprofunde as operações CRUD em memória no Express aplicando validações de regras de negócio, garantia de unicidade (e-mail/CPF) e a diferença entre PUT e PATCH.
---

# Aula 16 — CRUD em Memória

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Consolidar a implementação de operações **CRUD (Create, Read, Update, Delete)** em memória, aplicar regras de negócio rigorosas (validação de dados e impedimento de duplicidade de e-mail/CPF), e compreender a diferença prática entre os métodos **`PUT` (substituição total)** e **`PATCH` (modificação parcial)**.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Métodos de busca e mutação em Arrays JavaScript (`findIndex`, `splice`, `find`, `some`).
- Geração de IDs únicos incrementais em memória.
- Validação de regras de negócio e prevenção de dados duplicados (Status `409 Conflict`).
- Diferenciação prática entre os verbos HTTP `PUT` e `PATCH`.
- Padrão Service/Repository simples para isolamento de dados.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. Regras de Negócio no CRUD
Construir um CRUD não é apenas receber dados e colocar em uma lista. O Back-End é o **guardião da integridade da aplicação**:

1. **Garantia de Unicidade:** Chaves únicas (como `email`, `cpf` ou `username`) nunca podem ser cadastradas em duplicidade. Quando o cliente tenta cadastrar uma chave existente, o servidor responde com `409 Conflict`.
2. **Validação de Campos:** Todos os campos obrigatórios devem ser checados antes de inserir no repositório.
3. **Imutabilidade de IDs:** O identificador (`id`) de um recurso jamais deve ser alterado durante um `PUT` ou `PATCH`.

---

### 2. `PUT` vs `PATCH`: Qual a Diferença?

| Característica | Método `PUT` | Método `PATCH` |
| :--- | :--- | :--- |
| **Escopo da Alteração** | Substituição **Completa** do objeto. | Modificação **Parcial** de campos específicos. |
| **Campos não enviados** | São redefinidos ou apagados/nulos. | Mantêm seus valores originais intactos. |
| **Exemplo de uso** | Atualizar o formulário completo do perfil. | Alterar apenas o campo `ativo: false` do usuário. |

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### API de Gerenciamento de Usuários com Regras de Negócio em Memória

#### Arquivo 1: `src/services/usuarioRepository.js`
```javascript
// src/services/usuarioRepository.js

let usuarios = [
  { id: 1, nome: 'Carlos Eduardo', email: 'carlos@email.com', ativo: true },
  { id: 2, nome: 'Beatriz Ramos', email: 'beatriz@email.com', ativo: true }
];

let proximoId = 3;

export const buscarTodosUsuarios = () => usuarios;

export const buscarUsuarioPorId = (id) => usuarios.find(u => u.id === Number(id));

export const buscarUsuarioPorEmail = (email) => usuarios.find(u => u.email === email);

export const cadastrarUsuario = (dados) => {
  const novoUsuario = {
    id: proximoId++,
    nome: dados.nome,
    email: dados.email,
    ativo: true
  };
  usuarios.push(novoUsuario);
  return novoUsuario;
};

export const substituirUsuario = (id, dados) => {
  const index = usuarios.findIndex(u => u.id === Number(id));
  if (index === -1) return null;

  // PUT: Substituição completa dos atributos (preservando o ID original)
  usuarios[index] = {
    id: Number(id),
    nome: dados.nome,
    email: dados.email,
    ativo: dados.ativo !== undefined ? dados.ativo : true
  };
  return usuarios[index];
};

export const atualizarParcialUsuario = (id, dados) => {
  const usuario = usuarios.find(u => u.id === Number(id));
  if (!usuario) return null;

  // PATCH: Altera apenas os campos enviados no body
  if (dados.nome !== undefined) usuario.nome = dados.nome;
  if (dados.email !== undefined) usuario.email = dados.email;
  if (dados.ativo !== undefined) usuario.ativo = dados.ativo;

  return usuario;
};

export const deletarUsuario = (id) => {
  const index = usuarios.findIndex(u => u.id === Number(id));
  if (index === -1) return false;

  usuarios.splice(index, 1);
  return true;
};
```

#### Arquivo 2: `src/controllers/usuarioController.js`
```javascript
// src/controllers/usuarioController.js
import * as repository from '../services/usuarioRepository.js';

export const getUsuarios = (req, res) => {
  const dados = repository.buscarTodosUsuarios();
  return res.status(200).json({ sucesso: true, total: dados.length, dados });
};

export const createUsuario = (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ sucesso: false, erro: 'Nome e email são obrigatórios.' });
  }

  // Regra de Negócio: Impedir e-mail duplicado (409 Conflict)
  const emailExistente = repository.buscarUsuarioPorEmail(email);
  if (emailExistente) {
    return res.status(409).json({ sucesso: false, erro: 'Já existe um usuário cadastrado com este e-mail.' });
  }

  const novo = repository.cadastrarUsuario({ nome, email });
  return res.status(201).json({ sucesso: true, dados: novo });
};

export const updateUsuarioPut = (req, res) => {
  const { id } = req.params;
  const { nome, email, ativo } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ sucesso: false, erro: 'PUT exige o envio completo de nome e email.' });
  }

  const atualizado = repository.substituirUsuario(id, { nome, email, ativo });
  if (!atualizado) {
    return res.status(404).json({ sucesso: false, erro: 'Usuário não encontrado.' });
  }

  return res.status(200).json({ sucesso: true, dados: atualizado });
};

export const updateUsuarioPatch = (req, res) => {
  const { id } = req.params;
  const atualizado = repository.atualizarParcialUsuario(id, req.body);

  if (!atualizado) {
    return res.status(404).json({ sucesso: false, erro: 'Usuário não encontrado.' });
  }

  return res.status(200).json({ sucesso: true, mensagem: 'Campos atualizados!', dados: atualizado });
};

export const deleteUsuario = (req, res) => {
  const { id } = req.params;
  const removido = repository.deletarUsuario(id);

  if (!removido) {
    return res.status(404).json({ sucesso: false, erro: 'Usuário não encontrado para remoção.' });
  }

  return res.status(200).json({ sucesso: true, mensagem: 'Usuário removido com sucesso.' });
};
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### CRUD de Estoque de Produtos com Validação de Regras

**Objetivo:** Implementar o CRUD completo para um sistema de produtos com validação de código de barras único (`sku`).

**Instruções:**
1. Crie a estrutura de um projeto Express com `"type": "module"`.
2. No repositório em memória de produtos, estruture a entidade: `{ id, sku, nome, preco, quantidade }`.
3. Implemente as validações de regra de negócio:
   - `POST /api/v1/produtos`: Impede o cadastro se o `sku` já existir na lista (`409 Conflict`).
   - `PUT /api/v1/produtos/:id`: Exige que todos os campos sejam informados (`400 Bad Request`).
   - `PATCH /api/v1/produtos/:id`: Permite alterar apenas a `quantidade` ou o `preco` isoladamente.
   - `DELETE /api/v1/produtos/:id`: Remove o produto do array e retorna `200 OK`.
4. Teste todas as rotas e valide o disparo da resposta `409 Conflict` ao enviar um `sku` repetido.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno compreendeu como gerenciar a manipulação de coleções em memória com funções de Array JS.
- [ ] O aluno aplicou a regra de negócio para evitar registros duplicados utilizando o código de resposta `409 Conflict`.
- [ ] O aluno entendeu a diferença entre a atualização total (`PUT`) e a atualização parcial (`PATCH`).
- [ ] O aluno desacoplou a camada de persistência em memória (Repository) dos manipuladores HTTP (Controllers).
- [ ] O aluno validou o correto retorno de status HTTP (`200`, `201`, `400`, `404`, `409`).

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

O CRUD em memória é excelente para prototipagem rápida e testes. Na próxima aula, daremos um grande passo rumo à persistência real salvando e lendo esses dados em um **arquivo físico JSON**!

**Desafio Extra:** Implemente um método de desativação lógica (Soft Delete) no lugar do `splice()`, apenas alterando a propriedade `deletado: true` do objeto!
