---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-12-autenticacao-jwt
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-12-autenticacao-jwt
sidebar_position: 12
title: Aula 12 — Autenticação Baseada em Token JWT
description: Implemente o endpoint de login seguro gerando tokens JSON Web Token (JWT) assinados criptograficamente.
---

# Aula 12 — Autenticação Baseada em Token JWT

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender a diferença entre autenticação com estado em sessão (*Stateful Sessions*) e autenticação sem estado (*Stateless Tokens*), aprender a anatomia do **JSON Web Token (JWT)** e construir o endpoint de autenticação `/sessions` (Login) que valida credenciais e emite um token assinado criptograficamente.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Autenticação Baseada em Sessão vs. Autenticação Baseada em Token (JWT).
- As 3 partes constitutivas do JWT: Header, Payload e Signature.
- A biblioteca `jsonwebtoken` e o método `jwt.sign()`.
- Chave secreta (`JWT_SECRET`) e tempo de expiração (`expiresIn`).
- O fluxo completo de login na prática.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

<div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
  <img src="/img/jwt_autenticacao_fluxo.jpg" alt="Fluxo de Autenticação JWT entre Cliente, Servidor e Banco" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 6px 20px rgba(0,0,0,0.3)' }} />
  <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)', marginTop: '0.5rem' }}>
    <em>Figura 1: O fluxo de 7 etapas da autenticação Stateless com JSON Web Token (JWT).</em>
  </p>
</div>

### Como funciona o JWT?
O **JWT (JSON Web Token)** é uma string compacta e segura para a URL codificada em Base64 dividida em três partes separadas por pontos (`.`):

`aaaaaa.bbbbbb.cccccc`

1. **Header (Cabeçalho):** Informa o algoritmo de criptografia utilizado (ex: HMAC SHA256).
2. **Payload (Carga Útil):** Contém os dados públicos que queremos transmitir (ex: `sub: id_do_usuario`, `role: 'ALUNO'`, `exp: timestamp_expiracao`). **Atenção:** Nunca coloque senhas no payload! Ele pode ser lido por qualquer um.
3. **Signature (Assinatura):** A junção do Header + Payload criptografada com a chave secreta do servidor (`JWT_SECRET`). Se qualquer pessoa tentar adulterar o ID do usuário no payload, a assinatura torna-se inválida e o servidor rejeita o token imediatamente!

### Instalação:
```bash
npm install jsonwebtoken
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Criando o Serviço de Login: `src/services/AutenticarUsuarioService.js`
```javascript
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../database/prisma.js';
import { env } from '../config/env.js';
import { AppError } from '../errors/AppError.js';

export class AutenticarUsuarioService {
  async execute({ email, senha }) {
    // 1. Busca o usuário pelo e-mail
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    // 2. Compara a senha fornecida com o hash gravado no banco
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    // 3. Emite o token JWT assinado com a chave secreta do servidor
    const token = jwt.sign(
      {
        cargo: usuario.cargo,
        nome: usuario.nome,
      },
      env.jwtSecret,
      {
        subject: usuario.id, // O subject guarda o ID único do usuário
        expiresIn: '1d',     // Token válido por 1 dia
      }
    );

    // 4. Retorna os dados do usuário (sem a senha) e o token
    return {
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
      },
      token,
    };
  }
}
```

### 2. Criando o Controlador de Sessões: `src/controllers/SessoesController.js`
```javascript
import { AutenticarUsuarioService } from '../services/AutenticarUsuarioService.js';

export class SessoesController {
  async criar(req, res, next) {
    try {
      const { email, senha } = req.body;

      const autenticarUsuarioService = new AutenticarUsuarioService();
      const resultado = await autenticarUsuarioService.execute({ email, senha });

      return res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  }
}
```

### 3. Rota de Login: `src/routes/sessoes.routes.js`
```javascript
import { Router } from 'express';
import { SessoesController } from '../controllers/SessoesController.js';

const sessoesRoutes = Router();
const sessoesController = new SessoesController();

sessoesRoutes.post('/', (req, res, next) => sessoesController.criar(req, res, next));

export { sessoesRoutes };
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o pacote `jsonwebtoken` no seu projeto (`npm install jsonwebtoken`).
2. Garanta que a variável `JWT_SECRET="sua_chave_ultra_secreta_123"` existe no seu arquivo `.env`.
3. Implemente o `AutenticarUsuarioService` e o `SessoesController`.
4. Registre a rota `app.use('/sessions', sessoesRoutes)` no seu `server.js`.
5. No Postman, envie uma requisição `POST http://localhost:3333/sessions` com o e-mail e senha de um usuário cadastrado na aula anterior.
6. Copie a string do `token` retornado no JSON e acesse o site oficial [jwt.io](https://jwt.io) para decodificar o token e ver o Header e o Payload descriptografados!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A rota `POST /sessions` valida as credenciais com o banco de dados.
- [ ] Credenciais incorretas retornam erro com status HTTP 401.
- [ ] Credenciais corretas retornam os dados do usuário acompanhados do token JWT.
- [ ] A senha criptografada nunca é devolvida no payload de resposta.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Por que o token JWT deve ter um tempo de expiração (`expiresIn`) definido (como 1 dia ou 8 horas) em vez de ser eterno? O que aconteceria se o celular de um usuário fosse furtado e o token nunca perdesse a validade?
