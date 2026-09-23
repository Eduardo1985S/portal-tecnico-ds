---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-01-introducao-banco-de-dados-e-sgbd
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-01-introducao-banco-de-dados-e-sgbd
sidebar_position: 1
title: "Aula 01 — Introdução a Banco de Dados e SGBD"
description: Compreenda a diferença entre dado e informação e entenda a arquitetura de um Sistema Gerenciador de Banco de Dados.
---

# Aula 01 — Introdução a Banco de Dados e SGBD

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o conceito fundamental de dados, informação e conhecimento, entender por que sistemas corporativos não podem depender de planilhas eletrônicas ou arquivos de texto para persistência, e desmistificar a arquitetura e as funções essenciais de um **Sistema Gerenciador de Banco de Dados (SGBD)**.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- A pirâmide informacional: Dado, Informação, Conhecimento e Sabedoria.
- As limitações do modelo de arquivos tradicional: redundância, inconsistência, isolamento de dados e vulnerabilidade a falhas de concorrência.
- O que é um SGBD (*DBMS - Database Management System*).
- A Arquitetura ANSI/SPARC em três níveis: Nível Físico (armazenamento em disco), Nível Lógico (tabelas e regras) e Nível Conceitual/Visão (o que os usuários e aplicações enxergam).
- Visão geral do ecossistema: SGBDs Relacionais (PostgreSQL, MySQL, Oracle, SQL Server) vs Não-Relacionais (NoSQL: MongoDB, Redis).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Muitas empresas iniciam seus controles utilizando planilhas eletrônicas (como Excel ou Google Sheets). No entanto, à medida que a aplicação cresce, surgem graves problemas:

### Por que não usar planilhas como Banco de Dados?

| Critério | Planilha Eletrônica | SGBD Profissional (PostgreSQL/MySQL) |
| :--- | :--- | :--- |
| **Concorrência** | Se duas pessoas salvarem ao mesmo tempo, um dado é sobrescrito e perdido. | Milhares de usuários gravam simultaneamente com travas (*Locks*) seguras. |
| **Volume de Dados** | Trava e perde velocidade com algumas centenas de milhares de linhas. | Projetado para gerenciar milhões ou bilhões de registros em milissegundos. |
| **Integridade** | Qualquer pessoa pode digitar "ABC" no campo onde deveria haver um preço. | Regras estritas (*Constraints*) rejeitam dados incorretos automaticamente. |
| **Segurança** | Arquivo fácil de copiar ou deletar por engano. | Controle refinado de permissões por usuário, criptografia e backups transacionais. |

### A Arquitetura ANSI/SPARC

Para isolar a aplicação das peculiaridades físicas do disco rígido, a arquitetura clássica divide o banco em 3 camadas de abstração:

```text
[ Aplicação Web / Mobile ]       [ Usuário / Relatórios ]
            │                               │
            └───────────────┬───────────────┘
                            ▼
               [ Nível Externo / Visão ]
               (Telas e relatórios específicos)
                            │
                            ▼
               [ Nível Conceitual / Lógico ]
           (Estrutura de tabelas, chaves e regras)
                            │
                            ▼
               [ Nível Interno / Físico ]
          (Alocação de blocos no disco, índices, B-Trees)
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como a modelagem em um SGBD previne anomalias através da definição explícita de tipos e restrições:

```sql
-- Criando uma tabela com tipos rígidos e restrições de integridade
CREATE TABLE estudantes (
    id_estudante SERIAL PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    email_institucional VARCHAR(120) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Se alguém tentar cadastrar dois estudantes com o mesmo e-mail, o SGBD emitirá um erro imediato de violação de chave única (`UNIQUE constraint violation`), protegendo a regra de negócio do sistema!

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Em duplas, escolham um cenário comercial (ex: Barbearia, Pet Shop ou Locadora de Veículos).
2. Listem 5 problemas graves que ocorreriam se esse negócio fosse controlado apenas com uma pasta cheia de planilhas compartilhadas no pen drive.
3. Classifiquem os tipos de dados que seriam manipulados (ex: Nome = Texto, Preço = Decimal, Data do Agendamento = Data/Hora).
4. Elaborem um pequeno texto argumentativo explicando ao dono da empresa por que ele deve investir em um SGBD relacional.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Identificação clara da diferença entre dado bruto e informação contextualizada.
- [ ] Compreensão dos três níveis da arquitetura ANSI/SPARC.
- [ ] Listagem das desvantagens do armazenamento em arquivos convencionais.
- [ ] Definição do papel de um SGBD em aplicações modernas.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Pesquise no ranking global do [DB-Engines](https://db-engines.com/en/ranking) quais são os 3 bancos de dados mais utilizados no planeta hoje e compartilhe com seus colegas!
