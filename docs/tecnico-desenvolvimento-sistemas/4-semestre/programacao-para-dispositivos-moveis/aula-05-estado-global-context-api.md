---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-05-estado-global-context-api
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-05-estado-global-context-api
sidebar_position: 5
title: Aula 05 — Gerenciamento de Estado Global com Context API
description: Resolva o problema de Prop Drilling compartilhando dados de autenticação e usuário globalmente no React Native.
---

# Aula 05 — Gerenciamento de Estado Global com Context API

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o problema do "Prop Drilling" em aplicativos com múltiplas telas, aprender a arquitetura da **Context API nativa do React**, criar o contexto global de autenticação (`AuthContext`) e disponibilizar os dados do usuário e funções de Login/Logout para qualquer componente da árvore de navegação.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é Prop Drilling e por que ele dificulta a evolução do app.
- A tríade da Context API: `createContext()`, `<Provider>` e o hook customizado `useAuth()`.
- Criação do `AuthContext` contendo: `usuario`, `estaAutenticado`, `login()` e `logout()`.
- Alternância condicional de rotas (Rotas Públicas de Auth vs. Rotas Privadas do App).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O Problema do Prop Drilling
Imagine que o usuário fez login na tela `LoginScreen`. O token e o nome dele precisam ser acessados:
* No cabeçalho da `HomeScreen`.
* No carrinho de compras da `CarrinhoScreen`.
* Na tela de `PerfilScreen`.

Se você usar apenas o `useState` comum, terá que passar os dados do usuário como propriedades (`props`) por todas as telas intermediárias da pilha de navegação, mesmo que elas nem usem esses dados!

### A Solução: Context API
A **Context API** cria um "satélite" de dados que paira acima de toda a árvore de componentes. Qualquer tela, por mais profunda que esteja na hierarquia, pode se conectar a esse satélite através de um Hook (`useAuth()`) e ler ou alterar o estado instantaneamente:

```
          [ <AuthProvider> (Estado Global de Auth) ]
               /                               \
    [ Rotas Públicas ]                 [ Rotas Privadas ]
      (Login / Cadastro)                 (Home / Perfil / Pedidos)
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Criando o Contexto: `src/contexts/AuthContext.js`
```jsx
import React, { createContext, useState, useContext } from 'react';
import { api } from '../services/api';
import { Alert } from 'react-native';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(false);

  async function login(email, senha) {
    try {
      setCarregando(true);

      // Dispara a requisição de login para o Back-End
      const { data } = await api.post('/sessions', { email, senha });

      // Configura o token no cabeçalho padrão de todas as próximas chamadas do Axios!
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      // Salva os dados do usuário no estado global
      setUsuario(data.usuario);
    } catch (error) {
      Alert.alert(
        'Falha no Login',
        error.response?.data?.message || 'E-mail ou senha incorretos.'
      );
    } finally {
      setCarregando(false);
    }
  }

  function logout() {
    // Remove o token do cabeçalho do Axios
    api.defaults.headers.common['Authorization'] = null;
    // Limpa o usuário do estado global
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        estaAutenticado: !!usuario, // Transforma o objeto em booleano
        carregando,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para facilitar o consumo nas telas
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}
```

### 2. Envolvendo a Aplicação no `App.js`:
```jsx
import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
```

### 3. Alternando Navegadores com Base no Estado: `src/routes/index.js`
```jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { AuthRoutes } from './auth.routes'; // Telas de Login e Cadastro
import { AppRoutes } from './app.routes';   // Telas de Home, Perfil, etc.

export function Routes() {
  const { estaAutenticado } = useAuth();

  return (
    <NavigationContainer>
      {/* Se estiver autenticado, exibe o app principal. Se não, exibe a tela de login! */}
      {estaAutenticado ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
```

### 4. Consumindo o Contexto na Tela de Login:
```jsx
import { useAuth } from '../contexts/AuthContext';

export function LoginScreen() {
  const { login, carregando } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleEntrar() {
    login(email, senha);
  }

  // ...
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie a pasta `src/contexts` e crie o arquivo `AuthContext.js`.
2. Configure o `AuthProvider` no `App.js`.
3. Separe as rotas em `auth.routes.js` (com a tela de Login) e `app.routes.js` (com a tela Home).
4. No `HomeScreen`, adicione um botão "Sair da Conta" que chame a função `logout()` do hook `useAuth()`.
5. Teste o fluxo completo:
   - O app inicia na tela de Login.
   - Ao fazer login com sucesso, a interface troca automaticamente para a tela Home sem você precisar chamar `navigation.navigate()`.
   - Ao clicar em "Sair", o app retorna imediatamente para o Login!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O `AuthContext` é criado com `createContext()` e disponibilizado via `AuthProvider`.
- [ ] O hook `useAuth()` encapsula o consumo do contexto com segurança.
- [ ] O cabeçalho `Authorization` do Axios é configurado automaticamente no login.
- [ ] O arquivo de rotas renderiza condicionalmente as telas com base em `estaAutenticado`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

O que acontece se o usuário fechar o aplicativo no celular e abri-lo novamente? Ele continuará logado ou voltará para a tela de login? Na próxima aula, aprenderemos a resolver isso gravando o token no disco do celular com o **AsyncStorage**!
