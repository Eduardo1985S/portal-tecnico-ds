---
id: tutoriais-github-cli
slug: /tutoriais/github-cli
sidebar_position: 4
title: Git por Linha de Comando
description: Guia passo a passo para criar repositório local e enviar para o GitHub via terminal.
---

# Git e GitHub: Linha de Comando

Guia passo a passo para criar um repositório local e enviar para o GitHub usando o terminal.

## <i className="fa-solid fa-folder"></i> 1. Criar uma pasta para o projeto

Primeiro, crie uma pasta no computador.  
**Exemplo:** `meu-primeiro-projeto`  
Depois, abra essa pasta no VS Code.

## <i className="fa-solid fa-file-lines"></i> 2. Criar um arquivo inicial

Dentro da pasta, crie um arquivo chamado `README.md`.  
Dentro dele, escreva algo simples:

```markdown
# Meu Primeiro Projeto

Este é meu primeiro projeto enviado para o GitHub.
```

## <i className="fa-solid fa-terminal"></i> 3. Abrir o terminal no VS Code

No VS Code, vá em: **Terminal > Novo Terminal** ou use o atalho: `` Ctrl + ` ``.

## <i className="fa-solid fa-gear"></i> 4. Configurar o Git pela primeira vez

Esse passo só precisa ser feito **uma vez** no computador.  
Digite:

```bash
git config --global user.name "Seu Nome"
```
*Exemplo:* `git config --global user.name "Eduardo Correia"`

Depois:
```bash
git config --global user.email "seuemail@email.com"
```
*Exemplo:* `git config --global user.email "joao@email.com"`

Para conferir se funcionou:
```bash
git config --global --list
```

## <i className="fa-solid fa-folder-tree"></i> 5. Iniciar o Git na pasta do projeto

Agora, dentro da pasta do projeto, digite:
```bash
git init
```
Esse comando transforma a pasta em um repositório Git local.

## <i className="fa-solid fa-magnifying-glass"></i> 6. Verificar o estado dos arquivos

Digite:
```bash
git status
```
O Git mostrará quais arquivos existem, quais foram modificados e quais ainda não foram preparados para commit.

## <i className="fa-solid fa-plus"></i> 7. Adicionar os arquivos ao controle do Git

Para adicionar todos os arquivos do projeto, digite:
```bash
git add .
```
O ponto `.` significa: "adicionar tudo que foi criado ou alterado nessa pasta".  
Depois confira novamente: `git status`.

## <i className="fa-solid fa-code-commit"></i> 8. Criar o primeiro commit

Agora registre a primeira versão do projeto:
```bash
git commit -m "primeiro commit"
```
O *commit* é como uma "foto salva" do estado atual do projeto.

## <i className="fa-brands fa-github"></i> 9. Criar o repositório no GitHub

Agora vá até o site do GitHub e faça login. Depois:
1. Clique em **New repository**
2. Digite o nome do repositório (exemplo: `meu-primeiro-projeto`)
3. Escolha a opção **Public** ou **Private**
4. **Não marque** a opção de criar README, pois você já criou um localmente
5. Clique em **Create repository**

## <i className="fa-solid fa-link"></i> 10. Copiar a URL do repositório

Depois que o repositório for criado, o GitHub mostrará uma URL parecida com esta:  
`https://github.com/seu-usuario/meu-primeiro-projeto.git`  
Copie essa URL.

## <i className="fa-solid fa-plug"></i> 11. Conectar o repositório local ao GitHub

No terminal do VS Code, digite:
```bash
git remote add origin URL_DO_REPOSITORIO
```
*Exemplo:* `git remote add origin https://github.com/joaosilva/meu-primeiro-projeto.git`  
Esse comando conecta sua pasta local ao repositório criado no GitHub.

## <i className="fa-solid fa-code-branch"></i> 12. Renomear a branch principal para main

Digite:
```bash
git branch -M main
```
Isso garante que a branch principal se chame `main`.

## <i className="fa-solid fa-cloud-arrow-up"></i> 13. Enviar o projeto para o GitHub

Agora envie o projeto:
```bash
git push -u origin main
```
Na primeira vez, pode aparecer uma tela pedindo login no GitHub. Basta autorizar.

## <i className="fa-solid fa-eye"></i> 14. Conferir no GitHub

Volte para a página do repositório no GitHub e atualize a página. Se tudo deu certo, os arquivos do projeto aparecerão lá.

---

## <i className="fa-solid fa-bolt"></i> Fluxo completo dos comandos

### Configuração Inicial (Uma vez no PC)
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@email.com"
```

### Criar o Repositório Localmente
```bash
git init
git status
git add .
git commit -m "primeiro commit"
```

### Enviar para o GitHub
```bash
git remote add origin URL_DO_REPOSITORIO
git branch -M main
git push -u origin main
```

---

## <i className="fa-solid fa-rotate-right"></i> Depois da primeira vez

Depois que o repositório já estiver conectado ao GitHub, o aluno não precisa repetir tudo.  
Sempre que alterar algo no projeto, use apenas:
```bash
git status
git add .
git commit -m "descrição da alteração"
git push
```
*Exemplo:*
```bash
git status
git add .
git commit -m "altera texto do README"
git push
```

---

## <i className="fa-solid fa-triangle-exclamation"></i> Erros comuns

### Erro: esqueci de usar `git add`
Se você tentar fazer commit sem adicionar os arquivos, o Git pode dizer que não há nada para salvar.  
**Resolva com:**
```bash
git add .
git commit -m "mensagem do commit"
```

### Erro: remote origin already exists
Esse erro aparece quando o repositório remoto já foi configurado.  
**Para ver o remote atual:** `git remote -v`  
**Para trocar a URL:** `git remote set-url origin URL_DO_REPOSITORIO`

### Erro: src refspec main does not match any
Pode acontecer quando ainda não existe commit ou a branch tem outro nome.  
**Resolva fazendo:**
```bash
git add .
git commit -m "primeiro commit"
git branch -M main
git push -u origin main
```

---

## <i className="fa-solid fa-list-check"></i> Checklist de Entrega

- [ ] Criei uma pasta para o projeto
- [ ] Abri a pasta no VS Code
- [ ] Criei o arquivo `README.md`
- [ ] Configurei meu nome no Git
- [ ] Configurei meu e-mail no Git
- [ ] Usei `git init`
- [ ] Usei `git status`
- [ ] Usei `git add .`
- [ ] Usei `git commit -m "primeiro commit"`
- [ ] Criei o repositório no GitHub
- [ ] Copiei a URL do repositório
- [ ] Usei `git remote add origin`
- [ ] Usei `git branch -M main`
- [ ] Usei `git push -u origin main`
- [ ] Conferi os arquivos no GitHub
