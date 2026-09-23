---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-15-funcoes-de-agregacao-e-agrupamento-group-by
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-15-funcoes-de-agregacao-e-agrupamento-group-by
sidebar_position: 15
title: "Aula 15 — Funções de Agregação e Agrupamento com GROUP BY"
description: Gere relatórios analíticos sumarizados utilizando COUNT, SUM, AVG, MIN, MAX, GROUP BY e a cláusula HAVING.
---

# Aula 15 — Funções de Agregação e Agrupamento com GROUP BY

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a gerar relatórios analíticos sumarizados a partir de grandes volumes de dados no banco, dominando as cinco funções de agregação fundamentais (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`), compreendendo a mecânica da cláusula de agrupamento `GROUP BY` e dominando a diferença crucial entre a filtragem de linhas (`WHERE`) e a filtragem de grupos agregados (`HAVING`).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que são Funções Agregadas: funções que processam múltiplas linhas e devolvem um único valor resumido.
- As 5 funções essenciais:
  - `COUNT(*)` vs `COUNT(coluna)` (tratamento de nulos) e `COUNT(DISTINCT coluna)`.
  - `SUM(coluna)`: Somatório numérico total.
  - `AVG(coluna)`: Média aritmética simples.
  - `MIN(coluna)` e `MAX(coluna)`: Menor e maior valor.
- A cláusula `GROUP BY`: agrupando linhas com valores idênticos em linhas de resumo.
- A regra fundamental da SQL: todas as colunas no `SELECT` que não estão em funções agregadas **devem obrigatoriamente estar no `GROUP BY`**.
- A cláusula `HAVING`: filtrando grupos calculados após a agregação.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O fluxo de processamento de uma consulta agregada na engine do banco segue uma ordem rígida:

```text
1. FROM / JOIN  ──> Localiza as tabelas no disco
2. WHERE        ──> Filtra LINHAS individuais ANTES de agrupar
3. GROUP BY     ──> Junta as linhas em grupos (ex: agrupa por categoria)
4. HAVING       ──> Filtra os GRUPOS CALCULADOS (ex: só grupos com SUM > 1000)
5. SELECT       ──> Projeta as colunas e executa as agregações
6. ORDER BY     ──> Ordena o resultado final
7. LIMIT        ──> Corta a quantidade de linhas exibidas
```

### Por que não podemos usar Funções Agregadas no `WHERE`?

```sql
-- ERRO GRAVE DE SINTAXE!
-- O WHERE executa ANTES do banco saber a média das notas!
SELECT nome FROM alunos WHERE nota > AVG(nota); 

-- Para filtrar grupos agregados usamos HAVING:
SELECT id_categoria, COUNT(*) 
FROM produtos 
GROUP BY id_categoria 
HAVING COUNT(*) > 5; -- Apenas categorias com mais de 5 produtos cadastrados!
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja relatórios analíticos de faturamento e estoque:

```sql
-- 1. Resumo Geral de Toda a Loja
SELECT 
    COUNT(*) AS total_itens_cadastrados,
    SUM(estoque) AS unidades_fisicas_totais,
    ROUND(AVG(preco_venda), 2) AS preco_medio_produtos,
    MIN(preco_venda) AS produto_mais_barato,
    MAX(preco_venda) AS produto_mais_caro
FROM produtos;

-- 2. Resumo Agrupado por Categoria (GROUP BY)
SELECT 
    id_categoria,
    COUNT(*) AS quantidade_produtos,
    SUM(estoque * preco_venda) AS valor_patrimonial_estoque,
    ROUND(AVG(preco_venda), 2) AS media_preco_categoria
FROM produtos
GROUP BY id_categoria
ORDER BY valor_patrimonial_estoque DESC;

-- 3. Filtrando Grupos com HAVING
-- Mostra apenas categorias que possuem estoque com valor patrimonial superior a R$ 5.000,00
SELECT 
    id_categoria,
    COUNT(*) AS total_itens,
    SUM(estoque * preco_venda) AS total_em_reais
FROM produtos
WHERE preco_venda > 10.00 -- Filtro de linha: só produtos de mais de 10 reais
GROUP BY id_categoria
HAVING SUM(estoque * preco_venda) > 5000.00 -- Filtro de grupo: total maior que 5 mil
ORDER BY total_em_reais DESC;
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra o DBeaver.
2. Escreva consultas agregadas para gerar os seguintes relatórios para a diretoria:
   - "Qual é a média de carga horária dos cursos cadastrados na escola?"
   - "Quantos professores estão cadastrados no total e quantos possuem especialidade preenchida (`COUNT(especialidade)`)?"
   - "Quantas disciplinas cada professor leciona (`GROUP BY id_professor`)?"
   - "Quais professores lecionam mais de 2 disciplinas (`HAVING COUNT(*) >= 2`)?"

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Utilização correta das cinco funções agregadas (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`).
- [ ] Todas as colunas não agregadas do `SELECT` inclusas na cláusula `GROUP BY`.
- [ ] Aplicação da cláusula `HAVING` para critérios baseados em funções agregadas.
- [ ] Diferenciação prática entre o momento de execução do `WHERE` e do `HAVING`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Descubra a diferença de resultado entre `COUNT(*)` e `COUNT(coluna_com_nulos)`: crie uma tabela de testes com alguns registros contendo valores `NULL` e comprove a diferença no console!
