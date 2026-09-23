# Plano de Curso: Programação Back-End II (20 Semanas)

**Unidade Curricular:** Programação Back-End (Etapa 2)  
**Carga Horária Total:** 120 horas  
**Carga Semanal:** 8 horas/semana (20 Semanas)  
**Módulo:** Módulo Específico I — 3º Semestre  
**Foco:** Arquitetura Avançada em Camadas (Routes, Controllers, Services, Repositories), Bancos de Dados Relacionais com ORM/Query Builder (PostgreSQL, Prisma/Knex), Segurança, Hashing de Senhas (bcrypt), Autenticação JWT, Controle de Acesso por Papel (RBAC), Paginação, Upload de Arquivos, Integração de APIs Externas e Deploy em Nuvem.  
**Ferramentas e Recursos:** Node.js, Express, TypeScript / ES6+, PostgreSQL, Prisma ORM / Knex.js, Zod, JWT (jsonwebtoken), bcrypt, Multer, Postman / Swagger, Docker, Render / Railway.

---

## 🏛️ Módulo 1: Arquitetura em Camadas, Clean Code e Validação Rigorosa (Semanas 1 a 5)

* **Semana 01: Revisão do Back-End I e Arquitetura Profissional de Projetos**
  * Revisão dos conceitos de Express, HTTP, JSON e MVC.
  * Por que projetos reais não colocam regras de negócio dentro dos Controllers.
  * Estruturação de um repositório profissional: variáveis de ambiente (`.env`), separação de ambientes (dev/prod).
* **Semana 02: A Arquitetura em Camadas: Routes, Controllers e Services**
  * Responsabilidade de cada camada:
    * **Routes:** Definição de endpoints e middlewares.
    * **Controllers:** Extração de parâmetros da requisição e envio da resposta HTTP.
    * **Services:** Regras de negócio puras, cálculos e orquestração.
  * Criação de fluxos completos desacoplados e testáveis.
* **Semana 03: Princípios de Clean Code e Design Patterns no Node.js**
  * Princípios SOLID aplicados ao Back-End (ênfase em SRP - Single Responsibility e DIP - Dependency Inversion).
  * Tratamento de exceções customizadas com classes de erro (`AppError`).
  * Padronização de respostas de erro da API.
* **Semana 04: Validação de Dados na Entrada com Zod**
  * O risco de receber dados sem validação estrita no servidor.
  * O que é a biblioteca Zod e criação de esquemas (Schemas) de validação.
  * Middleware genérico de validação para interceptar e validar `req.body`, `req.params` e `req.query`.
* **Semana 05: Documentação Dinâmica com Swagger UI Express**
  * Configuração do Swagger OpenAPI 3.0 no projeto.
  * Documentando rotas, cabeçalhos, esquemas de entrada e respostas de status.
  * Teste interativo da API através do navegador em `/api-docs`.

---

## 🗄️ Módulo 2: Integração com Bancos Relacionais e ORM (Semanas 6 a 10)

* **Semana 06: Conectando o Node.js ao PostgreSQL com Docker**
  * Subindo uma instância de banco de dados PostgreSQL utilizando contêiner Docker.
  * Variáveis de conexão (`DATABASE_URL`).
  * Introdução a drivers nativos (`pg`) e o papel de ORMs (Object-Relational Mapping).
* **Semana 07: Introdução ao Prisma ORM — Modelagem e Migrations**
  * Instalação e inicialização do Prisma no projeto Node.js.
  * O arquivo `schema.prisma`: declaração de modelos, tipos e atributos (`@id`, `@default`, `@unique`).
  * Executando migrações de banco de dados com `npx prisma migrate dev`.
* **Semana 08: Operações de CRUD Conectadas ao Banco de Dados**
  * Substituindo a persistência em arquivos/memória pelas consultas do Prisma Client.
  * Implementação dos métodos: `create`, `findMany`, `findUnique`, `update` e `delete`.
  * Tratamento de erros de restrição de integridade do banco (ex: chave única duplicada).
* **Semana 09: Relacionamentos no Prisma (1:1 e 1:N)**
  * Modelagem de relacionamentos no schema: Usuário tem Perfil (1:1), Usuário cria Pedidos (1:N).
  * Consultas com inclusão de dados relacionados (`include` e `select`).
  * Criação de registros aninhados (Nested Writes).
* **Semana 10: Relacionamentos N:M e Consultas Avançadas**
  * Modelagem de relacionamentos N:M explícitos e implícitos (ex: Produtos e Categorias).
  * Filtros avançados com operadores `where`, busca case-insensitive e ordenação.
  * Operações atômicas com transações (`prisma.$transaction`).

---

## 🔒 Módulo 3: Segurança, Hashing de Senhas e Autenticação JWT (Semanas 11 a 15)

* **Semana 11: Segurança de Senhas com Criptografia e Hashing (Bcrypt)**
  * A regra de ouro da segurança: nunca armazenar senhas em texto puro!
  * Como funciona o algoritmo de Hashing unidirecional e o fator de trabalho (Salt).
  * Criptografando a senha no cadastro com `bcrypt.hash()` e verificando no login com `bcrypt.compare()`.
* **Semana 12: Autenticação Baseada em Token JWT (JSON Web Token)**
  * O que é o JWT e sua estrutura de três partes: Header, Payload e Signature.
  * Fluxo de autenticação Stateless (sem sessão no servidor).
  * Geração do token no endpoint de Login com chave secreta e tempo de expiração (`expiresIn`).
* **Semana 13: Proteção de Rotas com Middleware de Autenticação**
  * Extração do token do cabeçalho `Authorization: Bearer <token>`.
  * Validação do token JWT com `jsonwebtoken.verify()`.
  * Injeção dos dados do usuário logado na requisição (`req.user = { id, role }`).
* **Semana 14: Autorização por Papel (RBAC - Role-Based Access Control)**
  * Diferença conceitual entre Autenticação ("quem você é") e Autorização ("o que você pode fazer").
  * Implementação de controle por perfis: Administrador vs. Cliente/Usuário comum.
  * Middleware reutilizável de autorização (`permitirAcesso(['ADMIN'])`).
* **Semana 15: Otimização de Consultas, Paginação e Filtros**
  * O impacto de trazer milhares de registros de uma vez do banco.
  * Implementação de paginação profissional baseada em `page` e `limit` com contagem total (`count`).
  * Retorno de metadados de paginação (página atual, total de páginas, total de registros).

---

## 🚀 Módulo 4: Recursos Avançados, Nuvem e Projeto Integrador (Semanas 16 a 20)

* **Semana 16: Upload de Arquivos e Armazenamento com Multer**
  * O formato multipart/form-data.
  * Configuração da biblioteca `multer` para upload de imagens (avatar, anexos, produtos).
  * Validação de tipos MIME permitidos, limites de tamanho e armazenamento em disco/nuvem.
* **Semana 17: Consumo e Integração com APIs Externas**
  * Como o servidor back-end consome outras APIs da internet.
  * Uso de clientes HTTP modernos (Axios / Fetch nativo do Node.js).
  * Casos práticos: Consulta de CEP (ViaCEP), cotação de moedas ou gateway de pagamento.
* **Semana 18: Desenvolvimento e Refinamento do Projeto Integrador**
  * Acompanhamento e mentoria prática das APIs dos projetos dos alunos.
  * Aplicação do checklist de qualidade: Arquitetura em 3 camadas, Prisma/PostgreSQL, JWT, Zod e Swagger.
* **Semana 19: Testes de API, Caça a Bugs e Preparação para Produção**
  * Sessão de testes intensivos das rotas com Postman Runner.
  * Variáveis de ambiente de produção e tratamento de CORS (Cross-Origin Resource Sharing).
  * Configuração de scripts de build e start no `package.json`.
* **Semana 20: Publicação (Deploy) em Nuvem e Apresentação Final**
  * Processo de publicação de APIs em nuvem gratuita/acessível (Render / Railway) com PostgreSQL gerenciado.
  * Apresentação pública da documentação interativa Swagger hospedada.
  * Conclusão da etapa de desenvolvimento Back-End com portfólio completo publicado.
