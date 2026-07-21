---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-18-consolidacao-e-refatoracao
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-18-consolidacao-e-refatoracao
sidebar_position: 18
title: Aula 18 — Consolidação e Refatoração
description: Faça uma auditoria completa no código da sua API, identificando Code Smells, aplicando padrões arquiteturais MVC limpos e refinando o tratamento de exceções.
---

# Aula 18 — Consolidação e Refatoração

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Consolidar o aprendizado adquirido ao longo das aulas de Back-End, realizar a **refatoração (Refactoring)** de projetos existentes, eliminar pontos de fragilidade (*Code Smells*), padronizar respostas HTTP em JSON e preparar o ambiente de código para o Projeto Integrador.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O conceito e os objetivos da Refatoração de Código.
- Identificação de *Code Smells* no desenvolvimento de APIs Node.js.
- Padronização rigorosa da estrutura arquitetural em 4 camadas.
- Tratamento global de exceções assíncronas com `async/await` e `next(err)`.
- Checklist de Revisão de Código (*Code Review Checklist*).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. O que é Refatoração (Refactoring)?
**Refatorar** significa reestruturar o código interno de um sistema para torná-lo mais legível, limpo, modular e fácil de manter, **sem alterar o seu comportamento funcional externo**.

> *"Torne o código legível primeiro, depois torne-o correto, e só então (se necessário) torne-o rápido."*

---

### 2. Identificando *Code Smells* (Sintomas de Código Ruim)

Durante o desenvolvimento rápido, é comum deixarmos algumas falhas de design passar. O processo de auditoria busca eliminar:

| Code Smell | O que é? | Solução Refatorada |
| :--- | :--- | :--- |
| **Monolito de Arquivo Único** | Todo o código (rotas, regras, HTTP, arquivos) em um único `app.js`. | Separar em `routes/`, `controllers/` e `repository/`. |
| **Promises Não Tratadas** | Funções `async` sem bloco `try/catch`. | Envolver o código em `try/catch` e repassar o erro ao `next(err)`. |
| **Respostas Inconsistentes** | Algumas rotas retornam `{ data: [] }` e outras retornam `[ ... ]`. | Criar uma função auxiliar padronizadora de respostas JSON. |
| **Strings/Códigos Mágicos** | Status HTTP ou mensagens de erro espalhadas pelo código. | Centralizar em um arquivo de constantes `src/utils/statusCodes.js`. |

---

### 3. O Checklist de Qualidade do Back-End

Antes de considerar uma API pronta, verifique os 5 pilares:

```
[ CHECKLIST DE QUALIDADE ]
├── 1. ES Modules: Todos os arquivos usam import/export com extensão .js
├── 2. Camadas MVC: Nenhuma regra de banco/arquivo no Controller
├── 3. Segurança HTTP: Tratamento de 400, 404, 409 e 500
├── 4. Async/Await: Todas as chamadas assíncronas tratadas com try/catch
└── 5. Repositório Limpo: Pasta node_modules devidamente listada no .gitignore
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Refatorando uma API Monolítica para Arquitetura Profissional

#### Antes da Refatoração (Código Fragilizado em `app.js`):
```javascript
// ❌ Ruim: Mistura de rotas, arquivo, HTTP e sem try/catch
app.post('/usuarios', async (req, res) => {
  const data = await fs.readFile('./banco.json');
  const list = JSON.parse(data);
  list.push(req.body);
  await fs.writeFile('./banco.json', JSON.stringify(list));
  res.send('ok');
});
```

#### Depois da Refatoração (Clean Architecture & ES Modules):

##### Arquivo 1: `src/utils/responseHelper.js`
```javascript
// src/utils/responseHelper.js
export const respostaSucesso = (res, statusCode, dados, mensagem = null) => {
  return res.status(statusCode).json({
    sucesso: true,
    mensagem,
    dados
  });
};

export const respostaErro = (res, statusCode, erro) => {
  return res.status(statusCode).json({
    sucesso: false,
    erro
  });
};
```

##### Arquivo 2: `src/controllers/usuarioController.js` Refatorado
```javascript
// src/controllers/usuarioController.js
import * as repo from '../repository/usuarioRepository.js';
import { respostaSucesso, respostaErro } from '../utils/responseHelper.js';

export const cadastrar = async (req, res, next) => {
  try {
    const { nome, email } = req.body;

    if (!nome || !email) {
      return respostaErro(res, 400, 'Nome e e-mail são obrigatórios.');
    }

    const emailExiste = await repo.buscarPorEmail(email);
    if (emailExiste) {
      return respostaErro(res, 409, 'Este e-mail já está em uso.');
    }

    const novoUsuario = await repo.salvar({ nome, email });
    return respostaSucesso(res, 201, novoUsuario, 'Usuário cadastrado com sucesso!');
  } catch (erro) {
    next(erro); // Repassa com segurança para o middleware de erro
  }
};
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Auditoria e Refatoração de Projeto Legado

**Objetivo:** Pegar um projeto desenvolvido nas aulas anteriores, auditar o código com o *Checklist de Qualidade* e refatorá-lo.

**Instruções:**
1. Escolha um dos projetos desenvolvidos anteriormente (ex: API de Clientes, Veículos ou Tarefas).
2. Execute uma auditoria identificando se há:
   - Funções assíncronas sem `try/catch`.
   - Rotas com lógica de gravação em arquivo no próprio Controller.
   - Respostas de erro sem código de status HTTP adequado.
3. Crie a pasta `src/utils/` e implemente o `responseHelper.js` para padronizar todos os retornos em JSON.
4. Refatore a camada de repository isolando a manipulação de arquivos com `node:fs/promises`.
5. Adicione um middleware para capturar rotas inexistentes (404) no final do `app.js`:
   ```javascript
   app.use((req, res) => {
     res.status(404).json({ sucesso: false, erro: 'Endpoint não encontrado no servidor.' });
   });
   ```
6. Teste todas as rotas da API refatorada no Postman/Thunder Client e certifique-se de que nada quebrou!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno compreendeu a definição e a importância da refatoração de código.
- [ ] O aluno identificou e corrigiu *Code Smells* no projeto.
- [ ] O aluno padronizou os retornos JSON da API com um utilitário de resposta.
- [ ] O aluno garantiu o tratamento de erros assíncronos em 100% dos controllers.
- [ ] O aluno adicionou um manipulador global para rotas não encontradas (404).

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Código limpo e bem refatorado é a chave para o sucesso em projetos de grande porte. Na próxima aula, iniciaremos a construção do **Projeto Integrador Parcial**!

**Desafio Extra:** Crie um middleware de validação global que verifique se todo corpo de requisição `POST` e `PUT` enviado para a API é de fato um JSON válido!
