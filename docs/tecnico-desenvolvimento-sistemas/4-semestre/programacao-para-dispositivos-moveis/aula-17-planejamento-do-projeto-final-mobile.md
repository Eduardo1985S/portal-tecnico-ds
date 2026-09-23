---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-17-planejamento-do-projeto-final-mobile
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-17-planejamento-do-projeto-final-mobile
sidebar_position: 17
title: Aula 17 — Planejamento do Projeto Final Integrador Mobile
description: Defina o escopo, arquitetura de telas e checklist técnico para o aplicativo móvel de conclusão de curso.
---

# Aula 17 — Planejamento do Projeto Final Integrador Mobile

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Planejar a arquitetura técnica completa do **Aplicativo Mobile do Projeto Integrador de Formatura**, definindo a malha de navegação (Stack e Tabs), os fluxos de dados, a integração com as APIs Back-End desenvolvidas e os recursos nativos obrigatórios (Câmera, Localização ou Armazenamento Local).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O checklist de requisitos técnicos para aplicativos móveis profissionais.
- Mapeamento das telas do projeto no Figma e tradução para rotas de navegação.
- Integração da tríade de armazenamento: AsyncStorage (Token), SQLite (Offline) e Nuvem (API/Firebase).
- Divisão de tarefas na equipe de desenvolvimento mobile.
- Configuração do arquivo de manifesto do Expo (`app.json`).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de Arquitetura do App Mobile

Seu aplicativo de conclusão de curso deve atender aos seguintes padrões de mercado:

```markdown
### 📱 1. Navegação e Telas
- [ ] Navegador de Autenticação isolado (Login e Cadastro).
- [ ] Navegador Principal em Abas Inferiores (Bottom Tab Navigation) com ícones vetoriais.
- [ ] Navegador em Pilha (Native Stack) para telas de detalhamento e formulários de cadastro.
- [ ] Tratamento de área segura com `SafeAreaView` em todos os aparelhos.

### 🌐 2. Rede e Estado Global
- [ ] `AuthContext` compartilhado gerenciando login, logout e usuário logado.
- [ ] Cliente Axios configurado com `baseURL`, timeouts e interceptador de token Bearer.
- [ ] Estados visuais claros para todas as chamadas: Loading (`ActivityIndicator`), Erro e Sucesso.

### 💾 3. Armazenamento e Hardware Nativo
- [ ] AsyncStorage persistindo o token JWT para manter o usuário logado ao reabrir o app.
- [ ] Pelo menos UM recurso de hardware integrado com permissões tratadas:
  - Câmera / Galeria com `expo-image-picker` OU
  - Geolocalização GPS com `expo-location` OU
  - Banco local Offline com `expo-sqlite` OU
  - Notificações locais com `expo-notifications`.

### 🎨 4. Estética e Usabilidade (UI/UX)
- [ ] Paleta de cores moderna e consistente (Dark Mode ou Light Mode bem definido).
- [ ] Feedback tátil com `expo-haptics` ou animações em botões principais.
- [ ] Diálogos nativos de confirmação (`Alert.alert`) em ações de exclusão.
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Configurando o `app.json` para Produção

O arquivo `app.json` é o coração do projeto Expo. Ele define como o app será visto na Google Play e no sistema operacional:

```json
{
  "expo": {
    "name": "Portal Técnico DS",
    "slug": "portal-tecnico-ds",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0f172a"
    },
    "android": {
      "package": "com.senai.portaltecnicods",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0f172a"
      },
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_FINE_LOCATION"
      ]
    }
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Reúna sua equipe e abra o protótipo do Figma do Projeto Integrador.
2. Mapeie todas as telas do aplicativo e liste quais serão rotas de Abas e quais serão telas empilhadas na Stack.
3. Configure o arquivo `app.json` definindo o nome real do aplicativo, a versão `1.0.0` e o identificador de pacote Android (`package: "com.suaturma.nomedoapp"`).
4. Crie as Issues no GitHub Projects com as metas de desenvolvimento para as próximas semanas.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A arquitetura de navegação do app está desenhada e validada.
- [ ] O `app.json` possui ícones, splash screen e identificador de pacote configurados.
- [ ] O recurso de hardware obrigatório foi escolhido e planejado pela equipe.
- [ ] As tarefas de implementação foram distribuídas entre os desenvolvedores.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Pesquise sobre a ferramenta **Expo Prebuild** (`npx expo prebuild`). Como ela permite que um projeto Expo gere as pastas nativas puras `android/` e `ios/` caso a equipe precise instalar bibliotecas com código Java/Kotlin ou Swift customizado no futuro?
