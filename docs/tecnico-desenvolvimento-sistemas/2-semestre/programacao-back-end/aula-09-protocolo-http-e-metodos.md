---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-09-protocolo-http-e-metodos
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-09-protocolo-http-e-metodos
sidebar_position: 9
title: Aula 09 — Protocolo HTTP e Métodos
description: Compreenda o funcionamento do protocolo HTTP, os verbos HTTP (GET, POST, PUT, DELETE), os códigos de status (Status Codes) e crie seu primeiro servidor nativo com Node.js.
---

# Aula 09 — Protocolo HTTP e Métodos

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o funcionamento do **Protocolo HTTP/HTTPS**, dominar o uso dos **Verbos HTTP (GET, POST, PUT, DELETE)**, interpretar os **Códigos de Status HTTP (200, 201, 400, 404, 500)** e construir um servidor Web HTTP nativo utilizando o módulo `node:http` com **ES Modules**.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O Protocolo HTTP (Hypertext Transfer Protocol) e sua natureza *Stateless*.
- Estrutura de mensagens: Headers (Cabeçalhos), Body (Corpo) e URL.
- Métodos/Verbos HTTP principais: `GET`, `POST`, `PUT`, `PATCH` e `DELETE`.
- Famílias de Códigos de Status HTTP (2xx, 3xx, 4xx, 5xx).
- Criação de um servidor Web nativo em Node.js com o módulo `node:http`.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. O que é o Protocolo HTTP?
O **HTTP** é o protocolo de comunicação padrão que permite a troca de dados entre o cliente (navegador/app) e o servidor Back-End na Web.

O HTTP é um protocolo **Stateless** (sem estado): cada requisição é tratada de forma independente pelo servidor, sem que ele "lembre" da requisição anterior, a menos que utilizemos tokens ou sessões.

---

### 2. Os Verbos/Métodos HTTP Principais
No desenvolvimento Back-End RESTful, cada ação solicitada pelo cliente deve utilizar o método HTTP apropriado:

| Método | Ação Semântica | Exemplo de Aplicação | Idempotente? |
| :--- | :--- | :--- | :--- |
| **`GET`** | Buscar / Ler dados | Listar produtos ou buscar perfil de usuário. | Sim |
| **`POST`** | Criar novo registro | Cadastrar novo aluno ou realizar login. | Não |
| **`PUT`** | Atualizar um registro por completo | Substituir todos os dados de um cliente. | Sim |
| **`PATCH`** | Atualizar parcialmente um registro | Alterar apenas a senha ou status do usuário. | Não necessariamente |
| **`DELETE`** | Remover um registro | Deletar uma postagem ou conta de usuário. | Sim |

---

### 3. Códigos de Status HTTP (Status Codes)
O servidor responde a cada requisição acompanhado de um código de 3 dígitos que indica o resultado do processamento:

```
+-------------------------------------------------------------------+
|  1xx: Informativo | 2xx: Sucesso    | 3xx: Redirecionamento       |
|  4xx: Erro Cliente| 5xx: Erro Servidor                            |
+-------------------------------------------------------------------+
```

#### Principais Status Codes do Dia a Dia:
- **`200 OK`:** Requisição processada com sucesso (comum em `GET` e `PUT`).
- **`201 Created`:** Novo registro criado com sucesso no banco (comum em `POST`).
- **`204 No Content`:** Operação realizada com sucesso, mas sem conteúdo de resposta (comum em `DELETE`).
- **`400 Bad Request`:** Dados enviados pelo cliente inválidos ou ausentes.
- **`401 Unauthorized`:** Usuário não autenticado (falta de login/token).
- **`403 Forbidden`:** Usuário autenticado, mas sem permissão para o recurso.
- **`404 Not Found`:** Rota ou recurso não encontrado no servidor.
- **`500 Internal Server Error`:** Erro inesperado ou falha crítica no código do servidor.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Criando um Servidor HTTP Nativo com Node.js e ES Modules

Vamos construir um servidor HTTP do zero usando apenas o módulo nativo `node:http`.

#### Arquivo 1: `servidor.js`
```javascript
// servidor.js
import http from 'node:http';

const PORTA = 3000;

// Criando o servidor HTTP
const servidor = http.createServer((requisicao, resposta) => {
  const { method, url } = requisicao;

  console.log(`[${new Date().toLocaleTimeString()}] ${method} na rota: ${url}`);

  // Definindo o cabeçalho de resposta como JSON em UTF-8
  resposta.setHeader('Content-Type', 'application/json; charset=utf-8');

  // Roteamento simples por método e URL
  if (method === 'GET' && url === '/') {
    resposta.writeHead(200);
    return resposta.end(JSON.stringify({ mensagem: 'API Back-End Operacional!' }));
  }

  if (method === 'GET' && url === '/api/alunos') {
    resposta.writeHead(200);
    const alunos = [
      { id: 1, nome: 'Ana Clara', curso: 'Desenvolvimento de Sistemas' },
      { id: 2, nome: 'Bruno Santos', curso: 'Desenvolvimento de Sistemas' }
    ];
    return resposta.end(JSON.stringify(alunos));
  }

  if (method === 'POST' && url === '/api/alunos') {
    resposta.writeHead(201); // 201 Created
    return resposta.end(JSON.stringify({ mensagem: 'Aluno cadastrado com sucesso!' }));
  }

  // Rota não encontrada (404)
  resposta.writeHead(404);
  return resposta.end(JSON.stringify({ erro: 'Rota não encontrada!' }));
});

// Iniciando a escuta de conexões na porta 3000
servidor.listen(PORTA, () => {
  console.log("==========================================");
  console.log(`🚀 Servidor HTTP rodando em http://localhost:${PORTA}`);
  console.log("==========================================");
});
```

#### Arquivo 2: `package.json`
```json
{
  "name": "servidor-http-nativo",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node servidor.js"
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Servidor de Catálogo de Filmes com Roteamento Nativo

**Objetivo:** Construir um servidor HTTP nativo que escute diferentes verbos e caminhos (URLs), retornando respostas e Status Codes adequados.

**Instruções:**
1. Crie uma pasta `atividade-aula-09` com `"type": "module"` no `package.json`.
2. Crie o arquivo `server.js` importando `node:http`.
3. Defina as seguintes rotas e comportamentos:
   - `GET /` -> Status `200 OK`, JSON: `{ mensagem: "Bem-vindo à API de Filmes!" }`.
   - `GET /filmes` -> Status `200 OK`, JSON com uma lista de 3 filmes (id, titulo, genero).
   - `POST /filmes` -> Status `201 Created`, JSON: `{ mensagem: "Filme cadastrado com sucesso!" }`.
   - `DELETE /filmes` -> Status `200 OK`, JSON: `{ mensagem: "Filme removido do catálogo!" }`.
   - Qualquer outra rota/método -> Status `404 Not Found`, JSON: `{ erro: "Recurso não encontrado" }`.
4. Inicie o servidor (`npm start`), abra o navegador em `http://localhost:3000/filmes` e teste as requisições.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno compreendeu a diferença entre os verbos `GET`, `POST`, `PUT` e `DELETE`.
- [ ] O aluno sabe identificar o significado das famílias de Status Code (2xx, 4xx, 5xx).
- [ ] O aluno utilizou o módulo nativo `node:http` para criar um servidor Web.
- [ ] O aluno definiu o cabeçalho `Content-Type` como `application/json`.
- [ ] O aluno testou as rotas e validou o retorno do servidor no navegador/terminal.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Embora seja possível construir servidores utilizando o módulo nativo `node:http`, a criação de rotas complexas torna-se trabalhosa à medida que a aplicação cresce. Na próxima etapa, aprenderemos a utilizar o **Express.js**, o framework Web mais popular do ecossistema Node.js!

**Desafio Extra:** Abra o terminal e use o comando `curl -i http://localhost:3000/filmes` para inspecionar os cabeçalhos HTTP e o status code diretamente na linha de comando!
