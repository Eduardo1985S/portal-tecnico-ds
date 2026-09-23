---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-14-ordenacao-paginacao-e-funcoes-escalares
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-14-ordenacao-paginacao-e-funcoes-escalares
sidebar_position: 14
title: "Aula 14 — Ordenação, Paginação e Funções Escalares"
description: Ordene resultados com ORDER BY, pagine consultas de grande volume com LIMIT/OFFSET e transforme dados com funções escalares.
---

# Aula 14 — Ordenação, Paginação e Funções Escalares

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a ordenar conjuntos de resultados com precisão através da cláusula `ORDER BY` (ascendente e descendente), implementar o algoritmo de **Paginação de Dados** no banco com `LIMIT` e `OFFSET` para alimentar tabelas e feeds em aplicações web/mobile, e dominar as principais funções escalares de manipulação de texto, números e datas.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- A cláusula `ORDER BY`: ordenando por uma ou mais colunas (`ASC` para crescente, `DESC` para decrescente).
- Ordenação com valores nulos: `NULLS FIRST` vs `NULLS LAST`.
- Paginação de dados no banco com `LIMIT` (quantidade de linhas) e `OFFSET` (quantas linhas pular).
- Funções escalares de manipulação de strings: `UPPER()`, `LOWER()`, `LENGTH()`, `CONCAT()`, `TRIM()`.
- Funções numéricas e de arredondamento: `ROUND()`, `CEIL()`, `FLOOR()`, `ABS()`.
- Funções temporais e de extração de datas: `NOW()`, `CURRENT_DATE`, `DATE_PART()` / `EXTRACT()`, `AGE()`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Por padrão, um banco de dados relacional retorna as linhas na ordem em que as encontra fisicamente nos blocos do disco. Se você não especificar `ORDER BY`, **a ordem dos dados nunca é garantida**!

### A Fórmula Matemática da Paginação

Quando uma tela de front-end exibe páginas com 10 itens por vez:
- **Página 1**: `LIMIT 10 OFFSET 0` (traz itens 1 a 10)
- **Página 2**: `LIMIT 10 OFFSET 10` (pula 10 itens e traz de 11 a 20)
- **Página 3**: `LIMIT 10 OFFSET 20` (pula 20 itens e traz de 21 a 30)

> **Fórmula Universal:**  
> `OFFSET = (numero_da_pagina - 1) * itens_por_pagina`

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como ordenar, paginar e utilizar funções de transformação:

```sql
-- 1. Ordenação múltipla: primeiro por categoria (A-Z) e depois pelo mais caro (DESC)
SELECT nome, id_categoria, preco_venda
FROM produtos
ORDER BY id_categoria ASC, preco_venda DESC;

-- 2. Top 3 produtos mais caros da loja
SELECT nome, preco_venda
FROM produtos
ORDER BY preco_venda DESC
LIMIT 3;

-- 3. Buscando a Página 2 de uma listagem (10 itens por página)
SELECT id_produto, nome, preco_venda
FROM produtos
ORDER BY id_produto ASC
LIMIT 10 OFFSET 10;

-- 4. Funções escalares de Texto e Data
SELECT 
    UPPER(nome) AS nome_maiusculo,
    CONCAT('R$ ', ROUND(preco_venda, 2)) AS preco_formatado,
    EXTRACT(YEAR FROM criado_em) AS ano_cadastro,
    AGE(NOW(), criado_em) AS tempo_ativo
FROM produtos;
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra o DBeaver.
2. Escreva uma consulta que traga os 5 clientes mais antigos da empresa, ordenados pela data de cadastro do mais antigo para o mais novo.
3. Escreva uma consulta para a tela de produtos que simule a Página 3 de uma busca com 4 produtos por página.
4. Utilize a função `CONCAT()` para montar uma coluna com a frase: `"O produto [NOME] custa R$ [PRECO]"`.
5. Calcule a idade em anos de cada aluno a partir da coluna `data_nascimento` utilizando `EXTRACT(YEAR FROM AGE(NOW(), data_nascimento))`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Ordenação explícita com `ORDER BY` utilizando `ASC` ou `DESC`.
- [ ] Implementação de paginação determinística com `LIMIT` e `OFFSET`.
- [ ] Aplicação de funções de manipulação de strings (`CONCAT`, `UPPER`).
- [ ] Extração de anos ou meses a partir de campos temporais com `EXTRACT`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Por que o uso de `OFFSET` muito alto (ex: `OFFSET 1000000`) se torna lento em bases com milhões de registros? Pesquise sobre a técnica de **Keyset Pagination (Seek Method)** que utiliza `WHERE id > ultimo_id_visto LIMIT 10`!
