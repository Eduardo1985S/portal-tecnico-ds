---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-18-desenvolvimento-do-projeto-integrador
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-18-desenvolvimento-do-projeto-integrador
sidebar_position: 18
title: Aula 18 — Refinamento e Integração do Projeto Back-End
description: Aplique a auditoria de qualidade na API do Projeto Integrador integrando todas as camadas e boas práticas aprendidas.
---

# Aula 18 — Refinamento e Integração do Projeto Back-End

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Consolidar a arquitetura completa da API do Projeto Integrador da equipe, realizando a revisão cruzada de código (*Code Review*), aplicando o checklist de excelência da engenharia de software e integrando as regras de negócio complexas do sistema em desenvolvimento.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O checklist de auditoria técnica para APIs corporativas em Node.js.
- Refatoração de endpoints para garantir consistência semântica e boas práticas REST.
- Validação cruzada de regras de negócio entre os membros da equipe.
- Centralização de respostas e tratamento uniforme de exceções.
- Organização do repositório no GitHub com `README.md` técnico completo.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Nesta etapa do semestre, o foco sai da teoria e concentra-se no refinamento do código real da aplicação da equipe. Uma API pronta para produção não é apenas uma API que "funciona", mas sim um sistema que:

1. **É Seguro:** Senhas com Bcrypt, rotas com JWT, injeção de SQL prevenida pelo Prisma ORM e validação de payloads com Zod.
2. **É Estável:** Todos os erros previsíveis lançam `AppError` com status HTTP semânticos (400, 401, 403, 404, 409).
3. **É Escalável:** Listagens longas são paginadas e operações interdependentes são executadas em transações atômicas.
4. **É Documentada:** Qualquer colega ou avaliador consegue entender e testar a API através da documentação do Swagger.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de Auditoria Técnica da API

Utilize o checklist abaixo para auditar o repositório da sua equipe:

```markdown
### 🛡️ Segurança e Autenticação
- [ ] O arquivo `.env` está estritamente adicionado ao `.gitignore` e não consta no histórico do Git.
- [ ] O arquivo `.env.example` lista todas as variáveis necessárias com valores fictícios.
- [ ] Nenhuma senha é armazenada em texto puro (todas utilizam `bcrypt.hash` com no mínimo 10 rounds).
- [ ] O endpoint de login emite tokens JWT com tempo de expiração (`expiresIn`).
- [ ] Rotas administrativas ou destrutivas são protegidas por middlewares de Autenticação e RBAC.

### 🏛️ Arquitetura e Estrutura
- [ ] A pasta `src/` está segregada em: `config`, `controllers`, `services`, `middlewares`, `routes`, `schemas`, `database`.
- [ ] Os controladores não contêm lógica de negócio direta nem queries de banco de dados.
- [ ] Cada serviço (`Service`) tem uma responsabilidade única e clara (método `execute`).
- [ ] O Prisma Client é instanciado em arquivo único (`src/database/prisma.js`) e reaproveitado.

### 📑 Qualidade e Documentação
- [ ] Todos os payloads de entrada passam pelo validador Zod antes de chegar ao controller.
- [ ] As migrações do Prisma estão todas comitadas na pasta `prisma/migrations/`.
- [ ] O Swagger UI está disponível em `/api-docs` documentando os principais recursos.
- [ ] O `README.md` explica como clonar o projeto, rodar o Docker Compose e iniciar o servidor.
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Reúna-se com os integrantes da sua equipe de Projeto Integrador.
2. Clone o repositório em uma máquina limpa e execute o processo de inicialização do zero:
   ```bash
   git clone <url-do-repositorio>
   npm install
   cp .env.example .env
   docker compose up -d
   npx prisma migrate dev
   npm run dev
   ```
3. Se qualquer etapa falhar ou exigir passos não documentados, atualize o `README.md` imediatamente.
4. Realizem uma sessão de *Code Review*: cada aluno audita os arquivos desenvolvidos pelo colega e sugere melhorias de Clean Code.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Todas as pendências do checklist de auditoria técnica foram solucionadas.
- [ ] O projeto sobe em máquina nova seguindo exclusivamente as instruções do `README.md`.
- [ ] Todas as rotas essenciais do MVP do projeto estão implementadas e conectadas ao PostgreSQL.
- [ ] A equipe validou a estabilidade dos fluxos principais da API.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione o pacote `cors` ao projeto (`npm install cors`) e configure-o no `server.js` permitindo que aplicações que rodam em outras portas ou origens (como o seu frontend React em `http://localhost:5173`) consigam disparar requisições para a API sem serem bloqueadas pelo navegador!
