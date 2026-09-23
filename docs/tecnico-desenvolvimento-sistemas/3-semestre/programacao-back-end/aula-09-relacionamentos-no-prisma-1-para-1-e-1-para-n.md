---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-09-relacionamentos-no-prisma-1-para-1-e-1-para-n
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-09-relacionamentos-no-prisma-1-para-1-e-1-para-n
sidebar_position: 9
title: "Aula 09 — Relacionamentos no Prisma (1:1 e 1:N)"
description: Modele e consulte relacionamentos de Um para Um e Um para Muitos utilizando chaves estrangeiras com o Prisma ORM.
---

# Aula 09 — Relacionamentos no Prisma (1:1 e 1:N)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Modelar relacionamentos relacionais clássicos de **Um para Um (1:1)** e **Um para Muitos (1:N)** no arquivo `schema.prisma`, gerando as respectivas Chaves Estrangeiras (Foreign Keys) no PostgreSQL e realizando consultas com inclusão de dados relacionados (*Eager Loading* com `include`).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- A diretiva `@relation` e os campos `fields` e `references` no Prisma.
- Modelando relação 1:1 (ex: Usuário possui um único Perfil detalhado).
- Modelando relação 1:N (ex: Um Usuário possui muitos Pedidos / Postagens).
- A cláusula `include` para consultas agregadas sem necessidade de escrever `JOIN` manual.
- Criação aninhada de registros (*Nested Writes*).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Em bancos relacionais, tabelas conversam entre si por meio de **Chaves Primárias (PK)** e **Chaves Estrangeiras (FK)**:

1. **Relacionamento 1:1:** Cada registro da Tabela A está associado a no máximo um registro da Tabela B (ex: `Usuario` ↔ `Perfil`). A chave estrangeira é marcada como `@unique`.
2. **Relacionamento 1:N:** Cada registro da Tabela A pode estar associado a múltiplos registros da Tabela B (ex: `Usuario` ↔ `Pedido`). A chave estrangeira fica na tabela "filha" (no lado N).

No Prisma, nós declaramos tanto o campo escalar que guarda o ID (`usuarioId String`) quanto o campo de relação de navegação (`usuario Usuario @relation(...)`).

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Atualizando o `prisma/schema.prisma`
```prisma
model Usuario {
  id        String   @id @default(uuid())
  nome      String
  email     String   @unique
  senha     String

  // Relação 1:1 (Um usuário tem um perfil)
  perfil    Perfil?

  // Relação 1:N (Um usuário pode ter vários pedidos)
  pedidos   Pedido[]

  @@map("usuarios")
}

model Perfil {
  id         String   @id @default(uuid())
  biografia  String?
  telefone   String?
  usuarioId  String   @unique @map("usuario_id")
  usuario    Usuario  @relation(fields: [usuarioId], references: [id], onDelete: Cascade)

  @@map("perfis")
}

model Pedido {
  id         String   @id @default(uuid())
  total      Float
  status     String   @default("PENDENTE")
  criadoEm   DateTime @default(now()) @map("criado_em")

  usuarioId  String   @map("usuario_id")
  usuario    Usuario  @relation(fields: [usuarioId], references: [id], onDelete: Cascade)

  @@map("pedidos")
}
```

Execute a migração:
```bash
npx prisma migrate dev --name adicionar_perfis_e_pedidos
```

### 2. Criando com Dados Aninhados (Nested Write):
```javascript
// Criando o usuário e seu perfil em uma única operação atômica:
const novoUsuarioComPerfil = await prisma.usuario.create({
  data: {
    nome: 'Maria Fernandes',
    email: 'maria@email.com',
    senha: 'senhaSegura123',
    perfil: {
      create: {
        biografia: 'Desenvolvedora Full-Stack em formação no SENAI',
        telefone: '(11) 98765-4321',
      },
    },
  },
  include: {
    perfil: true, // Já devolve o perfil associado na resposta!
  },
});
```

### 3. Consultando Usuário com Todos os Seus Pedidos (`include`):
```javascript
const usuarioComPedidos = await prisma.usuario.findUnique({
  where: { id: usuarioId },
  include: {
    perfil: true,
    pedidos: {
      orderBy: { criadoEm: 'desc' },
    },
  },
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Adicione os modelos `Perfil` e `Pedido` ao seu arquivo `schema.prisma`.
2. Execute a migração do Prisma e verifique no DBeaver as Chaves Estrangeiras criadas com regras de integridade `ON DELETE CASCADE`.
3. Crie um endpoint `POST /pedidos` que receba o `usuarioId` e o `total`, criando o pedido vinculado ao usuário.
4. Crie o endpoint `GET /usuarios/:id/pedidos` que retorne os dados do usuário acompanhados da lista completa de seus pedidos realizados.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A migration foi aplicada com sucesso sem erros de integridade.
- [ ] O modelo `Perfil` possui relação 1:1 com chave estrangeira única.
- [ ] O modelo `Pedido` possui relação 1:N com o modelo `Usuario`.
- [ ] A consulta com `include` retorna os objetos aninhados no JSON de resposta.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Descubra o que a opção `onDelete: Cascade` faz na prática: exclua um usuário que possua 3 pedidos cadastrados. O que aconteceu com os pedidos dele no banco de dados? Explique a diferença entre `Cascade` e `Restrict` em integridade referencial!
