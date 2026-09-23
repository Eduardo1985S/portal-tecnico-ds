---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-10-ddl-criando-e-modificando-tabelas
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-10-ddl-criando-e-modificando-tabelas
sidebar_position: 10
title: "Aula 10 — DDL: Criando e Modificando Estruturas"
description: Domine os comandos DDL para criação de tabelas, modificação de colunas e gerenciamento de restrições em SQL.
---

# Aula 10 — DDL: Criando e Modificando Estruturas

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a traduzir um modelo relacional completo para a linguagem física do banco de dados utilizando a sublinguagem **DDL (Data Definition Language)**, dominando os comandos `CREATE TABLE`, `ALTER TABLE` e `DROP TABLE`, aplicando restrições de integridade no momento da criação e alterando esquemas existentes com segurança.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O comando `CREATE TABLE`: sintaxe, colunas, tipos e constraints inline vs out-of-line.
- Declaração de restrições: `PRIMARY KEY`, `FOREIGN KEY ... REFERENCES`, `NOT NULL`, `UNIQUE`, `DEFAULT`, `CHECK`.
- Nomeando constraints para facilitar futuras alterações (`CONSTRAINT pk_...`, `CONSTRAINT fk_...`).
- O comando `ALTER TABLE`:
  - Adicionando novas colunas (`ADD COLUMN`).
  - Modificando tipos de colunas (`ALTER COLUMN ... TYPE`).
  - Adicionando ou removendo constraints (`ADD CONSTRAINT`, `DROP CONSTRAINT`).
- O comando destrutivo `DROP TABLE` e o perigo de `DROP TABLE ... CASCADE`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Ao escrever um script DDL de criação de múltiplas tabelas, a **ordem dos comandos importa**!
Se a tabela `PEDIDOS` faz referência à tabela `CLIENTES` através de uma Chave Estrangeira, a tabela `CLIENTES` deve obrigatoriamente ser criada **antes**!

```text
Ordem Correta de Criação:
1. CREATE TABLE clientes ...      (Tabela independente - Pai)
2. CREATE TABLE produtos ...      (Tabela independente - Pai)
3. CREATE TABLE pedidos ...       (Depende de clientes)
4. CREATE TABLE itens_pedido ...  (Depende de pedidos e produtos)
```

Na hora de apagar (`DROP`), a ordem deve ser o **inverso**: primeiro apagam-se as tabelas filhas e, por último, as tabelas pais.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja um script DDL completo com convenção de nomenclatura de constraints:

```sql
-- 1. Criação da tabela Pai: Categorias
CREATE TABLE categorias (
    id_categoria SERIAL,
    nome VARCHAR(60) NOT NULL,
    descricao TEXT,
    CONSTRAINT pk_categorias PRIMARY KEY (id_categoria),
    CONSTRAINT uk_categorias_nome UNIQUE (nome)
);

-- 2. Criação da tabela Filha: Produtos com Chave Estrangeira
CREATE TABLE produtos (
    id_produto SERIAL,
    codigo_barras VARCHAR(13) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    preco_venda DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0,
    id_categoria INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints nomeadas explicitamente
    CONSTRAINT pk_produtos PRIMARY KEY (id_produto),
    CONSTRAINT uk_produtos_codigo UNIQUE (codigo_barras),
    CONSTRAINT chk_produtos_preco CHECK (preco_venda > 0),
    CONSTRAINT chk_produtos_estoque CHECK (estoque >= 0),
    CONSTRAINT fk_produtos_categoria 
        FOREIGN KEY (id_categoria) 
        REFERENCES categorias(id_categoria)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- 3. Exemplos de ALTER TABLE: Adicionando e alterando colunas
ALTER TABLE produtos ADD COLUMN peso_kg DECIMAL(6,3) DEFAULT 0.000;
ALTER TABLE produtos ALTER COLUMN nome TYPE VARCHAR(150);
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra o DBeaver conectado ao seu PostgreSQL.
2. Escreva um script DDL criando as seguintes tabelas para um sistema escolar:
   - `professores`: `id_professor`, `nome`, `cpf`, `especialidade`.
   - `disciplinas`: `id_disciplina`, `nome_disciplina`, `carga_horaria`, `id_professor` (FK).
3. Adicione uma constraint `CHECK` para que a `carga_horaria` seja sempre maior ou igual a 20.
4. Utilize o comando `ALTER TABLE` para adicionar uma coluna `email` na tabela de professores.
5. Inspecione o Diagrama ER gerado automaticamente pelo DBeaver para confirmar os relacionamentos.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Script DDL executado sem erros de sintaxe no DBeaver.
- [ ] Ordem correta de criação respeitando dependências de chaves estrangeiras.
- [ ] Constraints devidamente nomeadas (`pk_`, `fk_`, `chk_`, `uk_`).
- [ ] Modificação de estrutura realizada com sucesso via `ALTER TABLE`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Qual é a diferença fundamental de comportamento entre executar `DROP TABLE produtos;` e `TRUNCATE TABLE produtos;`?
