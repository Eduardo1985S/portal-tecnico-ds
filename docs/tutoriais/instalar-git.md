---
id: tutoriais-instalar-git
slug: /tutoriais/instalar-git
sidebar_position: 3
title: Instalar Git
description: Aprenda a instalar o sistema de controle de versão Git.
---

# Instalar e Configurar o Git

O **Git** é o sistema de controle de versão mais utilizado no mundo. Ele permite registrar o histórico de edições dos seus arquivos e colaborar com outras pessoas em projetos (normalmente através de plataformas como o GitHub).

## 1. Instalação

### Windows
1. Acesse [git-scm.com/download/win](https://git-scm.com/download/win).
2. Baixe a versão para o seu sistema (normalmente **64-bit Git for Windows Setup**).
3. Execute o instalador.
4. Você passará por várias telas de configuração. Se não tiver certeza, **pode deixar todas as opções no padrão** (basta ir clicando em "Next"). 
   - *Dica:* Na tela "Choosing the default editor used by Git", você pode alterar de Vim para "Use Visual Studio Code as Git's default editor" se já tiver o VS Code instalado.
5. Finalize a instalação. Isso também instalará o **Git Bash**, um terminal para Windows com comandos similares aos do Linux/Mac.

### macOS
O Mac já vem com o Git (geralmente uma versão fornecida pela Apple). Para ter a versão mais recente oficial:
1. Abra o Terminal.
2. Digite `git --version`. Se não estiver instalado, o macOS perguntará se você deseja instalar o "Command Line Developer Tools". Pode aceitar.
3. Alternativamente, você pode usar o Homebrew: `brew install git`.

### Linux (Ubuntu/Debian)
Abra o terminal e execute:
```bash
sudo apt update
sudo apt install git
```

## 2. Configuração Inicial

Depois de instalado, você precisa dizer ao Git quem você é. Essa informação ficará registrada em cada *commit* (salvamento) que você fizer.

Abra o seu terminal (no Windows, use o **Git Bash**) e digite os seguintes comandos, substituindo pelo seu nome e e-mail:

```bash
git config --global user.name "Seu Nome Completo"
git config --global user.email "seu_email@exemplo.com"
```

Para verificar se a configuração deu certo, execute:
```bash
git config --list
```
Isso mostrará várias configurações do Git, e você deverá ver o seu nome e e-mail no final da lista.

## 3. Qual Terminal Usar?
- **No Linux/Mac:** Pode usar o terminal nativo do sistema.
- **No Windows:** Recomendamos usar o **Git Bash** (que foi instalado junto com o Git) em vez do CMD (Prompt de Comando) padrão do Windows. Você também pode configurar o VS Code para usar o Git Bash como terminal integrado.
