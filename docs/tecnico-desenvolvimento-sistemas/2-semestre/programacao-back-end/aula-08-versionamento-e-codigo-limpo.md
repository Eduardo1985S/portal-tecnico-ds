---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-08-versionamento-e-codigo-limpo
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-08-versionamento-e-codigo-limpo
sidebar_position: 8
title: Aula 08 — Versionamento e Código Limpo
description: Aprenda as melhores práticas de Clean Code no Node.js, aprenda a configurar o .gitignore e domine o versionamento com Git e Conventional Commits.
---

# Aula 08 — Versionamento e Código Limpo

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender e aplicar os princípios de **Clean Code (Código Limpo)** em projetos Node.js, configurar corretamente o arquivo `.gitignore` para ignorar arquivos temporários e dependências, e adotar o fluxo profissional de versionamento de código com **Git, GitHub e Commits Semânticos**.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Princípios do Clean Code aplicados ao desenvolvimento Back-End.
- Nomenclatura declarativa de variáveis, funções e arquivos.
- Eliminação de "números mágicos" e duplicação de código.
- Configuração do arquivo `.gitignore` no ecossistema Node.js (`node_modules`, `.env`).
- Versionamento com Git e mensagens de commit no padrão **Conventional Commits**.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. O que é Clean Code (Código Limpo)?
Segundo Robert C. Martin (conhecido como *Uncle Bob*), **Código Limpo** é um código que é simples, legível, direto e fácil de ser mantido por qualquer desenvolvedor da equipe.

> *"Qualquer tolo pode escrever código que um computador entenda. Bons programadores escrevem código que humanos podem entender."* — Martin Fowler

#### Principais Regras de Clean Code:
1. **Nomes Intencionais:** Evite nomes genéricos ou abreviações obscuras (`data`, `x`, `temp`, `info`).
   - ❌ Ruim: `const d = 86400;`
   - ✅ Bom: `const SEGUNDOS_POR_DIA = 86400;`
2. **Funções Pequenas e Focadas:** Uma função deve fazer apenas uma coisa e fazê-la bem.
3. **Evitar Números e Strings Mágicas:** Substitua valores soltos no código por constantes nomeadas.
4. **Comentários Necessários:** O código deve ser autoexplicativo. Comente o "porquê" de decisões complexas, não o "o que" o código faz.

---

### 2. A Regra de Ouro: Nunca comite a pasta `node_modules`
A pasta `node_modules` pode conter dezenas de milhares de arquivos instalados e chegar a centenas de megabytes. **Ela jamais deve ser enviada para o GitHub!**

Para garantir que o Git ignore pastas pesadas e arquivos sensíveis, criamos um arquivo chamado **`.gitignore`** na raiz do projeto:

Exemplo de `.gitignore` para projetos Node.js:
```gitignore
# Dependências do Node (podem ser reinstaladas com 'npm install')
node_modules/

# Variáveis de ambiente e credenciais secretas
.env
.env.local

# Logs e arquivos de execução
npm-debug.log*
yarn-debug.log*
.docusaurus/
dist/
```

---

### 3. Versionamento com Conventional Commits
No mercado de trabalho, as mensagens de commit devem seguir um padrão claro para que a equipe entenda o histórico do projeto. O padrão **Conventional Commits** é a convenção mais adotada no mundo:

- `feat:` Adição de uma nova funcionalidade (ex: `feat: adiciona rota de login de usuarios`).
- `fix:` Correção de um bug (ex: `fix: corrige calculo de desconto no carrinho`).
- `docs:` Alterações na documentação ou README (ex: `docs: atualiza guia de instalacao`).
- `refactor:` Alteração de código que não muda comportamento nem corrige bug (ex: `refactor: converte funcoes para ES Modules`).
- `style:` Formatação de código sem alteração de regra de negócio (espaçamento, vírgulas).

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Refatorando um Código Back-End e Versionando com Git

#### Antes da Refatoração (Código "Sujo"):
```javascript
// ❌ Ruim: Nomes ruins, números mágicos, sem padrão ES Modules
function c(p, t) {
  if (t == 'a') {
    return p - (p * 0.15); // O que é 0.15? O que é 'a'?
  } else {
    return p - (p * 0.05);
  }
}
```

#### Depois da Refatoração (Clean Code com ES Modules):
```javascript
// ✅ Bom: Declarativo, constantes nomeadas, ES Modules
const DESCONTO_ALUNO_PORCENTAGEM = 15;
const DESCONTO_PADRAO_PORCENTAGEM = 5;

export const TIPOS_USUARIO = {
  ALUNO: 'ALUNO',
  VISITANTE: 'VISITANTE'
};

export const calcularPrecoComDesconto = (precoOriginal, tipoUsuario) => {
  if (tipoUsuario === TIPOS_USUARIO.ALUNO) {
    const fatorDesconto = DESCONTO_ALUNO_PORCENTAGEM / 100;
    return precoOriginal - (precoOriginal * fatorDesconto);
  }

  const fatorDescontoPadrao = DESCONTO_PADRAO_PORCENTAGEM / 100;
  return precoOriginal - (precoOriginal * fatorDescontoPadrao);
};
```

---

### Passo a Passo: Fluxo de Git no Terminal

```bash
# 1. Inicialize o repositório Git
git init

# 2. Crie o arquivo .gitignore (garantindo que node_modules seja ignorado)
echo node_modules/ > .gitignore

# 3. Verifique o status dos arquivos
git status

# 4. Adicione os arquivos para staging
git add .

# 5. Crie um commit semântico profissional
git commit -m "refactor: aplica principios de clean code na calculadora de descontos"
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Refatoração Clean Code e Versionamento do Projeto

**Objetivo:** Refatorar um código mal estruturado aplicando regras de Clean Code e realizar o versionamento completo com Git e `.gitignore`.

**Instruções:**
1. Crie uma pasta chamada `atividade-aula-08`.
2. Crie o arquivo `.gitignore` garantindo a inclusão de `node_modules/` e `.env`.
3. Inicialize o `package.json` com `"type": "module"`.
4. Crie um arquivo `usuarioService.js` refatorando o seguinte código antigo para torna-lo Clean Code:
   ```javascript
   // CÓDIGO ANTIGO PARA REFATORAR:
   function check(u) {
     if (u.a >= 18 && u.s == 'A') {
       return true;
     }
     return false;
   }
   ```
   *Dica de refatoração:* Renomeie para `verificarAcessoUsuario`, altere os nomes de atributos para `idade` e `status`, defina constantes para a idade mínima (`IDADE_MINIMA_MAIORIDADE = 18`), utilize Arrow Functions e exportação ES Modules.
5. Inicialize o repositório Git (`git init`), adicione os arquivos (`git add .`) e faça dois commits semânticos no padrão Conventional Commits (ex: `feat: adiciona estrutura inicial` e `refactor: melhora legibilidade da verificacao de usuario`).

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno aplicou nomes descritivos em variáveis, funções e argumentos.
- [ ] O aluno eliminou números mágicos substituindo-os por constantes explicativas.
- [ ] O aluno criou o arquivo `.gitignore` impedindo o versionamento do `node_modules`.
- [ ] O aluno inicializou o repositório Git e utilizou comandos `git add` e `git commit`.
- [ ] O aluno utilizou o padrão de commits semânticos (Conventional Commits).

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

A qualidade do seu código é o seu principal cartão de visitas como desenvolvedor Back-End. Em entrevistas técnicas de emprego e revisões de código (Code Reviews), a clareza e a organização valem tanto quanto o funcionamento do sistema!

**Desafio Extra:** Execute o comando `git log --oneline` no seu terminal para visualizar o histórico limpo e profissional dos seus commits semânticos!
