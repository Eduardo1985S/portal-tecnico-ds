---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-07-prisma-orm-modelagem-e-migrations
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-07-prisma-orm-modelagem-e-migrations
sidebar_position: 7
title: Aula 07 — Introdução ao Prisma ORM (Modelagem e Migrations)
description: Conecte o Node.js ao PostgreSQL usando o Prisma ORM, defina modelos de dados e execute migrações automáticas.
---

# Aula 07 — Introdução ao Prisma ORM (Modelagem e Migrations)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o conceito de ORM (Object-Relational Mapping), instalar e configurar o **Prisma ORM** em um projeto Node.js, definir tabelas através do arquivo declarativo `schema.prisma` e versionar o banco de dados com migrações automatizadas (*migrations*).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é um ORM e por que ele substitui a escrita manual e repetitiva de SQL puro no código de aplicação.
- Instalação do Prisma CLI e inicialização do projeto (`prisma init`).
- Sintaxe do arquivo `schema.prisma` (datasources, generators, models, types e diretivas).
- O conceito e a importância do controle de versão do banco com Migrations (`prisma migrate dev`).
- O utilitário visual Prisma Studio (`npx prisma studio`).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que é o Prisma ORM?
O **Prisma** é o ORM de última geração mais utilizado no ecossistema Node.js e TypeScript. Em vez de escrever queries como strings com `client.query("SELECT * FROM usuarios WHERE id = $1")`, o Prisma oferece uma API totalmente tipada e orientada a objetos:

```javascript
const usuario = await prisma.usuario.findUnique({ where: { id } });
```

### O que são Migrations?
Em projetos colaborativos, se um desenvolvedor criar uma nova coluna no banco da máquina dele, os outros desenvolvedores e o servidor de produção quebrarão se não souberem dessa alteração.

As **Migrations** funcionam como commits de Git, mas para a estrutura do banco de dados. Cada alteração no `schema.prisma` gera um arquivo SQL com carimbo de data/hora (timestamp) na pasta `prisma/migrations`, garantindo que todo o time tenha exatamente as mesmas tabelas sincronizadas.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Instalando o Prisma:
```bash
# Dependência de desenvolvimento (CLI)
npm install -D prisma

# Dependência de produção (Cliente gerado)
npm install @prisma/client

# Inicializar o Prisma configurando o PostgreSQL
npx prisma init --datasource-provider postgresql
```

### 2. Definindo o Modelo: `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Usuario {
  id        String   @id @default(uuid())
  nome      String
  email     String   @unique
  senha     String
  cargo     String   @default("ALUNO")
  criadoEm  DateTime @default(now()) @map("criado_em")
  atualizadoEm DateTime @updatedAt @map("atualizado_em")

  @@map("usuarios")
}
```

### 3. Executando a Primeira Migração:
Execute no terminal:
```bash
npx prisma migrate dev --name criar_tabela_usuarios
```

O Prisma irá:
1. Comparar seu banco de dados com o arquivo `schema.prisma`.
2. Gerar o script SQL correspondente na pasta `prisma/migrations/`.
3. Executar o SQL no PostgreSQL criando a tabela `usuarios`.
4. Gerar o cliente tipado `@prisma/client`.

### 4. Instanciando o Cliente Prisma: `src/database/prisma.js`
```javascript
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o Prisma no projeto e inicialize o schema para PostgreSQL.
2. Certifique-se de que a variável `DATABASE_URL` no `.env` aponta para o seu contêiner Docker da Aula 06.
3. No arquivo `prisma/schema.prisma`, defina o modelo `Usuario` conforme o exemplo e adicione também um modelo `Produto` com os campos:
   - `id`: String UUID
   - `nome`: String
   - `preco`: Float
   - `emEstoque`: Boolean com valor padrão `true`
   - `criadoEm`: DateTime
4. Execute `npx prisma migrate dev --name criar_usuarios_e_produtos`.
5. Execute no terminal `npx prisma studio` e confira a interface web interativa do Prisma aberta no navegador (`http://localhost:5555`)!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A pasta `prisma/` contém o `schema.prisma` e a pasta `migrations/`.
- [ ] As tabelas foram criadas com sucesso no PostgreSQL (verificáveis via DBeaver).
- [ ] O arquivo `src/database/prisma.js` exporta a instância única do `PrismaClient`.
- [ ] O comando `npx prisma studio` abre e permite navegar pelas tabelas.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione no modelo `Usuario` um campo opcional chamado `avatar` do tipo `String?` (com ponto de interrogação indicando que pode ser nulo). Execute uma nova migração com o comando `npx prisma migrate dev --name adicionar_avatar_usuario` e inspecione o arquivo SQL gerado para ver o comando `ALTER TABLE` criado pelo Prisma!
