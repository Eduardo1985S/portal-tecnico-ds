---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-16-firebase-firestore-realtime
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-16-firebase-firestore-realtime
sidebar_position: 16
title: Aula 16 — Banco de Dados NoSQL em Tempo Real com Cloud Firestore
description: Armazene e sincronize dados na nuvem em tempo real utilizando o Google Cloud Firestore no React Native.
---

# Aula 16 — Banco de Dados NoSQL em Tempo Real com Cloud Firestore

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o modelo de dados de bancos **NoSQL orientados a Documentos**, configurar o **Cloud Firestore** no aplicativo React Native, aprender a salvar e consultar coleções de dados na nuvem e utilizar os ouvintes em tempo real (*Realtime Listeners* com `onSnapshot`) para que a tela do celular atualize instantaneamente sem precisar recarregar.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O paradigma NoSQL: Bancos Relacionais (Tabelas/Linhas) vs. Firestore (Coleções/Documentos).
- Operações de escrita no Firestore: `addDoc()`, `setDoc()`, `updateDoc()`, `deleteDoc()`.
- Consultas pontuais (`getDocs()`) vs. ouvintes em tempo real (`onSnapshot()`).
- Filtros e ordenação com `query()`, `where()` e `orderBy()`.
- Criação de um chat ou feed de notícias com sincronização em tempo real entre dois aparelhos.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que torna o Firestore especial?
Em APIs REST tradicionais, se outro usuário cadastrar um produto ou enviar uma mensagem, o seu aplicativo não fica sabendo a menos que você puxe a tela para baixo para atualizar (*Pull-to-Refresh*) ou use WebSockets complexos.

O **Cloud Firestore** possui uma tecnologia de sincronização nativa baseada em conexões persistentes. Quando você se inscreve em uma coleção com o método `onSnapshot()`, o Firebase **empurra (push)** qualquer novo dado para o celular no exato milissegundo em que ele é gravado na nuvem!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Exportando o Firestore: `src/config/firebase.js`
```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ... configurações anteriores ...
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
```

### 2. Gravando e Ouvindo em Tempo Real: `src/screens/FeedMensagensScreen.js`
```jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export function FeedMensagensScreen() {
  const [mensagens, setMensagens] = useState([]);
  const [novoTexto, setNovoTexto] = useState('');

  // 1. Escutando alterações em tempo real com onSnapshot
  useEffect(() => {
    const q = query(
      collection(db, 'mensagens'),
      orderBy('criadoEm', 'desc')
    );

    // O onSnapshot dispara toda vez que alguém cria, altera ou deleta uma mensagem na nuvem!
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMensagens(lista);
    });

    return () => unsubscribe(); // Cancela o listener ao sair da tela
  }, []);

  // 2. Gravando nova mensagem na nuvem
  async function handleEnviar() {
    if (!novoTexto.trim()) return;

    await addDoc(collection(db, 'mensagens'), {
      texto: novoTexto.trim(),
      criadoEm: serverTimestamp(),
      autor: 'Aluno SENAI',
    });

    setNovoTexto('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Feed em Tempo Real ⚡</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escreva uma mensagem..."
          placeholderTextColor="#64748b"
          value={novoTexto}
          onChangeText={setNovoTexto}
        />
        <TouchableOpacity style={styles.botao} onPress={handleEnviar}>
          <Text style={styles.textoBotao}>Enviar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.autor}>{item.autor}</Text>
            <Text style={styles.texto}>{item.texto}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20 },
  titulo: { color: '#ffffff', fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  inputContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#1e293b', color: '#ffffff', borderRadius: 8, padding: 12 },
  botao: { backgroundColor: '#10b981', justifyContent: 'center', paddingHorizontal: 18, borderRadius: 8 },
  textoBotao: { color: '#ffffff', fontWeight: 'bold' },
  card: { backgroundColor: '#1e293b', padding: 14, borderRadius: 10, marginBottom: 10 },
  autor: { color: '#38bdf8', fontSize: 12, fontWeight: 'bold', marginBottom: 4 },
  texto: { color: '#f8fafc', fontSize: 15 },
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática: O Teste de Dois Celulares

1. No Firebase Console, ative o **Cloud Firestore** em modo de teste.
2. Implemente a tela `FeedMensagensScreen` no seu projeto.
3. Abra o app em **dois smartphones diferentes** (ou no seu celular físico e em um emulador no PC):
   - Digite uma mensagem no primeiro celular e clique em "Enviar".
   - Olhe para o segundo celular: veja a mensagem aparecer **instantaneamente na tela dele sem tocar no aparelho**!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O Cloud Firestore está instanciado no arquivo de configuração do Firebase.
- [ ] A função `addDoc()` grava documentos na coleção com carimbo `serverTimestamp()`.
- [ ] O ouvinte `onSnapshot()` atualiza o estado local reativamente a cada alteração na nuvem.
- [ ] O cancelamento do ouvinte é retornado no cleanup do `useEffect`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Como você adicionaria a opção de exclusão de mensagens? Use a função `deleteDoc(doc(db, 'mensagens', item.id))` e veja o item desaparecer da tela de todos os celulares conectados no mesmo segundo!
