---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-02-preparacao-do-ambiente
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-02-preparacao-do-ambiente
sidebar_position: 2
title: Aula 02 — Preparação do Ambiente
description: Aprenda a instalar e configurar o ambiente de desenvolvimento Back-End com Node.js, NPM, VS Code, Terminal e ES Modules.
---

# Aula 02 — Preparação do Ambiente

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Configurar o ambiente de desenvolvimento Back-End completo, entender o papel do Node.js e do gerenciador de pacotes NPM, dominar a configuração de **ES Modules (`import/export`)** no `package.json` e executar seu primeiro programa JavaScript moderno no servidor.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é o Node.js e o motor V8.
- Instalação e verificação de versões (`node -v` e `npm -v`).
- O papel do gerenciador de pacotes NPM (Node Package Manager).
- Configuração do **ES Modules** no `package.json` (`"type": "module"`).
- Diferença entre CommonJS (`require`) e ES Modules (`import / export`).
- Inicialização de projetos Node.js modernos e execução no terminal.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. O que é o Node.js?
Historicamente, o JavaScript foi criado em 1995 para rodar **apenas dentro dos navegadores web** (Front-End). 

Em 2009, Ryan Dahl criou o **Node.js**: um ambiente de execução (runtime environment) open-source que extraiu o motor de execução de JavaScript do Google Chrome (chamado **V8**) e permitiu que códigos JS fossem executados diretamente no sistema operacional do computador/servidor.

```
[ Navegador (Front-End) ]  ---> Executa JS visualmente (DOM, HTML, CSS)
[ Node.js (Back-End) ]     ---> Executa JS no sistema (Arquivos, Banco de Dados, Rede)
```

#### Principais Vantagens do Node.js:
- **Linguagem Única:** Permite usar JavaScript tanto no Front-End quanto no Back-End (Full-Stack).
- **Assíncrono e Orientado a Eventos:** Alta performance no processamento simultâneo de requisições.
- **Ecossistema Gigantesco:** Acesso à maior comunidade de bibliotecas do mundo através do NPM.

---

### 2. Módulos em JavaScript: CommonJS vs ES Modules

No ecossistema Node.js existem dois sistemas de módulos para importar e exportar código entre arquivos:

| Característica | CommonJS (Legado) | ES Modules (Padrão Moderno) |
| :--- | :--- | :--- |
| **Sintaxe de Importação** | `const os = require('os');` | `import os from 'node:os';` |
| **Sintaxe de Exportação** | `module.exports = { ... };` | `export default ...;` ou `export const ...;` |
| **Padrão** | Antigo padrão nativo do Node.js | Padrão oficial do JavaScript (ECMAScript moderno) |
| **Uso nesta disciplina** | Não utilizado | **Padrão obrigatório da disciplina** |

Para habilitar o uso de **ES Modules** nativamente em qualquer projeto Node.js, devemos adicionar `"type": "module"` no arquivo `package.json`.

---

### 3. Entendendo o arquivo `package.json`
Todo projeto profissional em Node.js é organizado a partir do arquivo central **`package.json`**. 

Exemplo de `package.json` configurado para **ES Modules**:
```json
{
  "name": "meu-primeiro-backend",
  "version": "1.0.0",
  "description": "Meu primeiro projeto Node.js com ES Modules",
  "main": "app.js",
  "type": "module",
  "scripts": {
    "start": "node app.js"
  },
  "keywords": [],
  "author": "Aluno DS",
  "license": "ISC"
}
```

> 💡 **Atenção:** Ao incluir `"type": "module"`, o Node.js passa a reconhecer os comandos `import` e `export` em todos os arquivos `.js` do projeto!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Passo a Passo: Criando um Projeto com ES Modules

Siga as etapas no seu Terminal/Prompt de Comando:

#### Passo 1: Verifique as versões instaladas
```bash
node -v
npm -v
```

#### Passo 2: Crie a pasta do projeto e acesse-a
```bash
mkdir meu-primeiro-backend
cd meu-primeiro-backend
```

#### Passo 3: Inicialize o projeto Node.js
```bash
npm init -y
```

#### Passo 4: Configure o ES Modules no `package.json`
Abra a pasta no VS Code (`code .`), abra o arquivo `package.json` e adicione a linha `"type": "module"`:

```json
{
  "name": "meu-primeiro-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node app.js"
  }
}
```

#### Passo 5: Crie o arquivo `app.js` usando a sintaxe `import`
Crie o arquivo `app.js` utilizando **ES Modules**:

```javascript
// app.js
import os from 'node:os'; // Importação utilizando ES Modules (padrão moderno)

console.log("==========================================");
console.log("🚀 Servidor Back-End Iniciado (ES Modules)!");
console.log("==========================================");

console.log(`Sistema Operacional : ${os.type()} (${os.arch()})`);
console.log(`Memória Total       : ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
console.log(`Memória Livre       : ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
console.log(`Diretório do Usuário: ${os.homedir()}`);
```

#### Passo 6: Execute o script pelo Terminal
```bash
npm start
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Criando um Diagnosticador de Servidor com ES Modules

**Objetivo:** Praticar a criação de projetos Node.js, configuração de ES Modules no `package.json` e uso da sintaxe `import`.

**Instruções:**
1. Crie uma pasta chamada `atividade-aula-02` e abra no terminal.
2. Inicialize o projeto criando o `package.json` (`npm init -y`).
3. Adicione a chave `"type": "module"` dentro do seu `package.json`.
4. Crie um arquivo chamado `server-info.js`.
5. Escreva um script usando `import os from 'node:os';` e `import process from 'node:process';` que exiba no terminal:
   - Uma mensagem de boas-vindas com o seu nome e turma.
   - A versão do Node.js em execução (`process.version`).
   - O caminho da pasta atual de trabalho (`process.cwd()`).
   - O tempo de atividade do computador em minutos (`(os.uptime() / 60).toFixed(0)` minutos).
6. No arquivo `package.json`, configure o script `"start": "node server-info.js"`.
7. Execute o projeto usando o comando `npm start` no terminal e confirme que o código rodou sem erros de sintaxe de módulos.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno verificou as versões do Node.js e NPM no terminal com `node -v` e `npm -v`.
- [ ] O aluno entendeu a diferença entre CommonJS (`require`) e ES Modules (`import/export`).
- [ ] O aluno configurou a propriedade `"type": "module"` no arquivo `package.json`.
- [ ] O aluno utilizou a sintaxe `import` para importar módulos do Node.js.
- [ ] O aluno executou o projeto usando o comando `npm start` com sucesso.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Com o **ES Modules** ativado no seu projeto, você está utilizando o padrão mais moderno do JavaScript, exatamente como é feito em frameworks modernos como React, Next.js e versões recentes do Express!

**Desafio Extra:** Crie um segundo arquivo chamado `funcoes.js` com uma função exportada:

```javascript
export function saudar(nome) {
  return `Olá, ${nome}!`;
}
```

Importe-a no `server-info.js` usando `import { saudar } from './funcoes.js';` e execute para testar a exportação de módulos próprios!
