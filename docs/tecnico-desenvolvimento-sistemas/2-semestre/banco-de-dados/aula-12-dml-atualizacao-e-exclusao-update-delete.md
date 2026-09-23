---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-12-dml-atualizacao-e-exclusao-update-delete
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-12-dml-atualizacao-e-exclusao-update-delete
sidebar_position: 12
title: "Aula 12 — DML: Atualização e Exclusão com UPDATE e DELETE"
description: Aprenda a modificar e remover registros com segurança e compreenda o conceito de Soft Delete.
---

# Aula 12 — DML: Atualização e Exclusão com UPDATE e DELETE

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Dominar os comandos de manipulação `UPDATE` e `DELETE`, compreender a importância crítica da cláusula `WHERE` para evitar a corrupção massiva acidental de tabelas em produção, entender a diferença entre exclusão física e **Exclusão Lógica (*Soft Delete*)** e utilizar transações seguras de teste.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O comando `UPDATE ... SET ... WHERE`: modificando valores de uma ou mais colunas simultaneamente.
- O maior pesadelo do DBA: executar `UPDATE` ou `DELETE` esquecendo a cláusula `WHERE`.
- O comando `DELETE FROM ... WHERE`: exclusão pontual de tuplas.
- `DELETE` vs `TRUNCATE TABLE`: velocidade, transacionalidade e reinicialização de sequências.
- Padrão corporativo de **Soft Delete** (Exclusão Lógica): a coluna booleana `ativo = false` ou `deletado_em = NOW()`.
- O modo "Safe Updates" em clientes de banco de dados.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O comando `UPDATE` altera os dados existentes no disco. Se você não especificar **quais linhas** deseja alterar através da cláusula `WHERE`, o SGBD atualizará **todas as linhas da tabela**:

```sql
-- PERIGO ABSOLUTO! Sem WHERE: muda o salário de TODOS os funcionários para 1000!
UPDATE funcionarios SET salario = 1000.00;

-- CORRETO E SEGURO: Modifica pontualmente pelo identificador único (PK)
UPDATE funcionarios SET salario = 1000.00 WHERE id_funcionario = 42;
```

### Exclusão Física vs Exclusão Lógica (Soft Delete)

Em sistemas reais (como financeiro, médico ou de vendas), **quase nunca se apaga um registro fisicamente do disco com `DELETE`**, pois isso apagaria o histórico fiscal e auditorias da empresa.

Em vez disso, utiliza-se o padrão **Soft Delete**:
```sql
-- Em vez de: DELETE FROM clientes WHERE id_cliente = 10;
-- Fazemos:
UPDATE clientes SET ativo = FALSE, deletado_em = NOW() WHERE id_cliente = 10;
```
Para os relatórios normais, o cliente parece "deletado" (`WHERE ativo = TRUE`), mas o histórico continua intacto para auditoria!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como testar comandos de atualização e exclusão com segurança usando uma transação com `ROLLBACK`:

```sql
-- 1. Inicia a transação protegida
BEGIN;

-- 2. Executa a atualização
UPDATE produtos 
SET preco_venda = preco_venda * 1.10, estoque = estoque - 2
WHERE id_produto = 1;

-- 3. Confere o resultado na mesma transação
SELECT id_produto, preco_venda, estoque FROM produtos WHERE id_produto = 1;

-- 4. Se algo deu errado, desfaça tudo com ROLLBACK!
-- Se estiver 100% certo, use COMMIT!
ROLLBACK;
```

Exemplo de exclusão pontual:

```sql
DELETE FROM produtos 
WHERE id_produto = 3 AND estoque = 0;
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra o DBeaver.
2. Atualize o preço de todos os produtos de uma categoria específica aplicando 15% de desconto (`preco_venda = preco_venda * 0.85`).
3. Adicione uma coluna `ativo BOOLEAN DEFAULT TRUE` na tabela de produtos.
4. Simule um Soft Delete em um produto: atualize o status dele para `ativo = FALSE`.
5. Tente excluir fisicamente com `DELETE` um professor que possui disciplinas associadas e observe o erro de Chave Estrangeira.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Uso obrigatório da cláusula `WHERE` em todos os comandos `UPDATE` e `DELETE`.
- [ ] Atualização de múltiplas colunas em uma única instrução separadas por vírgula.
- [ ] Implementação prática do padrão Soft Delete.
- [ ] Teste preventivo de comandos utilizando `BEGIN` e `ROLLBACK`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Como o DBeaver ou o MySQL Workbench possuem uma trava de segurança chamada "Safe Updates Mode" que impede a execução de `UPDATE` ou `DELETE` se o `WHERE` não usar uma coluna que seja Chave Primária? Pesquise como ativar essa trava no seu ambiente!
