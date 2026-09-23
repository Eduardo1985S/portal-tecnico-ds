---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-13-middleware-de-autenticacao-e-rotas-protegidas
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-13-middleware-de-autenticacao-e-rotas-protegidas
sidebar_position: 13
title: Aula 13 — Middleware de Autenticação e Rotas Protegidas
description: Intercepte requisições, valide o token JWT no cabeçalho Authorization Bearer e proteja rotas privadas.
---

# Aula 13 — Middleware de Autenticação e Rotas Protegidas

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a interceptar requisições HTTP no Express através de um **Middleware de Autenticação**, extrair e validar a assinatura do token JWT enviado pelo cliente no cabeçalho `Authorization: Bearer <token>`, bloquear requisições não autorizadas e disponibilizar as informações do usuário autenticado dentro do objeto `req.user`.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O cabeçalho padrão de autenticação HTTP (`Authorization: Bearer <token>`).
- O método `jwt.verify()` e tratamento de erros de token expirado ou inválido.
- Injeção de contexto na requisição (`req.user = { id, cargo }`).
- Protegendo rotas específicas vs. protegendo grupos inteiros de rotas.
- Testando rotas autenticadas no Postman.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Agora que o cliente já consegue fazer login e receber um token JWT (Aula 12), como o servidor sabe quem está fazendo as requisições seguintes (como criar um pedido ou ver o perfil)?

O cliente envia o token em cada requisição dentro do cabeçalho HTTP:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Nosso **Middleware de Autenticação** intercepta a chamada antes que ela chegue ao controlador:
1. Verifica se o cabeçalho `Authorization` foi enviado. Se não foi, devolve `401 Unauthorized`.
2. Separa a palavra `Bearer` do token propriamente dito.
3. Valida a assinatura com `jwt.verify(token, env.jwtSecret)`.
4. Se o token for válido e estiver no prazo, anexa os dados decodificados em `req.user`.
5. Chama `next()` liberando o acesso ao controlador!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Criando o Middleware: `src/middlewares/garantirAutenticacao.js`
```javascript
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../errors/AppError.js';

export function garantirAutenticacao(req, res, next) {
  const authHeader = req.headers.authorization;

  // 1. Verifica se o header foi enviado
  if (!authHeader) {
    throw new AppError('Token de autenticação não fornecido.', 401);
  }

  // 2. O header vem no formato: "Bearer <token>"
  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError('Formato de token inválido.', 401);
  }

  try {
    // 3. Valida se a assinatura confere e se não expirou
    const decodificado = jwt.verify(token, env.jwtSecret);

    // 4. Injeta as informações do usuário logado na requisição!
    req.user = {
      id: decodificado.sub,
      cargo: decodificado.cargo,
      nome: decodificado.nome,
    };

    return next();
  } catch (error) {
    throw new AppError('Token JWT inválido ou expirado.', 401);
  }
}
```

### 2. Protegendo Rotas: `src/routes/perfil.routes.js`
```javascript
import { Router } from 'express';
import { garantirAutenticacao } from '../middlewares/garantirAutenticacao.js';
import { prisma } from '../database/prisma.js';

const perfilRoutes = Router();

// Aplica o middleware: todas as rotas deste arquivo exigirão autenticação!
perfilRoutes.use(garantirAutenticacao);

perfilRoutes.get('/me', async (req, res) => {
  // Recupera o ID do usuário diretamente de req.user (injetado pelo middleware)
  const usuarioId = req.user.id;

  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: {
      id: true,
      nome: true,
      email: true,
      cargo: true,
      criadoEm: true,
      perfil: true,
    },
  });

  return res.json(usuario);
});

export { perfilRoutes };
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie a pasta `src/middlewares` (se ainda não existir) e o arquivo `garantirAutenticacao.js`.
2. Crie uma rota protegida `GET /perfil/me` conforme o exemplo prático.
3. No Postman, tente acessar `GET http://localhost:3333/perfil/me` sem nenhum cabeçalho e comprove o erro `401 Token de autenticação não fornecido`.
4. Faça o login em `POST /sessions` para gerar um token válido.
5. Na aba **Authorization** da requisição `GET /perfil/me` no Postman, selecione o tipo **Bearer Token**, cole o token gerado e envie a requisição.
6. Comprove que os dados do seu próprio usuário foram retornados com status 200!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O middleware `garantirAutenticacao` bloqueia requisições sem token (401).
- [ ] Tokens alterados ou expirados são rejeitados com status 401.
- [ ] O ID do usuário autenticado fica disponível com segurança em `req.user.id`.
- [ ] A rota `/perfil/me` só responde quando um Bearer Token válido é enviado.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Por que é muito mais seguro utilizar `req.user.id` do que receber o ID do usuário como parâmetro na URL em rotas como `/perfil/:id`? Se um usuário mal-intencionado estivesse logado e pudesse trocar o ID na URL para o ID de outro usuário, o que aconteceria? Anote como o JWT impede essa invasão!
