---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-06-banco-de-dados-postgresql-com-docker
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-06-banco-de-dados-postgresql-com-docker
sidebar_position: 6
title: Aula 06 — Banco de Dados Relacional PostgreSQL com Docker
description: Provisione uma instância robusta do banco de dados PostgreSQL usando Docker Compose e configure clientes visuais de administração.
---

# Aula 06 — Banco de Dados Relacional PostgreSQL com Docker

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o papel dos bancos de dados relacionais corporativos em sistemas Back-End, aprender a provisionar e gerenciar um banco de dados **PostgreSQL** de forma isolada e reproduzível utilizando o **Docker Compose**, e conectar ferramentas visuais de administração (DBeaver) para inspeção de tabelas.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Por que o PostgreSQL é o banco relacional preferido pelo ecossistema open-source moderno.
- O conceito de infraestrutura como código com `docker-compose.yml`.
- Mapeamento de portas, variáveis de ambiente do banco e volumes de persistência.
- Comandos essenciais do Docker Compose (`up -d`, `down`, `logs`, `ps`).
- Conexão e teste no cliente universal DBeaver / pgAdmin.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Por que usar Docker para bancos de dados no desenvolvimento?
Instalar o PostgreSQL diretamente no sistema operacional local muitas vezes gera conflitos de portas, serviços rodando em segundo plano sem necessidade e divergências de versão entre os membros da equipe.

Com o **Docker**, toda a instalação do banco de dados resume-se a um arquivo de configuração de poucas linhas (`docker-compose.yml`). Qualquer desenvolvedor do time consegue inicializar exatamente o mesmo banco executando apenas um comando:

```bash
docker compose up -d
```

### Anatomia da String de Conexão (DATABASE_URL):
Para o Node.js se comunicar com o PostgreSQL, ele utiliza uma URI padronizada:

```
postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO
Exemplo:
postgresql://postgres:postgres@localhost:5432/portal_ds
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Criando o Arquivo: `docker-compose.yml` na Raiz do Projeto
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: postgres_portal_ds
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password123
      POSTGRES_DB: portal_ds
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
    driver: local
```

### 2. Comandos Principais no Terminal:
```bash
# 1. Iniciar o contêiner em segundo plano (detached mode)
docker compose up -d

# 2. Verificar se o contêiner está rodando com saúde
docker compose ps

# 3. Visualizar os logs do PostgreSQL
docker compose logs -f postgres

# 4. Parar os contêineres quando encerrar o expediente
docker compose down
```

### 3. Configurando a Variável no Arquivo `.env`:
```env
PORT=3333
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password123@localhost:5432/portal_ds?schema=public"
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Certifique-se de que o Docker Desktop está em execução na sua máquina.
2. Crie o arquivo `docker-compose.yml` na raiz do seu projeto com as configurações apresentadas.
3. Execute `docker compose up -d` no terminal do VS Code.
4. Abra o **DBeaver** (ou sua ferramenta preferida de banco de dados):
   - Clique em **Nova Conexão** → Selecione **PostgreSQL**.
   - Host: `localhost` | Porta: `5432` | Banco: `portal_ds` | Usuário: `postgres` | Senha: `password123`.
   - Clique em **Testar Conexão** e confirme a resposta de sucesso.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O arquivo `docker-compose.yml` está configurado com volume nomeado para persistência de dados.
- [ ] O contêiner do PostgreSQL está com status `Up` no `docker compose ps`.
- [ ] A conexão foi testada e aprovada através do DBeaver.
- [ ] A variável `DATABASE_URL` no `.env` aponta para a instância local do Docker.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Descubra o que acontece se você rodar `docker compose down` e depois `docker compose up -d`. Os dados criados no banco são perdidos ou preservados? Explique por que a diretiva `volumes: - pgdata:/var/lib/postgresql/data` é responsável por garantir que as informações não sumam ao reiniciar o contêiner!
