---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-10-pratica-app-offline-first
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-10-pratica-app-offline-first
sidebar_position: 10
title: "Aula 10 — Prática: Aplicativo Offline-First com SQLite"
description: Construa um aplicativo mobile com arquitetura Offline-First capaz de funcionar com ou sem conexão de internet.
---

# Aula 10 — Prática: Aplicativo Offline-First com SQLite

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender e implementar o paradigma arquitetural **Offline-First**, onde o aplicativo salva e lê todos os dados prioritariamente do banco de dados local SQLite, garantindo que o usuário possa continuar trabalhando mesmo sem conexão de internet (em modo avião, garagens subterrâneas ou áreas rurais).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O paradigma **Offline-First vs. Cloud-First**.
- O fluxo de escrita local imediata e fila de sincronização em segundo plano.
- Detecção de conectividade de rede com o pacote `@react-native-community/netinfo`.
- Indicadores visuais de status ("Modo Offline" vs. "Sincronizado").
- Prática: Construção de um sistema de Controle Financeiro / Pedidos de Campo 100% offline.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

<div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
  <img src="/img/mobile_offline_first_arquitetura.jpg" alt="Arquitetura Mobile Offline-First no React Native com SQLite e Nuvem" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 6px 20px rgba(0,0,0,0.3)' }} />
  <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)', marginTop: '0.5rem' }}>
    <em>Figura 1: Arquitetura Offline-First com banco SQLite local, fila de alterações e sincronização assíncrona com o servidor na nuvem.</em>
  </p>
</div>

### Como funciona o Offline-First?
Em aplicativos tradicionais (Cloud-First), se o usuário clicar em "Salvar" sem internet, uma tela de erro aparece e o usuário perde os dados digitados.

No **Offline-First**:
1. O usuário clica em "Salvar Pedido".
2. O aplicativo salva imediatamente no banco **SQLite local do celular**.
3. A interface atualiza instantaneamente (tempo de resposta de poucos milissegundos).
4. O registro é marcado com a coluna `sincronizado = 0`.
5. Um motor em segundo plano (Sync Engine) detecta quando a internet volta e envia automaticamente todos os registros pendentes para a API Back-End na nuvem, atualizando para `sincronizado = 1`!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Modelagem com Flag de Sincronização: `src/database/transacoesRepository.js`
```javascript
import { db } from './sqlite';

export function inicializarTabelaTransacoes() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS transacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      valor REAL NOT NULL,
      tipo TEXT NOT NULL, -- 'RECEITA' ou 'DESPESA'
      sincronizado INTEGER DEFAULT 0 -- 0 = pendente, 1 = enviado à nuvem
    );
  `);
}

export function registrarTransacao(descricao, valor, tipo) {
  const statement = db.prepareSync(
    'INSERT INTO transacoes (descricao, valor, tipo, sincronizado) VALUES ($descricao, $valor, $tipo, 0)'
  );
  try {
    return statement.executeSync({ $descricao: descricao, $valor: valor, $tipo: tipo });
  } finally {
    statement.finalizeSync();
  }
}

export function listarTransacoes() {
  const statement = db.prepareSync('SELECT * FROM transacoes ORDER BY id DESC');
  try {
    return statement.executeSync().getAllSync();
  } finally {
    statement.finalizeSync();
  }
}
```

### 2. Componente de Barra de Status de Conectividade: `src/components/AvisoOffline.js`
```jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export function AvisoOffline() {
  const [estaConectado, setEstaConectado] = useState(true);

  useEffect(() => {
    // Escuta alterações de conexão de rede em tempo real
    const unsubscribe = NetInfo.addEventListener((state) => {
      setEstaConectado(state.isConnected && state.isInternetReachable !== false);
    });

    return () => unsubscribe();
  }, []);

  if (estaConectado) return null; // Não exibe nada se estiver online

  return (
    <View style={styles.banner}>
      <Text style={styles.texto}>⚠️ Você está no Modo Offline. Seus dados estão salvos localmente.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#f59e0b',
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  texto: {
    color: '#0f172a',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática: O Teste do Modo Avião

1. Crie a tela de **Controle Financeiro Offline** utilizando o repositório de transações com SQLite.
2. Adicione o componente `AvisoOffline` no topo da tela.
3. Teste prático de campo:
   - Abra o app no celular e coloque o aparelho em **Modo Avião** (desconecte Wi-Fi e dados móveis).
   - Verifique a faixa amarela de "Modo Offline" aparecer na hora.
   - Cadastre 3 despesas com descrições e valores.
   - Comprove que o cadastro funciona instantaneamente e a lista atualiza sem travar ou acusar erro!
   - Desative o Modo Avião e veja a faixa sumir.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A aplicação realiza gravações e consultas funcionais sem precisar de internet.
- [ ] A tabela SQLite possui a coluna `sincronizado` para rastrear dados pendentes.
- [ ] O componente `AvisoOffline` detecta com precisão o status da conexão.
- [ ] A velocidade da interface visual é instantânea para o usuário final.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Como você resolveria um **Conflito de Dados**? Se o usuário alterou o nome de um produto no celular enquanto estava offline, mas outro usuário alterou o mesmo produto pela interface Web ao mesmo tempo, qual estratégia de resolução de conflitos você usaria (*Last Write Wins* - a última gravação vence, ou notificar o usuário)?
