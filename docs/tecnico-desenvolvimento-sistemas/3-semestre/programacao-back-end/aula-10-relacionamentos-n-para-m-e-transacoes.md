---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-10-relacionamentos-n-para-m-e-transacoes
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-10-relacionamentos-n-para-m-e-transacoes
sidebar_position: 10
title: "Aula 10 — Relacionamentos N:M e Transações Atômicas"
description: Modele relacionamentos de Muitos para Muitos e garanta a integridade operacional com transações no Prisma.
---

# Aula 10 — Relacionamentos N:M e Transações Atômicas

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a modelar relacionamentos complexos de **Muitos para Muitos (N:M)** através de tabelas associativas e dominar a execução de **Transações Atômicas** com o método `prisma.$transaction`, garantindo a consistência das propriedades ACID em fluxos que envolvem múltiplas gravações simultâneas.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O conceito de relacionamentos N:M no modelo relacional (ex: Produtos e Categorias / Alunos e Cursos).
- Relacionamentos N:M implícitos vs. explícitos no Prisma.
- O perigo de falhas parciais em bancos de dados (ex: debitar saldo sem criar o pedido).
- As propriedades ACID (Atomicidade, Consistência, Isolamento e Durabilidade).
- Executando operações atômicas com `prisma.$transaction()`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que é uma Transação Atômica?
Imagine a seguinte operação de fechamento de pedido em um e-commerce:
1. Gravar o pedido na tabela `pedidos`.
2. Baixar a quantidade de estoque na tabela `produtos`.
3. Criar a cobrança na tabela `faturas`.

Se a etapa 3 falhar por falta de conexão, o que acontece? Sem transação, o cliente teve os produtos debitados do estoque mas nenhuma fatura foi gerada!

Com uma **Transação Atômica**, todas as operações são tratadas como uma única unidade indivisível: **ou todas são confirmadas (COMMIT) com sucesso, ou tudo é desfeito (ROLLBACK)**, mantendo o banco 100% íntegro.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Modelando Relação N:M: `prisma/schema.prisma`
```prisma
model Produto {
  id          String      @id @default(uuid())
  nome        String
  preco       Float
  categorias  Categoria[] // Relação N:M implícita!

  @@map("produtos")
}

model Categoria {
  id        String    @id @default(uuid())
  nome      String    @unique
  produtos  Produto[] // Relação N:M implícita!

  @@map("categorias")
}
```

O Prisma cria automaticamente a tabela intermediária de junção `_CategoriaToProduto` com índices otimizados no PostgreSQL!

### 2. Vinculando Categorias a um Produto:
```javascript
const produtoComCategorias = await prisma.produto.create({
  data: {
    nome: 'Notebook Gamer',
    preco: 5500.0,
    categorias: {
      connectOrCreate: [
        {
          where: { nome: 'Informática' },
          create: { nome: 'Informática' },
        },
        {
          where: { nome: 'Games' },
          create: { nome: 'Games' },
        },
      ],
    },
  },
  include: {
    categorias: true,
  },
});
```

### 3. Executando uma Transação Segura: `src/services/CriarPedidoTransacaoService.js`
```javascript
import { prisma } from '../database/prisma.js';
import { AppError } from '../errors/AppError.js';

export class CriarPedidoTransacaoService {
  async execute({ usuarioId, produtoId, quantidade }) {
    // Executa atomicamente: se qualquer passo falhar, desfaz todas as alterações!
    const resultado = await prisma.$transaction(async (tx) => {
      // 1. Busca o produto
      const produto = await tx.produto.findUnique({
        where: { id: produtoId },
      });

      if (!produto) {
        throw new AppError('Produto inexistente.', 404);
      }

      if (produto.quantidadeEstoque < quantidade) {
        throw new AppError('Estoque insuficiente para esta compra.', 400);
      }

      // 2. Cria o pedido
      const pedido = await tx.pedido.create({
        data: {
          usuarioId,
          total: produto.preco * quantidade,
        },
      });

      // 3. Atualiza o estoque do produto
      await tx.produto.update({
        where: { id: produtoId },
        data: {
          quantidadeEstoque: {
            decrement: quantidade, // Decrementa atomicamente
          },
        },
      });

      return pedido;
    });

    return resultado;
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Adicione o modelo `Categoria` ao seu arquivo `prisma/schema.prisma` e execute a migration.
2. Crie um endpoint `POST /categorias` para cadastrar categorias no sistema.
3. Crie um serviço de cadastro de produtos que vincule uma ou mais categorias existentes através de `categorias: { connect: [{ id: ... }] }`.
4. Implemente o serviço com `$transaction` garantindo que, se o estoque for insuficiente, nenhuma linha seja criada na tabela de pedidos.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A relação N:M entre Produtos e Categorias está modelada e migrada no PostgreSQL.
- [ ] A tabela de junção intermediária foi gerada automaticamente pelo Prisma.
- [ ] O método `prisma.$transaction()` encapsula as operações interdependentes.
- [ ] Falhas forçadas no meio da transação realizam rollback completo sem deixar lixo no banco.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Simule intencionalmente um erro no final da transação lançando `throw new Error('Falha simulada na emissão de fatura')` logo após a criação do pedido. Verifique no Prisma Studio se o estoque do produto voltou ao valor original ou se foi decrementado!
