---
id: tutoriais-instalar-nodejs
slug: /tutoriais/instalar-nodejs
sidebar_position: 2
title: Instalar Node.js
description: Como instalar e configurar o Node.js em seu sistema operacional.
---

# Instalar o Node.js

O **Node.js** é um ambiente de execução JavaScript que permite rodar código JS fora do navegador, essencial para back-end e para ferramentas de front-end (como React, Angular, Vue). Junto com o Node, é instalado o **npm** (Node Package Manager).

## Opção 1: Instalador Oficial (Mais Simples)

Esta é a forma mais direta para iniciantes.

### Windows e macOS
1. Acesse o site oficial: [nodejs.org](https://nodejs.org/).
2. Você verá duas opções de download. **Escolha sempre a versão LTS (Long Term Support)**. A versão "Current" possui os recursos mais novos, mas pode ser instável.
3. Execute o instalador baixado.
4. Siga os passos (Next, Next...). Deixe as opções padrão marcadas (especialmente a de adicionar ao PATH).
5. No Windows, pode aparecer uma opção para instalar ferramentas adicionais (Chocolatey, Python, etc.). É recomendado marcar esta opção se você planeja mexer com bibliotecas nativas, mas não é estritamente necessário para começar.

### Linux (Ubuntu/Debian)
Utilize o repositório oficial da NodeSource:
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Opção 2: Usando NVM (Recomendado para Avançados)

O **NVM (Node Version Manager)** permite instalar várias versões do Node.js na mesma máquina e alternar entre elas facilmente. É muito útil quando diferentes projetos requerem diferentes versões do Node.

### Windows (nvm-windows)
1. Acesse o repositório do [nvm-windows no GitHub](https://github.com/coreybutler/nvm-windows/releases).
2. Baixe e instale o arquivo `nvm-setup.exe` ou `nvm-setup.zip` da versão mais recente.
3. Abra um terminal e instale a versão LTS do Node:
   ```cmd
   nvm install lts
   nvm use lts
   ```

### macOS e Linux (nvm)
No terminal, execute o script de instalação (verifique no [repositório oficial do nvm](https://github.com/nvm-sh/nvm) o comando mais atual):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
Após reiniciar o terminal, instale o Node:
```bash
nvm install --lts
nvm use --lts
```

## Verificando a Instalação

Após a instalação, abra o seu terminal (Prompt de Comando, PowerShell, ou o terminal do VS Code) e digite:

```bash
node -v
```
Isso retornará a versão instalada (ex: `v20.11.0`).

E para checar o npm:
```bash
npm -v
```
Se ambos os comandos retornarem números de versão, o Node.js está instalado e pronto para uso!
