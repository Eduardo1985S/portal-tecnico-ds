---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-06-integridade-de-dados
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-06-integridade-de-dados
sidebar_position: 6
title: "Aula 06 — Integridade de Dados e Restrições Relacionais"
description: Domine os quatro pilares de integridade de dados e as ações referenciais ON DELETE e ON UPDATE.
---

# Aula 06 — Integridade de Dados e Restrições Relacionais

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender os quatro pilares fundamentais da **Integridade de Dados** no modelo relacional (Integridade de Domínio, Vazio, Entidade e Referencial), entender como o SGBD impede a corrupção do estado do sistema através de restrições (*Constraints*) e dominar as políticas de integridade referencial `CASCADE`, `RESTRICT` e `SET NULL`.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O conceito de Integridade de Dados: a garantia de que a base de dados permanece precisa, consistente e confiável ao longo do tempo.
- **Integridade de Domínio**: tipos de dados (`INT`, `VARCHAR`, `BOOLEAN`) e restrições de verificação (`CHECK`).
- **Integridade de Vazio**: a cláusula `NOT NULL` impedindo campos obrigatórios em branco.
- **Integridade de Entidade**: a regra que proíbe chaves primárias duplicadas ou com valores nulos.
- **Integridade Referencial**: a obrigatoriedade de que todo valor em uma Chave Estrangeira (FK) aponte para uma Chave Primária (PK) existente.
- Ações referenciais em cascata: `ON DELETE CASCADE`, `ON DELETE RESTRICT` e `ON DELETE SET NULL`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Sem as regras de integridade, um banco de dados rapidamente se transformaria em um "cemitério de dados desconexos":

### Os Quatro Pilares da Integridade Relacional

```text
┌────────────────────────┐
│  INTEGRIDADE DE DADOS  │
└───────────┬────────────┘
            ├── 1. DOMÍNIO     -> Campo "Idade" não aceita texto "vinte" nem número negativo (CHECK).
            ├── 2. VAZIO       -> Campo "Nome" é obrigatório e não pode ser omitido (NOT NULL).
            ├── 3. ENTIDADE    -> Cada linha tem uma Chave Primária (PK) única que nunca pode ser NULL.
            └── 4. REFERENCIAL -> Pedido não pode apontar para um id_cliente que não existe na tabela CLIENTES!
```

### O que fazer ao deletar ou alterar um registro pai?

Se a empresa decidir excluir o registro de um `CLIENTE`, o que acontecerá com os 15 `PEDIDOS` que pertenciam a ele? O SGBD oferece 3 estratégias:

| Ação Referencial | Comportamento no SGBD | Cenário de Uso Recomendado |
| :--- | :--- | :--- |
| `RESTRICT` / `NO ACTION` | **Bloqueia a exclusão!** O banco emite um erro avisando que existem registros filhos vinculados. | Padrão seguro para a grande maioria dos sistemas fiscais e financeiros. |
| `CASCADE` | **Exclusão em cascata.** Ao apagar o pai, o banco automaticamente apaga todos os filhos vinculados. | Itens de um pedido ao apagar o pedido (pois não têm sentido sozinhos). |
| `SET NULL` | **Desassocia o filho.** O banco mantém os registros filhos, mas preenche a FK com valor `NULL`. | Manter um histórico de chamados mesmo se o atendente for desligado. |

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja a declaração das restrições de integridade em comandos SQL:

```sql
-- Criando tabela de Departamentos
CREATE TABLE departamentos (
    id_departamento SERIAL PRIMARY KEY,
    nome_departamento VARCHAR(50) NOT NULL UNIQUE
);

-- Criando tabela de Funcionários com restrições e políticas de FK
CREATE TABLE funcionarios (
    id_funcionario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    salario DECIMAL(10,2) NOT NULL CHECK (salario >= 1412.00), -- Integridade de Domínio
    id_departamento INT,
    
    -- Integridade Referencial com RESTRICT
    CONSTRAINT fk_departamento_funcionario
        FOREIGN KEY (id_departamento) 
        REFERENCES departamentos(id_departamento)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Analise o cenário de uma **Escola**: Tabela `TURMAS` e Tabela `ALUNOS`.
2. Responda:
   - Se o coordenador tentar excluir uma `TURMA` que possui 30 alunos matriculados, qual ação referencial deve ser configurada (`RESTRICT` ou `CASCADE`)? Por quê?
   - Se um `ALUNO` for excluído, o que deve acontecer com as respostas das provas dele na tabela `NOTAS`?
3. Escreva um script SQL hipotético definindo uma restrição `CHECK` para garantir que o campo `nota` esteja estritamente entre `0.0` e `10.0`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Identificação dos 4 pilares de integridade no modelo relacional.
- [ ] Compreensão da cláusula `CHECK` para validação de faixas e valores no SGBD.
- [ ] Diferenciação clara entre `ON DELETE RESTRICT` e `ON DELETE CASCADE`.
- [ ] Eliminação de registros órfãos garantida pelo uso de Chaves Estrangeiras.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Descubra o que é uma **Chave Primária Composta** e explique como ela garante a integridade de unicidade em uma tabela associativa N:M (como `id_pedido` + `id_produto`)!
