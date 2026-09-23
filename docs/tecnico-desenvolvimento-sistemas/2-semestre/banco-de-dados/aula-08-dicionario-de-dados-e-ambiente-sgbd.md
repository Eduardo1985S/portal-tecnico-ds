---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-08-dicionario-de-dados-e-ambiente-sgbd
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-08-dicionario-de-dados-e-ambiente-sgbd
sidebar_position: 8
title: "Aula 08 — Dicionário de Dados e Preparação do SGBD"
description: Documente as especificações técnicas da sua base em um Dicionário de Dados e configure seu ambiente com DBeaver e PostgreSQL.
---

# Aula 08 — Dicionário de Dados e Preparação do SGBD

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a elaborar um **Dicionário de Dados (Metadados)** completo para documentação profissional de projetos de software corporativos, preparar o ambiente de desenvolvimento local instalando o SGBD relacional **PostgreSQL** ou **MySQL** e dominar a ferramenta de administração visual universal **DBeaver** para conexão e execução de scripts.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que são Metadados: os dados que descrevem a estrutura dos dados.
- Estruturação formal de um Dicionário de Dados: Nome do Campo, Tipo Físico, Tamanho, Obrigatoriedade (`NOT NULL`), Chave (`PK`/`FK`), Valor Padrão (`DEFAULT`) e Descrição de Negócio.
- Instalação e inicialização do serviço do PostgreSQL local (Porta padrão 5432) ou via Docker.
- O conceito de clientes visuais universais e a ferramenta **DBeaver Community**.
- Configuração de nova conexão de banco de dados (`Host`, `Port`, `Database`, `User`, `Password`).
- Navegação pelo catálogo do banco e execução da primeira consulta de teste.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Antes de escrever qualquer linha de comando SQL no terminal, a equipe de engenharia de software elabora a documentação formal da base. Se um novo desenvolvedor entrar na empresa meses depois, ele consultará o **Dicionário de Dados** para entender exatamente o que cada coluna significa.

### Modelo de Dicionário de Dados

**Tabela:** `clientes`  
**Finalidade:** Armazena o cadastro dos compradores da plataforma.

| Campo | Tipo | Nulo? | Chave | Padrão | Descrição de Negócio |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id_cliente` | `SERIAL` | Não | **PK** | Auto | Identificador primário numérico sequencial. |
| `nome_completo` | `VARCHAR(100)` | Não | - | - | Nome e sobrenome do comprador. |
| `cpf` | `VARCHAR(11)` | Não | Unique | - | CPF apenas dígitos, sem pontos ou traço. |
| `email` | `VARCHAR(120)` | Não | Unique | - | E-mail de login para envio de notas fiscais. |
| `ativo` | `BOOLEAN` | Não | - | `TRUE` | `TRUE` = Ativo, `FALSE` = Suspenso/Bloqueado. |
| `criado_em` | `TIMESTAMP` | Não | - | `NOW()` | Carimbo de data/hora de criação do cadastro. |

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como testar a conexão no DBeaver e verificar a versão do servidor rodando:

```sql
-- 1. Verificando a versão do PostgreSQL instalada
SELECT version();

-- 2. Consultando a data e hora atual do servidor de banco de dados
SELECT CURRENT_TIMESTAMP AS horario_servidor;

-- 3. Listando todas as bases de dados existentes no servidor
SELECT datname FROM pg_database WHERE datistemplate = false;
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma planilha ou documento Markdown contendo o Dicionário de Dados completo para pelo menos 3 tabelas do seu Projeto Integrador (`usuarios`, `categorias`, `produtos`).
2. Abra o **DBeaver**, clique em "Nova Conexão" (ícone de tomada com `+`), escolha **PostgreSQL**.
3. Preencha as credenciais:
   - Host: `localhost`
   - Porta: `5432`
   - Banco: `postgres`
   - Usuário: `postgres`
   - Senha: a senha configurada na instalação.
4. Clique no botão **"Testar Conexão"**. Ao receber a mensagem de sucesso (*Conectado*), abra uma janela de script SQL (Ctrl + ]) e execute `SELECT 1 + 1 AS resultado;`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Dicionário de dados documentando tipos, nulidade, chaves e descrições de negócio.
- [ ] Serviço do PostgreSQL rodando com sucesso no sistema operacional.
- [ ] Conexão estabelecida e salva no DBeaver.
- [ ] Script de teste executado no editor SQL com sucesso.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Como alternativa à instalação local pesada, pesquise como rodar uma instância completa do PostgreSQL em 3 segundos usando o **Docker**: `docker run --name pg-local -e POSTGRES_PASSWORD=senha123 -p 5432:5432 -d postgres`!
