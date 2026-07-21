---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-05-funcoes-e-modularizacao
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-05-funcoes-e-modularizacao
sidebar_position: 5
title: Aula 05 — Funções e Modularização
description: Aprenda a criar funções bem estruturadas, utilizar callbacks e organizar o código Back-End em módulos desacoplados com ES Modules.
---

# Aula 05 — Funções e Modularização

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o papel das funções na construção de arquiteturas Back-End desacopladas, dominar o uso de **Callbacks**, aplicar o **Princípio da Responsabilidade Única** e estruturar projetos divididos em módulos organizados utilizando **ES Modules (`import / export`)**.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Princípios de Funções no Back-End: Responsabilidade Única e Reutilização.
- Tipos de declaração: Function Declaration vs Function Expression vs Arrow Function.
- Entendendo Callbacks (Funções passadas como argumento).
- Exportações Nomeadas (`export const`) vs Exportação Padrão (`export default`).
- Organização de pastas e arquivos no ecossistema Node.js.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. O Princípio da Responsabilidade Única (SRP)
Em servidores Back-End, o código nunca deve ser escrito em um único arquivo monolítico. Cada função deve ser responsável por **apenas uma tarefa bem definida** (ex: validar um e-mail, calcular um imposto, buscar no banco de dados ou formatar uma resposta).

```javascript
// Ruim: Função faz tudo (valida, calcula, envia e-mail e formata)
function processarTudo(pedido) { ... }

// Bom: Funções pequenas, especializadas e testáveis
const validarPedido = (pedido) => { ... };
const calcularTotal = (itens) => { ... };
const enviarEmailConfirmacao = (email) => { ... };
```

---

### 2. O que são Callbacks?
Uma **Callback** (função de retorno) é uma função passada como argumento para outra função, para ser executada após o término de determinada ação.

```javascript
// Função de alta ordem que aceita uma callback
const executarOperacao = (a, b, operacaoCallback) => {
  console.log("⚡ Executando cálculo...");
  return operacaoCallback(a, b);
};

// Funções de callback especificas
const somar = (x, y) => x + y;
const multiplicar = (x, y) => x * y;

console.log(executarOperacao(5, 3, somar));       // Output: 8
console.log(executarOperacao(5, 3, multiplicar)); // Output: 15
```

No Node.js, callbacks são amplamente utilizadas no tratamento de eventos, leitura de arquivos e middlewares do Express.

---

### 3. Modularização de Código com ES Modules

Modularizar significa dividir uma aplicação em arquivos independentes (módulos), facilitando a manutenção, testes e reutilização de código.

Existem duas formas de exportar dados em ES Modules:

#### 1. Exportação Nomeada (`Named Exports`)
Permite exportar múltiplas funções ou constantes de um mesmo arquivo.

```javascript
// arquivo: validadores.js
export const validarEmail = (email) => email.includes('@');
export const validarCpf = (cpf) => cpf.length === 11;

// Importação no arquivo principal (usando destructuring com os nomes exatos)
import { validarEmail, validarCpf } from './validadores.js';
```

#### 2. Exportação Padrão (`Default Export`)
Permite exportar um único valor ou classe principal por arquivo.

```javascript
// arquivo: Logger.js
const logger = (mensagem) => {
  console.log(`[LOG - ${new Date().toISOString()}]: ${mensagem}`);
};

export default logger;

// Importação no arquivo principal (pode receber qualquer nome de variável)
import meuLogger from './Logger.js';
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Construindo um Módulo de Autenticação e Logs

Vamos organizar um minissistema Back-End dividido em 3 arquivos organizados:

#### Pasta do Projeto:
```
meu-sistema-auth/
├── services/
│   ├── authService.js
│   └── loggerService.js
├── app.js
└── package.json
```

#### Arquivo 1: `services/loggerService.js` (Default Export)
```javascript
// services/loggerService.js
const registrarLog = (nivel, mensagem) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] [${nivel.toUpperCase()}]: ${mensagem}`);
};

export default registrarLog;
```

#### Arquivo 2: `services/authService.js` (Named Exports + Callback)
```javascript
// services/authService.js
import log from './loggerService.js';

export const autenticarUsuario = (email, senha, callbackNotificacao) => {
  log('info', `Tentativa de login para o e-mail: ${email}`);

  // Simulação de verificação de credenciais
  if (email === 'admin@senai.br' && senha === '123456') {
    log('success', 'Autenticação realizada com sucesso!');
    const usuarioLogado = { id: 1, nome: 'Administrador', email, perfil: 'ADMIN' };
    
    // Executa a callback enviando o usuário logado
    if (callbackNotificacao) {
      callbackNotificacao(null, usuarioLogado);
    }
    return usuarioLogado;
  } else {
    log('error', 'Credenciais inválidas!');
    if (callbackNotificacao) {
      callbackNotificacao('E-mail ou senha incorretos!', null);
    }
    return null;
  }
};
```

#### Arquivo 3: `app.js`
```javascript
// app.js
import { autenticarUsuario } from './services/authService.js';

console.log("==========================================");
console.log("🔐 SISTEMA DE AUTENTICAÇÃO BACK-END");
console.log("==========================================");

// Executando login com tratamento via Callback
autenticarUsuario('admin@senai.br', '123456', (erro, usuario) => {
  if (erro) {
    console.log(`❌ Falha no login: ${erro}`);
  } else {
    console.log(`🎉 Boas-vindas, ${usuario.nome}! Permissão: ${usuario.perfil}`);
  }
});
```

#### Arquivo 4: `package.json`
```json
{
  "name": "funcoes-e-modularizacao",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node app.js"
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Módulo de Notificações e Processamento de Pagamentos

**Objetivo:** Praticar a criação de funções com callbacks e a separação de código em módulos com ES Modules.

**Instruções:**
1. Crie uma pasta `atividade-aula-05` com `"type": "module"` no `package.json`.
2. Crie a subpasta `utils/` e dentro dela crie `formatadores.js`:
   - Exporte nomeadamente a função `formatarMoeda(valor)` que converte um número para `R$ XX.XX`.
3. Crie a subpasta `services/` e dentro dela crie `pagamentoService.js`:
   - Exporte a função `processarPagamento(valor, metodo, callbackSucesso, callbackErro)`:
   - Se o valor for maior que 0, chame a `callbackSucesso(valorFormatado)` passando o valor formatado com a função de `formatadores.js`.
   - Se o valor for `<= 0`, chame a `callbackErro('Valor inválido para pagamento!')`.
4. No arquivo `index.js`, importe as funções e simule dois pagamentos (um válido e outro inválido), tratando as respostas nas callbacks.
5. Execute com `npm start`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno compreendeu o Princípio da Responsabilidade Única em funções.
- [ ] O aluno compreendeu como passar e executar funções Callback.
- [ ] O aluno diferenciei Exportações Nomeadas (`export const`) de Exportações Padrão (`export default`).
- [ ] O aluno organizou o código em pastas lógicas (`services/`, `utils/`).
- [ ] O aluno executou e validou a atividade no terminal com `npm start`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

A modularização é a pedra angular da arquitetura MVC (Model-View-Controller) que aprenderemos nas próximas aulas. Separar a lógica de negócios das funções utilitárias é o que garante a escalabilidade de sistemas de grande porte!

**Desafio Extra:** Tente criar um módulo utilitário `geradorToken.js` que exporta uma função para gerar uma string aleatória de 16 caracteres para simular um token de sessão!
