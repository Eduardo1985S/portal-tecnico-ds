---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-18-transacoes-e-propriedades-acid
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-18-transacoes-e-propriedades-acid
sidebar_position: 18
title: "Aula 18 — Transações de Banco e Propriedades ACID"
description: Garanta a confiabilidade absoluta de operações financeiras e críticas dominando transações com BEGIN, COMMIT e ROLLBACK.
---

# Aula 18 — Transações de Banco e Propriedades ACID

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o conceito fundamental de **Transação de Banco de Dados**, dominar as quatro propriedades matemáticas do padrão **ACID** (Atomicidade, Consistência, Isolamento e Durabilidade) e implementar controles transacionais manuais na sublinguagem TCL utilizando `BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK` e `SAVEPOINT`.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é uma Transação: uma unidade lógica de trabalho indivisível que agrupa múltiplos comandos SQL.
- As Quatro Propriedades **ACID**:
  - **A (Atomicidade)**: "Tudo ou nada". Se uma operação falhar no meio, todas as anteriores são desfeitas.
  - **C (Consistência)**: Nenhuma transação pode deixar o banco violando constraints ou regras relacionais.
  - **I (Isolamento)**: Duas transações simultâneas não devem interferir nos dados uma da outra antes de finalizarem.
  - **D (Durabilidade)**: Uma vez confirmada com sucesso, os dados estão gravados permanentemente no disco, resistindo até a quedas de energia.
- Comandos essenciais da TCL: `BEGIN`, `COMMIT`, `ROLLBACK` e `SAVEPOINT`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O exemplo clássico que justifica a existência de transações é uma **Transferência Bancária entre Contas**:

```text
TRANSFERÊNCIA DE R$ 100,00 DE CARLOS PARA JULIANA:
Etapa 1: UPDATE contas SET saldo = saldo - 100 WHERE id_conta = 1; (Tira de Carlos)
         ⚡ FALTA DE ENERGIA ELÉTRICA / CRASH DO SERVIDOR AQUI! ⚡
Etapa 2: UPDATE contas SET saldo = saldo + 100 WHERE id_conta = 2; (Deposita em Juliana)
```

Sem transações atômicas: o dinheiro sumiu da conta de Carlos e nunca chegou na conta de Juliana!
Com o mecanismo de transações atômicas:

```text
[ BEGIN TRANSACTION ]
  Etapa 1: Subtrai saldo de Carlos...
  Etapa 2: Houve falha?
      ├── SIM ──> ROLLBACK (Desfaz a Etapa 1. O dinheiro volta para Carlos!)
      └── NÃO ──> COMMIT   (Efetiva as duas etapas juntas no disco!)
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como escrever uma rotina transacional segura em SQL:

```sql
-- Criando tabela simples para teste
CREATE TABLE contas_bancarias (
    id_conta INT PRIMARY KEY,
    titular VARCHAR(100) NOT NULL,
    saldo DECIMAL(10,2) NOT NULL CHECK (saldo >= 0) -- Não permite saldo negativo!
);

INSERT INTO contas_bancarias VALUES (1, 'Carlos', 500.00), (2, 'Juliana', 200.00);

-- INÍCIO DO BLOCO TRANSACIONAL SEGURO
BEGIN;

-- 1. Debita da conta de origem
UPDATE contas_bancarias 
SET saldo = saldo - 150.00 
WHERE id_conta = 1;

-- 2. Credita na conta de destino
UPDATE contas_bancarias 
SET saldo = saldo + 150.00 
WHERE id_conta = 2;

-- 3. Se todas as instruções rodaram sem erro, confirma no disco
COMMIT;

-- Se algo desse errado, executaríamos:
-- ROLLBACK;
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra duas abas de script SQL separadas no DBeaver conectadas ao mesmo banco (simulando dois usuários simultâneos).
2. Na **Aba 1**:
   - Inicie uma transação: `BEGIN;`
   - Atualize o saldo de uma conta: `UPDATE contas_bancarias SET saldo = 999 WHERE id_conta = 1;`
   - NÃO execute o `COMMIT` ainda!
3. Na **Aba 2**:
   - Tente consultar o saldo: `SELECT saldo FROM contas_bancarias WHERE id_conta = 1;`
   - Observe o que a Aba 2 enxerga (princípio do **Isolamento**!).
4. Na Aba 1, execute `ROLLBACK;`.
5. Consulte novamente na Aba 2 e veja que a alteração nunca existiu.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Definição e explicação das quatro propriedades do ACID.
- [ ] Uso do comando `BEGIN` para iniciar uma transação explícita.
- [ ] Uso do `COMMIT` para gravação definitiva de dados.
- [ ] Uso do `ROLLBACK` para cancelamento e reversão de operações com falha.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

O que é um **Deadlock (Impasse)** em bancos de dados relacionais e como ele ocorre quando duas transações tentam travar os mesmos registros em ordem inversa?
