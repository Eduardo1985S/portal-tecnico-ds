---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-16-juncoes-de-tabelas-inner-join
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-16-juncoes-de-tabelas-inner-join
sidebar_position: 16
title: "Aula 16 — Junções de Tabelas com INNER JOIN"
description: Combine informações de múltiplas tabelas relacionais com precisão dominando a sintaxe do INNER JOIN.
---

# Aula 16 — Junções de Tabelas com INNER JOIN

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o verdadeiro poder e propósito do modelo relacional combinando informações espalhadas por múltiplas tabelas normalizadas através da operação de junção **INNER JOIN**, dominando o uso de apelidos de tabelas (*Table Aliases*), a cláusula de ligação `ON` e a resolução de consultas envolvendo relacionamentos de **Muitos para Muitos (N:M)** através de tabelas associativas.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O conceito de Junção Relacional: unindo linhas da Tabela A com a Tabela B onde as chaves coincidem (`PK = FK`).
- A teoria de conjuntos: a interseção matemática estrita do **INNER JOIN** (apenas registros que possuem correspondência em ambos os lados).
- A sintaxe formal: `FROM tabela_a a INNER JOIN tabela_b b ON a.id = b.id_a`.
- O perigo do Produto Cartesiano gerado por junções esquecidas ou mal declaradas.
- Junções múltiplas encadeadas: conectando 3 ou mais tabelas na mesma consulta.
- Consultando relacionamentos N:M: fazendo 2 INNER JOINs passando pela tabela associativa intermediária.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Na normalização (Aula 07), nós separamos os dados para não repetir texto. Na consulta do relatório, nós precisamos juntar tudo de novo em uma única visão tabular limpa!

```text
TABELA CLIENTES (C)                  TABELA PEDIDOS (P)
id_cliente | nome_cliente            id_pedido | id_cliente | valor
───────────┼─────────────            ──────────┼────────────┼───────
    1      | Ana Clara                   101   |     1      | 250.00
    2      | Bruno Santos                102   |     1      |  90.00
    3      | Carla Dias                  103   |     2      | 150.00

         │                                   │
         └─────────── INNER JOIN ────────────┘
                  ON C.id_cliente = P.id_cliente
                                 │
                                 ▼
RESULTADO DA JUNÇÃO (Interseção estrita):
id_pedido | nome_cliente | valor
──────────┼──────────────┼────────
   101    | Ana Clara    | 250.00
   102    | Ana Clara    |  90.00
   103    | Bruno Santos | 150.00
*(Nota: Carla Dias não fez pedidos, logo NÃO aparece no INNER JOIN!)*
```

### Consultando Relacionamento N:M

Para trazer quais alunos cursam quais disciplinas, precisamos de **duas junções**:
```text
ALUNOS ──(INNER JOIN)──> MATRICULAS ──(INNER JOIN)──> DISCIPLINAS
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como escrever consultas relacionais profissionais:

```sql
-- 1. Relacionamento 1:N simples (Produtos + Categorias)
SELECT 
    p.id_produto,
    p.nome AS produto,
    p.preco_venda,
    c.nome AS categoria
FROM produtos p
INNER JOIN categorias c ON p.id_categoria = c.id_categoria
ORDER BY c.nome, p.nome;

-- 2. Relacionamento N:M com 3 tabelas interligadas
-- Traz o nome do aluno, a disciplina que ele cursa e a nota final
SELECT 
    a.nome AS nome_estudante,
    d.nome_disciplina,
    m.nota_final,
    m.data_matricula
FROM alunos a
INNER JOIN matriculas m ON a.id_aluno = m.id_aluno
INNER JOIN disciplinas d ON m.id_disciplina = d.id_disciplina
WHERE m.nota_final >= 6.0
ORDER BY a.nome, d.nome_disciplina;
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra o DBeaver.
2. Escreva uma consulta utilizando `INNER JOIN` entre a tabela `professores` e `disciplinas`, exibindo:
   - Nome do Professor
   - Especialidade
   - Nome da Disciplina
   - Carga Horária
3. Adicione uma cláusula `WHERE` para filtrar apenas disciplinas com carga horária maior que 40 horas.
4. Combine `INNER JOIN` com `GROUP BY`: calcule quantas disciplinas cada professor leciona exibindo o nome do professor e o total de matérias!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Sintaxe declarativa `INNER JOIN ... ON ...` utilizada corretamente.
- [ ] Uso consistente de apelidos curtos de tabelas (`p`, `c`, `a`).
- [ ] Resolução de junção N:M encadeando duas cláusulas `INNER JOIN`.
- [ ] Junção combinada com filtros `WHERE` e agrupamentos `GROUP BY`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

O que acontece se você escrever `FROM produtos, categorias` e esquecer de colocar a cláusula `WHERE produtos.id_categoria = categorias.id_categoria`? Pesquise sobre o temido **Produto Cartesiano (CROSS JOIN)**!
