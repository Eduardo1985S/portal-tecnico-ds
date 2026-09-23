---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-20-apresentacao-projeto-integrador-banco-dados
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-20-apresentacao-projeto-integrador-banco-dados
sidebar_position: 20
title: "Aula 20 — Apresentação do Projeto Integrador de Banco de Dados"
description: Apresente o projeto completo de banco de dados desde o modelo conceitual até scripts SQL de relatórios analíticos avançados.
---

# Aula 20 — Apresentação do Projeto Integrador de Banco de Dados

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Consolidar a formação integral em Banco de Dados apresentando o projeto completo de engenharia de dados à banca avaliadora, defendendo as escolhas de modelagem conceitual (MER), a transformação para o modelo lógico normalizado na 3ª Forma Normal, o dicionário de dados formal, o script DDL de criação e executando ao vivo consultas DQL analíticas e relatórios estratégicos utilizando junções e agregações.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Estrutura da apresentação técnica de um projeto de banco de dados.
- Apresentação do Diagrama Entidade-Relacionamento (DER) justificando as cardinalidades 1:1, 1:N e N:M.
- Demonstração da aplicação da 1FN, 2FN e 3FN no esquema relacional.
- Execução do script DDL de criação das tabelas com constraints, chaves estrangeiras e índices.
- Demonstração de queries de negócio avançadas (`INNER JOIN`, `LEFT JOIN`, `GROUP BY`, `HAVING`).
- Retrospectiva da disciplina e alinhamento com a disciplina de **Programação Back-End** (utilização de ORMs como Prisma e conexões com Node.js).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O banco de dados é a base invisível sobre a qual repousam todas as aplicações do mundo moderno. Um bom engenheiro de software se destaca quando sabe articular:

1. **A Dor do Negócio**: Qual problema do mundo real este banco resolve?
2. **A Integridade Arquitetural**: Como as chaves primárias, estrangeiras e restrições `CHECK` impedem dados corrompidos ou inconsistentes?
3. **A Escalabilidade e Performance**: Por que a normalização na 3FN foi adotada e onde índices foram posicionados para evitar lentidão nas consultas mais frequentes?

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Roteiro de Apresentação Técnica

Cada equipe terá 15 minutos para apresentar os seguintes artefatos:

```text
1. INTRODUÇÃO (2 min)
   - Nome do projeto e objetivo do sistema (ex: Gestão de Clínica Veterinária).
   
2. MODELAGEM CONCEITUAL (3 min)
   - Apresentação do DER (Peter Chen ou Notação Pé de Galinha).
   - Destaque para as entidades principais e relacionamentos mais complexos.

3. MODELAGEM LÓGICA E NORMALIZAÇÃO (3 min)
   - Apresentação das tabelas relacionais com PKs e FKs.
   - Demonstração de um exemplo onde a 1FN, 2FN ou 3FN foi aplicada.

4. DEMONSTRAÇÃO PRÁTICA AO VIVO NO DBEAVER (5 min)
   - Execução do script DDL de criação e população.
   - Execução de 3 consultas analíticas:
     Query 1: Relatório consolidado com INNER JOIN de 3 tabelas.
     Query 2: Detecção de ausência com LEFT JOIN e IS NULL.
     Query 3: Totalização analítica agrupada com GROUP BY e HAVING.

5. CONCLUSÃO E PERGUNTAS DA BANCA (2 min)
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Organize todos os arquivos do projeto em uma pasta limpa no seu repositório:
   - `01_modelo_conceitual.png` (ou arquivo do brModelo).
   - `02_dicionario_de_dados.md` (tabela de metadados).
   - `03_script_criacao_ddl.sql` (todas as tabelas e constraints).
   - `04_script_populacao_dml.sql` (massa de dados de teste coerente).
   - `05_consultas_relatorios_dql.sql` (perguntas de negócio respondidas por SQL).
2. Execute os scripts em um banco novo e limpo para certificar-se de que não há erros de dependência.
3. Apresente o projeto para a turma e o professor.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Modelo conceitual (DER) legível e padronizado.
- [ ] Esquema lógico relacional normalizado na 3ª Forma Normal.
- [ ] Dicionário de dados completo documentado.
- [ ] Script DDL executando do início ao fim sem erros (`CREATE TABLE`, `CONSTRAINTS`).
- [ ] Script de dados populando pelo menos 5 linhas por tabela.
- [ ] Consultas com `JOIN` e `GROUP BY` respondendo a métricas de negócio.

---

## <i className="fa-solid fa-trophy" style={{ color: 'var(--ifm-color-primary)' }}></i> Conclusão da Formação em Banco de Dados!

Parabéns pela conclusão da Unidade Curricular de **Banco de Dados**!
Você dominou a arte de modelar, estruturar, proteger, consultar e otimizar bases relacionais. Esta competência será a base sólida para a integração com **Back-End (Node.js, Express, Prisma ORM)** e o desenvolvimento de aplicações completas no mercado!
