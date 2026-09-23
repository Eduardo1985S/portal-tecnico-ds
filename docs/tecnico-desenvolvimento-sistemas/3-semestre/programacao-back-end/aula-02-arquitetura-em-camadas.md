---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-02-arquitetura-em-camadas
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-02-arquitetura-em-camadas
sidebar_position: 2
title: Aula 02 — A Arquitetura em Camadas (Routes, Controllers e Services)
description: Desacoplamento profissional de responsabilidades no Back-End utilizando a arquitetura em 3 camadas.
---

# Aula 02 — A Arquitetura em Camadas (Routes, Controllers e Services)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender os problemas de acoplamento em controladores densos ("Fat Controllers"), aprender a separar rigorosamente as responsabilidades de uma API em camadas (Roteamento, Controladores e Serviços) e aplicar o Princípio da Responsabilidade Única (SRP) na prática.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O problema dos "Controladores Gordos" (Fat Controllers).
- A responsabilidade de cada camada:
  - **Routes (Roteamento):** Recebe o tráfego HTTP e direciona.
  - **Controllers (Controladores):** Extrai dados da requisição e devolve a resposta HTTP.
  - **Services (Serviços):** Executa regras de negócio, validações lógicas e orquestra operações.
- Criação de classes de erro customizadas (`AppError`).
- Injeção de dependências e modularidade.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

<div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
  <img src="/img/backend_camadas_arquitetura.jpg" alt="Arquitetura em Camadas: Routes, Controllers, Services e Banco de Dados" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 6px 20px rgba(0,0,0,0.3)' }} />
  <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)', marginTop: '0.5rem' }}>
    <em>Figura 1: O fluxo unidirecional de requisições através da arquitetura em 3 camadas no Back-End corporativo.</em>
  </p>
</div>

### Por que desacoplar em camadas?
Em projetos iniciantes, é comum vermos controladores que:
1. Extraem parâmetros de `req.body`
2. Validam regras de negócio (ex: "o e-mail já existe?")
3. Criptografam senhas
4. Salvam diretamente no banco de dados
5. Enviam um e-mail de boas-vindas
6. Respondem com `res.json(...)`

Quando o projeto cresce, esse controlador torna-se impossível de testar, manter ou reaproveitar em outros pontos (como um job agendado ou CLI).

### Divisão de Responsabilidades:

```
[ Cliente HTTP ]
       ↓
  1. Routes (Define o endpoint ex: POST /usuarios e middlewares)
       ↓
  2. Controller (Extrai dados do req.body/params e devolve res.status().json())
       ↓
  3. Service (Verifica se usuário já existe, aplica regras de negócio, formata dados)
       ↓
  4. Repository / ORM (Executa INSERT INTO no PostgreSQL)
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Tratamento Centralizado de Erros: `src/errors/AppError.js`
```javascript
export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

### 2. Camada de Serviço: `src/services/CriarUsuarioService.js`
```javascript
import { AppError } from '../errors/AppError.js';

// Simulando nosso repositório temporário
const usuarios = [];

export class CriarUsuarioService {
  async execute({ nome, email, senha }) {
    // Regra de Negócio: Não permitir e-mails duplicados
    const usuarioJaExiste = usuarios.find((u) => u.email === email);
    if (usuarioJaExiste) {
      throw new AppError('Este e-mail já está cadastrado no sistema.', 409);
    }

    if (senha.length < 6) {
      throw new AppError('A senha deve ter no mínimo 6 caracteres.', 400);
    }

    const novoUsuario = {
      id: crypto.randomUUID(),
      nome,
      email,
      senha, // Nas próximas aulas aplicaremos hash com bcrypt!
      criadoEm: new Date(),
    };

    usuarios.push(novoUsuario);
    return novoUsuario;
  }
}
```

### 3. Camada de Controlador: `src/controllers/UsuariosController.js`
```javascript
import { CriarUsuarioService } from '../services/CriarUsuarioService.js';

export class UsuariosController {
  async criar(req, res, next) {
    try {
      const { nome, email, senha } = req.body;

      const criarUsuarioService = new CriarUsuarioService();
      const usuario = await criarUsuarioService.execute({ nome, email, senha });

      // O controller só se preocupa com o status HTTP e com o payload de resposta!
      return res.status(201).json(usuario);
    } catch (error) {
      next(error); // Encaminha o erro para o middleware global!
    }
  }
}
```

### 4. Camada de Roteamento: `src/routes/usuarios.routes.js`
```javascript
import { Router } from 'express';
import { UsuariosController } from '../controllers/UsuariosController.js';

const usuariosRoutes = Router();
const usuariosController = new UsuariosController();

usuariosRoutes.post('/', (req, res, next) => usuariosController.criar(req, res, next));

export { usuariosRoutes };
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie a estrutura de diretórios `src/errors`, `src/services`, `src/controllers` e `src/routes`.
2. Implemente a classe `AppError` com campos de mensagem e `statusCode`.
3. Implemente o `CriarUsuarioService` e o `ListarUsuariosService`.
4. Implemente o `UsuariosController` para atender as rotas de criação e listagem.
5. Adicione um middleware global no `server.js` que capture instâncias de `AppError` e devolva a resposta formatada:
   ```javascript
   app.use((err, req, res, next) => {
     if (err instanceof AppError) {
       return res.status(err.statusCode).json({ status: 'error', message: err.message });
     }
     console.error(err);
     return res.status(500).json({ status: 'error', message: 'Erro interno do servidor.' });
   });
   ```

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Os controladores não contêm regras de negócio diretas, apenas orquestração de requisição/resposta.
- [ ] As regras de negócio foram encapsuladas em classes de Service com método `execute()`.
- [ ] O middleware global trata erros conhecidos (`AppError`) e erros inesperados (500).
- [ ] As rotas estão organizadas em arquivos separados e importadas no servidor central.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Crie um novo serviço chamado `BuscarUsuarioPorIdService`. Se o usuário com o ID informado não existir na lista, o serviço deve lançar um `AppError('Usuário não encontrado', 404)`. Teste a resposta no Postman verificando se o status HTTP retornado é exatamente 404!
