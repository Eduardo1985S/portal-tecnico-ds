---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-13-middlewares-e-tratamento-de-erros
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-13-middlewares-e-tratamento-de-erros
sidebar_position: 13
title: Aula 13 — Middlewares e Tratamento de Erros
description: Aprenda a criar e utilizar Middlewares no Express (globais, por rota e de tratamento de erros) para validar requisições e garantir a estabilidade do servidor.
---

# Aula 13 — Middlewares e Tratamento de Erros

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o conceito e o ciclo de vida dos **Middlewares** no Express.js, utilizar a função **`next()`**, implementar middlewares de auditoria (logs) e autenticação/validação por rota, e estruturar um **Middleware Global de Tratamento de Erros** (`(err, req, res, next)`).

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que são Middlewares e como funciona o pipeline de execução do Express.
- A assinatura de um middleware: `(req, res, next)`.
- O papel fundamental da função `next()` para passar o controle adiante.
- Middlewares de aplicação (globais) vs Middlewares de rota (específicos).
- Middlewares de tratamento de exceções globais com 4 parâmetros: `(err, req, res, next)`.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. O que é um Middleware?
No Express, um **Middleware** é uma função que possui acesso aos objetos de Requisição (`req`), de Resposta (`res`) e à próxima função middleware no ciclo de solicitação-resposta, conhecida como **`next()`**.

```
[ Requisição HTTP ]  --->  [ Middleware 1 (Log) ]  --->  [ Middleware 2 (Auth) ]  --->  [ Controller ]  --->  [ Resposta JSON ]
                                  |                             |
                                  v                             v
                             next()                        next()
```

#### O que um Middleware pode fazer?
- Executar qualquer código (ex: registrar um log no console).
- Fazer alterações nos objetos `req` e `res` (ex: adicionar `req.usuarioLogado`).
- Encerrar o ciclo de solicitação-resposta retornando uma resposta (ex: `res.status(401).json(...)`).
- Chamar a próxima função middleware usando `next()`.

---

### 2. A Função `next()`
Se um middleware não encerrar o ciclo de resposta e **não chamar `next()`**, a requisição ficará pendente ("congelada") e o cliente sofrerá um tempo limite de conexão (timeout).

```javascript
// Exemplo de Middleware de Log Global
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next(); // Passa o controle para a próxima função da fila
};
```

---

### 3. Middlewares Específicos por Rota
Podemos passar middlewares intermediários diretamente na declaração da rota. Isso é ideal para **autenticação, validação ou controle de acesso (RBAC)**:

```javascript
// Middleware que verifica se a API Key foi enviada no header
const autenticarApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== 'secret-key-123') {
    return res.status(401).json({ erro: 'Acesso negado: API Key inválida ou ausente!' });
  }

  next(); // Chave válida, autoriza o acesso ao controller
};

// Aplicando o middleware apenas na rota protegida
app.get('/api/admin/relatorio', autenticarApiKey, relatorioController);
```

---

### 4. Middleware Global de Tratamento de Erros
No Express, um middleware com **exatamente 4 parâmetros** `(err, req, res, next)` é reconhecido como o manipulador global de erros.

Quando qualquer controller ou middleware chama `next(erro)`, o Express pula todos os middlewares restantes e envia a requisição direto para este manipulador de erro:

```javascript
// Middleware de erro (deve ser declarado no FINAL do app.js)
const manipuladorDeErros = (err, req, res, next) => {
  console.error("🔥 ERRO NÃO TRATADO:", err.stack);

  res.status(err.status || 500).json({
    sucesso: false,
    erro: err.message || 'Erro interno do servidor!'
  });
};
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Estruturação de Middlewares e Tratamento de Erros com ES Modules

#### Arquivo 1: `src/middlewares/loggerMiddleware.js`
```javascript
// src/middlewares/loggerMiddleware.js
export const loggerMiddleware = (req, res, next) => {
  const inicio = Date.now();

  // Evento executado após o término da resposta
  res.on('finish', () => {
    const duracao = Date.now() - inicio;
    console.log(`[LOG] ${req.method} ${req.url} - Status: ${res.statusCode} (${duracao}ms)`);
  });

  next();
};
```

#### Arquivo 2: `src/middlewares/authMiddleware.js`
```javascript
// src/middlewares/authMiddleware.js
export const validarTokenAcesso = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ 
      sucesso: false, 
      erro: 'Token de autenticação não fornecido ou malformatado!' 
    });
  }

  // Simulação de validação do token
  req.usuarioId = 42; // Anexa o ID do usuário à requisição
  next();
};
```

#### Arquivo 3: `src/middlewares/erroMiddleware.js`
```javascript
// src/middlewares/erroMiddleware.js
export const erroMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  console.error(`❌ Erro [Status ${statusCode}]: ${err.message}`);

  return res.status(statusCode).json({
    sucesso: false,
    status: statusCode,
    mensagem: err.message || 'Erro interno do servidor!'
  });
};
```

#### Arquivo 4: `src/app.js`
```javascript
// src/app.js
import express from 'express';
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
import { validarTokenAcesso } from './middlewares/authMiddleware.js';
import { erroMiddleware } from './middlewares/erroMiddleware.js';

const app = express();
const PORTA = 3000;

app.use(express.json());

// 1. Middleware Global de Log (afeta todas as rotas)
app.use(loggerMiddleware);

// Rota pública
app.get('/api/publico', (req, res) => {
  return res.json({ mensagem: 'Conteúdo público acessível por qualquer usuário.' });
});

// Rota protegida com Middleware de Autenticação por rota
app.get('/api/perfil', validarTokenAcesso, (req, res) => {
  return res.json({ mensagem: `Perfil acessado pelo usuário ID: ${req.usuarioId}` });
});

// Rota simulando um erro assíncrono capturado pelo try/catch e enviado ao next(err)
app.get('/api/erro-teste', (req, res, next) => {
  try {
    // Simulando uma falha de sistema
    throw new Error('Falha ao conectar com o serviço de banco de dados!');
  } catch (erro) {
    erro.statusCode = 503; // Service Unavailable
    next(erro); // Encaminha o erro para o erroMiddleware
  }
});

// 2. Middleware Global de Erro (DECLARADO POR ÚLTIMO)
app.use(erroMiddleware);

app.listen(PORTA, () => {
  console.log("==========================================");
  console.log(`🚀 Servidor Express rodando em http://localhost:${PORTA}`);
  console.log("==========================================");
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Sistema de Auditoria e Validação de Payloads

**Objetivo:** Desenvolver middlewares desacoplados para validação de requisições `POST` e tratamento centralizado de erros.

**Instruções:**
1. Crie um projeto Express com `"type": "module"` no `package.json`.
2. Na pasta `src/middlewares/`, crie o arquivo `validarProdutoMiddleware.js`:
   - Intercepta a requisição `POST /api/produtos`.
   - Valida se `req.body` possui `nome` (string) e `preco` (número positivo).
   - Se faltar algum dado ou for inválido, interrompe o fluxo retornando `400 Bad Request` em JSON com a mensagem de erro.
   - Se estiver tudo correto, chama `next()`.
3. Na mesma pasta, crie `erroMiddleware.js` com a assinatura de 4 parâmetros `(err, req, res, next)` para responder em JSON com o código de status e a mensagem de erro.
4. Em `src/app.js`, aplique o middleware de validação na rota `POST /api/produtos` e registre o `erroMiddleware` no final da aplicação.
5. Teste enviar um produto válido e um produto sem o campo `preco`, verificando se o middleware responde corretamente com `400 Bad Request`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno compreendeu o papel dos Middlewares no fluxo de requisição/resposta do Express.
- [ ] O aluno utilizou a função `next()` para dar continuidade ao fluxo de middlewares.
- [ ] O aluno aplicou middlewares globais com `app.use()` e middlewares por rota especificamente.
- [ ] O aluno entendeu a assinatura especial de 4 parâmetros `(err, req, res, next)` para middlewares de erro.
- [ ] O aluno encaminhou erros capturados em `try/catch` chamando `next(erro)`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

O uso inteligente de middlewares é o que torna o Express extremamente modular e poderoso. Na vida real, bibliotecas famosas como `cors` (para segurança de origem) e `helmet` (para cabeçalhos de segurança) são apenas middlewares!

**Desafio Extra:** Crie um middleware de limitação de tempo que meça exatamente quanto tempo uma rota demorou para responder e injete o cabeçalho `X-Response-Time` na resposta com `res.setHeader()`!
