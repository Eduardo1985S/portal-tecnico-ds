---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-20-publicacao-e-geracao-do-apk-com-eas
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-20-publicacao-e-geracao-do-apk-com-eas
sidebar_position: 20
title: Aula 20 — Geração do APK com EAS Build e Apresentação Final
description: Compile seu aplicativo na nuvem com o EAS Build, gere o arquivo .apk para instalação no Android e conclua a formação Mobile.
---

# Aula 20 — Geração do APK com EAS Build e Apresentação Final

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender como funciona o processo de compilação (*build*) nativa de aplicativos móveis utilizando a infraestrutura de nuvem **EAS (Expo Application Services)**, gerar o pacote executável standalone **`.apk`** para instalação direta em celulares Android e apresentar o aplicativo concluído para a banca avaliadora.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que acontece "por baixo dos panos": do código JavaScript/React para o binário compilado Android (DEX / Bytecode).
- Diferença entre o aplicativo executando no Expo Go e o aplicativo independente compilado (*Standalone App*).
- O que é o formato **APK (Android Package Kit)** vs. formato **AAB (Android App Bundle)** para a Google Play Store.
- Instalação e autenticação no **EAS CLI** (`npm install -g eas-cli`).
- Configuração do arquivo `eas.json` com o perfil de preview para geração de APK.
- Download, instalação no smartphone via cabo ou link direto e demonstração final.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que é o EAS Build?
Até hoje, você executava seu código através do aplicativo auxiliar **Expo Go**. No entanto, quando você entrega um software para um cliente ou o publica nas lojas, o usuário final não pode precisar instalar o Expo Go! Ele precisa instalar o **seu próprio aplicativo**, com o seu ícone oficial, seu nome na tela inicial e abertura direta em tela cheia.

Compilar código nativo (Java/Kotlin/C++) tradicionalmente exigia instalar o Android Studio completo, SDKs pesados e ter computadores com dezenas de gigabytes de RAM.

O **EAS Build** resolve isso transferindo todo o processo de compilação para supercomputadores na nuvem da Expo:
1. O seu código é compactado e enviado para a nuvem da Expo.
2. Servidores dedicados compilam o código nativo Android.
3. Ao término, a Expo entrega um link com o arquivo `.apk` pronto para download e instalação em qualquer aparelho Android!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Passo a Passo da Geração do APK

### 1. Instalando e Fazendo Login no EAS CLI:
```bash
# Instala a CLI globalmente na máquina
npm install -g eas-cli

# Realiza o login na sua conta do Expo (a mesma do expo.dev)
eas login
```

### 2. Configurando o Perfil de Build: `eas.json`
Execute o comando na raiz do projeto:
```bash
eas build:configure
```

No arquivo `eas.json` gerado na raiz, certifique-se de configurar o perfil `preview` para gerar um `.apk` instalável:

```json
{
  "cli": {
    "version": ">= 12.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

### 3. Disparando a Compilação na Nuvem:
Execute no terminal:
```bash
eas build -p android --profile preview
```

1. O terminal perguntará se deseja gerar o keystore criptográfico do Android: pressione `Y` (Yes) para a Expo gerenciar automaticamente.
2. Acompanhe o link de streaming da compilação em tempo real no navegador.
3. Ao finalizar (geralmente entre 10 e 15 minutos), o terminal exibirá um **QR Code e uma URL de Download direto**.
4. Aponte a câmera do seu smartphone para o QR Code e baixe o arquivo `.apk` diretamente para o seu aparelho!

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática: A Apresentação Final

1. Baixe e instale o `.apk` gerado no celular dos membros da equipe.
2. Toque no ícone do aplicativo na gaveta de apps do Android (verifique que o ícone oficial personalizado e a tela de Splash Screen funcionam perfeitamente).
3. Diante da turma e do professor:
   - Apresente o aplicativo funcionando de forma independente, sem depender do computador ou do Expo Go.
   - Demonstre o fluxo de login autenticado via nuvem.
   - Demonstre a captura de imagens pela câmera ou a geolocalização por GPS.
   - Execute operações de listagem, alteração e exclusão.
   - Apresente o repositório no GitHub com a documentação e o QR Code de download do APK no `README.md`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O arquivo `eas.json` está configurado com `"buildType": "apk"` no perfil preview.
- [ ] A compilação na nuvem do EAS concluiu com status `FINISHED` com sucesso.
- [ ] O arquivo `.apk` foi instalado e testado com sucesso em aparelhos Android físicos.
- [ ] O aplicativo standalone roda com fluidez máxima, consumindo a API oficial em produção.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Parabéns, Desenvolvedor(a) Mobile! 📱🎓

Você concluiu com maestria a formação completa em **Programação para Dispositivos Móveis**! Você dominou:
* Arquitetura de componentes, layout com Flexbox e navegação com React Navigation.
* Gerenciamento de estado global profissional com a Context API.
* Operações de CRUD assíncronas com o cliente Axios.
* Persistência de sessões no AsyncStorage e bancos locais Offline-First com SQLite.
* Recursos de hardware do smartphone: Câmera, Galeria, GPS, Notificações e Haptics.
* Plataformas de nuvem em tempo real com Firebase Auth e Cloud Firestore.
* Compilação na nuvem e empacotamento de arquivos APK com o EAS Build.

Seu aplicativo móvel agora é um produto digital completo, profissional e pronto para encantar recrutadores e transformar a vida dos usuários!
