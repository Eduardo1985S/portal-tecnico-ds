---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-08-crud-conectado-ao-banco-de-dados
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-08-crud-conectado-ao-banco-de-dados
sidebar_position: 8
title: Aula 08 — Operações de CRUD Conectadas ao Banco de Dados
description: Substitua a persistência em memória e arquivos pelas operações completas de CRUD via Prisma Client no PostgreSQL.
---

# Aula 08 — Operações de CRUD Conectadas ao Banco de Dados

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a executar as operações fundamentais de manipulação de dados — **Create (Criar), Read (Consultar), Update (Atualizar) e Delete (Excluir)** — conectando a camada de serviços da API diretamente ao banco de dados relacional PostgreSQL por meio do Prisma Client.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Os métodos essenciais do Prisma Client:
  - `prisma.modelo.create()`
  - `prisma.modelo.findMany()` e `findUnique()`
  - `prisma.modelo.update()`
  - `prisma.modelo.delete()`
- Tratamento de exceções de integridade relacional do Prisma (código `P2002` - Unique Constraint Violation).
- Refatoração dos Services para trabalhar com operações assíncronas no banco de dados real.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Ao conectar nossos Services ao Prisma, abandonamos arrays em memória e arquivos locais. Agora, cada operação reflete instantaneamente em transações SQL no PostgreSQL.

### Métodos de Busca do Prisma:
* `findMany({ where: {...}, orderBy: {...} })`: Retorna um array com todos os registros que atendem aos critérios. Se nenhum for encontrado, retorna `[]`.
* `findUnique({ where: { id: ... } })`: Busca por um campo marcado como `@id` ou `@unique`. Retorna o objeto encontrado ou `null`.
* `findFirst({ where: {...} })`: Retorna o primeiro registro que satisfaz a condição.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Criando um Produto no Banco: `src/services/CriarProdutoService.js`
```javascript
import { prisma } from '../database/prisma.js';
import { AppError } from '../errors/AppError.js';

export class CriarProdutoService {
  async execute({ nome, preco, emEstoque }) {
    const produtoJaExiste = await prisma.produto.findFirst({
      where: { nome: { equals: nome, mode: 'insensitive' } },
    });

    if (produtoJaExiste) {
      throw new AppError('Já existe um produto cadastrado com este nome.', 409);
    }

    const produto = await prisma.produto.create({
      data: {
        nome,
        preco,
        emEstoque: emEstoque ?? true,
      },
    });

    return produto;
  }
}
```

### 2. Listando e Filtrando Produtos: `src/services/ListarProdutosService.js`
```javascript
import { prisma } from '../database/prisma.js';

export class ListarProdutosService {
  async execute({ apenasDisponiveis }) {
    const where = {};
    if (apenasDisponiveis === 'true') {
      where.emEstoque = true;
    }

    const produtos = await prisma.produto.findMany({
      where,
      orderBy: { nome: 'asc' },
    });

    return produtos;
  }
}
```

### 3. Atualizando Dados: `src/services/AtualizarProdutoService.js`
```javascript
import { prisma } from '../database/prisma.js';
import { AppError } from '../errors/AppError.js';

export class AtualizarProdutoService {
  async execute(id, { nome, preco, emEstoque }) {
    const produtoExiste = await prisma.produto.findUnique({ where: { id } });
    if (!produtoExiste) {
      throw new AppError('Produto não encontrado.', 404);
    }

    const produtoAtualizado = await prisma.produto.update({
      where: { id },
      data: { nome, preco, emEstoque },
    });

    return produtoAtualizado;
  }
}
```

### 4. Excluindo um Registro: `src/services/ExcluirProdutoService.js`
```javascript
import { prisma } from '../database/prisma.js';
import { AppError } from '../errors/AppError.js';

export class ExcluirProdutoService {
  async execute(id) {
    const produtoExiste = await prisma.produto.findUnique({ where: { id } });
    if (!produtoExiste) {
      throw new AppError('Produto não encontrado.', 404);
    }

    await prisma.produto.delete({ where: { id } });
    return { mensagem: 'Produto excluído com sucesso.' };
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Conecte o modelo `Usuario` da Aula 07 aos métodos `create` e `findMany` do Prisma.
2. Refatore o `CriarUsuarioService` para gravar o usuário diretamente no banco via `prisma.usuario.create()`.
3. Crie os serviços de `BuscarUsuarioPorIdService`, `AtualizarUsuarioService` e `ExcluirUsuarioService`.
4. Conecte todas as rotas no `UsuariosController` e teste o ciclo completo de CRUD no Postman:
   - Cadastre 3 usuários.
   - Liste os usuários salvos.
   - Atualize o nome de um deles.
   - Exclua o terceiro usuário e confira a remoção no **Prisma Studio** ou no **DBeaver**.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Todas as 4 operações de CRUD estão funcionando com persistência real no PostgreSQL.
- [ ] Tentativas de buscar, atualizar ou excluir IDs inexistentes retornam status 404.
- [ ] A unicidade de campos (ex: e-mail duplicado) é tratada adequadamente com status 409.
- [ ] Os dados permanecem intactos no banco mesmo após reiniciar o servidor Node.js.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Descubra como o Prisma permite selecionar apenas colunas específicas em vez de trazer todas as colunas da tabela. Adicione o modificador `select: { id: true, nome: true, email: true }` na consulta de listagem de usuários para que a coluna `senha` nunca seja devolvida na resposta pública da API!
