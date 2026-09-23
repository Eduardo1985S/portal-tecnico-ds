---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-07-normalizacao-de-dados-1fn-2fn-3fn
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-07-normalizacao-de-dados-1fn-2fn-3fn
sidebar_position: 7
title: "Aula 07 — Normalização de Dados: 1FN, 2FN e 3FN"
description: Elimine anomalias de inserção, alteração e exclusão aplicando os processos das três Primeiras Formas Normais.
---

# Aula 07 — Normalização de Dados: 1FN, 2FN e 3FN

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o processo rigoroso e formal de **Normalização de Dados**, identificar as anomalias graves causadas por tabelas desnormalizadas e redundantes no banco de dados e aplicar com segurança os passos para atingir a **Primeira Forma Normal (1FN)**, a **Segunda Forma Normal (2FN)** e a **Terceira Forma Normal (3FN)**.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é Normalização: o processo de decomposição de relações para eliminar redundâncias sem perda de informação.
- As três anomalias destrutivas de bancos não normalizados:
  - **Anomalia de Inserção**: impossibilidade de cadastrar um dado sem inventar outro inexistente.
  - **Anomalia de Alteração**: ter que alterar o endereço de um fornecedor em 500 linhas diferentes.
  - **Anomalia de Exclusão**: perder o cadastro do cliente ao apagar um pedido antigo.
- **1ª Forma Normal (1FN)**: Atomicidade de valores e eliminação de atributos multivalorados ou grupos repetitivos.
- **2ª Forma Normal (2FN)**: Estar na 1FN e eliminar Dependências Funcionais Parciais de chaves compostas.
- **3ª Forma Normal (3FN)**: Estar na 2FN e eliminar Dependências Funcionais Transitivas (atributos que dependem de outros atributos não-chave).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

A frase célebre de Bill Kent resume o objetivo de um banco de dados normalizado na 3FN:
> *"Cada atributo não-chave deve fornecer um fato sobre a Chave, toda a Chave e nada além da Chave (so help me Codd)."*

### O Passo a Passo das Três Formas Normais

```text
TABELA NÃO NORMALIZADA (Planilha cheia de redundâncias e listas dentro de uma célula)
                    │
                    ▼
[ 1ª FORMA NORMAL (1FN) ]
- Elimina campos com múltiplos valores separados por vírgula (ex: "Telefones: 11999, 11888").
- Cada célula deve conter apenas um valor atômico e indivisível.
                    │
                    ▼
[ 2ª FORMA NORMAL (2FN) ]
- Aplica-se a tabelas com Chave Primária Composta (ex: id_pedido + id_produto).
- Todos os campos devem depender da chave inteira, e não de apenas metade dela!
- Se a coluna "descricao_produto" depende só do id_produto, ela deve ir para a tabela PRODUTOS!
                    │
                    ▼
[ 3ª FORMA NORMAL (3FN) ]
- Elimina dependências transitivas entre colunas que não são chaves.
- Exemplo: na tabela CLIENTES temos id_cliente (PK), cep, cidade, estado.
- "Cidade" e "Estado" dependem do "CEP", e não diretamente do "Cliente"!
- Solução: Criar tabela ENDERECOS_CEP e manter apenas o cep como FK no Cliente.
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja a transformação de uma tabela de pedidos:

```text
ANTES DA NORMALIZAÇÃO (Uma única tabela monstro):
PEDIDOS_COMPLETO (
  num_pedido, data, id_cliente, nome_cliente, telefone_cliente, 
  id_produto, nome_produto, preco_produto, quantidade
)

DEPOIS DA NORMALIZAÇÃO NA 3FN (Tabelas atômicas e limpas):

1. CLIENTES (id_cliente [PK], nome_cliente)
2. CLIENTES_TELEFONES (id_telefone [PK], id_cliente [FK], numero) -- Resolução 1FN

3. PRODUTOS (id_produto [PK], nome_produto, preco_atual)           -- Resolução 2FN

4. PEDIDOS (num_pedido [PK], data, id_cliente [FK])

5. ITENS_PEDIDO (                                                  -- Resolução 2FN e 3FN
  num_pedido [PK, FK], 
  id_produto [PK, FK], 
  quantidade, 
  preco_unitario_cobrado
)
```

Agora, se o cliente mudar de telefone ou o produto mudar de nome, você altera em **uma única linha**, e todas as outras partes do sistema continuam perfeitas e consistentes!

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Dada a seguinte tabela desnormalizada de uma concessionária:

```text
LOCACOES (
  id_locacao, data_locacao, 
  cpf_cliente, nome_cliente, cnh_cliente,
  chassi_carro, placa_carro, modelo_carro, marca_carro, valor_diaria,
  dias_locados, valor_total
)
```

1. Identifique quais anomalias ocorreriam se o nome de um modelo de carro precisasse ser corrigido.
2. Aplique a 1FN, 2FN e 3FN, dividindo a tabela em entidades lógicas normalizadas.
3. Apresente as tabelas finais indicando as Chaves Primárias `[PK]` e Chaves Estrangeiras `[FK]`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Eliminação completa de atributos multivalorados (1FN).
- [ ] Remoção de dependências parciais de chaves compostas (2FN).
- [ ] Remoção de dependências transitivas entre atributos não-chave (3FN).
- [ ] Eliminação de redundâncias sem perda de capacidade de reconstruir a informação via Chaves Estrangeiras.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Existe desnormalização intencional no mercado? Pesquise sobre bancos de dados de Business Intelligence / Data Warehousing (**Modelagem Dimensional / Esquema Estrela**) onde a desnormalização é aplicada deliberadamente para acelerar consultas analíticas de grande porte!
