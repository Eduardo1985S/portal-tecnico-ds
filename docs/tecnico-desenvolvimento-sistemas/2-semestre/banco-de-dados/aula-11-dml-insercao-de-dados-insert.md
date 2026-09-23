---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-11-dml-insercao-de-dados-insert
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-11-dml-insercao-de-dados-insert
sidebar_position: 11
title: "Aula 11 — DML: Inserção de Dados com INSERT INTO"
description: Popule seu banco de dados com registros individuais e em lote dominando o comando INSERT INTO.
---

# Aula 11 — DML: Inserção de Dados com INSERT INTO

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o papel da sublinguagem **DML (Data Manipulation Language)** na persistência e modificação de registros no banco de dados, dominar as diferentes sintaxes do comando `INSERT INTO`, aprender a realizar inserções em lote (*Batch Inserts*) de alta performance e gerenciar chaves primárias autoincrementais (`SERIAL`).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O comando `INSERT INTO`: sintaxe explícita declarando colunas vs sintaxe posicional.
- Por que a declaração explícita de colunas é uma boa prática indispensável.
- Inserção de múltiplos registros em um único comando SQL (*Multi-row Insert*).
- Como o banco lida com colunas com valores padrão (`DEFAULT`) e autoincremento (`SERIAL`).
- A cláusula especial `RETURNING`: obtendo o ID gerado pelo banco sem precisar de uma nova consulta.
- Inserção de datas (`'YYYY-MM-DD'`) e valores decimais (usando ponto `.`, nunca vírgula `,`).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Ao inserir dados em tabelas relacionais, devemos respeitar rigorosamente os tipos e as restrições definidas no DDL:
1. **Textos e Datas**: Devem estar envolvidos por aspas simples: `'Maria da Silva'`, `'2026-09-23'`.
2. **Números**: Sem aspas e com ponto decimal: `1500.50`.
3. **Colunas Autoincrementais**: Não devem ser passadas no `INSERT`. O SGBD cuida da sequência matemática!

### Inserção Única vs Inserção em Lote

Fazer 100 comandos `INSERT` separados força o banco a abrir 100 transações em disco:
```sql
-- LENTO (100 viagens de rede e escrita em disco):
INSERT INTO logs (mensagem) VALUES ('Log 1');
INSERT INTO logs (mensagem) VALUES ('Log 2');

-- RÁPIDO (1 única viagem de rede com alta performance):
INSERT INTO logs (mensagem) VALUES 
  ('Log 1'),
  ('Log 2'),
  ('Log 3');
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como inserir registros e capturar o ID gerado:

```sql
-- 1. Inserção simples declarando colunas explicitamente
INSERT INTO categorias (nome, descricao) 
VALUES ('Periféricos', 'Teclados, mouses e fones gamer');

-- 2. Inserção em lote (Multi-row)
INSERT INTO produtos (codigo_barras, nome, preco_venda, estoque, id_categoria) 
VALUES 
  ('789100000001', 'Teclado Mecânico RGB', 249.90, 15, 1),
  ('789100000002', 'Mouse Ergonômico 16k DPI', 179.00, 30, 1),
  ('789100000003', 'Headset Surround 7.1', 320.00, 8, 1);

-- 3. Inserção com retorno imediato do ID gerado (Recurso moderno do PostgreSQL)
INSERT INTO clientes (nome_completo, cpf, email) 
VALUES ('Juliana Paes', '11122233344', 'juliana.paes@email.com')
RETURNING id_cliente, criado_em;
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra o DBeaver e utilize as tabelas `professores` e `disciplinas` criadas na Aula 10.
2. Insira pelo menos 3 professores na tabela `professores`.
3. Anote os IDs gerados para cada professor.
4. Insira 5 disciplinas na tabela `disciplinas`, associando cada uma ao `id_professor` correspondente através da Chave Estrangeira.
5. Tente propositalmente inserir uma disciplina apontando para um `id_professor = 999` (que não existe) e observe o erro de violação de integridade referencial retornado pelo PostgreSQL!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Declaração explícita das colunas na sintaxe do `INSERT INTO`.
- [ ] Inserção em lote de múltiplos produtos com uma única instrução SQL.
- [ ] Uso correto do ponto para casas decimais e aspas simples para strings e datas.
- [ ] Comprovação do bloqueio de integridade referencial ao tentar inserir FK inválida.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Descubra a cláusula `ON CONFLICT DO NOTHING` ou `ON CONFLICT (email) DO UPDATE` do PostgreSQL (conhecida como *Upsert*): ela permite inserir ou atualizar o registro automaticamente caso a chave única já exista!
