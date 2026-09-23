# Plano de Curso: Programação Back-End I (20 Semanas)

**Unidade Curricular:** Programação Back-End (Etapa 1)  
**Carga Horária Total:** 105 horas  
**Carga Semanal:** 7 horas/semana (20 Semanas)  
**Módulo:** Módulo Específico I — 2º Semestre  
**Foco:** Fundamentos de Node.js, JavaScript ES6+, Programação Orientada a Objetos (POO), Modelagem UML, Arquitetura MVC, APIs RESTful com Express, Middlewares, Tratamento de Erros e Persistência Local em JSON.  
**Ferramentas e Recursos:** Node.js, Express, JavaScript moderno, VS Code, Git, GitHub, Postman, Swagger, Insomnia.

---

## 🚀 Módulo 1: Fundamentos da Web, JavaScript Moderno e POO (Semanas 1 a 8)

* **Semana 01: Introdução à Web e Arquitetura Back-End**
  * Como a Internet funciona: clientes, servidores, requisições e respostas.
  * O papel do Front-End vs. Back-End e os fluxos de tráfego de dados.
  * Visão geral de pilhas tecnológicas (stacks) e o ecossistema Node.js.
* **Semana 02: Preparação do Ambiente de Desenvolvimento**
  * Instalação e configuração do Node.js (LTS), gerenciador de pacotes NPM e terminal.
  * Inicialização de projetos Node.js com `npm init -y` e anatomia do arquivo `package.json`.
  * Instalação de dependências normais e de desenvolvimento (ex: `nodemon`).
* **Semana 03: Revisão Aprofundada de JavaScript ES6+**
  * Escopo de variáveis: `let`, `const` e elevação (hoisting).
  * Template literals, desestruturação de objetos e arrays (`destructuring`).
  * Operadores Rest e Spread (`...`), arrow functions e métodos utilitários.
* **Semana 04: Manipulação Avançada de Coleções e Arrays**
  * Métodos funcionais de iteração: `forEach`, `map`, `filter`, `find`, `some`, `every` e `reduce`.
  * Imutabilidade e boas práticas no tratamento de coleções de dados no back-end.
  * Prática: Filtragem, transformação e agregação de dados simulados de sistema.
* **Semana 05: Funções, Modularização e Sistema de Módulos (CommonJS vs. ESM)**
  * Declaração de funções, funções anônimas e callbacks.
  * Modularização de código: dividindo a lógica em múltiplos arquivos.
  * Exportação e importação com `module.exports` / `require` (CommonJS) e `import` / `export` (ES Modules).
* **Semana 06: Introdução à Programação Orientada a Objetos (POO)**
  * Paradigma Orientado a Objetos vs. Paradigma Estruturado.
  * Conceito de Classes, Construtores (`constructor`), Atributos e Métodos.
  * Instanciação de objetos com `new` e manipulação do operador `this`.
* **Semana 07: POO Avançado e Modelagem com Diagramas de Classe UML**
  * Pilares da POO: Encapsulamento (métodos get/set, atributos privados), Herança (`extends`, `super`) e Polimorfismo.
  * Elaboração de Diagramas de Classe na notação UML (Unified Modeling Language).
  * Tradução de diagramas UML diretamente em código estruturado de classes em JavaScript.
* **Semana 08: Versionamento com Git, GitHub e Boas Práticas (Clean Code)**
  * Organização de repositórios profissionais: arquivo `.gitignore`, commits atômicos e descritivos.
  * Princípios de Clean Code: nomenclatura expressiva de variáveis, funções com responsabilidade única e redução de aninhamentos.
  * Revisão prática de código por pares (Code Review).

---

## 🌐 Módulo 2: Protocolo HTTP, Express e Arquitetura MVC (Semanas 9 a 15)

* **Semana 09: O Protocolo HTTP e Métodos da Web**
  * Funcionamento das mensagens HTTP: Cabeçalhos (Headers), Corpo (Body) e Linha de Status.
  * Principais métodos HTTP: `GET` (buscar), `POST` (criar), `PUT` (substituir), `PATCH` (atualizar parcialmente) e `DELETE` (remover).
  * Códigos de status HTTP (Status Codes): 2xx (Sucesso), 3xx (Redirecionamento), 4xx (Erro do Cliente), 5xx (Erro do Servidor).
* **Semana 10: Formato JSON na Prática de Servidores**
  * O que é JSON (JavaScript Object Notation) e sua supremacia sobre o XML.
  * Tipos de dados suportados, validação de sintaxe e manipulação de coleções JSON.
  * Conversão de dados: `JSON.stringify()` (objeto para string) e `JSON.parse()` (string para objeto).
* **Semana 11: Introdução ao Framework Express e Arquitetura MVC**
  * O que é o Express e por que utilizá-lo para criar servidores web.
  * Instalação e criação do primeiro servidor Express ouvindo em uma porta local.
  * Introdução ao padrão arquitetural MVC (Model-View-Controller) adaptado a APIs.
* **Semana 12: Roteamento, Parâmetros e Tipos de Entrada**
  * Definição de rotas no Express (`app.get`, `app.post`, etc.).
  * Parâmetros de rota (Route Params: `/usuarios/:id`).
  * Parâmetros de consulta (Query Params: `/usuarios?status=ativo&pagina=2`).
  * Corpo da requisição (Request Body via `express.json()`).
* **Semana 13: Middlewares e Tratamento Centralizado de Erros**
  * O que é um middleware e o ciclo Requisição → Middleware → Resposta (`req`, `res`, `next`).
  * Middlewares globais (loggers, parsing) e middlewares específicos por rota.
  * Middleware de captura global de exceções e tratamento de erros 404/500.
* **Semana 14: Construindo a Primeira API RESTful Completa**
  * Princípios REST: recursos identificados por URIs, comunicação stateless e uso correto de verbos.
  * Estruturação de rotas de um recurso completo (ex: `/produtos` ou `/tarefas`).
  * Teste manual de todas as rotas usando o Postman ou Insomnia.
* **Semana 15: Documentação de APIs com Postman e Swagger**
  * A importância de documentar APIs para integração com equipes de front-end e mobile.
  * Exportação de coleções de rotas e variáveis de ambiente no Postman.
  * Introdução ao Swagger / OpenAPI e geração de documentação interativa das rotas.

---

## 💾 Módulo 3: CRUD em Memória, Persistência Local e Projeto Parcial (Semanas 16 a 20)

* **Semana 16: Implementação de CRUD Completo em Memória**
  * Criação das operações completas: Create, Read (Listar todos e buscar por ID), Update e Delete.
  * Aplicação de validações manuais de regras de negócio antes de persistir.
  * Separação clara entre camada de Roteamento (`routes/`) e Controladores (`controllers/`).
* **Semana 17: Persistência Local em Arquivos JSON com Módulo `fs`**
  * O módulo nativo `fs` (File System) e sua versão baseada em Promises (`fs/promises`).
  * Leitura assíncrona de arquivos com `readFile` e escrita atômica com `writeFile`.
  * Criação de uma camada simples de repositório para salvar e recuperar coleções de entidades em disco.
* **Semana 18: Refatoração, Modularização e Boas Práticas**
  * Refatoração da arquitetura do projeto: separação de pastas (`src/controllers`, `src/routes`, `src/models`, `src/data`).
  * Centralização de mensagens de resposta e tratamento de cenários de IDs inexistentes.
  * Tira-dúvidas e alinhamento de requisitos do projeto integrador parcial.
* **Semana 19: Desenvolvimento do Projeto Integrador Parcial**
  * Implementação supervisionada de uma API completa de um sistema escolhido pela turma (ex: Sistema de Gerenciamento Escolar, Biblioteca ou Mini E-commerce).
  * A API deve conter: documentação Postman/Swagger, persistência local em JSON, arquitetura MVC e tratamento de erros.
* **Semana 20: Apresentação da API, Code Review e Encerramento da Etapa 1**
  * Demonstração das rotas e das validações de regras de negócio funcionando.
  * Avaliação das entregas conforme checklist de competências técnicas.
  * Planejamento para a Etapa 2 (3º Semestre): migração para bancos de dados relacionais e autenticação JWT.
