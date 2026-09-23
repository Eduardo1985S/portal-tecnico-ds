---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-13-dql-consultas-basicas-select
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-13-dql-consultas-basicas-select
sidebar_position: 13
title: "Aula 13 — DQL: Consultas Básicas com SELECT"
description: Extraia informações valiosas do banco de dados dominando o comando SELECT, projeções, apelidos e filtros com WHERE.
---

# Aula 13 — DQL: Consultas Básicas com SELECT

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a recuperar e consultar dados com precisão utilizando a sublinguagem **DQL (Data Query Language)**, dominando a cláusula `SELECT`, projeção de colunas com apelidos (*Aliases* via `AS`), filtragem refinada de registros através da cláusula `WHERE`, operadores relacionais, lógicos e operadores especiais como `LIKE`, `BETWEEN`, `IN` e `IS NULL`.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- A estrutura essencial: `SELECT [colunas] FROM [tabela] WHERE [condicoes]`.
- Por que o uso de `SELECT *` em produção é um anti-padrão de performance.
- Renomeação de colunas no resultado visual com apelidos: `coluna AS "Novo Nome"`.
- Operadores relacionais: `=`, `<>`, `!=`, `<`, `>`, `<=`, `>=`.
- Operadores lógicos: `AND`, `OR`, `NOT` e a precedência de parênteses.
- Busca por padrões de texto com `LIKE` e `ILIKE` (PostgreSQL) usando coringas `%` e `_`.
- Filtros em faixas com `BETWEEN` e em listas de valores com `IN`.
- Tratamento de valores nulos: por que nunca devemos usar `= NULL` e sim `IS NULL` / `IS NOT NULL`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O `SELECT` é de longe o comando mais executado no dia a dia de qualquer sistema web ou mobile.

### A Lógica do Operador `LIKE`

Quando não sabemos o nome exato do produto ou procuramos por partes de palavras:
- `%`: Representa zero, um ou infinitos caracteres quaisquer.
- `_`: Representa exatamente um único caractere qualquer.

```sql
WHERE nome LIKE 'Teclado%'   -- Começa com "Teclado"
WHERE nome LIKE '%Gamer'     -- Termina com "Gamer"
WHERE nome LIKE '%Sem Fio%'  -- Contém "Sem Fio" em qualquer posição
```

### O Tratamento de `NULL`

Em bancos relacionais, `NULL` não é zero nem texto vazio; significa **desconhecido / ausente**.
Por isso, a comparação `salario = NULL` sempre avalia para falso!
A forma correta:
```sql
WHERE telefone IS NULL;       -- Registros sem telefone
WHERE telefone IS NOT NULL;   -- Registros que possuem telefone
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja exemplos práticos de consultas:

```sql
-- 1. Projeção de colunas específicas com Apelidos (Aliases)
SELECT 
    nome AS "Nome do Produto",
    preco_venda AS "Preço Unitário",
    estoque AS "Saldo em Estoque"
FROM produtos;

-- 2. Filtro com operadores lógicos combinados e parênteses
SELECT nome, preco_venda, estoque
FROM produtos
WHERE (id_categoria = 1 OR id_categoria = 2)
  AND preco_venda >= 100.00
  AND estoque > 0;

-- 3. Busca por faixa com BETWEEN e lista com IN
SELECT nome, preco_venda
FROM produtos
WHERE preco_venda BETWEEN 50.00 AND 300.00
  AND id_categoria IN (1, 3, 5);

-- 4. Busca textual com ILIKE (insensível a maiúsculas/minúsculas no PostgreSQL)
SELECT nome, codigo_barras
FROM produtos
WHERE nome ILIKE '%ergonômico%';
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra o DBeaver e conecte ao seu banco de dados com a tabela `produtos`.
2. Escreva consultas SQL para responder às seguintes perguntas de negócio:
   - "Quais produtos custam mais de R$ 200,00 e possuem menos de 10 unidades em estoque?"
   - "Quais clientes possuem e-mail que termina com `@senai.br`?"
   - "Quais produtos pertencem às categorias 1, 2 ou 4?"
   - "Quais produtos estão cadastrados sem código de barras (`codigo_barras IS NULL`)?"

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Projeção de campos específicos evitando `SELECT *`.
- [ ] Uso de apelidos de coluna limpos com a palavra-chave `AS`.
- [ ] Aplicação correta dos operadores lógicos `AND` e `OR` com parênteses.
- [ ] Uso do operador `IS NULL` para verificação de campos nulos.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Qual é a diferença entre os operadores `LIKE` e `ILIKE` no PostgreSQL, e como obter o mesmo comportamento de busca case-insensitive no MySQL usando `LOWER(campo) LIKE LOWER('%termo%')`?
