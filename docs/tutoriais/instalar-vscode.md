---
id: tutoriais-instalar-vscode
slug: /tutoriais/instalar-vscode
sidebar_position: 1
title: Instalar e Configurar o VS Code
description: Guia passo a passo para instalar e configurar o Visual Studio Code para desenvolvimento.
---

# Instalar e Configurar o VS Code

O **Visual Studio Code (VS Code)** é um dos editores de código mais populares e versáteis da atualidade. Ele é leve, gratuito e possui um ecossistema gigante de extensões.

## 1. Download e Instalação

### Windows
1. Acesse o site oficial: [code.visualstudio.com](https://code.visualstudio.com/).
2. Clique no botão **Download for Windows**.
3. Execute o instalador baixado (`VSCodeUserSetup-{versao}.exe`).
4. Aceite os termos de licença e clique em **Próximo**.
5. **Importante:** Na tela de tarefas adicionais, marque as seguintes opções para facilitar o seu dia a dia:
   - Adicionar a ação "Abrir com Code" ao menu de contexto de arquivo do Windows Explorer.
   - Adicionar a ação "Abrir com Code" ao menu de contexto de diretório do Windows Explorer.
   - Registre o Code como um editor para tipos de arquivos suportados.
   - Adicione em PATH (requer reinicialização).
6. Conclua a instalação.

### macOS
1. Acesse [code.visualstudio.com](https://code.visualstudio.com/) e baixe a versão para Mac.
2. Abra o arquivo `.zip` baixado para extrair o aplicativo.
3. Arraste o **Visual Studio Code** para a pasta **Aplicativos (Applications)**.
4. Para abrir pelo terminal, abra o VS Code, pressione `Cmd+Shift+P`, digite `shell command` e selecione **Install 'code' command in PATH**.

### Linux (Ubuntu/Debian)
A forma mais fácil é via pacote `.deb` ou `snap`.
```bash
# Usando snap
sudo snap install --classic code
```

## 2. Extensões Recomendadas

O VS Code é poderoso por causa de suas extensões. Para instalar, clique no ícone de Extensões na barra lateral esquerda (ou pressione `Ctrl+Shift+X`) e pesquise por:

- **Portuguese (Brazil) Language Pack:** Traduz a interface do VS Code para Português.
- **Prettier - Code formatter:** Formata seu código automaticamente, mantendo um padrão limpo.
- **Live Server:** Cria um servidor local que recarrega a página automaticamente quando você salva um arquivo HTML/CSS/JS.
- **ESLint:** Encontra e corrige problemas no seu código JavaScript/TypeScript.
- **Material Icon Theme:** Adiciona ícones bonitos para cada tipo de arquivo e pasta.

## 3. Configurações Úteis

Para acessar as configurações, vá em **File > Preferences > Settings** (ou `Ctrl+,`).
Recomendamos buscar por e ativar as seguintes opções:

- **Format On Save:** Marque esta opção. Sempre que você salvar um arquivo, ele será formatado (funciona muito bem junto com o Prettier).
- **Word Wrap:** Altere para `on`. Evita que linhas muito longas passem da tela, quebrando-as visualmente para a linha de baixo.

Pronto! Seu ambiente de edição está preparado para os desafios do desenvolvimento.
