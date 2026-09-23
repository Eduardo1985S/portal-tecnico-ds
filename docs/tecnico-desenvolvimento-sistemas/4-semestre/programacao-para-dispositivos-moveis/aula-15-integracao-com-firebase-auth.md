---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-15-integracao-com-firebase-auth
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-15-integracao-com-firebase-auth
sidebar_position: 15
title: Aula 15 — Backend as a Service com Firebase Authentication
description: Conecte seu app a serviços de nuvem gerenciados implementando cadastro e login de usuários com Firebase no React Native.
---

# Aula 15 — Backend as a Service com Firebase Authentication

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o modelo **Backend as a Service (BaaS)** e a plataforma em nuvem **Google Firebase**, criar um projeto no Firebase Console, instalar o SDK no React Native e implementar fluxos completos de Cadastro e Autenticação de Usuários gerenciados com e-mail e senha.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é BaaS (Backend as a Service) vs. Backend Tradicional próprio.
- Criação e configuração de credenciais no Google Firebase Console.
- A biblioteca oficial do Firebase para web/React Native (`npm install firebase`).
- O serviço **Firebase Authentication**:
  - `createUserWithEmailAndPassword()`
  - `signInWithEmailAndPassword()`
  - `signOut()`
- O listener de estado em tempo real: `onAuthStateChanged()`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que é o Firebase?
Construir um servidor próprio em Node.js com banco de dados é ideal quando precisamos de controle total e regras de negócio proprietárias. No entanto, em startups e protótipos rápidos, manter servidores pode exigir tempo e custos de infraestrutura.

O **Firebase** é a plataforma BaaS do Google que fornece serviços de nuvem prontos para consumo direto pelo aplicativo:
* **Firebase Auth:** Gerenciamento seguro de usuários, redefinição de senhas e login social (Google, Apple).
* **Cloud Firestore:** Banco de dados NoSQL em tempo real.
* **Cloud Storage:** Armazenamento em nuvem de fotos e vídeos.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Inicializando o Firebase: `src/config/firebase.js`
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Credenciais obtidas no Console do Firebase (Configurações do Projeto)
const firebaseConfig = {
  apiKey: "AIzaSyD-SUA_API_KEY_AQUI",
  authDomain: "meu-app-tds.firebaseapp.com",
  projectId: "meu-app-tds",
  storageBucket: "meu-app-tds.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Exporta o serviço de autenticação
export const auth = getAuth(app);
```

### 2. Funções de Cadastro e Login: `src/services/firebaseAuthService.js`
```javascript
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export async function cadastrarComFirebase(email, senha) {
  try {
    const credencial = await createUserWithEmailAndPassword(auth, email, senha);
    return credencial.user;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este e-mail já está sendo utilizado.');
    }
    if (error.code === 'auth/weak-password') {
      throw new Error('A senha deve ter no mínimo 6 caracteres.');
    }
    throw new Error('Falha ao cadastrar no Firebase.');
  }
}

export async function loginComFirebase(email, senha) {
  try {
    const credencial = await signInWithEmailAndPassword(auth, email, senha);
    return credencial.user;
  } catch (error) {
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
      throw new Error('E-mail ou senha inválidos.');
    }
    throw new Error('Não foi possível realizar o login.');
  }
}

export async function logoutDoFirebase() {
  await signOut(auth);
}
```

### 3. Monitorando o Estado do Usuário no React Native:
```jsx
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebase';
import { View, ActivityIndicator } from 'react-native';
import { AppRoutes } from './src/routes/app.routes';
import { AuthRoutes } from './src/routes/auth.routes';

export function NavegadorFirebase() {
  const [usuarioFirebase, setUsuarioFirebase] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // O Firebase monitora e restaura o login automaticamente!
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuarioFirebase(user);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return usuarioFirebase ? <AppRoutes /> : <AuthRoutes />;
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Acesse o [Firebase Console](https://console.firebase.google.com/) e crie um novo projeto gratuito.
2. Adicione um novo aplicativo Web no painel e copie o objeto `firebaseConfig`.
3. Na seção **Authentication** → **Sign-in method**, ative o provedor **E-mail/Senha**.
4. Instale o Firebase no projeto: `npm install firebase`.
5. Crie o arquivo `src/config/firebase.js` e implemente a tela de Cadastro.
6. Cadastre um usuário pelo aplicativo e confira imediatamente a nova linha de usuário aparecendo no painel web do Firebase Console!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O projeto Firebase foi criado e configurado com o provedor de E-mail/Senha ativo.
- [ ] O SDK `firebase` está instalado e exporta a instância `auth`.
- [ ] Usuários cadastrados no celular aparecem instantaneamente no console do Firebase.
- [ ] A função `onAuthStateChanged` gerencia a sessão de forma reativa.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Pesquise sobre a funcionalidade de redefinição de senha com `sendPasswordResetEmail(auth, email)`. Adicione um botão "Esqueci minha senha" na tela de login que dispare um e-mail oficial do Google para a caixa de entrada do usuário com o link para redefinir a senha!
