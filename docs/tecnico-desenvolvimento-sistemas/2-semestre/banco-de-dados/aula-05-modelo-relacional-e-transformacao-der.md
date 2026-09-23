---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-05-modelo-relacional-e-transformacao-der
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-05-modelo-relacional-e-transformacao-der
sidebar_position: 5
title: "Aula 05 — O Modelo Relacional e Mapeamento DER para Lógico"
description: Transforme o diagrama conceitual em tabelas relacionais definindo Chaves Primárias (PK) e Chaves Estrangeiras (FK).
---

# Aula 05 — O Modelo Relacional e Mapeamento DER para Lógico

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender os fundamentos teóricos e matemáticos do **Modelo Relacional** criado por Edgar F. Codd, aprender as regras estritas de transformação e mapeamento de um Diagrama Conceitual (DER) para o Esquema Lógico Relacional, dominando a atribuição de **Chaves Primárias (Primary Keys - PK)**, **Chaves Estrangeiras (Foreign Keys - FK)** e a criação de tabelas associativas para relacionamentos N:M.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O Modelo Relacional: Relações (Tabelas), Tuplas (Linhas/Registros) e Atributos (Colunas/Campos).
- O conceito de **Chave Primária (PK)**: unicidade e obrigatoriedade (`NOT NULL`).
- O conceito de **Chave Estrangeira (FK)**: a ponte relacional entre tabelas distintas.
- As regras formais de transformação DER -> Relacional:
  1. Mapeamento de Entidades Fortes.
  2. Mapeamento de Relacionamentos 1:N (a PK do lado "1" vira FK no lado "N").
  3. Mapeamento de Relacionamentos 1:1.
  4. Mapeamento de Relacionamentos N:M (geração obrigatória de uma **Tabela Associativa / Tabela Intermediária**).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O banco de dados relacional físico não entende losangos de relacionamentos nem círculos de atributos; ele só entende **tabelas bidimensionais** com linhas e colunas interligadas por chaves.

Veja na ilustração técnica abaixo a transição do Modelo Conceitual (DER) com a chave primária `PK` e a chave estrangeira `FK`, o processo de normalização e o resultado de junções em SQL:

![Arquitetura Relacional: Modelagem Conceitual, Normalização e Junções SQL](/img/banco_de_dados_modelagem.jpg)

### Regras de Ouro da Transformação Lógica

#### 1. Relacionamento 1:N
A chave primária (PK) da tabela do lado **1** migra e é gravada como uma coluna de Chave Estrangeira (FK) na tabela do lado **N**:
```text
CLIENTES (id_cliente [PK], nome, email)
    │
    │ (A PK id_cliente desce para os pedidos)
    ▼
PEDIDOS (id_pedido [PK], data_pedido, valor, id_cliente [FK])
```

#### 2. Relacionamento N:M
Em bancos relacionais, uma coluna nunca pode guardar múltiplos valores na mesma célula! Por isso, o relacionamento N:M é desmembrado gerando uma **terceira tabela associativa**:
```text
ALUNOS (id_aluno [PK], nome)
DISCIPLINAS (id_disciplina [PK], nome_disciplina)

        │
        ▼ (Tabela intermediária ALUNOS_DISCIPLINAS)
MATRICULAS (
  id_aluno [PK, FK],
  id_disciplina [PK, FK],
  data_matricula,
  nota_final
)
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja a notação relacional textual (Esquema Lógico) padronizada:

```text
CLIENTE (
  id_cliente: INT [PK],
  nome: VARCHAR(100),
  cpf: VARCHAR(14) [UNIQUE],
  email: VARCHAR(120)
)

CATEGORIA (
  id_categoria: INT [PK],
  nome_categoria: VARCHAR(50)
)

PRODUTO (
  id_produto: INT [PK],
  nome: VARCHAR(100),
  preco: DECIMAL(10,2),
  id_categoria: INT [FK -> CATEGORIA.id_categoria]
)

PEDIDO (
  id_pedido: INT [PK],
  data_compra: TIMESTAMP,
  id_cliente: INT [FK -> CLIENTE.id_cliente]
)

ITEM_PEDIDO (
  id_pedido: INT [PK, FK -> PEDIDO.id_pedido],
  id_produto: INT [PK, FK -> PRODUTO.id_produto],
  quantidade: INT,
  preco_unitario_venda: DECIMAL(10,2)
)
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra o brModelo ou desenhe em editor gráfico o Esquema Lógico Relacional para o cenário de **Biblioteca Escolar**:
   - Tabela `LIVROS`
   - Tabela `USUARIOS`
   - Tabela associativa `EMPRESTIMOS` (relacionamento N:M com data de retirada e data de devolução).
2. Indique sublinhado com linha contínua ou com a sigla `[PK]` as chaves primárias.
3. Indique com linha tracejada ou com a sigla `[FK]` as chaves estrangeiras, desenhando setas apontando para a tabela de origem.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Identificação correta de chaves primárias em todas as tabelas.
- [ ] Migração da chave do lado "1" para o lado "N" como Chave Estrangeira.
- [ ] Criação da tabela associativa intermediária para resolução de relações N:M.
- [ ] Esquema Lógico consistente e validado sem atributos multivalorados em células únicas.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

O que acontece quando você tenta deletar um `CLIENTE` que possui 10 `PEDIDOS` vinculados através da Chave Estrangeira? Pesquise sobre a regra de integridade `ON DELETE RESTRICT` vs `ON DELETE CASCADE`!
