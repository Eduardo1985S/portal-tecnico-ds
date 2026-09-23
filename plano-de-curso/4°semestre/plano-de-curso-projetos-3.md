# Plano de Curso: Projetos de Software III (20 Semanas)

**Unidade Curricular:** Projetos de Software (Etapa 3: Capstone, Testes, Nuvem e Formatura)  
**Carga Horária Total:** 45 horas  
**Carga Semanal:** 3 horas/semana (20 Semanas)  
**Módulo:** Módulo Específico II — 4º Semestre  
**Foco:** Finalização do Projeto Integrador de Conclusão de Curso (Capstone), Integração Total do Ecossistema (Web, Mobile, Nuvem, IoT e Testes Automatizados), Integração Contínua (CI/CD), Documentação Final, Pitch Executivo e Apresentação para Banca Externa/Feira Tecnológica.  
**Ferramentas e Recursos:** GitHub Actions (CI/CD), Vercel, Render / Railway, EAS Expo, Docker, Google Slides / Pitch Deck, Swagger.

---

## 🎯 Módulo 1: Alinhamento Final de Escopo e Integração do Ecossistema (Semanas 1 a 4)

* **Semana 01: Retomada e Metas da Etapa Final de Formatura**
  * O papel do projeto de 4º semestre como Portfólio de Entrada no Mercado de Trabalho (Nível Júnior).
  * Revisão dos entregáveis exigidos para a banca final:
    * 1. API Back-End robusta, documentada e com autenticação em nuvem.
    * 2. Aplicação Web Front-End moderna e responsiva (React).
    * 3. Aplicativo Mobile funcional no celular (React Native / Expo).
    * 4. Módulo integrado de IoT com hardware/sensores em tempo real.
    * 5. Cobertura de testes automatizados e relatório de qualidade.
* **Semana 02: Revisão do Backlog Final e Definição da Linha de Base**
  * Mapeamento dos itens restantes para o fechamento do sistema completo.
  * Eliminação de funcionalidades dispensáveis que não agregam valor (redução de escopo para foco na excelência do core).
* **Semana 03: Integração do Módulo de IoT ao Sistema Principal**
  * Conexão dos dados de sensores coletados pelo ESP32 com o banco de dados do sistema e as interfaces do usuário (Web e Mobile).
  * Validação das regras de alerta automático na interface gráfica.
* **Semana 04: Planejamento da Sprint 1 de Refinamento**
  * Atribuição das tarefas de refinamento visual, estabilidade e validação de regras de negócio.

---

## 🚀 Módulo 2: Integração Contínua (CI/CD) e Infraestrutura em Nuvem (Semanas 5 a 8)

* **Semana 05: Introdução ao CI/CD com GitHub Actions**
  * O que é Integração Contínua (CI) e Entrega Contínua (CD).
  * Criação do primeiro fluxo de automação (`.github/workflows/ci.yml`).
  * Execução automática de linters e testes automatizados a cada Pull Request aberto.
* **Semana 06: Automação de Deploy Contínuo do Front-End e Back-End**
  * Configuração do deploy automático na Vercel/Netlify a cada commit na branch `main`.
  * Configuração do deploy automático da API Node.js no Render ou Railway integrado ao banco de dados PostgreSQL gerenciado.
* **Semana 07: Publicação e Geração do APK Mobile com EAS Build**
  * Compilação na nuvem do aplicativo React Native através do EAS CLI.
  * Distribuição do arquivo `.apk` para instalação direta nos celulares dos membros da equipe e professores avaliadores.
* **Semana 08: Sprint Review 1 — Demonstração do Ambiente 100% em Produção**
  * Acesso ao vivo ao sistema rodando em ambiente de produção na nuvem: web no navegador, API respondendo e app instalado no celular.

---

## 🧪 Módulo 3: Homologação, Testes e Refinamento de UX (Semanas 9 a 13)

* **Semana 09: Integração da Bateria de Testes Automatizados**
  * Incorporação dos testes unitários e de integração desenvolvidos na UC de Testes de Software ao projeto principal.
  * Verificação de que nenhum fluxo quebrou nas integrações recentes.
* **Semana 10: Auditoria de Performance e Acessibilidade (Lighthouse)**
  * Execução da ferramenta Google Lighthouse nas páginas web da aplicação.
  * Otimização de tempos de carregamento, compressão de imagens e correção de falhas de contraste ou acessibilidade.
* **Semana 11: Auditoria de Segurança e Tratamento de Dados Sensíveis**
  * Garantia de que nenhuma chave de API, senha de banco ou segredo JWT foi comitada no repositório público (remoção e inclusão no `.gitignore`).
  * Tratamento de injeções de SQL, validação rigorosa de entradas com Zod e proteção de rotas privadas.
* **Semana 12: Testes com Usuários Reais (Beta Testing)**
  * Disponibilização do link do sistema e APK para alunos de outras turmas testarem.
  * Coleta de impressões e identificação de pontos de atrito na experiência do usuário (UX).
* **Semana 13: Sprint Review 2 — Ajustes Finais de Bugs e Feedback**
  * Correção prioritária de todos os defeitos identificados no teste beta.
  * Congelamento oficial de código (Feature Freeze): foco exclusivo na estabilidade e documentação.

---

## 📚 Módulo 4: Dossiê Técnico e Documentação de Formatura (Semanas 14 a 17)

* **Semana 14: Elaboração do Manual do Usuário e Manual de Operação**
  * Redação do guia ilustrado com capturas de tela explicando como navegar e operar as principais funcionalidades do sistema.
  * Guia de primeiros passos (Onboarding) para novos usuários.
* **Semana 15: Elaboração do Manual de Instalação e Execução Técnica**
  * Documentação no `README.md` principal do repositório:
    * Pré-requisitos (Node.js, Docker, Git).
    * Passo a passo para clonar, instalar dependências (`npm install`), rodar migrações do banco e iniciar servidores localmente.
    * Variáveis de ambiente necessárias (`.env.example`).
* **Semana 16: Documentação Interativa da API (Swagger)**
  * Revisão da documentação das rotas públicas e privadas no Swagger UI com exemplos claros de Request e Response.
* **Semana 17: Revisão do Portfólio no GitHub de cada Integrante**
  * Atualização dos perfis dos alunos no GitHub: destaque para o repositório do projeto, descrição clara e link do sistema rodando online.

---

## 🎓 Módulo 5: Pitch Executivo, Feira Tecnológica e Banca Final (Semanas 18 a 20)

* **Semana 18: Estruturação do Pitch Deck Profissional**
  * O que é um Pitch Deck e como encantar uma banca de avaliadores de mercado e recrutadores de tecnologia.
  * Estrutura da apresentação (7 a 10 minutos):
    * 1. O Problema e o Mercado.
    * 2. A Solução e Proposta de Valor.
    * 3. Demonstração ao vivo do Software (Web + Mobile + IoT funcionando juntos).
    * 4. Arquitetura Tecnológica e Diferenciais Técnicos (Segurança, Testes, Nuvem).
    * 5. A Equipe e Contatos Profissionais.
* **Semana 19: Ensaio Geral das Equipes e Simulação de Perguntas da Banca**
  * Ensaio cronometrado de apresentação para todas as equipes.
  * Simulação de perguntas técnicas e de negócio por parte dos professores (defesa de escolhas arquiteturais).
  * Preparação do material de apoio para a Feira de Projetos (banners, totens, apresentação no notebook/celular).
* **Semana 20: Apresentação Final para a Banca Externa / Feira de Tecnologia e Formatura**
  * Apresentação pública dos projetos para bancas de docentes, coordenadores e representantes de empresas de tecnologia parceiras.
  * Avaliação das competências técnicas e socioemocionais (comunicação, resolução de problemas, liderança e autonomia).
  * Celebração de encerramento do curso Técnico em Desenvolvimento de Sistemas!
