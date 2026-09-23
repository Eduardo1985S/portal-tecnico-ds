# Plano de Curso: Testes de Software (20 Semanas)

**Unidade Curricular:** Teste de Software  
**Carga Horária Total:** 45 horas  
**Carga Semanal:** 3 horas/semana (20 Semanas)  
**Módulo:** Módulo Específico II — 4º Semestre  
**Foco:** Garantia da Qualidade de Software (QA), Níveis e Tipos de Testes (Unitários, Integração, Ponta a Ponta - E2E, Carga e Performance), Elaboração de Planos e Casos de Testes, Automação de Testes de API e Frontend, Gestão de Defeitos (Bug Tracking) e Relatórios de Homologação.  
**Ferramentas e Recursos:** Vitest / Jest, Supertest, Cypress, Postman Runner, k6 (Testes de Carga), GitHub Issues / Jira, VS Code.

---

## 🎯 Módulo 1: Fundamentos de Qualidade e Estratégia de Testes (Semanas 1 a 4)

* **Semana 01: Introdução ao Teste e Qualidade de Software**
  * O papel do QA (Quality Assurance) no ciclo de vida de desenvolvimento de software.
  * O custo do defeito: por que encontrar bugs em produção é até 100x mais caro que na fase de desenvolvimento.
  * Diferença entre Erro (engano humano), Defeito/Bug (anomalia no código) e Falha (comportamento visível incorreto).
  * As 7 diretrizes/princípios fundamentais do teste de software (ISTQB).
* **Semana 02: A Pirâmide de Testes e Níveis de Teste**
  * A Pirâmide de Testes de Martin Fowler: Base (Testes Unitários), Meio (Testes de Integração) e Topo (Testes E2E / Manuais).
  * Comparativo de custo, velocidade de execução e confiabilidade de cada nível.
  * Teste de Aceitação do Usuário (UAT - User Acceptance Testing).
* **Semana 03: Tipos de Testes: Funcionais vs. Não Funcionais**
  * Testes Funcionais: verificam **o que** o sistema faz (regras de negócio, autenticação, cálculos, fluxos de usuário).
  * Testes Não Funcionais: verificam **como** o sistema se comporta (Desempenho, Carga, Estresse, Segurança, Usabilidade, Compatibilidade).
  * O conceito de Testes de Regressão: garantindo que novas funcionalidades não quebrem o que já estava funcionando.
* **Semana 04: Planejamento de Testes e Matriz de Riscos**
  * O que é um Plano de Testes (Test Plan) e seus componentes essenciais.
  * Análise de Riscos: priorização de testes baseada em probabilidade de falha x impacto no negócio.
  * Critérios de Entrada (Entry Criteria) e Critérios de Saída (Exit Criteria) para homologação.

---

## 🧪 Módulo 2: Casos de Teste e Testes Unitários Automatizados (Semanas 5 a 8)

* **Semana 05: Elaboração e Escrita de Casos de Teste (Test Cases)**
  * Anatomia de um Caso de Teste profissional: ID, Título, Pré-condições, Passos de Execução, Dados de Entrada, Resultado Esperado e Status (Passou/Falhou).
  * Técnicas de caixa preta: Particionamento de Equivalência e Análise do Valor Limite (Boundary Value Analysis).
  * Criação da planilha/matriz de casos de teste para o sistema do projeto da turma.
* **Semana 06: Introdução a Testes Unitários Automatizados com Vitest / Jest**
  * O que são testes unitários e o princípio FIRST (Fast, Independent, Repeatable, Self-validating, Timely).
  * Configuração do test runner **Vitest** ou **Jest** em um projeto Node.js/JavaScript.
  * Anatomia de um teste: blocos `describe`, `test` ou `it`, e asserções com `expect().toBe()`, `toEqual()`.
* **Semana 07: Padrão AAA e Testando Regras de Negócio Puras**
  * O padrão de estruturação **AAA: Arrange (Preparar), Act (Agir) e Assert (Verificar)**.
  * Testando funções puras de regras de negócio (cálculos de desconto, validação de CPF, taxas de entrega).
  * Testando fluxos felizes (Happy Path) e caminhos de exceção (tratamento de erros esperados).
* **Semana 08: Dublês de Teste — Mocks, Spies e Stubs**
  * Por que testes unitários não devem tocar em bancos de dados reais ou chamar APIs externas.
  * O conceito de Mocks: simulando retornos de funções de repositório e serviços externos com `vi.fn()` / `jest.fn()`.
  * Cobertura de Código (Code Coverage): interpretando relatórios de cobertura de linhas e branches no terminal.

---

## 🔌 Módulo 3: Testes de Integração de APIs RESTful (Semanas 9 a 13)

* **Semana 09: Testando Endpoints HTTP com Supertest**
  * O que são testes de integração no Back-End.
  * Instalação e configuração da biblioteca **Supertest** integrada ao Express.
  * Disparando requisições virtuais `GET`, `POST`, `PUT`, `DELETE` sem precisar subir o servidor na rede física.
* **Semana 10: Testando Fluxos Autenticados e Respostas da API**
  * Testando cenários reais: cadastro de usuário → login → captura do token JWT → requisição a rota protegida com o token no cabeçalho.
  * Validando status codes (200, 201, 400, 401, 403, 404, 500) e esquemas de resposta JSON.
* **Semana 11: Gerenciamento de Banco de Dados de Teste**
  * Boas práticas: isolamento de banco de dados específico para testes (ex: banco em memória SQLite ou banco de teste descartável).
  * Hooks de ciclo de vida de testes: `beforeAll`, `beforeEach`, `afterEach`, `afterAll` para limpeza e recriação de tabelas.
* **Semana 12: Automação de Testes de API com Postman Runner / Newman**
  * Criação de Coleções de Testes no Postman com scripts de asserção em JavaScript (`pm.test()`, `pm.expect()`).
  * Encadeamento de variáveis de ambiente dinâmicas entre requisições.
  * Execução em massa e automatizada de testes de regressão no terminal usando o **Newman CLI**.
* **Semana 13: Gestão de Defeitos e Ciclo de Vida do Bug**
  * Como reportar um bug com excelência: Título claro, severidade vs. prioridade, ambiente, passos detalhados de reprodução, logs e prints.
  * O ciclo de vida do bug: Novo → Atribuído → Aberto → Corrigido → Em Reteste → Fechado (ou Reaberto).
  * Registro de bugs no GitHub Issues com template padronizado de defeito.

---

## 🖥️ Módulo 4: Testes de Ponta a Ponta (E2E) e Testes Não Funcionais (Semanas 14 a 17)

* **Semana 14: Introdução a Testes Ponta a Ponta (E2E) com Cypress**
  * O que são testes E2E e a simulação das ações de um usuário real no navegador.
  * Instalação e configuração do **Cypress** na aplicação Front-End.
  * Navegação na interface interativa do Cypress Test Runner.
* **Semana 15: Automação de Fluxos de Interface com Cypress**
  * Comandos fundamentais: `cy.visit()`, `cy.get()`, `cy.type()`, `cy.click()`, `cy.contains()`.
  * Asserções visuais: `should('be.visible')`, `should('have.text')`, `should('have.length')`.
  * Prática: Automação completa do fluxo crítico do sistema (Tela de Login → Preenchimento de Formulário → Envio → Verificação da mensagem de sucesso na tela).
* **Semana 16: Testes de Performance e Carga com k6**
  * O que é teste de carga (Load Testing) e teste de estresse (Stress Testing).
  * Instalação da ferramenta de testes de carga moderna **k6**.
  * Criação de script de teste simulando múltiplos usuários virtuais simultâneos (Virtual Users - VUs) disparando requisições contra a API.
  * Análise de métricas críticas: tempo médio de resposta (p95, p99), requisições por segundo (RPS) e taxa de erro.
* **Semana 17: Noções de Testes de Segurança (DAST e OWASP Top 10)**
  * Introdução às 10 maiores vulnerabilidades de aplicações web (OWASP Top 10: SQL Injection, Broken Authentication, XSS, etc.).
  * Teste manual e automatizado de injeção de dados maliciosos nos formulários e endpoints da aplicação.

---

## 📋 Módulo 5: Relatório de Validação e Homologação Final (Semanas 18 a 20)

* **Semana 18: Execução da Bateria Completa de Testes de Homologação**
  * Execução dos testes unitários, testes de integração de API e testes E2E sobre o sistema final do Projeto Integrador.
  * Coleta dos resultados e métricas finais de cobertura e estabilidade.
* **Semana 19: Elaboração do Relatório de Validação e Testes de Software**
  * Redação do Documento Formal de Relatório de Testes (Test Summary Report):
    * Resumo executivo dos testes executados.
    * Gráficos de cobertura e taxa de sucesso (% de casos aprovados x reprovados).
    * Lista de defeitos encontrados e seus status de resolução.
    * Parecer técnico final de conformidade do software (Aprovado / Homologado para Produção).
* **Semana 20: Apresentação da Estratégia de Qualidade e Encerramento**
  * Demonstração ao vivo dos testes automatizados rodando no terminal e no Cypress.
  * Apresentação dos relatórios de validação de qualidade à banca docente.
  * Conclusão da disciplina de Teste de Software com formação em padrões de excelência de mercado.
