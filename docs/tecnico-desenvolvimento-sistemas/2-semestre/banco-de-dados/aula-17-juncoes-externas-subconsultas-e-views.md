---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-17-juncoes-externas-subconsultas-e-views
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-17-juncoes-externas-subconsultas-e-views
sidebar_position: 17
title: "Aula 17 — Junções Externas, Subconsultas e Views"
description: Domine o LEFT JOIN para não perder registros sem correspondência, utilize Subqueries e encapsule relatórios com Views.
---

# Aula 17 — Junções Externas, Subconsultas e Views

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a recuperar registros mesmo quando não houver correspondência na tabela relacionada utilizando Junções Externas (**LEFT JOIN** e **RIGHT JOIN**), dominar o uso de **Subconsultas (*Subqueries*)** aninhadas para filtros dinâmicos complexos e encapsular queries analíticas reutilizáveis através da criação de **Visões (*Views*)**.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O problema do INNER JOIN: registros que somem da listagem por não possuírem dados relacionados (ex: clientes que ainda não compraram).
- Funcionamento do **LEFT JOIN**: preservando todas as linhas da tabela da esquerda e preenchendo o lado direito com `NULL`.
- A técnica de detecção de ausência: encontrando registros órfãos com `WHERE tabela_direita.id IS NULL`.
- O que são Subconsultas (*Subqueries / Inner Queries*): utilizando um `SELECT` dentro do `WHERE` de outro `SELECT`.
- Subconsultas com operadores `IN`, `NOT IN`, `EXISTS` e operadores relacionais.
- Criação e manutenção de Visões: `CREATE VIEW ... AS SELECT`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Enquanto o `INNER JOIN` exige que a chave exista nos dois lados, o **LEFT JOIN** prioriza a tabela principal da esquerda:

```text
Tabela A: CLIENTES (Esquerda)        Tabela B: PEDIDOS (Direita)
[ Ana Clara    ] ───────────────>    [ Pedido 101: R$ 250,00 ]
[ Bruno Santos ] ───────────────>    [ Pedido 102: R$ 150,00 ]
[ Carla Dias   ] ───────────────>    [ (Não possui pedidos) ]

COM LEFT JOIN:
nome_cliente | id_pedido | valor
─────────────┼───────────┼────────
Ana Clara    |    101    | 250.00
Bruno Santos |    102    | 150.00
Carla Dias   |   NULL    |  NULL   <-- Carla continua aparecendo na lista!
```

### O que são Views (Visões)?

Uma **View** é uma tabela virtual baseada no resultado de uma consulta SQL complexa. Ela não duplica dados no disco; funciona como um "atalho salvo" que simplifica a vida dos desenvolvedores:

```sql
-- Criando a visão uma única vez:
CREATE VIEW vw_relatorio_vendas AS
SELECT c.nome, p.valor, p.data_compra
FROM clientes c
INNER JOIN pedidos p ON c.id_cliente = p.id_cliente;

-- Depois, no dia a dia da aplicação, basta fazer:
SELECT * FROM vw_relatorio_vendas WHERE valor > 100;
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como encontrar clientes que nunca compraram nada e criar uma View:

```sql
-- 1. LEFT JOIN para listar TODOS os clientes e seus pedidos (se houver)
SELECT 
    c.id_cliente,
    c.nome_completo,
    p.id_pedido,
    COALESCE(p.valor, 0.00) AS valor_pedido
FROM clientes c
LEFT JOIN pedidos p ON c.id_cliente = p.id_cliente;

-- 2. Detectando quem NUNCA comprou (Excelente para equipe de marketing!)
SELECT c.nome_completo, c.email
FROM clientes c
LEFT JOIN pedidos p ON c.id_cliente = p.id_cliente
WHERE p.id_pedido IS NULL;

-- 3. Subconsulta no WHERE: Produtos com preço acima da média da loja
SELECT nome, preco_venda
FROM produtos
WHERE preco_venda > (
    SELECT AVG(preco_venda) FROM produtos
);

-- 4. Criando uma View analítica para simplificar o sistema
CREATE OR REPLACE VIEW vw_catalogo_completo AS
SELECT 
    p.id_produto,
    p.nome AS produto,
    p.preco_venda,
    p.estoque,
    c.nome AS categoria
FROM produtos p
INNER JOIN categorias c ON p.id_categoria = c.id_categoria;
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra o DBeaver.
2. Escreva uma consulta utilizando `LEFT JOIN` entre `professores` e `disciplinas`. Observe que professores recém-contratados que ainda não têm matéria atribuída aparecem no resultado com colunas de disciplina contendo `NULL`.
3. Escreva uma consulta para listar apenas os professores que **não lecionam nenhuma matéria** (`WHERE id_disciplina IS NULL`).
4. Crie uma View chamada `vw_professores_disciplinas` encapsulando essa consulta.
5. Execute um `SELECT * FROM vw_professores_disciplinas;` para validar a visão.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Compreensão e uso correto do `LEFT JOIN`.
- [ ] Técnica de detecção de ausência utilizando `IS NULL` na tabela da direita.
- [ ] Subconsulta escalar funcionando dentro da cláusula `WHERE`.
- [ ] Criação bem-sucedida de uma View com `CREATE OR REPLACE VIEW`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Qual é a diferença entre uma **View comum** e uma **Materialized View (Visão Materializada)** no PostgreSQL? Em que cenários de relatórios pesados a visão materializada é indispensável?
