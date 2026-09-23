---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-07-armazenamento-local-asyncstorage
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-07-armazenamento-local-asyncstorage
sidebar_position: 7
title: Aula 07 — Armazenamento Local com AsyncStorage
description: Persista dados de preferências e flags no disco do smartphone utilizando a API assíncrona do AsyncStorage.
---

# Aula 07 — Armazenamento Local com AsyncStorage

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender como os sistemas operacionais móveis (Android e iOS) gerenciam a memória volátil vs. persistente, instalar e configurar a biblioteca **AsyncStorage**, e aprender a salvar, recuperar e remover dados chave-valor de forma assíncrona diretamente na memória flash do smartphone.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O ciclo de vida da memória no smartphone: por que o estado `useState` é perdido quando o app é fechado.
- O que é o AsyncStorage (o equivalente ao `localStorage` da web no ecossistema mobile).
- Métodos assíncronos fundamentais:
  - `AsyncStorage.setItem(chave, valor)`
  - `AsyncStorage.getItem(chave)`
  - `AsyncStorage.removeItem(chave)`
  - `AsyncStorage.clear()`
- Boas práticas de nomenclatura de chaves com prefixos (@nomeDoApp:chave).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que é o AsyncStorage?
O **AsyncStorage** é um sistema de armazenamento persistente, não criptografado, assíncrono e baseado em chave-valor mantido pelo smartphone. Ele é ideal para armazenar pequenas quantidades de dados que precisam sobreviver ao fechamento do aplicativo, como:
* O token JWT de autenticação do usuário.
* As preferências de tema (Dark/Light).
* Se o usuário já concluiu o tutorial inicial de boas-vindas (*Onboarding*).

### Regra Importante: O AsyncStorage só aceita Strings!
Diferente de variáveis JavaScript comuns, o AsyncStorage **só é capaz de salvar valores em formato de texto (string)**. Para salvar números, booleanos ou objetos, precisamos convertê-los previamente.

### Instalação no Expo:
```bash
npx expo install @react-native-async-storage/async-storage
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Criando um Serviço de Armazenamento: `src/storage/onboardingStorage.js`
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Boa prática: prefixar a chave com o nome do aplicativo
const CHAVE_ONBOARDING = '@portalTecnicoDS:viuOnboarding';

export async function salvarStatusOnboarding(visualizou = true) {
  try {
    // Converte o booleano em string antes de salvar
    await AsyncStorage.setItem(CHAVE_ONBOARDING, String(visualizou));
  } catch (error) {
    console.error('Erro ao salvar onboarding no storage:', error);
  }
}

export async function carregarStatusOnboarding() {
  try {
    const valor = await AsyncStorage.getItem(CHAVE_ONBOARDING);
    // Retorna true apenas se a string for exatamente "true"
    return valor === 'true';
  } catch (error) {
    console.error('Erro ao carregar onboarding do storage:', error);
    return false;
  }
}

export async function removerStatusOnboarding() {
  try {
    await AsyncStorage.removeItem(CHAVE_ONBOARDING);
  } catch (error) {
    console.error('Erro ao limpar onboarding:', error);
  }
}
```

### 2. Verificando o Storage no Início do App:
```jsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { carregarStatusOnboarding } from './src/storage/onboardingStorage';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  const [carregandoStorage, setCarregandoStorage] = useState(true);
  const [jaViuOnboarding, setJaViuOnboarding] = useState(false);

  useEffect(() => {
    async function verificar() {
      const status = await carregarStatusOnboarding();
      setJaViuOnboarding(status);
      setCarregandoStorage(false);
    }

    verificar();
  }, []);

  if (carregandoStorage) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return jaViuOnboarding ? <HomeScreen /> : <OnboardingScreen onConcluir={() => setJaViuOnboarding(true)} />;
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o pacote `@react-native-async-storage/async-storage` no projeto Expo.
2. Crie uma tela simples de **Configurações**:
   - Adicione um seletor ou botão para escolher a cidade padrão do usuário (ex: `"São Paulo"`, `"Campinas"` ou `"Santos"`).
   - Ao selecionar, salve o valor no AsyncStorage com a chave `@app:cidade`.
3. Feche completamente o aplicativo (remova-o dos apps recentes no celular).
4. Abra o aplicativo novamente e comprove que a cidade selecionada anteriormente foi carregada com sucesso do disco!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O pacote `@react-native-async-storage/async-storage` foi instalado com `npx expo install`.
- [ ] Todas as chamadas para o storage utilizam `async/await` com blocos `try/catch`.
- [ ] As chaves do storage utilizam convenção semântica com prefixo.
- [ ] Os dados permanecem gravados mesmo após encerrar e reiniciar o aplicativo.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione um botão "Restaurar Configurações de Fábrica" que execute `AsyncStorage.clear()`. O que essa função faz? Por que devemos tomar muito cuidado ao chamá-la em aplicativos de produção que armazenam dados de múltiplos módulos?
