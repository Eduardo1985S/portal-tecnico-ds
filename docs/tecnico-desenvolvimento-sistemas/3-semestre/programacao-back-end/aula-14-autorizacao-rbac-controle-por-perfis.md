---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-14-autorizacao-rbac-controle-por-perfis
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-14-autorizacao-rbac-controle-por-perfis
sidebar_position: 14
title: Aula 14 — Autorização e Controle de Acesso por Papel (RBAC)
description: Diferencie autenticação de autorização e implemente middlewares de controle por perfis (Admin vs. Aluno).
---

# Aula 14 — Autorização e Controle de Acesso por Papel (RBAC)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Diferenciar conceitualmente **Autenticação** (*quem você é*) de **Autorização** (*o que você tem permissão para fazer*), compreender o modelo **RBAC (Role-Based Access Control)** e construir middlewares flexíveis no Express para restringir o acesso a endpoints administrativos com base no cargo ou perfil do usuário logado.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O modelo de Segurança RBAC (Role-Based Access Control).
- A diferença essencial entre Status 401 (Unauthorized) e Status 403 (Forbidden).
- Estruturação de papéis e cargos no banco de dados (`ADMIN`, `PROFESSOR`, `ALUNO`).
- Criação de uma função de alta ordem (Higher-Order Function) como middleware de autorização.
- Protegendo operações destrutivas ou administrativas (ex: exclusão de cursos, relatórios gerenciais).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Autenticação vs. Autorização
* **Autenticação (Status 401 Unauthorized):** O sistema verifica a identidade do usuário (Login/Senha/Token). Se você não apresentou um token válido, você não está autenticado.
* **Autorização (Status 403 Forbidden):** O sistema sabe perfeitamente quem você é (você está autenticado como aluno), mas você **não tem permissão** para executar aquela ação (por exemplo, cadastrar uma nota ou excluir um usuário).

### O Padrão RBAC no Express:
Podemos criar um middleware configurável que recebe uma lista de cargos permitidos e verifica se o cargo do usuário autenticado (`req.user.cargo`) está nessa lista:

```javascript
// Apenas ADMIN pode acessar:
rotas.delete('/usuarios/:id', garantirAutenticacao, permitirAcesso(['ADMIN']), controlador.excluir);

// ADMIN e PROFESSOR podem acessar:
rotas.post('/notas', garantirAutenticacao, permitirAcesso(['ADMIN', 'PROFESSOR']), controlador.lancarNota);
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Criando o Middleware de Autorização: `src/middlewares/permitirAcesso.js`
```javascript
import { AppError } from '../errors/AppError.js';

export function permitirAcesso(cargosPermitidos = []) {
  return (req, res, next) => {
    // 1. Garante que o middleware de autenticação já rodou antes
    if (!req.user) {
      throw new AppError('Não autenticado.', 401);
    }

    const { cargo } = req.user;

    // 2. Verifica se o cargo do usuário está na lista autorizada
    if (!cargosPermitidos.includes(cargo)) {
      throw new AppError(
        'Acesso negado: seu perfil não possui privilégios para esta operação.',
        403 // 403 Forbidden!
      );
    }

    return next();
  };
}
```

### 2. Protegendo Endpoints Críticos: `src/routes/produtos.routes.js`
```javascript
import { Router } from 'express';
import { ProdutosController } from '../controllers/ProdutosController.js';
import { garantirAutenticacao } from '../middlewares/garantirAutenticacao.js';
import { permitirAcesso } from '../middlewares/permitirAcesso.js';

const produtosRoutes = Router();
const produtosController = new ProdutosController();

// Rotas públicas (qualquer pessoa pode consultar o catálogo)
produtosRoutes.get('/', (req, res) => produtosController.listar(req, res));
produtosRoutes.get('/:id', (req, res) => produtosController.buscarPorId(req, res));

// Rotas restritas: Exigem autenticação E perfil de ADMIN
produtosRoutes.post(
  '/',
  garantirAutenticacao,
  permitirAcesso(['ADMIN']),
  (req, res, next) => produtosController.criar(req, res, next)
);

produtosRoutes.delete(
  '/:id',
  garantirAutenticacao,
  permitirAcesso(['ADMIN']),
  (req, res, next) => produtosController.excluir(req, res, next)
);

export { produtosRoutes };
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie o arquivo `src/middlewares/permitirAcesso.js`.
2. No seu banco de dados (via Prisma Studio ou SQL), altere o campo `cargo` de um dos usuários para `'ADMIN'` e mantenha outro usuário com o cargo padrão `'ALUNO'`.
3. Aplique o middleware `permitirAcesso(['ADMIN'])` na rota `DELETE /usuarios/:id`.
4. Faça o teste no Postman logando primeiro com o usuário `'ALUNO'` e tente executar a exclusão (comprove a resposta com status **403 Forbidden**).
5. Depois faça login com o usuário `'ADMIN'` e tente a mesma exclusão (comprove o sucesso com status **200 OK**).

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O middleware `permitirAcesso` aceita múltiplos papéis como array.
- [ ] Usuários sem o papel necessário recebem status HTTP 403 (e não 401 ou 500).
- [ ] Usuários autorizados prosseguem sem restrição para a execução do controlador.
- [ ] O middleware lida com cenários onde a autenticação foi omitida por engano.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Imagine um sistema onde um aluno só pode visualizar e editar **o seu próprio perfil**, enquanto um administrador pode visualizar e editar o perfil de **qualquer aluno**. Como você estruturaria essa validação dentro do Service ou Controller? Escreva o algoritmo dessa regra de negócio!
