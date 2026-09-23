---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-04-validacao-de-dados-com-zod
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-04-validacao-de-dados-com-zod
sidebar_position: 4
title: Aula 04 — Validação Estrita de Dados com Zod
description: Proteja seus endpoints validando tipos, formatos e regras de entrada com a biblioteca Zod no Node.js.
---

# Aula 04 — Validação Estrita de Dados com Zod

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender os riscos de aceitar dados não tratados no servidor (SQL Injection, poluição de payload, tipos incorretos) e aprender a utilizar a biblioteca **Zod** para criar esquemas de validação declarativos e middlewares automatizados de inspeção de requisições.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O perigo de receber dados brutos em APIs REST.
- O que é a biblioteca Zod e o conceito de *Schema Validation*.
- Tipos fundamentais e modificadores do Zod (`string`, `number`, `email`, `min`, `max`, `enum`, `optional`).
- Mensagens de erro amigáveis e customizadas.
- Criação de um Middleware universal de validação de esquemas no Express.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Por que usar uma biblioteca de validação?
Fazer validações manuais com `if` para cada campo recebido é repetitivo e propenso a erros:

```javascript
// Manual e frágil:
if (!req.body.email || !req.body.email.includes('@')) {
  return res.status(400).json({ error: 'E-mail inválido' });
}
```

Com o **Zod**, você define a "forma" exata que os dados devem ter. O Zod não apenas valida os dados, mas também remove propriedades indesejadas (strip) e faz coerção de tipos (ex: converter a string `"10"` para o número `10`).

### Instalação:
```bash
npm install zod
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Definindo o Esquema de Validação: `src/schemas/usuario.schema.js`
```javascript
import { z } from 'zod';

export const criarUsuarioSchema = z.object({
  body: z.object({
    nome: z
      .string({ required_error: 'O nome é obrigatório.' })
      .min(3, 'O nome deve ter no mínimo 3 caracteres.')
      .max(80, 'O nome deve ter no máximo 80 caracteres.'),
    email: z
      .string({ required_error: 'O e-mail é obrigatório.' })
      .email('Formato de e-mail inválido.'),
    senha: z
      .string({ required_error: 'A senha é obrigatória.' })
      .min(6, 'A senha deve conter no mínimo 6 caracteres.'),
    idade: z
      .number({ required_error: 'A idade é obrigatória.' })
      .int('A idade deve ser um número inteiro.')
      .min(16, 'É necessário ter pelo menos 16 anos.')
      .optional(),
  }),
});
```

### 2. Middleware Universal de Validação: `src/middlewares/validarSchema.js`
```javascript
import { AppError } from '../errors/AppError.js';

export function validarSchema(schema) {
  return async (req, res, next) => {
    try {
      // Valida body, params e query conforme definidos no esquema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      // Formata os erros do Zod de maneira limpa para o cliente
      const mensagens = error.errors.map((err) => ({
        campo: err.path.slice(1).join('.'),
        mensagem: err.message,
      }));

      return res.status(400).json({
        status: 'erro_validacao',
        erros: mensagens,
      });
    }
  };
}
```

### 3. Aplicando na Rota: `src/routes/usuarios.routes.js`
```javascript
import { Router } from 'express';
import { UsuariosController } from '../controllers/UsuariosController.js';
import { validarSchema } from '../middlewares/validarSchema.js';
import { criarUsuarioSchema } from '../schemas/usuario.schema.js';

const usuariosRoutes = Router();
const usuariosController = new UsuariosController();

// A requisição só chega ao controller se passar pelo validador do Zod!
usuariosRoutes.post(
  '/',
  validarSchema(criarUsuarioSchema),
  (req, res, next) => usuariosController.criar(req, res, next)
);

export { usuariosRoutes };
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o Zod no seu projeto (`npm install zod`).
2. Crie a pasta `src/schemas` e crie o arquivo `produto.schema.js`.
3. Defina um esquema para cadastro de produtos com os seguintes campos:
   - `nome`: texto, obrigatório, mínimo de 2 caracteres.
   - `preco`: número positivo, obrigatório.
   - `categoria`: enum restrito a `['ELETRONICOS', 'LIVROS', 'VESTUARIO']`.
   - `emEstoque`: booleano, opcional (com valor padrão `true`).
4. Aplique o middleware `validarSchema` na rota `POST /produtos` e teste no Postman enviando um payload inválido para observar a resposta de erro detalhada.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O pacote `zod` está instalado no `package.json`.
- [ ] O middleware `validarSchema` intercepta e valida as requisições antes do controlador.
- [ ] Requisições com dados inválidos recebem status HTTP 400 com lista explicativa de erros.
- [ ] Requisições com dados válidos passam normalmente para a camada de serviço.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Crie um esquema de validação para parâmetros de rota (`params`), validando se o ID fornecido na URL em rotas como `GET /usuarios/:id` é um formato de UUID válido usando `z.string().uuid('ID inválido')`. Teste enviando um ID alfanumérico aleatório na rota para ver o Zod bloquear a requisição!
