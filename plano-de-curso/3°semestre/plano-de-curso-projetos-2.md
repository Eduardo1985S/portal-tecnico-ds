# Plano de Curso: Projetos de Software II (20 Semanas)

**Unidade Curricular:** Projetos de Software (Etapa 2: Desenvolvimento Full-Stack e Integração)  
**Carga Horária Total:** 45 horas  
**Carga Semanal:** 3 horas/semana (20 Semanas)  
**Módulo:** Módulo Específico I — 3º Semestre  
**Ferramentas e Recursos:** GitHub (Organização, Issues, Pull Requests), Postman / Swagger, React / React Native, Node.js, Prisma / PostgreSQL.

---

## 🚀 Módulo 1: Alinhamento de Arquitetura e Planejamento da Construção (Semanas 1 a 4)

* **Semana 01: Retomada dos Projetos e Revisão do Escopo da Etapa 2**
  * Revisão dos artefatos produzidos no 2º semestre (Visão, Protótipo Figma e Modelagem de Banco de Dados).
  * Definição da meta da Etapa 2: entrega do **MVP Funcional Integrado** (Front-End web ou Mobile consumindo a API Back-End com banco de dados real).
* **Semana 02: Configuração dos Ambientes e Repositórios Monorepo/Multirepo**
  * Estruturação do repositório no GitHub: divisão clara entre `server` (Back-End) e `client` / `mobile` (Front-End/App).
  * Configuração de scripts de desenvolvimento unificados e arquivos `.env.example`.
* **Semana 03: Quebra de Tarefas Técnicas no GitHub Issues**
  * Transformação dos requisitos e telas em tarefas técnicas de implementação (Tasks).
  * Rotulagem de Issues (`backend`, `frontend`, `bug`, `documentation`) e atribuição aos membros da equipe.
* **Semana 04: Planejamento da Sprint 1 de Desenvolvimento**
  * Definição da meta da primeira Sprint: Autenticação de Usuários e CRUD da entidade principal do sistema.
  * Estimativa de esforço e início dos trabalhos de codificação em branches de feature (`feature/...`).

---

## 💻 Módulo 2: Ciclo de Desenvolvimento 1 — Autenticação e Core do Sistema (Semanas 5 a 8)

* **Semana 05: Implementação Guiada — Autenticação e Segurança**
  * Back-End: Geração e validação de tokens JWT.
  * Front-End / Mobile: Tela de Login e Cadastro persistindo o token e gerenciando estado de usuário logado.
* **Semana 06: Revisão de Código por Pares (Code Review) e Pull Requests**
  * O processo de abertura de Pull Requests (PR) no GitHub.
  * Boas práticas de Code Review: checagem de Clean Code, tratamento de erros e integridade.
  * Mesclagem (Merge) controlada para a branch `develop`.
* **Semana 07: Implementação do CRUD Principal Integrado**
  * Integração das telas de listagem e cadastro com as rotas autenticadas da API.
  * Tratamento de estados visuais: carregamento (Spinner/Loading), feedback de sucesso e mensagens de erro amigáveis.
* **Semana 08: Sprint Review 1 e Demonstração do Primeiro Incremento**
  * Demonstração ao vivo do primeiro fluxo completo funcionando de ponta a ponta (Frontend ↔ API ↔ PostgreSQL).
  * Retrospectiva da equipe: identificação de gargalos de comunicação ou técnicos.

---

## 🔄 Módulo 3: Ciclo de Desenvolvimento 2 — Regras de Negócio Avançadas (Semanas 9 a 13)

* **Semana 09: Planejamento da Sprint 2 de Desenvolvimento**
  * Priorização das histórias secundárias do sistema (ex: filtros de busca, paginação, relatórios ou upload de arquivos).
  * Atualização do quadro ágil no GitHub Projects.
* **Semana 10: Implementação de Filtros, Buscas e Paginação Integrada**
  * Criação de campos de pesquisa interativos na interface do usuário.
  * Envio de parâmetros de consulta (Query Params) para o backend e renderização de tabelas/cards paginados.
* **Semana 11: Implementação de Recursos Visuais e Upload de Arquivos**
  * Envio de imagens (produtos, comprovantes ou avatares) a partir do frontend/mobile via formulário multipart.
  * Armazenamento e exibição dinâmica das imagens na interface.
* **Semana 12: Testes Manuais de Integração e Caça a Bugs**
  * Sessão de testes cruzados: membros de uma equipe testam o sistema de outra equipe simulando usuários leigos.
  * Registro de bugs encontrados como Issues no GitHub com prints e passos de reprodução.
* **Semana 13: Sprint Review 2 — Demonstração do Sistema Expandido**
  * Apresentação das novas funcionalidades integradas.
  * Ajustes de prioridades para a reta final do semestre.

---

## 🛡️ Módulo 4: Estabilidade, Documentação e Preparação para Nuvem (Semanas 14 a 17)

* **Semana 14: Refatoração e Padronização da Base de Código**
  * Eliminação de códigos mortos, `console.log` desnecessários e código duplicado.
  * Padronização de estilos visuais e feedback ao usuário (Toasts / Alertas).
* **Semana 15: Atualização da Documentação da API (Swagger / Postman)**
  * Garantia de que todos os endpoints desenvolvidos estão documentados com exemplos reais de payload.
  * Criação de guia de instalação e execução no `README.md` principal.
* **Semana 16: Preparação para Hospedagem em Ambiente de Homologação**
  * Configuração do banco de dados na nuvem (Supabase / Render PostgreSQL / Neon).
  * Deploy preliminar da API no Render/Railway e do Front-End na Vercel.
* **Semana 17: Validação dos Critérios de Aceite do MVP**
  * Verificação se todas as histórias prioritárias (Must Have) foram concluídas com sucesso.
  * Ensaio de fluxos operacionais completos.

---

## 🏆 Módulo 5: Demonstração do MVP Integrado e Banca Semestral (Semanas 18 a 20)

* **Semana 18: Elaboração do Relatório Técnico Parcial**
  * Documentação das tecnologias utilizadas, arquitetura implementada, dificuldades superadas e próximos passos para o 4º semestre (IoT, Testes e Publicação).
* **Semana 19: Preparação da Demonstração ao Vivo e Apresentação**
  * Estruturação da demonstração em tempo real: execução sem falhas dos principais casos de uso do sistema.
  * Alinhamento da fala de cada membro da equipe.
* **Semana 20: Apresentação Final (Banca do 3º Semestre) e Encerramento**
  * Apresentação da solução funcionando com banco de dados real em nuvem para a banca docente e convidados.
  * Feedback da banca e orientações para o fechamento do curso no 4º semestre.
