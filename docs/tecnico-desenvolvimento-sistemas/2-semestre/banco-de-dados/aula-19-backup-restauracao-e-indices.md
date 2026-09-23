---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-19-backup-restauracao-e-indices
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-19-backup-restauracao-e-indices
sidebar_position: 19
title: "Aula 19 — Backup, Restauração e Otimização com Índices"
description: Proteja o patrimônio de dados da empresa com rotinas de backup e acelere consultas em até 100x com índices B-Tree.
---

# Aula 19 — Backup, Restauração e Otimização com Índices

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a garantir a continuidade de negócios e a proteção de dados através de estratégias de **Backup Lógico e Restauração de Bases** utilizando ferramentas de linha de comando (`pg_dump` e `psql`), e dominar técnicas de otimização de consultas através da criação de **Índices (`CREATE INDEX`)** e análise do plano de execução com `EXPLAIN ANALYZE`.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- A responsabilidade de proteger os dados: tipos de backup (Físico vs Lógico / Completo vs Incremental).
- Geração de dumps com o utilitário oficial `pg_dump`: exportando scripts SQL de estrutura e dados.
- Restauração de bases danificadas através do utilitário `psql`.
- Por que consultas ficam lentas: a varredura sequencial completa de tabela (*Seq Scan / Full Table Scan*).
- O que é um **Índice B-Tree**: a analogia do índice remissivo ao final de um livro.
- Criação de índices com `CREATE INDEX`.
- Como ler o plano de execução de uma consulta utilizando `EXPLAIN ANALYZE`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Imagine uma tabela com **10 milhões de linhas** de usuários:

### Sem Índice (Seq Scan)
Ao rodar `SELECT * FROM usuarios WHERE email = 'ana@gmail.com'`, o banco é forçado a ler linha por linha do início ao fim do disco, demorando vários segundos e fritando a CPU!

### Com Índice B-Tree (Index Scan)
O banco constrói uma árvore binária balanceada com os e-mails ordenados alfabeticamente na memória. O banco encontra o registro em apenas **3 ou 4 saltos de ponteiro**, respondendo em menos de **1 milissegundo**!

```text
              [ M ]
             /     \
          [ F ]   [ S ]
         /   \     /   \
       [A]   [H] [P]   [Z]
        │
   Encontra 'Ana' em 3 comparações!
```

> **Atenção:** Índices aceleram a **leitura** (`SELECT`), mas deixam a **escrita** (`INSERT`, `UPDATE`, `DELETE`) ligeiramente mais lenta, pois o banco precisa atualizar o índice a cada novo registro. Crie índices apenas em colunas frequentemente usadas em filtros `WHERE` ou `JOIN`!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como criar um índice e analisar o plano de execução:

```sql
-- 1. Analisando a consulta sem índice:
EXPLAIN ANALYZE 
SELECT * FROM clientes WHERE email = 'juliana.paes@email.com';
-- Resultado: "Seq Scan on clientes (cost=0.00..18.50 rows=1 width=132) (actual time=0.045..0.046 ms)"

-- 2. Criando o índice B-Tree na coluna email
CREATE INDEX idx_clientes_email ON clientes (email);

-- 3. Executando novamente o EXPLAIN ANALYZE:
EXPLAIN ANALYZE 
SELECT * FROM clientes WHERE email = 'juliana.paes@email.com';
-- Resultado: "Bitmap Index Scan on idx_clientes_email (actual time=0.008..0.009 ms)"
```

### Comandos de Terminal para Backup e Restauração:

```bash
# 1. Gerando o Backup Lógico (Dump em arquivo .sql)
pg_dump -U postgres -d meu_banco_producao > backup_2026_09_23.sql

# 2. Restaurando o Backup em uma nova base de dados
psql -U postgres -d nova_base_recuperada < backup_2026_09_23.sql
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra o DBeaver.
2. Crie um índice na coluna `id_categoria` da tabela de `produtos`:
   `CREATE INDEX idx_produtos_categoria ON produtos (id_categoria);`
3. Execute o comando `EXPLAIN` antes e depois em uma consulta filtrando por essa categoria.
4. Utilize a interface visual do DBeaver (clique com botão direito sobre o banco > **Ferramentas** > **Backup**) para exportar um arquivo `.sql` de cópia de segurança de todo o seu banco.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Compreensão das estratégias de recuperação de desastres (*Disaster Recovery*).
- [ ] Geração bem-sucedida de arquivo de dump SQL de backup.
- [ ] Criação de índice com a sintaxe `CREATE INDEX`.
- [ ] Interpretação do plano de execução com `EXPLAIN ANALYZE`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Descubra o que é um **Índice Composto (Multi-column Index)** no PostgreSQL (ex: `CREATE INDEX idx_nome_sobrenome ON clientes (sobrenome, nome)`) e em quais tipos de buscas combinadas ele deve ser utilizado!
