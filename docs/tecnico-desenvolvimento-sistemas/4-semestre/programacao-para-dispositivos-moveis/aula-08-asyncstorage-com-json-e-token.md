---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-08-asyncstorage-com-json-e-token
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-08-asyncstorage-com-json-e-token
sidebar_position: 8
title: Aula 08 — AsyncStorage com Objetos JSON e Token de Sessão
description: Persista a sessão completa do usuário e o token JWT no AsyncStorage mantendo o login ativo ao reabrir o app.
---

# Aula 08 — AsyncStorage com Objetos JSON e Token de Sessão

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a serializar e deserializar objetos complexos em JSON (`JSON.stringify` e `JSON.parse`) para armazenamento no AsyncStorage, integrar a persistência local ao **AuthContext** e garantir que o usuário permaneça autenticado ao fechar e reabrir o aplicativo no smartphone.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O processo de Serialização (`JSON.stringify`) e Deserialização (`JSON.parse`).
- Armazenando objetos de usuário e a string do Token JWT no AsyncStorage.
- O ciclo de inicialização do aplicativo: lendo o token do disco no carregamento.
- Reconfigurando o cabeçalho padrão do Axios (`Authorization: Bearer`) com o token restaurado.
- Limpando o storage no evento de Logout.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Na Aula 05, criamos o nosso `AuthContext`. No entanto, como os dados do usuário ficavam guardados apenas em um `useState` em memória, toda vez que o aplicativo era fechado, o usuário precisava digitar e-mail e senha novamente.

### O Fluxo da Sessão Persistente no Mobile:
1. **Ao Fazer Login:**
   * Recebe `{ usuario, token }` da API.
   * Salva o `token` na chave `@portalDS:token`.
   * Salva o `usuario` em JSON na chave `@portalDS:usuario`.
   * Atualiza o estado global e o cabeçalho do Axios.
2. **Ao Abrir o Aplicativo (Hook `useEffect`):**
   * O app lê o token e o usuário gravados no AsyncStorage.
   * Se existirem, já injeta o token no Axios e define o usuário como logado.
   * O usuário vai **direto para a tela Home**, sem passar pela tela de Login!
3. **Ao Fazer Logout:**
   * Remove as chaves do AsyncStorage.
   * Define o usuário como `null`.
   * O app redireciona para a tela de Login.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Módulo de Storage de Autenticação: `src/storage/authStorage.js`
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_TOKEN = '@portalDS:token';
const CHAVE_USUARIO = '@portalDS:usuario';

export async function salvarDadosAuth(token, usuario) {
  try {
    await AsyncStorage.setItem(CHAVE_TOKEN, token);
    await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
  } catch (error) {
    console.error('Erro ao salvar dados de autenticação no storage:', error);
  }
}

export async function obterDadosAuth() {
  try {
    const token = await AsyncStorage.getItem(CHAVE_TOKEN);
    const usuarioJson = await AsyncStorage.getItem(CHAVE_USUARIO);

    const usuario = usuarioJson ? JSON.parse(usuarioJson) : null;

    return { token, usuario };
  } catch (error) {
    console.error('Erro ao recuperar dados de auth do storage:', error);
    return { token: null, usuario: null };
  }
}

export async function limparDadosAuth() {
  try {
    await AsyncStorage.removeItem(CHAVE_TOKEN);
    await AsyncStorage.removeItem(CHAVE_USUARIO);
  } catch (error) {
    console.error('Erro ao limpar dados de auth do storage:', error);
  }
}
```

### Integrando ao `AuthContext.js`:
```jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';
import { salvarDadosAuth, obterDadosAuth, limparDadosAuth } from '../storage/authStorage';
import { Alert } from 'react-native';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregandoApp, setCarregandoApp] = useState(true);

  // Executa assim que o app é aberto para restaurar a sessão do disco
  useEffect(() => {
    async function restaurarSessao() {
      const { token, usuario } = await obterDadosAuth();

      if (token && usuario) {
        // Restaura o cabeçalho do Axios
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Restaura o usuário no estado
        setUsuario(usuario);
      }

      setCarregandoApp(false);
    }

    restaurarSessao();
  }, []);

  async function login(email, senha) {
    try {
      const { data } = await api.post('/sessions', { email, senha });

      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUsuario(data.usuario);

      // Grava no disco do smartphone
      await salvarDadosAuth(data.token, data.usuario);
    } catch (error) {
      Alert.alert(
        'Erro de Autenticação',
        error.response?.data?.message || 'E-mail ou senha inválidos.'
      );
    }
  }

  async function logout() {
    api.defaults.headers.common['Authorization'] = null;
    setUsuario(null);
    await limparDadosAuth();
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        estaAutenticado: !!usuario,
        carregandoApp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie o arquivo `src/storage/authStorage.js` com as funções de persistência.
2. Atualize o `AuthContext.js` para restaurar os dados gravados no `useEffect` de inicialização.
3. No arquivo de rotas raiz (`src/routes/index.js`), exiba uma tela com `ActivityIndicator` enquanto `carregandoApp` for `true`.
4. Faça o teste de persistência:
   - Abra o app e faça login com credenciais válidas.
   - Navegue pela tela Home.
   - Feche o app completamente (force o encerramento do app no smartphone ou terminal).
   - Abra o app novamente e comprove que ele abre **imediatamente na tela Home**, mantendo o usuário conectado!
5. Clique no botão de Logout e comprove que os dados são apagados e o app retorna para o Login.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Objetos são convertidos com `JSON.stringify` na gravação e `JSON.parse` na leitura.
- [ ] O token JWT e o objeto do usuário são armazenados em chaves distintas.
- [ ] O aplicativo restaura o token e configura o header do Axios antes de renderizar as telas.
- [ ] O processo de Logout limpa o AsyncStorage e redireciona para a tela de autenticação.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

O que acontece se o token JWT gravado no AsyncStorage vencer (expirar) enquanto o usuário estiver com o app fechado por uma semana? Como o interceptador de resposta de erro `401` que aprendemos na Aula 04 ajuda a limpar automaticamente o storage e mandar o usuário para o login?
