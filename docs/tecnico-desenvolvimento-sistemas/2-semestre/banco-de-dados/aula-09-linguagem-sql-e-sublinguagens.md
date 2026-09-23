---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-09-linguagem-sql-e-sublinguagens
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-09-linguagem-sql-e-sublinguagens
sidebar_position: 9
title: "Aula 09 — Introdução à Linguagem SQL e Sublinguagens"
description: Conheça a história e padronização da linguagem SQL e domine as sublinguagens DDL, DML, DQL, DCL e TCL.
---

# Aula 09 — Introdução à Linguagem SQL e Sublinguagens

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender a história, a evolução e o padrão ANSI/ISO da linguagem **SQL (Structured Query Language)**, entender por que ela se tornou a língua franca universal dos bancos de dados relacionais e dominar a divisão conceitual das suas cinco sublinguagens: **DDL**, **DML**, **DQL**, **DCL** e **TCL**.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O nascimento da SQL no laboratório da IBM (System R) e sua padronização ANSI/ISO.
- SQL Declarativa vs Linguagens Imperativas (Java, Python, C): você diz ao banco **o que quer receber**, e o otimizador decide **como buscar**.
- As Cinco Sublinguagens da SQL:
  - **DDL (Data Definition Language)**: `CREATE`, `ALTER`, `DROP`, `TRUNCATE`.
  - **DML (Data Manipulation Language)**: `INSERT`, `UPDATE`, `DELETE`.
  - **DQL (Data Query Language)**: `SELECT`.
  - **DCL (Data Control Language)**: `GRANT`, `REVOKE`.
  - **TCL (Transaction Control Language)**: `COMMIT`, `ROLLBACK`, `SAVEPOINT`.
- Tipos de dados essenciais em SQL: tipos numéricos, literais/texto, temporais e booleanos.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

A linguagem SQL é dividida em grupos funcionais de acordo com o impacto da ação executada no banco:

```text
┌────────────────────────────────────────────────────────┐
│               AS SUBLINGUAGENS DA SQL                  │
└───────────────────────────┬────────────────────────────┘
                            │
  ├── DDL (Definição)   ──> Mexe na ESTRUTURA (Tabelas, Colunas, Índices)
  ├── DML (Manipulação) ──> Mexe nos DADOS (Grava, Altera, Apaga registros)
  ├── DQL (Consulta)    ──> Lê os DADOS (Consultas com SELECT)
  ├── DCL (Controle)    ──> Mexe nas PERMISSÕES dos usuários (Segurança)
  └── TCL (Transação)   ──> Controla as TRANSAÇÕES atômicas (Commit/Rollback)
```

### Principais Tipos de Dados Físicos em SQL

| Categoria | Tipo SQL | Uso Recomendado |
| :--- | :--- | :--- |
| **Inteiros** | `INT` / `BIGINT` | Chaves primárias, quantidades, contadores. |
| **Decimais Precisos** | `DECIMAL(10,2)` / `NUMERIC` | Valores monetários, preços (evita erros de arredondamento de float!). |
| **Texto de Tamanho Fixo** | `CHAR(2)` | Siglas conhecidas de tamanho fixo (ex: UF do estado `'SP'`, `'MG'`). |
| **Texto de Tamanho Variável** | `VARCHAR(100)` | Nomes, e-mails, senhas com limite máximo. |
| **Texto Longo** | `TEXT` | Artigos, descrições longas de produtos sem limite fixo. |
| **Data e Hora** | `TIMESTAMP` / `DATE` | Datas de agendamento, carimbos de transação. |
| **Booleano** | `BOOLEAN` | Flags verdadeiro/falso (`true` / `false`). |

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja exemplos de comandos pertencentes a cada uma das sublinguagens:

```sql
-- 1. DDL: Cria a estrutura de uma tabela
CREATE TABLE fornecedores (
    id_fornecedor SERIAL PRIMARY KEY,
    razao_social VARCHAR(150) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL
);

-- 2. DML: Insere dados dentro da tabela criada
INSERT INTO fornecedores (razao_social, cnpj) 
VALUES ('Tech Distribuidora LTDA', '12.345.678/0001-90');

-- 3. DQL: Consulta e lê os dados armazenados
SELECT razao_social, cnpj FROM fornecedores;

-- 4. DCL: Concede permissão de apenas leitura para o usuário 'estagiario'
GRANT SELECT ON fornecedores TO estagiario;

-- 5. TCL: Confirma ou descarta uma transação
BEGIN TRANSACTION;
UPDATE fornecedores SET razao_social = 'Tech Global' WHERE id_fornecedor = 1;
COMMIT; -- Efetiva a gravação definitiva
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra o editor de scripts no DBeaver.
2. Crie uma tabela de testes `cursos_tecnicos` contendo:
   - `id_curso` (SERIAL, Chave Primária)
   - `nome_curso` (VARCHAR de até 80 caracteres)
   - `carga_horaria` (INT)
   - `valor_mensalidade` (DECIMAL com 2 casas decimais)
   - `ativo` (BOOLEAN com valor padrão `TRUE`)
3. Classifique cada comando que você digitou de acordo com sua sublinguagem (DDL, DML ou DQL).

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Identificação correta das cinco sublinguagens da SQL.
- [ ] Escolha adequada de tipos de dados (evitando `FLOAT` para dinheiro, usando `DECIMAL`).
- [ ] Compreensão da natureza declarativa da SQL.
- [ ] Execução bem-sucedida do script no DBeaver.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Por que valores financeiros nunca devem ser gravados como `FLOAT` ou `DOUBLE` em bancos de dados? Pesquise sobre a representação IEEE 754 de ponto flutuante binário e como ela gera centavos fantasmas!
