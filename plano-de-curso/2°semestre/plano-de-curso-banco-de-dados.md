# Plano de Curso: Banco de Dados (20 Semanas)

**Unidade Curricular:** Banco de Dados  
**Carga Horária Total:** 75 horas  
**Carga Semanal:** 5 horas/semana (20 Semanas)  
**Módulo:** Módulo Específico I — 2º Semestre  
**Ferramentas e Recursos:** MySQL / PostgreSQL, DBeaver / pgAdmin / MySQL Workbench, brModelo (Modelagem de Dados), VS Code, Git.

---

## 📊 Módulo 1: Fundamentos de Dados e Modelagem Conceitual (Semanas 1 a 4)

* **Semana 01: Introdução a Banco de Dados e Sistemas de Gerenciamento (SGBD)**
  * Dado vs. Informação vs. Conhecimento.
  * O que é um Banco de Dados e por que não usar planilhas/arquivos para sistemas profissionais.
  * O papel do Sistema Gerenciador de Banco de Dados (SGBD).
  * Arquitetura ANSI/SPARC: Níveis Conceitual, Lógico e Físico.
* **Semana 02: Modelagem Conceitual — O Modelo Entidade-Relacionamento (MER)**
  * Conceito de Entidades (fortes e fracas).
  * Atributos: simples, compostos, monovalorados, multivalorados e derivados.
  * Identificadores de entidades (chaves candidatas e chaves primárias conceituais).
* **Semana 03: Relacionamentos e Cardinalidade**
  * Conceito de relacionamentos entre entidades.
  * Cardinalidades máxima e mínima: 1:1 (um para um), 1:N (um para muitos) e N:M (muitos para muitos).
  * Construção do Diagrama Entidade-Relacionamento (DER) usando a ferramenta brModelo.
* **Semana 04: Prática de Modelagem Conceitual de Cenários Reais**
  * Levantamento de entidades a partir de regras de negócio textuais.
  * Exercícios de modelagem: Sistema Hospitalar, E-commerce e Gestão Acadêmica.
  * Apresentação e discussão das decisões de modelagem em equipe.

---

## 📐 Módulo 2: Modelagem Lógica, Relacional e Normalização (Semanas 5 a 8)

* **Semana 05: O Modelo Relacional e Transformação DER → Relacional**
  * Conceitos fundamentais: Tabelas (Relações), Linhas (Tuplas/Registros) e Colunas (Atributos/Campos).
  * Chave Primária (Primary Key - PK) e Chave Estrangeira (Foreign Key - FK).
  * Regras de mapeamento: tratando relacionamentos 1:1, 1:N e transformação de N:M em tabela associativa.
* **Semana 06: Integridade de Dados**
  * Integridade de Domínio (tipos de dados, faixas de valores permitidas).
  * Integridade de Vazio (NOT NULL).
  * Integridade de Entidade (unicidade da Chave Primária).
  * Integridade Referencial (restrições de Chave Estrangeira: Cascade, Restrict, Set Null).
* **Semana 07: Normalização de Dados (1FN, 2FN e 3FN)**
  * O que é normalização e o problema de anomalias de inserção, alteração e exclusão.
  * 1ª Forma Normal (1FN): eliminação de atributos multivalorados e repetitivos (atomicidade).
  * 2ª Forma Normal (2FN): eliminação de dependências parciais de chaves compostas.
  * 3ª Forma Normal (3FN): eliminação de dependências transitivas entre atributos não-chave.
* **Semana 08: Dicionário de Dados e Preparação para o Ambiente Físico**
  * Elaboração de Dicionário de Dados detalhado (nome da tabela, campos, tipos, tamanhos, restrições e descrições).
  * Instalação e configuração do SGBD (PostgreSQL / MySQL) e cliente visual universal (DBeaver).
  * Teste de conexão local e primeiros comandos administrativos.

---

## 🗄️ Módulo 3: Linguagem SQL — DDL e DML Básico (Semanas 9 a 13)

* **Semana 09: Introdução à Linguagem SQL e Sublinguagens**
  * História e padronização da linguagem SQL (Structured Query Language).
  * Divisão das sublinguagens: DDL (Definição), DML (Manipulação), DQL (Consulta), DCL (Controle) e TCL (Transação).
  * Tipos de dados essenciais em SQL: numéricos (`INT`, `DECIMAL`), texto (`VARCHAR`, `TEXT`), temporais (`DATE`, `TIMESTAMP`) e booleanos.
* **Semana 10: DDL — Criando e Modificando a Estrutura do Banco**
  * Criação do banco de dados: `CREATE DATABASE` / `DROP DATABASE`.
  * Criação de tabelas com constraints: `CREATE TABLE` (`PRIMARY KEY`, `FOREIGN KEY`, `NOT NULL`, `UNIQUE`, `DEFAULT`, `CHECK`).
  * Modificação e exclusão de estruturas: `ALTER TABLE` e `DROP TABLE`.
* **Semana 11: DML — Inserção de Dados (`INSERT INTO`)**
  * Sintaxe do comando `INSERT INTO ... VALUES (...)`.
  * Inserção de múltiplos registros em um único comando.
  * Boas práticas para lidar com campos auto-incremento (`SERIAL` / `AUTO_INCREMENT`).
* **Semana 12: DML — Atualização e Exclusão (`UPDATE` e `DELETE`)**
  * Atualização de registros existentes com o comando `UPDATE ... SET ... WHERE`.
  * O perigo crucial do `UPDATE` e `DELETE` sem a cláusula `WHERE`!
  * Exclusão física de registros com `DELETE FROM` vs. `TRUNCATE TABLE`.
  * Conceito de exclusão lógica (Soft Delete: flag `ativo = false` ou `deleted_at`).
* **Semana 13: DQL — Consultas Básicas com `SELECT`**
  * Estrutura fundamental da consulta: `SELECT campos FROM tabela`.
  * Filtros com cláusula `WHERE` e operadores relacionais (`=`, `<>`, `<`, `>`, `<=`, `>=`).
  * Operadores lógicos (`AND`, `OR`, `NOT`), busca por padrões (`LIKE '%termo%'`) e faixas (`BETWEEN`, `IN`, `IS NULL`).

---

## 🔍 Módulo 4: DQL Avançado — Ordenação, Funções de Agregação e Junções (Semanas 14 a 17)

* **Semana 14: Ordenação, Limitação e Funções Escalares**
  * Ordenação de resultados com `ORDER BY` (ascendente `ASC` e descendente `DESC`).
  * Paginação inicial de consultas com `LIMIT` e `OFFSET`.
  * Funções de texto e data: `UPPER()`, `LOWER()`, `CONCAT()`, `LENGTH()`, `NOW()`, `DATE_PART()`.
* **Semana 15: Funções de Agregação e Agrupamento (`GROUP BY`)**
  * Funções agregadas de resumo: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.
  * Agrupamento de dados com `GROUP BY`.
  * Filtragem de grupos calculados usando a cláusula `HAVING` (diferença entre `WHERE` e `HAVING`).
* **Semana 16: Junções de Tabelas — `INNER JOIN`**
  * O poder do modelo relacional: combinando dados de múltiplas tabelas.
  * Sintaxe e funcionamento do `INNER JOIN ... ON`.
  * Consultando tabelas com relacionamentos 1:N e N:M (usando a tabela associativa intermediária).
* **Semana 17: Junções Externas (`LEFT JOIN`, `RIGHT JOIN`) e Subconsultas**
  * Diferença entre `INNER JOIN` e `LEFT JOIN` (como trazer registros mesmo quando não há correspondência na tabela relacionada).
  * Introdução a Subconsultas (Subqueries) no `WHERE` e no `FROM`.
  * Criação de Visões (Views: `CREATE VIEW`) para simplificar consultas complexas do sistema.

---

## 🛡️ Módulo 5: Segurança, Transações, Backup e Projeto Integrador (Semanas 18 a 20)

* **Semana 18: Transações e Propriedades ACID**
  * O que é uma transação de banco de dados e as propriedades fundamentais ACID (Atomicidade, Consistência, Isolamento e Durabilidade).
  * Controle transacional em SQL: `BEGIN TRANSACTION`, `COMMIT` e `ROLLBACK`.
  * Exemplos clássicos: transferência bancária segura.
* **Semana 19: Backup, Restauração e Índices**
  * Exportação de dumps de banco de dados (backup lógico em arquivo `.sql`).
  * Restauração de bases a partir de scripts SQL.
  * Otimização de desempenho: criação de índices (`CREATE INDEX`) e plano de execução (`EXPLAIN`).
* **Semana 20: Apresentação do Projeto Integrador de Banco de Dados**
  * Apresentação da modelagem completa (MER, DER Lógico Normalizado na 3FN, Dicionário de Dados).
  * Execução do script DDL de criação e população de dados de teste realistas.
  * Demonstração de consultas de relatórios de negócio avançadas utilizando `JOIN`, `GROUP BY` e `HAVING`.
